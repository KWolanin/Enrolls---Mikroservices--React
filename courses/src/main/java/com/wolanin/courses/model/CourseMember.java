package com.wolanin.courses.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class CourseMember {

    @Id
    @NotNull
    private String email;
    @NotNull
    private LocalDateTime enrollmentDate;

    public CourseMember(@NotNull String email) {
        this.email = email;
        this.enrollmentDate = LocalDateTime.now();
    }

    protected CourseMember() {}

}
