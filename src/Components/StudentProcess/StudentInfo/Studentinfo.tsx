'use client';
// @ts-nocheck
import { Avatar, Box, Button, Chip, Divider, IconButton, Paper, Stack, Typography, CircularProgress, Alert } from '@mui/material'
import { useEffect, useState } from 'react'
import StudentLayout from '../StudentDashboard/StudentLayout'
import { supabase } from '../../../utils/supabase'

const sideMenu = [
  { label: 'Dashboard', icon: '📊' },
  { label: 'Student Activities', icon: '👥' },
  { label: 'Match Information', icon: '🏏' },
  { label: 'Media Upload', icon: '📤' },
  { label: 'Shop Information', icon: '🛒' },
  { label: 'Settings', icon: '⚙️', active: true },
]
const battingStats = [
  { label: 'Runs', key: 'runs' },
  { label: 'Average', key: 'average' },
  { label: 'SR', key: 'strike_rate' },
  { label: 'Highest', key: 'highest_score' },
]
const bowlingStats = [
  { label: 'Wickets', key: 'wickets' },
  { label: 'Economy', key: 'economy' },
  { label: 'Best Figures', key: 'best_figures' },
]

export default function Studentinfo() {
  const [studentData, setStudentData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true)
        const { data: sessionData } = await supabase.auth.getSession()
        const email = sessionData.session?.user.email ?? localStorage.getItem('cricket_academy_user_email')
        if (!email) {
          setError('No authentication found. Please log in.')
          setLoading(false)
          return
        }
        const { data, error: sbError } = await supabase.from('users').select('*').eq('email', email).single()
        if (sbError || !data) {
          const stored = localStorage.getItem('cricket_academy_students')
          const arr = stored ? JSON.parse(stored) : []
          const found = arr.find((s) => s.email === email)
          if (found) {
            setStudentData({ user: found, profile: found.profile })
            setError('')
          } else {
            throw new Error(sbError?.message || 'Student not found in Supabase')
          }
        } else {
          setStudentData({ user: data, profile: data.profile ?? {} })
          setError('')
        }
      } catch (err) {
        console.error('Error fetching student via Supabase:', err)
        setError(err.message || 'Failed to load student details')
      } finally {
        setLoading(false)
      }
    }
    fetchStudentData()
  }, [])

  if (loading) {
    return (
      <StudentLayout activePath="/student-info">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Stack alignItems="center" gap={2}>
            <CircularProgress />
            <Typography sx={{ color: '#94a3b8' }}>Loading student details via Supabase...</Typography>
          </Stack>
        </Box>
      </StudentLayout>
    )
  }
  if (error) {
    return (
      <StudentLayout activePath="/student-info">
        <Box sx={{ p: 3 }}>
          <Alert severity="error" sx={{ borderRadius: 2 }}>
            {error}
          </Alert>
        </Box>
      </StudentLayout>
    )
  }

  const student = studentData?.user || studentData || {}
  const profile = studentData?.profile || {}
  const batting = profile?.batting_stats || {}
  const bowling = profile?.bowling_stats || {}

  return (
    <StudentLayout activePath="/student-info">
      <Box sx={{ flex: 1, p: 3 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }} />
        <Paper elevation={0} sx={{ p: 2.4, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', animation: 'fadeUp 0.5s ease both' }}>
          <Stack direction={{ xs: 'column', md: 'row' }} alignItems={{ xs: 'flex-start', md: 'center' }} justifyContent="space-between" gap={2}>
            <Stack direction="row" gap={2} alignItems="center">
              <Avatar src={student?.profile_picture || student?.avatar || `https://i.pravatar.cc/120?img=32`} sx={{ width: 64, height: 64 }} />
              <Box>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{student?.full_name || 'Student Name'}</Typography>
                <Typography sx={{ fontSize: 11.5, color: '#64748b', mt: 0.2 }}>Registration: {profile?.registration_number || student?.id || 'N/A'}</Typography>
                <Stack direction="row" gap={1} sx={{ mt: 0.6 }}>
                  <Chip label={profile?.academy_name || 'Cricket Academy'} size="small" sx={{ bgcolor: '#f8fafc', color: '#64748b', fontSize: 10.5 }} />
                  <Chip label={profile?.join_date ? `Joined ${new Date(profile.join_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : 'Join Date N/A'} size="small" sx={{ bgcolor: '#f8fafc', color: '#64748b', fontSize: 10.5 }} />
                </Stack>
              </Box>
            </Stack>
            <Stack direction="row" gap={1.2}>
              <Button variant="contained" sx={{ bgcolor: '#0b5aa0', textTransform: 'none', fontSize: 12, fontWeight: 600, borderRadius: 2, px: 2.2, transition: 'transform 0.2s ease', '&:hover': { bgcolor: '#0a4b86', transform: 'translateY(-2px)' } }}>
                Message Coach
              </Button>
              <Button variant="outlined" sx={{ borderColor: '#e8edf5', textTransform: 'none', fontSize: 12, fontWeight: 600, borderRadius: 2, px: 2.2, '&:hover': { borderColor: '#1d4ed8', color: '#1d4ed8' } }}>
                Download CV
              </Button>
            </Stack>
          </Stack>
        </Paper>

        <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mt: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Paper elevation={0} sx={{ p: 2.2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', animation: 'fadeUp 0.6s ease both' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.6 }}>
                <Stack direction="row" alignItems="center" gap={1}>
                  <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eaf1ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🏏</Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Batting Career</Typography>
                </Stack>
                <Chip label="Season 2023-24" size="small" sx={{ bgcolor: '#f8fafc', color: '#64748b', fontSize: 10.5 }} />
              </Stack>
              <Stack direction="row" spacing={1.4} sx={{ mb: 1.6 }}>
                {battingStats.map((stat) => (
                  <Paper key={stat.label} elevation={0} sx={{ px: 1.6, py: 1.2, borderRadius: 2, border: '1px solid #eef2f7', textAlign: 'center', minWidth: 86, transition: 'transform 0.2s ease, box-shadow 0.2s ease', '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 20px rgba(15,23,42,0.08)' } }}>
                    <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>{stat.label}</Typography>
                    <Typography sx={{ fontSize: 14.5, fontWeight: 700, color: '#0f172a' }}>{batting[stat.key] || '—'}</Typography>
                  </Paper>
                ))}
              </Stack>
              <Divider sx={{ mb: 1.4 }} />
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography sx={{ fontSize: 11.5, color: '#94a3b8' }}>Form Trend</Typography>
                <Stack direction="row" gap={1}>
                  {['100%', '94', '90', '98'].map((value, idx) => (
                    <Chip key={`${value}-${idx}`} label={value} size="small" sx={{ bgcolor: '#eaf1ff', color: '#1d4ed8', fontWeight: 700, fontSize: 10.5 }} />
                  ))}
                </Stack>
              </Stack>
            </Paper>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ mt: 2 }}>
              <Paper elevation={0} sx={{ flex: 1, p: 2.2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.6 }}>
                  <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eaf1ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>🎯</Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Bowling</Typography>
                </Stack>
                <Stack spacing={1.2}>
                  {bowlingStats.map((item) => (
                    <Box key={item.label}>
                      <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>{item.label}</Typography>
                      <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>{bowling[item.key] || '—'}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Paper>

              <Paper elevation={0} sx={{ flex: 1, p: 2.2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff' }}>
                <Stack direction="row" alignItems="center" gap={1} sx={{ mb: 1.6 }}>
                  <Box sx={{ width: 26, height: 26, borderRadius: 1.4, bgcolor: '#eaf1ff', color: '#1d4ed8', display: 'grid', placeItems: 'center' }}>📇</Box>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Contact & Personal Info</Typography>
                </Stack>
                <Stack spacing={1.2}>
                  <Box>
                    <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>Email Address</Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#0f172a', fontWeight: 600 }}>{student?.email || 'N/A'}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>Phone Number</Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#0f172a', fontWeight: 600 }}>{profile?.phone_number || student?.phone || 'N/A'}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>Batch / Role</Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#0f172a', fontWeight: 600 }}>{profile?.batch_name || profile?.role || 'N/A'}</Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ fontSize: 10.5, color: '#94a3b8', textTransform: 'uppercase' }}>Coach Notes</Typography>
                    <Typography sx={{ fontSize: 12.5, color: '#0f172a', fontWeight: 600 }}>{profile?.coach_notes || 'No notes available'}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>
          </Box>

          <Box sx={{ width: { xs: '100%', lg: 320 } }}>
            <Paper elevation={0} sx={{ p: 2.2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#0b5aa0', color: '#fff', animation: 'fadeUp 0.7s ease both', position: 'relative', overflow: 'hidden' }}>
              <Box sx={{ position: 'absolute', right: -12, top: -10, width: 120, height: 120, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.12)' }} />
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, textTransform: 'uppercase', mb: 1.2 }}>Player of the Month</Typography>
              <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}>Reward for outstanding performance in domestic entry competitions.</Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, mt: 2 }}>AUG 2024</Typography>
              <Button variant="contained" sx={{ mt: 2, bgcolor: '#f9b90e', color: '#7b4e00', textTransform: 'none', fontWeight: 700, borderRadius: 2, '&:hover': { bgcolor: '#f1b000' } }}>
                Elite Pro
              </Button>
            </Paper>
            <Paper elevation={0} sx={{ p: 2.2, mt: 2, borderRadius: 2.5, border: '1px solid #e8edf5', bgcolor: '#fff', animation: 'fadeUp 0.8s ease both' }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>Performance Trajectory</Typography>
                <Chip label="1 Year" size="small" sx={{ bgcolor: '#eaf1ff', color: '#1d4ed8', fontWeight: 700, fontSize: 10.5 }} />
              </Stack>
              <Box sx={{ height: 120, borderRadius: 2, bgcolor: '#f8fafc', border: '1px dashed #e2e8f0', display: 'grid', placeItems: 'center', color: '#94a3b8', fontSize: 12 }}>
                Coming Soon...
              </Box>
            </Paper>
          </Box>
        </Stack>
      </Box>
    </StudentLayout>
  )
}