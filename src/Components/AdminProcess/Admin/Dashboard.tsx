'use client';
import React, { useEffect, useMemo, useState, useCallback } from 'react'
import { Avatar, Box, Button, Chip, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useRouter } from 'next/navigation';


import AdminLayout from './AdminLayout'
import Boardcast from '../AdminPage/boardcast'
import { supabase } from '../../../utils/supabase'
import type { Student, AdmissionStatus } from '../../../types/database'

type Metric = {
  icon: string
  label: string
  value: string
  delta?: string
  badge?: string
  color: string
}

const METRICS: Metric[] = [
  { icon: '👥', label: 'Total Students', value: '0', delta: '+12%', color: '#3b82f6' },
  { icon: '🏏', label: 'Matches Today', value: '8', delta: '', color: '#22c55e' },
  { icon: '✅', label: 'Active Status', value: '83', badge: 'Active', color: '#f59e0b' },
  { icon: '💰', label: 'Total Payment', value: '12', delta: '', color: '#ef4444' },
]

type MetricCardProps = Metric

const MetricCard = React.memo(function MetricCard({ icon, label, value, delta, badge, color }: MetricCardProps) {
  return (
    <Paper elevation={0} sx={{ p: 1.8, borderRadius: '12px', border: '1px solid var(--border)', bgcolor: 'var(--paper)', minHeight: 110 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.2 }}>
        <Box sx={{ width: 38, height: 38, borderRadius: '10px', bgcolor: 'var(--surface)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', fontSize: 18, color }}>{icon}</Box>
        {delta && <Chip label={delta} size="small" sx={{ bgcolor: 'oklch(0.96 0.05 145)', color: 'oklch(0.42 0.13 145)', fontWeight: 700, fontSize: 11, border: '1px solid oklch(0.90 0.04 145)' }} />}
        {badge && <Chip label={badge} size="small" sx={{ bgcolor: 'oklch(0.96 0.05 145)', color: 'oklch(0.42 0.13 145)', fontWeight: 700, fontSize: 11, border: '1px solid oklch(0.90 0.04 145)' }} />}
      </Stack>
      <Typography sx={{ fontSize: 12, color: 'var(--muted)', fontWeight: 600, mb: 0.4 }}>{label}</Typography>
      <Typography sx={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{value}</Typography>
    </Paper>
  )
})

export default function Dashboard() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [loadingStudents, setLoadingStudents] = useState<boolean>(true)
  const [studentError, setStudentError] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const fetchStudents = useCallback(async () => {
    try {
      setLoadingStudents(true)
      setStudentError('')

      // Check Supabase session (optional)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      // allow demo if no session but local mock token exists
      const hasMockToken = !!localStorage.getItem('cricket_academy_admin_token') || !!localStorage.getItem('kings11_admin_token')
      if (!session && !hasMockToken) {
        // not blocking: continue to try fetch, but warn if needed
      }

      // Try Supabase: users table
      const { data, error } = await supabase.from('users').select('*').eq('role', 'student').order('created_at', { ascending: false })

      if (error) {
        // Fallback: try todos example + mock students
        const { data: todos, error: todoError } = await supabase.from('todos').select('*')
        if (!todoError && todos) {
          console.debug('Todos example fetch succeeded', todos)
        }
        // Provide mock data if users table not available
        const mock: Student[] = [
          {
            id: '1',
            email: 'arjun@cricket-academy.com',
            full_name: 'Arjun Sharma',
            role: 'student',
            is_active: true,
            created_at: new Date().toISOString(),
            admission_status: 'admitted',
            skills: ['Batting', 'Bowling'],
            profile: { phone: '9876543210', address: 'Chennai', guardian_name: 'Ravi Sharma', guardian_phone: '9876543211', skills: ['Batting'], match_statistics: {}, total_matches_played: 12, total_runs_scored: 340, total_wickets_taken: 8, batting_average: 28.3, bowling_average: 22.1 },
          },
          {
            id: '2',
            email: 'priya@cricket-academy.com',
            full_name: 'Priya Singh',
            role: 'student',
            is_active: true,
            created_at: new Date(Date.now() - 86400000).toISOString(),
            admission_status: 'pending',
            skills: ['Wicket Keeping'],
          },
        ]
        // Also try to load from localStorage persisted registrations
        const stored = localStorage.getItem('cricket_academy_students')
        let persisted: Student[] = []
        if (stored) {
          try {
            persisted = JSON.parse(stored) as Student[]
          } catch {
            persisted = []
          }
        }
        const combined = [...persisted, ...mock]
        setStudents(combined)
        if (error.message.includes('does not exist') || error.code === '42P01') {
          setStudentError('')
        } else {
          // show demo note but not hard error
          console.warn('Supabase users fetch fallback', error.message)
        }
        return
      }

      // Map supabase rows to Student type (handle snake_case vs camelCase)
      const mapped: Student[] = (data ?? []).map((row: Record<string, unknown>) => ({
        id: String(row.id ?? ''),
        email: String(row.email ?? ''),
        full_name: String((row.full_name as string) ?? (row.fullName as string) ?? ''),
        role: (row.role as Student['role']) ?? 'student',
        is_active: Boolean(row.is_active ?? true),
        created_at: String(row.created_at ?? new Date().toISOString()),
        admission_status: (row.admission_status as AdmissionStatus) ?? 'pending',
        skills: Array.isArray(row.skills) ? (row.skills as string[]) : [],
        profile: (row.profile as Student['profile']) ?? null,
      }))

      // Merge with local persisted
      const stored = localStorage.getItem('cricket_academy_students')
      let persisted: Student[] = []
      if (stored) {
        try {
          persisted = JSON.parse(stored) as Student[]
        } catch {
          persisted = []
        }
      }
      setStudents([...persisted, ...mapped])
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load students'
      if (msg.includes('AbortError')) {
        setStudentError('Request timeout. Please try again.')
      } else {
        setStudentError(msg)
      }
      // Fallback empty already set
    } finally {
      setLoadingStudents(false)
    }
  }, [])

  useEffect(() => {
    fetchStudents()
  }, [fetchStudents])

  const filteredStudents = useMemo<Student[]>(() => {
    const query = search.trim().toLowerCase()
    if (!query) return students
    return students.filter((student) => {
      const name = (student.full_name || '').toLowerCase()
      const email = (student.email || '').toLowerCase()
      return name.includes(query) || email.includes(query)
    })
  }, [students, search])

  const metricsWithStudents = useMemo<Metric[]>(() => METRICS.map((item) => (item.label === 'Total Students' ? { ...item, value: String(students.length) } : item)), [students])

  const getInitials = useCallback((name: string): string => {
    if (!name) return 'ST'
    return name
      .split(' ')
      .filter(Boolean)
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [])

  const formatDateTime = useCallback((isoDate: string | undefined): string => {
    if (!isoDate) return '-'
    const date = new Date(isoDate)
    if (Number.isNaN(date.getTime())) return '-'
    return date.toLocaleString()
  }, [])

  const formatSkills = useCallback((skills: string[] | undefined): string => {
    if (!Array.isArray(skills) || skills.length === 0) return '—'
    return skills.join(', ')
  }, [])

  const admissionStatusColor = useCallback((status: AdmissionStatus | undefined) => {
    if (status === 'admitted') return { bgcolor: '#dcfce7', color: '#166534' }
    if (status === 'rejected') return { bgcolor: '#fee2e2', color: '#b91c1c' }
    return { bgcolor: '#fef3c7', color: '#b45309' }
  }, [])

  return (
    <AdminLayout>
      <Box>
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" margin={2} alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.5} sx={{ mt: 8 }}>
          <Box>
            <Typography sx={{ fontSize: { xs: 22, md: 28 }, fontWeight: 700, color: '#0f172a' }}>Dashboard Overview</Typography>
            <Typography sx={{ fontSize: 13, color: '#64748b' }}>Welcome back, Academy Admin. Supabase connected • {students.length} students</Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => router.push('/registration')}
            sx={{ bgcolor: 'var(--primary)', color: '#fff', textTransform: 'none', fontSize: 12.5, fontWeight: 600, py: 0.9, px: 2.2, borderRadius: '10px', '&:hover': { bgcolor: 'var(--primary-hover)' }, alignSelf: { xs: 'flex-start', sm: 'auto' } }}
          >
            + New Registration
          </Button>
        </Stack>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          {metricsWithStudents.map((item) => (
            <Grid item xs={12} sm={6} lg={3} key={item.label}>
              <MetricCard {...item} />
            </Grid>
          ))}
        </Grid>

        <Paper elevation={0} sx={{ p: 2.5, borderRadius: '12px', border: '1px solid var(--border)', bgcolor: 'var(--paper)' }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Student Details</Typography>
            <Typography sx={{ fontSize: 12.5, color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>{filteredStudents.length} records</Typography>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.5} sx={{ mb: 2 }}>
            <Box
              component="input"
              type="text"
              placeholder="Search roster..."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              sx={{ px: 2, py: 0.8, borderRadius: 1.5, border: '1px solid var(--border)', fontSize: 12, color: 'var(--muted)', width: { xs: '100%', sm: 220 }, bgcolor: 'var(--surface)' }}
            />
            <Chip
              label="+ Register"
              onClick={() => router.push('/registration')}
              sx={{ bgcolor: '#f9b90e', color: '#7b4e00', fontWeight: 700, cursor: 'pointer', px: 1.2, alignSelf: { xs: 'flex-start', sm: 'auto' } }}
            />
          </Stack>

          <TableContainer sx={{ overflowX: 'auto' }}>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #e8edf5', bgcolor: 'var(--surface)' }}>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Student Name</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Email</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Role</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Admission Status</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Skills</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Actions</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', py: 1.2 }}>Created At</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loadingStudents && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 3, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
                      Loading students via Supabase...
                    </TableCell>
                  </TableRow>
                )}
                {!loadingStudents && studentError && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 3, textAlign: 'center' }}>
                      <Typography sx={{ fontSize: 13, color: '#dc2626', fontWeight: 600 }}>{studentError}</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {!loadingStudents && !studentError && filteredStudents.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} sx={{ py: 3, textAlign: 'center', fontSize: 13, color: '#64748b' }}>
                      No students found.
                    </TableCell>
                  </TableRow>
                )}
                {!loadingStudents &&
                  !studentError &&
                  filteredStudents.map((student) => (
                    <TableRow key={student.id} sx={{ borderBottom: '1px solid var(--border)' }}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" gap={1.2}>
                          <Avatar sx={{ width: 28, height: 28, bgcolor: '#dbeafe', color: '#1d4ed8', fontSize: 10.5, fontWeight: 700 }}>{getInitials(student.full_name)}</Avatar>
                          <Typography sx={{ fontSize: 12.5, color: '#0f172a', fontWeight: 600 }}>{student.full_name}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ fontSize: 12.5, color: '#334155' }}>{student.email}</TableCell>
                      <TableCell sx={{ fontSize: 12.5, color: '#334155', textTransform: 'capitalize' }}>{student.role}</TableCell>
                      <TableCell>
                        <Chip label={(student.admission_status || 'pending').toUpperCase()} size="small" sx={{ ...admissionStatusColor(student.admission_status), fontWeight: 700, fontSize: 11 }} />
                      </TableCell>
                      <TableCell sx={{ fontSize: 12.5, color: '#334155' }}>{formatSkills(student.skills)}</TableCell>
                      <TableCell>
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => router.push(`/Admin-dashboard/edit-student/${student.id}`)}
                          sx={{ textTransform: 'none', borderColor: '#1d4ed8', color: '#1d4ed8', fontWeight: 700 }}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell sx={{ fontSize: 12.5, color: '#64748b' }}>{formatDateTime(student.created_at)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Box sx={{ mt: 3, maxWidth: 420 }}>
          <Boardcast />
        </Box>
      </Box>
    </AdminLayout>
  )
}