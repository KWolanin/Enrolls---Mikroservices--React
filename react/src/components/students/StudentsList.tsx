import { useEffect, useState } from "react";
import { getAllStudents } from "../../services/students_service";
import { Student, StudentStatus } from "../../types/student";
import StudentDetailsModal from "./StudentDetailsModal";

type StudentListProps = {
  students: Student[];
  onUpdate: (updated: Student) => void;
  onDelete: (id: number) => void;
  onSetStudents: (students: Student[]) => void;
};

export default function StudentList({
  students,
  onUpdate,
  onDelete,
  onSetStudents,
}: StudentListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllStudents(StudentStatus.ACTIVE)
      .then((data) => {
        onSetStudents(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać listy studentów.");
      })
      .finally(() => setLoading(false));
  }, [onSetStudents]);

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const openModal = (student: Student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Lista studentów</h2>
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">
                {student.firstName} {student.lastName}
              </p>
            </div>
            <button
              className="text-blue-600 hover:underline"
              onClick={() => openModal(student)}
            >
              Szczegóły
            </button>
          </li>
        ))}
      </ul>

      <StudentDetailsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        student={selectedStudent}
        onUpdate={onUpdate}
        onDelete={onDelete}
      />
    </div>
  );
}
