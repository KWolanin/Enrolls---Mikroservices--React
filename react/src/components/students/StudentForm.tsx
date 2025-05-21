import React, { useState } from "react";
import { addStudent } from "../../services/students_service";
import { Student, StudentStatus } from "../../types/student";
type StudentFormData = Omit<Student, "id">;

interface StudentFormProps {
  onAdd: (student: Student) => void;
}

export default function StudentForm({ onAdd }: StudentFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const newStudent: StudentFormData = {
        firstName,
        lastName,
        email,
        status: StudentStatus.ACTIVE,
      };
      await addStudent(newStudent).then((student) => {
        console.log(student)
        setSuccess(true);
        setFirstName("");
        setLastName("");
        setEmail("");
        onAdd(student);
      });
    } catch {
      setError("Coś poszło nie tak przy dodawaniu studenta");
    }
  };

  return (
    <div className="mb-6 p-4 border rounded bg-white shadow">
      <h2 className="text-xl font-semibold mb-4">Dodaj nowego studenta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="firstName" className="block mb-1">
            Imię
          </label>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="lastName" className="block mb-1">
            Nazwisko
          </label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="border px-2 py-1 rounded w-full"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
          <p className="mt-3 text-green-600">Student dodany pomyślnie!</p>
        )}
        {error && <p className="mt-3 text-red-600">{error}</p>}
      </form>
    </div>
  );
}
