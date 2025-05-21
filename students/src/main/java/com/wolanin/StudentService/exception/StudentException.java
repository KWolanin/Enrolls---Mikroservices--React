package com.wolanin.StudentService.exception;

public class StudentException extends RuntimeException {

    private StudentError studentError;

    public StudentException(StudentError studentError) {
        this.studentError = studentError;
    }

    public StudentError getStudentError() {
        return studentError;
    }
}