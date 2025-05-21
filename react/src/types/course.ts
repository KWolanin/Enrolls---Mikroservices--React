export enum CourseStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  FULL = 'FULL'
}

export interface CourseMember {
  email: string
  enrollmentDate: string
}

export interface Course {
  code: string
  name: string
  description?: string
  startDate: string // ISO 8601
  endDate: string
  participantsLimit: number
  participantsNumber: number
  status: CourseStatus
  courseMembers: CourseMember[]
}
