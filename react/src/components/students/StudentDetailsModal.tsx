import { useState } from "react";
import { createPortal } from "react-dom";
import { StudentStatus, Student } from "../../types/student";
import { patchStudent, deleteStudent } from "../../services/students_service";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  onUpdate: (updated: Student) => void;
  onDelete: (id: number) => void;
};

export default function StudentDetailsModal({
  isOpen,
  onClose,
  student,
  onUpdate,
  onDelete,
}: Props) {
  if (!isOpen || !student) return null;

  const [formData, setFormData] = useState({
    firstName: student?.firstName ?? "",
    lastName: student?.lastName ?? "",
    email: student?.email ?? "",
    status: student?.status ?? StudentStatus.ACTIVE,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const updated = await patchStudent(student.id, formData);
    onUpdate(updated);
    onClose();
  };

  const handleDelete = async () => {
    await deleteStudent(student.id);
    onDelete(student.id);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h3 className="text-xl font-bold mb-4">Szczegóły studenta</h3>

        <label className="block mb-2">
          Imię:
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Nazwisko:
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>

        <label className="block mb-2">
          Email:
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <div className="flex justify-end gap-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Usuń
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Zamknij
          </button>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleSubmit}
          >
            Zapisz
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
