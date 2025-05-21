package com.wolanin.courses.exception;

public enum CourseError {

   COURSE_NOT_FOUND("Course does not exists"),
    COURSE_NAME_ALREADY_EXISTS("Course with this name already exists"),
   COURSE_INCORRECT_DATE("Course start date cannot be earlier than end date"),
    COURSE_INCORRECT_PARTICIPANTS_NUMBER("Course participants number cannot be greater than course limit"),
    COURSE_CANNOT_BE_FULL("Course cannot be marked as Full, if participants number is lesser than course limit"),
    COURSE_SHOULD_BE_FULL("Course cannot be marked as Active because it is Full"),
    COURSE_NOT_ACTIVE("Course is not active"),
    COURSE_STUDENT_INACTIVE("Student is inactive and cannot be enrolled to the course"),
    COURSE_STUDENT_ALREADY_ENROLLED("Student cannot be enrolled because it is already enrolled to selected course"),
    COURSE_IS_FULL("Course is full already"),
    COURSE_STUDENT_CANNOT_ENROL("Student cannot be enrolled"),
    COURSE_IS_INACTIVE("Course is already inactive");

    private String message;

    CourseError(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
