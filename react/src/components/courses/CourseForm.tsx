import React, { useState } from "react";
import { createCourse } from "../../services/courses_service";
import { Course, CourseStatus } from "../../types/course";

interface CourseFormProps {
  onAdd: (course: Course) => void;
}

export default function CourseForm({ onAdd }: CourseFormProps) {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [participantsLimit, setParticipantsLimit] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const newCourse: Course = {
        code,
        name,
        description,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        participantsLimit,
        participantsNumber: 0,
        status: CourseStatus.ACTIVE,
        courseMembers: [],
      };
      createCourse(newCourse).then((course) => {
        setSuccess(true);
        setCode("");
        setName("");
        setDescription("");
        setStartDate("");
        setEndDate("");
        setParticipantsLimit(0);
        onAdd(course);
      });
    } catch {
      setError("Coś poszło nie tak przy dodawaniu kursu");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Dodaj nowy kurs</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="code" className="block mb-1">
            Kod kursu
          </label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="block mb-1">
            Nazwa
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="block mb-1">
            Opis
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="block mb-1">
            Data rozpoczęcia
          </label>
          <input
            id="startDate"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="block mb-1">
            Data zakończenia
          </label>
          <input
            id="endDate"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="participantsLimit" className="block mb-1">
            Limit uczestników
          </label>
          <input
            id="participantsLimit"
            type="number"
            min={1}
            value={participantsLimit}
            onChange={(e) => setParticipantsLimit(Number(e.target.value))}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Zapisz
        </button>
        {success && (
          <p className="mt-3 text-green-600">Kurs dodany pomyślnie!</p>
        )}
        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
}
