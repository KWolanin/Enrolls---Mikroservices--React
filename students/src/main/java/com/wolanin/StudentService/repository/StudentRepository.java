package com.wolanin.StudentService.repository;

import com.wolanin.StudentService.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByEmail(String email);

    List<Student> findAllByStatus(Student.Status status);

    List<Student> findAllByEmailIn(List<String> emails);

    List<Student> findAllByLastNameContainingIgnoreCaseOrEmailContainingIgnoreCase(String lastNamePart, String emailPart);

}