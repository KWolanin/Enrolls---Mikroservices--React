package com.wolanin.courses.service;

import com.wolanin.courses.model.dto.Student;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "students")
public interface StudentServiceClient {

    @GetMapping("/students")
    List<Student> getStudents();

    @GetMapping("/students/{id}")
    Student getStudent(@PathVariable long id);

    @PostMapping("/students/emails")
    List<Student> getStudentByEmails(@RequestBody List<String> emails);
}
