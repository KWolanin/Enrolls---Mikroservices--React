package com.wolanin.StudentService.controller;

import com.wolanin.StudentService.model.Student;
import com.wolanin.StudentService.service.StudentService;
import jakarta.validation.Valid;
import jakarta.ws.rs.QueryParam;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("") // TAK
    public List<Student> getStudents(@RequestParam(required = false) Student.Status status) {
        return studentService.getStudents(status);
    }

    @PostMapping("/emails")
    public List<Student> getStudentsByEmails(@RequestBody List<String> emails){
        return studentService.getStudentsByEmails(emails);
    }

    @GetMapping("/find/{query}")
    public List<Student> getStudentByPartData(@PathVariable String query){
        return studentService.getStudentByLastnameOrEmail(query);
    }

    @PostMapping("") // TAK
    public Student addStudent(@RequestBody @Valid Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping("/{id}")
    public Student getStudent(@PathVariable Long id) {
        return studentService.getStudent(id);
    }

    @DeleteMapping("/{id}") // TAK
    public void deleteStudent(@PathVariable Long id) {
        studentService.deleteStudent(id);
    }

/*    @PutMapping("/{id}") // NIE
    public Student putStudent(@PathVariable Long id, @Valid @RequestBody Student student) {
        return studentService.putStudent(id, student);
    }*/

    @PatchMapping("/{id}") // TAK
    public Student patchStudent(@PathVariable Long id, @RequestBody Student student) {
        return studentService.patchStudent(id, student);
    }
}