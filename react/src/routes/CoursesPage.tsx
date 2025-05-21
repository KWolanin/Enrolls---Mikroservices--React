import { useCallback, useState } from "react";
import CourseForm from "../components/courses/CourseForm";
import CourseList from "../components/courses/CourseList";
import { Course } from "../types/course";

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);

  const handleSetCourses = useCallback((courses: Course[]) => {
    setCourses(courses);
  }, []);

  const handleAddCourse = (newCourse: Course) => {
    setCourses((prev) => {
      return [...prev, newCourse];
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Zarządzanie kursami</h1>
      <CourseForm onAdd={handleAddCourse} />
      <CourseList courses={courses} onSetCourses={handleSetCourses} />
    </div>
  );
}
