package com.wolanin.courses.exception;

import feign.FeignException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CourseExceptionHandler {

    @ExceptionHandler(CourseException.class)
    public ResponseEntity<ErrorInfo> handleException(CourseException e) {
        HttpStatus httpStatus = switch (e.getCourseError()) {
            case COURSE_NOT_FOUND -> HttpStatus.NOT_FOUND;
            case COURSE_NAME_ALREADY_EXISTS, COURSE_SHOULD_BE_FULL, COURSE_CANNOT_BE_FULL,
                 COURSE_INCORRECT_PARTICIPANTS_NUMBER, COURSE_NOT_ACTIVE, COURSE_STUDENT_INACTIVE,
                 COURSE_STUDENT_ALREADY_ENROLLED, COURSE_IS_FULL, COURSE_IS_INACTIVE -> HttpStatus.CONFLICT;
            case COURSE_INCORRECT_DATE, COURSE_STUDENT_CANNOT_ENROL -> HttpStatus.BAD_REQUEST;
        };
        return ResponseEntity.status(httpStatus).body(new ErrorInfo(e.getCourseError().getMessage()));
    }

    @ExceptionHandler(FeignException.class)
    public ResponseEntity<?> handleException(FeignException e) {
        return ResponseEntity.status(e.status()).body(new JSONObject(e.contentUTF8()).toMap());
    }
}