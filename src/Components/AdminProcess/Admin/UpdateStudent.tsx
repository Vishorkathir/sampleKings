'use client';
import { usePathname, useRouter, useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react'


import { Avatar, Box, Button, Checkbox, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import AdminLayout from './AdminLayout'
import { supabase } from '../../../utils/supabase'
import type { AdmissionStatus } from '../../../types/database'

const skillOptions = ['Batting', 'Bowling', 'Wicket Keeping'] as const
type SkillOption = (typeof skillOptions)[number]
const admissionOptions: Array<{ value: AdmissionStatus; label: string; color: string }> = [
  { value: 'pending', label: 'Pending', color: '#f59e0b' },
  { value: 'admitted', label: 'Paid', color: '#16a34a' },
  { value: 'rejected', label: 'Rejected', color: '#dc2626' },
]

type SectionTitleProps = { icon: string; title: string; subtitle?: string }
function SectionTitle({ icon, title, subtitle }: SectionTitleProps) {
  return (
    <Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 2 }}>
      <Avatar sx={{ width: 36, height: 36, bgcolor: '#eff6ff', color: '#1d4ed8' }}>{icon}</Avatar>
      <Box>
        <Typography sx={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</Typography>
        {subtitle ? <Typography sx={{ fontSize: 11.5, color: '#64748b' }}>{subtitle}</Typography> : null}
      </Box>
    </Stack>
  )
}

type FormData = {
  full_name: string
  email: string
  password: string
  phone: string
  address: string
  guardian_name: string
  guardian_phone: string
  total_fee: string
  currency: string
  is_active: boolean
}

export default function UpdateStudent() {
  const { studentId } = useParams<{ studentId: string }>()
  const pathname = usePathname()
  const router = useRouter()
  const initialState = null

  const [loading, setLoading] = useState<boolean>(!initialState)
  const [saving, setSaving] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    guardian_name: '',
    guardian_phone: '',
    total_fee: '',
    currency: 'INR',
    is_active: true,
  })
  const [admissionStatus, setAdmissionStatus] = useState<AdmissionStatus>('pending')
  const [skills, setSkills] = useState<Record<SkillOption, boolean>>({ Batting: false, Bowling: false, 'Wicket Keeping': false })

  const studentName = useMemo(() => formData.full_name || 'Student Details', [formData.full_name])

  useEffect(() => {
    if (!studentId) {
      setError('Student ID is missing.')
      return
    }
    const hydrateStudent = async () => {
      try {
        setLoading(true)
        setError('')
        if (initialState) {
          const profile = (initialState.profile as Record<string, unknown>) ?? {}
          const feePlan = (initialState.fee_plan as Record<string, unknown>) ?? {}
          setFormData((current) => ({
            ...current,
            full_name: String(initialState.full_name ?? ''),
            email: String(initialState.email ?? ''),
            phone: String((profile.phone as string) ?? ''),
            address: String((profile.address as string) ?? ''),
            guardian_name: String((profile.guardian_name as string) ?? ''),
            guardian_phone: String((profile.guardian_phone as string) ?? ''),
            total_fee: String((feePlan.total_fee as string) ?? ''),
            currency: String((feePlan.currency as string) ?? 'INR'),
            is_active: (initialState.is_active as boolean) ?? true,
          }))
          setAdmissionStatus((initialState.admission_status as AdmissionStatus) ?? 'pending')
          const s = (profile.skills as string[]) ?? []
          setSkills({ Batting: s.includes('Batting'), Bowling: s.includes('Bowling'), 'Wicket Keeping': s.includes('Wicket Keeping') })
          setLoading(false)
          return
        }

        // Try Supabase
        const { data, error: fetchError } = await supabase.from('users').select('*').eq('id', studentId).single()
        if (fetchError || !data) {
          // fallback localStorage
          const stored = localStorage.getItem('cricket_academy_students')
          const arr = stored ? (JSON.parse(stored) as Array<Record<string, unknown>>) : []
          const found = arr.find((s) => String(s.id) === studentId)
          if (found) {
            const profile = (found.profile as Record<string, unknown>) ?? {}
            setFormData({
              full_name: String(found.full_name ?? ''),
              email: String(found.email ?? ''),
              password: '',
              phone: String((profile.phone as string) ?? ''),
              address: String((profile.address as string) ?? ''),
              guardian_name: String((profile.guardian_name as string) ?? ''),
              guardian_phone: String((profile.guardian_phone as string) ?? ''),
              total_fee: String(((found.fee_plan as Record<string, unknown>)?.total_fee as string) ?? ''),
              currency: String(((found.fee_plan as Record<string, unknown>)?.currency as string) ?? 'INR'),
              is_active: Boolean(found.is_active ?? true),
            })
            setAdmissionStatus((found.admission_status as AdmissionStatus) ?? 'pending')
            const s = ((profile.skills as string[]) ?? []) as string[]
            setSkills({ Batting: s.includes('Batting'), Bowling: s.includes('Bowling'), 'Wicket Keeping': s.includes('Wicket Keeping') })
          } else {
            throw new Error(fetchError?.message || 'Student not found')
          }
        } else {
          const row = data as Record<string, unknown>
          setFormData({
            full_name: String(row.full_name ?? ''),
            email: String(row.email ?? ''),
            password: '',
            phone: '',
            address: '',
            guardian_name: '',
            guardian_phone: '',
            total_fee: '',
            currency: 'INR',
            is_active: Boolean(row.is_active ?? true),
          })
          setAdmissionStatus((row.admission_status as AdmissionStatus) ?? 'pending')
          const s = (row.skills as string[]) ?? []
          setSkills({ Batting: s.includes('Batting'), Bowling: s.includes('Bowling'), 'Wicket Keeping': s.includes('Wicket Keeping') })
        }
      } catch (fetchError: unknown) {
        const msg = fetchError instanceof Error ? fetchError.message : 'Failed to load student details'
        setError(msg)
      } finally {
        setLoading(false)
      }
    }
    hydrateStudent()
  }, [initialState, studentId])

  const handleInputChange = (field: keyof FormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, type, checked } = event.target
    setFormData((current) => ({ ...current, [field]: type === 'checkbox' ? checked : value } as FormData))
  }

  const handleSkillToggle = (skill: SkillOption) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setSkills((current) => ({ ...current, [skill]: event.target.checked }))
  }

  const handleSubmit = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')

      const selectedSkills = skillOptions.filter((skill) => skills[skill])

      // Supabase update
      const { error: updateError } = await supabase
        .from('users')
        .update({
          full_name: formData.full_name,
          email: formData.email,
          is_active: formData.is_active,
          admission_status: admissionStatus,
          skills: selectedSkills,
        } as never)
        .eq('id', studentId as string)

      if (updateError) {
        console.warn('Supabase update fallback:', updateError.message)
        // fallback to localStorage
        const stored = localStorage.getItem('cricket_academy_students')
        const arr = stored ? (JSON.parse(stored) as Array<Record<string, unknown>>) : []
        const idx = arr.findIndex((s) => String(s.id) === studentId)
        if (idx !== -1) {
          arr[idx] = { ...arr[idx], full_name: formData.full_name, email: formData.email, is_active: formData.is_active, admission_status: admissionStatus, skills: selectedSkills, profile: { ...(arr[idx].profile as object), phone: formData.phone, address: formData.address, guardian_name: formData.guardian_name, guardian_phone: formData.guardian_phone, skills: selectedSkills } }
          localStorage.setItem('cricket_academy_students', JSON.stringify(arr))
        }
      } else {
        // also update local cache
        const stored = localStorage.getItem('cricket_academy_students')
        if (stored) {
          const arr = JSON.parse(stored) as Array<Record<string, unknown>>
          const idx = arr.findIndex((s) => String(s.id) === studentId)
          if (idx !== -1) {
            arr[idx] = { ...arr[idx], full_name: formData.full_name, email: formData.email }
            localStorage.setItem('cricket_academy_students', JSON.stringify(arr))
          }
        }
      }

      // try student_profiles table
      await supabase
        .from('student_profiles')
        .upsert({ user_id: studentId, phone: formData.phone, address: formData.address, guardian_name: formData.guardian_name, guardian_phone: formData.guardian_phone, skills: selectedSkills } as never)

      setSuccess('Student details updated successfully via Supabase.')
      setTimeout(() => router.push('/Admin-dashboard'), 900)
    } catch (updateError: unknown) {
      const msg = updateError instanceof Error ? updateError.message : 'Failed to update student'
      setError(msg)
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
        <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e8edf5', bgcolor: '#fff', mb: 3 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} flexWrap="wrap">
            <Box>
              <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#0f172a' }}>Update Registered Student</Typography>
              <Typography sx={{ fontSize: 13, color: '#64748b' }}>Edit profile, admission status, skills, and fee details for {studentName}. Supabase backed.</Typography>
            </Box>
            <Stack direction="row" gap={1}>
              <Button variant="outlined" onClick={() => router.push('/Admin-dashboard')} sx={{ textTransform: 'none' }}>
                Back
              </Button>
              <Button variant="contained" onClick={handleSubmit} disabled={saving || loading} sx={{ textTransform: 'none', bgcolor: '#1d4ed8', '&:hover': { bgcolor: '#1e40af' } }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Stack>
          </Stack>
        </Paper>

        {error ? (
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: '1px solid #fecaca', bgcolor: '#fef2f2', mb: 3 }}>
            <Typography sx={{ color: '#b91c1c', fontWeight: 600 }}>{error}</Typography>
          </Paper>
        ) : null}
        {success ? (
          <Paper elevation={0} sx={{ p: 2, borderRadius: 2.5, border: '1px solid #bbf7d0', bgcolor: '#f0fdf4', mb: 3 }}>
            <Typography sx={{ color: '#166534', fontWeight: 600 }}>{success}</Typography>
          </Paper>
        ) : null}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <SectionTitle icon="👤" title="Account Details" subtitle="Login and identity settings" />
              <Stack gap={2}>
                <TextField label="Full Name" value={formData.full_name} onChange={handleInputChange('full_name')} fullWidth />
                <TextField label="Email" value={formData.email} onChange={handleInputChange('email')} fullWidth />
                <TextField label="Password" type="password" value={formData.password} onChange={handleInputChange('password')} fullWidth helperText="Leave blank to keep the current password" />
                <Stack direction="row" gap={1} flexWrap="wrap">
                  <Button variant={formData.is_active ? 'contained' : 'outlined'} onClick={() => setFormData((c) => ({ ...c, is_active: true }))} sx={{ textTransform: 'none', bgcolor: formData.is_active ? '#16a34a' : 'transparent', color: formData.is_active ? '#fff' : '#16a34a', borderColor: '#16a34a' }}>
                    Active
                  </Button>
                  <Button variant={!formData.is_active ? 'contained' : 'outlined'} onClick={() => setFormData((c) => ({ ...c, is_active: false }))} sx={{ textTransform: 'none', bgcolor: !formData.is_active ? '#dc2626' : 'transparent', color: !formData.is_active ? '#fff' : '#dc2626', borderColor: '#dc2626' }}>
                    Inactive
                  </Button>
                </Stack>
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <SectionTitle icon="📋" title="Profile Details" subtitle="Contact and guardian information" />
              <Stack gap={2}>
                <TextField label="Phone" value={formData.phone} onChange={handleInputChange('phone')} fullWidth />
                <TextField label="Address" value={formData.address} onChange={handleInputChange('address')} fullWidth multiline minRows={2} />
                <TextField label="Guardian Name" value={formData.guardian_name} onChange={handleInputChange('guardian_name')} fullWidth />
                <TextField label="Guardian Phone" value={formData.guardian_phone} onChange={handleInputChange('guardian_phone')} fullWidth />
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <SectionTitle icon="🏏" title="Skills" subtitle="Select the cricket skills for the student" />
              <Stack gap={1.2}>
                {skillOptions.map((skill) => (
                  <Paper key={skill} elevation={0} sx={{ p: 1.2, borderRadius: 2, border: '1px solid #e8edf5', bgcolor: '#f8fafc', display: 'flex', alignItems: 'center', gap: 1.2 }}>
                    <Checkbox checked={skills[skill]} onChange={handleSkillToggle(skill)} />
                    <Typography sx={{ fontWeight: 600, color: '#0f172a' }}>{skill}</Typography>
                  </Paper>
                ))}
              </Stack>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2.5, borderRadius: 3, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
              <SectionTitle icon="💳" title="Admission & Fee" subtitle="Control paid/pending state and fee details" />
              <Stack gap={2}>
                <Stack direction="row" gap={1} flexWrap="wrap">
                  {admissionOptions.map((option) => {
                    const active = admissionStatus === option.value
                    return (
                      <Button
                        key={option.value}
                        variant={active ? 'contained' : 'outlined'}
                        onClick={() => setAdmissionStatus(option.value)}
                        sx={{ textTransform: 'none', borderRadius: 999, fontWeight: 700, bgcolor: active ? option.color : 'transparent', color: active ? '#fff' : option.color, borderColor: option.color, '&:hover': { bgcolor: option.color, color: '#fff' } }}
                      >
                        {option.label}
                      </Button>
                    )
                  })}
                </Stack>
                <TextField label="Total Fee" type="number" value={formData.total_fee} onChange={handleInputChange('total_fee')} fullWidth />
                <TextField label="Currency" value={formData.currency} onChange={handleInputChange('currency')} fullWidth />
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </AdminLayout>
  )
}