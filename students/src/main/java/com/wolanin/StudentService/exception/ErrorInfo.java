package com.wolanin.StudentService.exception;

public class ErrorInfo {

    private String message;

    public ErrorInfo(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}