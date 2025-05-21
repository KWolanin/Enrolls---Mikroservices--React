import { useCallback, useState } from "react";
import StudentForm from "../components/students/StudentForm";
import StudentList from "../components/students/StudentsList";
import { Student } from "../types/student";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);

  const handleUpdateStudent = (updatedStudent: Student) => {
    setStudents((prev) =>
      prev.map((s) => (s.id === updatedStudent.id ? updatedStudent : s))
    );
  };

  const handleDeleteStudent = (id: number) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const handleSetStudents = useCallback((students: Student[]) => {
    setStudents(students);
  }, []);

  const handleAddStudent = (newStudent: Student) => {
    setStudents((prev) => {
      return [
        ...prev,
        newStudent,
      ];
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Zarządzanie studentami</h1>
      <StudentForm onAdd={handleAddStudent} />
      <StudentList
        students={students}
        onUpdate={handleUpdateStudent}
        onDelete={handleDeleteStudent}
        onSetStudents={handleSetStudents}
      />
    </div>
  );
}
