package com.wolanin.courses.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@SequenceGenerator(name = "seqIdGen", initialValue = 20000, allocationSize = 1)
@Getter
@Setter
public class Course {

    @Getter
    @Id
    private String code;
    @NotNull
    private String name;
    private String description;
    @NotNull
    @Future
    private LocalDateTime startDate;
    @NotNull
    @Future
    private LocalDateTime endDate;
    @NotNull
    @Min(0)
    private long participantsLimit;
    @NotNull
    @Min(0)
    private Long participantsNumber;

    @NotNull
    private Status status;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "course_id")
    private List<CourseMember> courseMembers = new ArrayList<>();


    public enum Status {
        ACTIVE,
        INACTIVE,
        FULL;
    }

    public void incrementParticipants() {
        participantsNumber++;
        if (participantsNumber == participantsLimit) {
            setStatus(Course.Status.FULL);
        }
    }
}
