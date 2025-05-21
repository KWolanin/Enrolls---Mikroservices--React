package com.wolanin.StudentService.service;

import com.wolanin.StudentService.model.Student;

import java.util.List;
import java.util.Optional;

public interface StudentService {

    List<Student> getStudents(Student.Status status);

    Student getStudent(Long id);

    Student addStudent(Student student);

    void deleteStudent(Long id);

    Student putStudent(Long id, Student student);

    Student patchStudent(Long id, Student student);

    List<Student> getStudentsByEmails(List<String> emails);

    List<Student> getStudentByLastnameOrEmail(String query);
}