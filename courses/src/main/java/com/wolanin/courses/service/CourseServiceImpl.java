package com.wolanin.courses.service;

import com.wolanin.courses.exception.CourseError;
import com.wolanin.courses.exception.CourseException;
import com.wolanin.courses.model.Course;
import com.wolanin.courses.model.CourseMember;
import com.wolanin.courses.model.dto.Notification;
import com.wolanin.courses.model.dto.Student;
import com.wolanin.courses.repository.CourseRepository;
import org.jetbrains.annotations.NotNull;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;


import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {


    private final CourseRepository courseRepository;
    private final StudentServiceClient studentServiceClient;
    private final RabbitTemplate rabbitTemplate;


    public CourseServiceImpl(CourseRepository courseRepository, StudentServiceClient studentServiceClient, RabbitTemplate rabbitTemplate) {
        this.courseRepository = courseRepository;
        this.studentServiceClient = studentServiceClient;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public List<Course> getCourses(Course.Status status) {
        if (status != null) {
            return courseRepository.findAllByStatus(status);
        }
        return courseRepository.findAll();
    }

    @Override
    public Course getCourse(String id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new CourseException(CourseError.COURSE_NOT_FOUND));
    }

    @Override
    public Course addCourse(Course course) {
        validateStartDate(course);
        validateParticipantsNumber(course);
        validateFullStatus(course);
        return courseRepository.save(course);
    }

    private static void validateFullStatus(Course course) {
        if (Course.Status.FULL.equals(course.getStatus()) && course.getParticipantsNumber() < course.getParticipantsLimit()) {
            throw new CourseException(CourseError.COURSE_CANNOT_BE_FULL);
        }
        if (Course.Status.ACTIVE.equals(course.getStatus()) && course.getParticipantsLimit() == course.getParticipantsNumber()) {
            throw new CourseException(CourseError.COURSE_SHOULD_BE_FULL);
        }
    }

    private static void validateParticipantsNumber(Course course) {
        if (course.getParticipantsNumber() > course.getParticipantsLimit()) {
            throw new CourseException(CourseError.COURSE_INCORRECT_PARTICIPANTS_NUMBER);
        }
    }

    private static void validateStartDate(Course course) {
        if (course.getStartDate().isAfter(course.getEndDate())) {
            throw new CourseException(CourseError.COURSE_INCORRECT_DATE);
        }
    }

    @Override
    public Course patchCourse(String code, Course course) {
        return courseRepository.findById(code)
                .map(courseFromDb -> {
                    validateFullStatus(course);
                    validateStartDate(course);
                    validateStartDate(course);
                    if (StringUtils.hasText(course.getName())) {
                        courseFromDb.setName(course.getName());
                    }
                    if (StringUtils.hasText(course.getDescription())) {
                        courseFromDb.setDescription(course.getDescription());
                    }
                    if (course.getStartDate() != null) {
                        courseFromDb.setStartDate(course.getStartDate());
                    }
                    if (course.getEndDate() != null) {
                        courseFromDb.setEndDate(course.getEndDate());
                    }
                    if (!StringUtils.isEmpty(course.getParticipantsLimit())) {
                        courseFromDb.setParticipantsLimit(course.getParticipantsLimit());
                    }
                    if (!StringUtils.isEmpty(course.getParticipantsNumber())) {
                        courseFromDb.setParticipantsNumber(course.getParticipantsNumber());
                    }
                    return courseRepository.save(courseFromDb);
                }).orElseThrow(() -> new CourseException(CourseError.COURSE_NOT_FOUND));
    }

    @Override
    public void deleteCourse(String code) {
        Course course = courseRepository.findById(code)
                .orElseThrow(() -> new CourseException(CourseError.COURSE_NOT_FOUND));
        course.setStatus(Course.Status.INACTIVE);
        courseRepository.save(course);
    }

    @Override
    public Course putCourse(String code, Course course) {
        return courseRepository.findById(code)
                .map(courseFromDB -> {
                    validateFullStatus(course);
                    validateStartDate(course);
                    validateStartDate(course);
                    if (!courseFromDB.getName().equals(course.getName())) {
                        throw new CourseException(CourseError.COURSE_NAME_ALREADY_EXISTS);
                    }
                    courseFromDB.setName(course.getName());
                    courseFromDB.setDescription(course.getDescription());

                    courseFromDB.setStartDate(course.getStartDate());
                    courseFromDB.setEndDate(course.getEndDate());

                    courseFromDB.setParticipantsLimit(course.getParticipantsLimit());
                    courseFromDB.setParticipantsNumber(course.getParticipantsNumber());

                    return courseRepository.save(courseFromDB);
                }).orElseThrow(() -> new CourseException(CourseError.COURSE_NOT_FOUND));
    }

    @Override
    public void courseEnrollment(long studentId, String courseCode) {
        Course course = getCourse(courseCode);
        validateCourseStatus(course);
        Student student = studentServiceClient.getStudent(studentId);
        validateStudent(student, course);
        course.getCourseMembers().add(new CourseMember(student.getEmail()));
        course.incrementParticipants();
        courseRepository.save(course);
    }

    private static void validateStudent(Student student, Course course) {
        if (Student.Status.INACTIVE.equals(student.getStatus())) {
            throw new CourseException(CourseError.COURSE_STUDENT_INACTIVE);
        }

        if (course.getCourseMembers().stream()
                .anyMatch(member -> student.getEmail().equals(member.getEmail()))) {
            throw new CourseException(CourseError.COURSE_STUDENT_ALREADY_ENROLLED);
        }
    }

    private static void validateCourseStatus(Course course) {
        if (!Course.Status.ACTIVE.equals(course.getStatus())) {
            throw new CourseException(CourseError.COURSE_NOT_ACTIVE);
        }
    }

    @Override
    public List<Student> getStudentsEnrolledToCourse(String code) {

        List<String> emails = getMembersEmails(code);

        return studentServiceClient.getStudentByEmails(emails);
    }

    @Override
    public void finishEnroll(String code) {
        Course course = getCourse(code);
        if (Course.Status.INACTIVE.equals(course.getStatus())) {
            throw new CourseException(CourseError.COURSE_IS_INACTIVE);
        }
        course.setStatus(Course.Status.INACTIVE);
        courseRepository.save(course);
        sendNotificationToRabbit(code, course);
    }

    private void sendNotificationToRabbit(String code, Course course) {
        Notification notification = createNotificationInfo(code, course);
        rabbitTemplate.convertAndSend("course", notification);
    }

    private Notification createNotificationInfo(String code, Course course) {
        List<String> emails = getMembersEmails(code);

        return Notification.builder()
                .courseCode(code)
                .courseDescription(course.getDescription())
                .courseName(course.getName())
                .courseStartDate(course.getStartDate())
                .courseEndDate(course.getEndDate())
                .emails(emails)
                .build();
    }

    private @NotNull List<String> getMembersEmails(String code) {
        List<CourseMember> courseMembers = getCourse(code).getCourseMembers();
        List<String> emails = courseMembers.stream()
                .map(CourseMember::getEmail).toList();
        return emails;
    }
}
