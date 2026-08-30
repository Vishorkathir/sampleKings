import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import StudentNavbar from '../../Common/StudentNavbar'
import { supabase } from '../../../utils/supabase'
import type { Student } from '../../../types/database'

type StudentLayoutProps = {
  children: React.ReactNode
  activePath?: string
}

export default function StudentLayout({ children, activePath: _activePath }: StudentLayoutProps) {
  const [studentData, setStudentData] = useState<{ user: Student } | null>(null)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const email = sessionData.session?.user.email ?? localStorage.getItem('cricket_academy_user_email')
        if (!email) return
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
        if (!error && data) {
          const row = data as Record<string, unknown>
          setStudentData({
            user: {
              id: String(row.id),
              email: String(row.email),
              full_name: String(row.full_name ?? 'Student'),
              role: 'student',
              is_active: true,
              created_at: String(row.created_at ?? new Date().toISOString()),
              admission_status: (row.admission_status as Student['admission_status']) ?? 'pending',
              skills: (row.skills as string[]) ?? [],
            },
          })
        } else {
          const stored = localStorage.getItem('cricket_academy_students')
          const arr = stored ? (JSON.parse(stored) as Student[]) : []
          const found = arr.find((s) => s.email === email)
          if (found) setStudentData({ user: found })
        }
      } catch (err) {
        console.error('Failed to fetch student via Supabase:', err)
      }
    }
    fetchStudent()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('cricket_academy_student_token')
    localStorage.removeItem('kings11_student_token')
    localStorage.removeItem('cricket_academy_user_email')
  }

  return (
    <Box sx={{ bgcolor: '#f5f7fb', minHeight: '100vh' }}>
      <StudentNavbar userData={studentData} onLogout={handleLogout} />
      <Box sx={{ pt: '64px', p: { xs: 2, md: 3 } }}>{children}</Box>
    </Box>
  )
}
