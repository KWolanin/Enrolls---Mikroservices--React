import axios from '../axios'
import { Course, CourseStatus } from '../types/course'

export const getAllCourses = async (status?: CourseStatus): Promise<Course[]> => {
  const response = await axios.get<Course[]>('/courses/courses')
  return response.data
}

export const getCourseByCode = async (code: string): Promise<Course> => {
  const response = await axios.get<Course>(`/courses/courses/${code}`)
  return response.data
}

export const createCourse = async (course: Course): Promise<Course> => {
  const response = await axios.post<Course>('/courses/courses', course)
  return response.data
}

// export const updateCourse = async (code: string, course: Course): Promise<Course> => {
//   const response = await axios.put<Course>(`/courses/courses/${code}`, course)
//   return response.data
// }

// export const deleteCourse = async (code: string): Promise<void> => {
//   await axios.delete(`/courses/courses/${code}`)
// }

export const addToCourse = async (code: string, studentId: number): Promise<void> => {
  const response = await axios.post(`/courses/courses/${code}/student/${studentId}`)
  return response.data
}