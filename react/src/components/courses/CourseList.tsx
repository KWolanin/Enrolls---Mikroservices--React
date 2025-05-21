import { useEffect, useState } from "react";
import { Course, CourseStatus } from "../../types/course";
import { getAllCourses } from "../../services/courses_service";
import AssignStudentsModal from "./AssignStudentsModal";

type CourseListProps = {
  courses: Course[];
  onSetCourses: (students: Course[]) => void;
};

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}


export default function CourseList({
  courses,
  onSetCourses,
}: CourseListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllCourses(CourseStatus.ACTIVE)
      .then((data) => {
        onSetCourses(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Nie udało się pobrać listy kursów.");
      })
      .finally(() => setLoading(false));
  }, [onSetCourses]);

  if (loading) return <p>Ładowanie danych...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const openModal = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Lista kursów</h2>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li
            className="flex justify-between items-center border-b pb-2"
            key={course.code}
          >
            <div>
              <p className="font-medium">
                {course.name} ({course.participantsNumber}/
                {course.participantsLimit})
              </p>
              <p>{course.description}</p>
              <p>{formatDate(course.startDate)} - {formatDate(course.endDate)}</p>
            </div>
            <button
              disabled={course.participantsNumber >= course.participantsLimit}
              className="text-blue-600 hover:underline"
              onClick={() => openModal(course)}
            >
              Dodaj studenta
            </button>
          </li>
        ))}
      </ul>

      <AssignStudentsModal
        isOpen={isModalOpen}
        onClose={closeModal}
        course={selectedCourse}
      />
    </div>
  );
}
