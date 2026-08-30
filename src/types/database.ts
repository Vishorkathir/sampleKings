export type UserRole = 'admin' | 'student'

export type AdmissionStatus = 'pending' | 'admitted' | 'rejected'

export type StudentProfile = {
  phone: string | null
  address: string | null
  guardian_name: string | null
  guardian_phone: string | null
  skills: string[]
  match_statistics: Record<string, unknown>
  total_matches_played: number
  total_runs_scored: number
  total_wickets_taken: number
  batting_average: number
  bowling_average: number
}

export type Student = {
  id: string
  email: string
  full_name: string
  role: UserRole
  is_active: boolean
  created_at: string
  admission_status: AdmissionStatus
  skills: string[]
  profile?: StudentProfile | null
  fee_plan?: {
    total_fee: number | string
    currency: string
  } | null
}

export type Todo = {
  id: number
  name: string
  created_at?: string
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: Student
        Insert: Omit<Student, 'id' | 'created_at'>
        Update: Partial<Omit<Student, 'id'>>
      }
      todos: {
        Row: Todo
        Insert: Omit<Todo, 'id'>
        Update: Partial<Todo>
      }
      student_profiles: {
        Row: StudentProfile & { id: string; user_id: string }
        Insert: Partial<StudentProfile> & { user_id: string }
        Update: Partial<StudentProfile>
      }
    }
  }
}
