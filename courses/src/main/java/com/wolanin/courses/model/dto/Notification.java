package com.wolanin.courses.model.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@Builder
public class Notification {

    private List<String> emails;
    private String courseCode;
    private String courseName;
    private String courseDescription;
    private LocalDateTime courseStartDate;
    private LocalDateTime courseEndDate;

}
