package com.wolanin.courses.controller;

import com.wolanin.courses.model.Course;
import com.wolanin.courses.service.CourseService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// na spring gateway: http://localhost:9000/courses/courses

@RestController
@RequestMapping("/courses")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("")
    public List<Course> getCourses(@RequestParam(required = false) Course.Status status) {
        return courseService.getCourses(status);
    }

    @PostMapping("")
    public Course addCourse(@RequestBody @Valid Course course) {
        return courseService.addCourse(course);
    }

    @GetMapping("/{code}")
    public Course getCourse(@PathVariable String code) {
        return courseService.getCourse(code);
    }

    @PostMapping("/{courseCode}/student/{studentId}")
    public ResponseEntity<?> addToCourse( @PathVariable String courseCode, @PathVariable long studentId) {
        courseService.courseEnrollment(studentId, courseCode);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{code}/members")
    public ResponseEntity<?> getStudentsEnrolledToCourse(@PathVariable String code) {
        return ResponseEntity.ok(courseService.getStudentsEnrolledToCourse(code));
    }

    @GetMapping("/{code}/finish-enroll")
    public ResponseEntity<?> finishEnroll(@PathVariable String code) {
            courseService.finishEnroll(code);
            return ResponseEntity.ok().build();
    }

}
