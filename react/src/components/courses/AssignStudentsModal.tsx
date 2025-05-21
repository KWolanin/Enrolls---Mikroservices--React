import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { Course } from "../../types/course"
import { Student } from "../../types/student"
import { addToCourse } from "../../services/courses_service"
import { getStudentsPartData } from "../../services/students_service"

type Props = {
  isOpen: boolean
  onClose: () => void
  course: Course | null
}

export default function AssignStudentsModal({ isOpen, onClose, course }: Props) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Student[]>([])
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  useEffect(() => {
      console.log("Query:", query)

    setQuery("")
    setResults([])
    setError(null)
    setSuccess(null)
  }, [course])

  if (!isOpen || !course) return null
  const handleSearch = async () => {
    try {
      const data = await getStudentsPartData(query)
      setResults(data)
      setError(null)
    } catch {
      setError("Błąd podczas wyszukiwania studentów")
      setResults([])
    }
  }

  const handleAssign = async (studentId: number) => {
    try {
      await addToCourse(course.code, studentId)
      setSuccess("Student przypisany pomyślnie")
      setError(null)
    } catch {
      setError("Nie udało się przypisać studenta")
      setSuccess(null)
    }
  }

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-[500px] max-h-[80vh] overflow-y-auto">
        <h3 className="text-xl font-bold mb-4">Przypisz studentów do: {course.name}</h3>

        <input
          type="text"
          placeholder="Szukaj po nazwisku lub emailu"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
        >
          Szukaj
        </button>

        {error && <p className="text-red-600 mb-2">{error}</p>}
        {success && <p className="text-green-600 mb-2">{success}</p>}

        <ul className="space-y-2">
          {results.map((student) => (
            <li key={student.id} className="flex justify-between items-center border-b pb-1">
              <div>
                <p>{student.firstName} {student.lastName}</p>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                onClick={() => handleAssign(student.id)}
              >
                Przypisz
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onClose}
          >
            Zamknij
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  )
}
