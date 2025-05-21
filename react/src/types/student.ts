export enum StudentStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export interface Student {
  id: number
  firstName: string
  lastName: string
  email: string
  status: StudentStatus
}
