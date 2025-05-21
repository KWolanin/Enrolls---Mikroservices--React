import axios from '../axios'
import { Student, StudentStatus } from '../types/student'

export const getAllStudents = async (status?: StudentStatus): Promise<Student[]> => {
  const response = await axios.get<Student[]>('/students/students', {
    params: status ? { status } : undefined
  })
  return response.data
}

export const getStudentsPartData = async (query: string): Promise<Student[]> => {
  console.log(query)
  const response = await axios.get<Student[]>(`/students/students/find/${query}`)
  console.log(response)
  return response.data
}

export const getStudentById = async (id: number): Promise<Student> => {
  const response = await axios.get<Student>(`/students/students/${id}`)
  return response.data
}

export const addStudent = async (student: Omit<Student, 'id'>): Promise<Student> => {
  const response = await axios.post<Student>('/students/students', student)
  return response.data
}

// export const updateStudent = async (id: number, student: Student): Promise<Student> => {
//   const response = await axios.put<Student>(`/students/students/${id}`, student)
//   return response.data
// }

export const patchStudent = async (id: number, student: Partial<Student>): Promise<Student> => {
  const response = await axios.patch<Student>(`/students/students/${id}`, student)
  return response.data
}

export const deleteStudent = async (id: number): Promise<void> => {
  await axios.delete(`/students/students/${id}`)
}
