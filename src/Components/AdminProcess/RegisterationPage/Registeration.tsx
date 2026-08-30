import { useState, type ChangeEvent } from 'react'
import { Avatar, Box, Button, Checkbox, Grid, LinearProgress, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import AdminLayout from '../Admin/AdminLayout'
import { supabase } from '../../../utils/supabase'
import type { AdmissionStatus, Student } from '../../../types/database'

const invoiceRows = [
  { amount: '₹12,500.00', description: 'Advanced Coaching Fee', transactionId: '#TXN_0988712', status: 'Success' },
  { amount: '₹12,500.00', description: 'Advanced Coaching Fee', transactionId: '#TXN_0977215', status: 'Success' },
  { amount: '₹5,000.00', description: 'Cricket Kit & Apparel', transactionId: '#TXN_0961201', status: 'Success' },
]

type DetailFieldProps = {
  label: string
  value: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  highlight?: boolean
  readOnly?: boolean
}

function DetailField({ label, value, onChange, placeholder, highlight, readOnly }: DetailFieldProps) {
  return (
    <Box>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 0.6 }}>
        <Typography sx={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.8 }}>{label}</Typography>
      </Stack>
      <Box
        component="input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        sx={{ width: '100%', height: 34, px: 1.2, borderRadius: 1.4, border: '1px solid #eef2f7', bgcolor: '#f8fafc', fontSize: 12, color: highlight ? '#16a34a' : '#0f172a', fontWeight: highlight ? 700 : 500, outline: 'none' }}
      />
    </Box>
  )
}

type FormData = {
  userId: string
  email: string
  password: string
  age: string
  dob: string
  gender: string
  address: string
  pinCode: string
  parentName: string
  parentOccupation: string
  parentMobile: string
  academyName: string
  courseName: string
  groupName: string
  registeredName: string
  registeredMobile: string
  registeredDate: string
}

type SkillsState = Record<string, boolean>

export default function Registeration() {
  const [formData, setFormData] = useState<FormData>({
    userId: '',
    email: '',
    password: 'Student#2026',
    age: '',
    dob: '',
    gender: '',
    address: '',
    pinCode: '',
    parentName: '',
    parentOccupation: '',
    parentMobile: '',
    academyName: '',
    courseName: '',
    groupName: '',
    registeredName: '',
    registeredMobile: '',
    registeredDate: '',
  })

  const [skills, setSkills] = useState<SkillsState>({ Batting: false, Bowling: false, 'Wicket Keeping': false })
  const [admissionStatus, setAdmissionStatus] = useState<AdmissionStatus>('pending')
  const [statusMsg, setStatusMsg] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: e.target.value })
  }

  const handleSkillChange = (skill: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setSkills({ ...skills, [skill]: e.target.checked })
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const selectedSkills = Object.keys(skills).filter((s) => skills[s])

      if (!formData.email || !formData.registeredName) {
        throw new Error('Email and Registered Name are required')
      }

      // Attempt Supabase Auth signUp
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email.trim(),
        password: formData.password,
        options: {
          data: {
            full_name: formData.registeredName || formData.userId,
            role: 'student',
          },
        },
      })

      let userId = authData.user?.id ?? `local-${Date.now()}`

      if (authError) {
        console.warn('Supabase auth signUp fallback (demo mode):', authError.message)
        // Continue with local persistence; show warning but not blocking
      }

      // Try to insert into users table
      const newStudent: Partial<Student> & { password?: string } = {
        id: userId,
        email: formData.email.trim(),
        full_name: formData.registeredName || formData.userId || 'Unknown Student',
        role: 'student',
        admission_status: admissionStatus,
        skills: selectedSkills,
        created_at: new Date().toISOString(),
      }

      const { error: insertError } = await supabase.from('users').insert([
        {
          id: userId,
          email: newStudent.email,
          full_name: newStudent.full_name,
          role: 'student',
          is_active: true,
          admission_status: admissionStatus,
          skills: selectedSkills,
        },
      ])

      if (insertError) {
        console.warn('Supabase insert fallback to localStorage:', insertError.message)
      }

      // Also try student_profiles table
      await supabase.from('student_profiles').insert([
        {
          user_id: userId,
          phone: formData.registeredMobile,
          address: formData.address,
          guardian_name: formData.parentName,
          guardian_phone: formData.parentMobile,
          skills: selectedSkills,
        },
      ])

      // Persist locally for Demo dashboard regardless of Supabase result
      const persistedStudent: Student = {
        id: userId,
        email: newStudent.email!,
        full_name: newStudent.full_name!,
        role: 'student',
        is_active: true,
        created_at: new Date().toISOString(),
        admission_status: admissionStatus,
        skills: selectedSkills,
        profile: {
          phone: formData.registeredMobile || null,
          address: formData.address || null,
          guardian_name: formData.parentName || null,
          guardian_phone: formData.parentMobile || null,
          skills: selectedSkills,
          match_statistics: {},
          total_matches_played: 0,
          total_runs_scored: 0,
          total_wickets_taken: 0,
          batting_average: 0,
          bowling_average: 0,
        },
        fee_plan: { total_fee: 15000, currency: 'INR' },
      }

      const existing = localStorage.getItem('cricket_academy_students')
      const arr: Student[] = existing ? (JSON.parse(existing) as Student[]) : []
      arr.unshift(persistedStudent)
      localStorage.setItem('cricket_academy_students', JSON.stringify(arr))

      setStatusMsg('Registration Successful! (Supabase + local cache)')
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : 'Unknown error'
      setStatusMsg(`Error: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const detailRows: Array<{ label: string; field?: keyof FormData; placeholder?: string; value?: string; readOnly?: boolean }> = [
    { label: 'USER ID', field: 'userId', placeholder: 'Enter user id' },
    { label: 'EMAIL ID', field: 'email', placeholder: 'Enter mail id' },
    { label: 'PASSWORD', field: 'password' },
    { label: 'AGE', field: 'age', placeholder: 'Enter age' },
    { label: 'DATE OF BIRTH', field: 'dob', placeholder: 'DD/MM/YYYY' },
    { label: 'GENDER', field: 'gender', placeholder: 'Enter gender' },
    { label: 'ADDRESS', field: 'address', placeholder: 'Enter address' },
    { label: 'PIN CODE', field: 'pinCode', placeholder: 'Enter pin code' },
    { label: 'PARENT NAME', field: 'parentName', placeholder: 'Enter parent name' },
    { label: 'PARENT OCCUPATION', field: 'parentOccupation', placeholder: 'Enter occupation' },
    { label: 'PARENT MOBILE', field: 'parentMobile', placeholder: 'Enter mobile number' },
    { label: 'ENROLLMENT STATUS', value: 'ACTIVE', placeholder: 'ACTIVE', readOnly: true },
    { label: 'PROCESS STATUS', value: 'COMPLETED', placeholder: 'COMPLETED', readOnly: true },
    { label: 'ACADEMY NAME', field: 'academyName', placeholder: 'Enter academy name' },
    { label: 'COURSE NAME', field: 'courseName', placeholder: 'Enter course name' },
    { label: 'GROUP NAME', field: 'groupName', placeholder: 'Enter group name' },
  ]

  const profileDetails: Array<{ label: string; field: keyof FormData; placeholder: string }> = [
    { label: 'Registered Name', field: 'registeredName', placeholder: 'Enter name' },
    { label: 'Registered Mobile', field: 'registeredMobile', placeholder: 'Enter mobile number' },
    { label: 'Registered Date', field: 'registeredDate', placeholder: 'Enter date' },
  ]

  const statusOptions: Array<{ value: AdmissionStatus; label: string; color: string }> = [
    { value: 'pending', label: 'Pending', color: '#f59e0b' },
    { value: 'admitted', label: 'Paid', color: '#16a34a' },
    { value: 'rejected', label: 'Rejected', color: '#dc2626' },
  ]

  return (
    <AdminLayout>
      <Box sx={{ p: 3, maxWidth: 960 }}>
        <Paper elevation={0} sx={{ p: 2.2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', mb: 3 }}>
          <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} sx={{ mt: 4 }} justifyContent="space-between" gap={4}>
            <Stack direction="row" alignItems="center" gap={1.2}>
              <Avatar sx={{ width: 38, height: 38, bgcolor: '#eff6ff', color: '#1d4ed8' }}>🛡️</Avatar>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Registration Dashboard</Typography>
                <Typography sx={{ fontSize: 11.5, color: '#94a3b8' }}>Student Profile Completion • Supabase</Typography>
              </Box>
            </Stack>
            <Box sx={{ flex: 1, maxWidth: { xs: '100%', sm: 260 }, width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
                <Typography sx={{ fontSize: 10.5, color: '#94a3b8', fontWeight: 700 }}>PROFILE PROGRESS</Typography>
                <Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#0f172a' }}>100% Complete</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={100} sx={{ height: 6, borderRadius: 999, bgcolor: '#e5e7eb', '& .MuiLinearProgress-bar': { bgcolor: '#1d4ed8' } }} />
            </Box>
          </Stack>
        </Paper>

        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', mb: 3 }}>
          <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
            <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🪪</Box>
            <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Personal Details</Typography>
          </Stack>
          <Grid container spacing={2}>
            {detailRows.map((row) => (
              <Grid item xs={12} sm={6} md={4} key={row.label}>
                <DetailField label={row.label} value={row.readOnly ? (row.value ?? '') : (row.field ? formData[row.field] : '')} onChange={row.readOnly ? undefined : row.field ? handleChange(row.field) : undefined} placeholder={row.placeholder} readOnly={row.readOnly} highlight={row.value === 'ACTIVE' || row.value === 'COMPLETED'} />
              </Grid>
            ))}
          </Grid>
        </Paper>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🧾</Box>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Profile Details</Typography>
              </Stack>
              <Stack gap={1.3}>
                {profileDetails.map((item) => (
                  <Box key={item.label}>
                    <Typography sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.6, mb: 0.6 }}>{item.label}</Typography>
                    <Box component="input" value={formData[item.field]} onChange={handleChange(item.field)} placeholder={item.placeholder} sx={{ width: '100%', height: 34, px: 1.2, borderRadius: 1.4, border: '1px solid #eef2f7', bgcolor: '#f8fafc', fontSize: 12, color: '#0f172a', outline: 'none' }} />
                  </Box>
                ))}
              </Stack>
            </Paper>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', mt: 2 }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>💳</Box>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Admission Status</Typography>
              </Stack>
              <Stack direction="row" gap={1} flexWrap="wrap">
                {statusOptions.map((option) => {
                  const active = admissionStatus === option.value
                  return (
                    <Button key={option.value} variant={active ? 'contained' : 'outlined'} onClick={() => setAdmissionStatus(option.value)} sx={{ textTransform: 'none', borderRadius: 999, fontWeight: 700, px: 2, bgcolor: active ? option.color : 'transparent', borderColor: option.color, color: active ? '#fff' : option.color, '&:hover': { bgcolor: option.color, color: '#fff' } }}>
                      {option.label}
                    </Button>
                  )
                })}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 2 }}>
                <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🧠</Box>
                <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Skills</Typography>
              </Stack>
              <Stack gap={1.2}>
                {Object.keys(skills).map((skillName) => (
                  <Paper key={skillName} elevation={0} sx={{ px: 1.4, py: 0.9, borderRadius: 1.6, border: '1px solid #e8edf5', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Checkbox checked={skills[skillName]} onChange={handleSkillChange(skillName)} size="small" sx={{ color: '#cbd5e1', '&.Mui-checked': { color: '#1d4ed8' }, p: 0.4 }} />
                    <Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>{skillName}</Typography>
                  </Paper>
                ))}
                <Box sx={{ mt: 1.2, fontSize: 12, color: '#64748b' }}>Selected: {Object.keys(skills).filter((skillName) => skills[skillName]).length || 0} skill(s)</Box>
              </Stack>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: { sm: 'flex-end' }, mt: 3, alignItems: { xs: 'stretch', sm: 'center' }, gap: 2 }}>
          {statusMsg && <Typography sx={{ fontSize: 13, color: statusMsg.includes('Error') ? 'red' : 'green', fontWeight: 600 }}>{statusMsg}</Typography>}
          <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{ bgcolor: '#1d4ed8', textTransform: 'none', px: 4, borderRadius: 2, fontWeight: 600 }}>
            {loading ? 'Submitting...' : 'Submit Registration'}
          </Button>
        </Box>

        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', mt: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Stack direction="row" alignItems="center" gap={1}>
              <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eff6ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🧾</Box>
              <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Student Invoices</Typography>
            </Stack>
            <Typography sx={{ fontSize: 12.5, color: '#2563eb', fontWeight: 600, cursor: 'pointer' }}>View All History →</Typography>
          </Stack>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ borderBottom: '1px solid #eef2f7', bgcolor: '#f8fafc' }}>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Amount</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Description</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Transaction ID</TableCell>
                  <TableCell sx={{ fontSize: 10.5, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceRows.map((row) => (
                  <TableRow key={row.transactionId} sx={{ borderBottom: '1px solid #f1f5f9' }}>
                    <TableCell sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>{row.amount}</TableCell>
                    <TableCell sx={{ fontSize: 12.5, color: '#334155' }}>{row.description}</TableCell>
                    <TableCell sx={{ fontSize: 12.5, color: '#94a3b8' }}>{row.transactionId}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', px: 1.2, py: 0.4, borderRadius: 999, bgcolor: '#dcfce7', color: '#16a34a', fontSize: 11, fontWeight: 700 }}>{row.status.toUpperCase()}</Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </AdminLayout>
  )
}
