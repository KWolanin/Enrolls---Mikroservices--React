package com.wolanin.courses.service;

import com.wolanin.courses.model.Course;
import com.wolanin.courses.model.dto.Student;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CourseService {

    List<Course> getCourses(Course.Status status);

    Course getCourse(String code);

    Course addCourse(Course course);

    void deleteCourse(String code);

    Course putCourse(String code, Course course);

    Course patchCourse(String code, Course course);

    void courseEnrollment(long studentId, String courseCode);

    List<Student> getStudentsEnrolledToCourse(String code);

    void finishEnroll(String code);
}
