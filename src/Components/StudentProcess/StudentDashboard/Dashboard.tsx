'use client';
import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Stack, Button, Chip, Grid } from '@mui/material'
import StudentLayout from './StudentLayout'
import { supabase } from '../../../utils/supabase'
import type { Student } from '../../../types/database'

type FadeUpProps = {
  children: React.ReactNode
  delay?: number
  sx?: Record<string, unknown>
}

const FadeUpBox = ({ children, delay = 0, ...props }: FadeUpProps) => (
  <Box
    sx={{
      animation: 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards',
      animationDelay: `${delay}s`,
      '@keyframes slideUp': {
        '0%': { opacity: 0, transform: 'translateY(24px)' },
        '100%': { opacity: 1, transform: 'translateY(0)' },
      },
      ...(props.sx as object),
    }}
    {...props}
  >
    {children}
  </Box>
)

type StatCardProps = {
  icon: string
  label: string
  value: string
  delta: string
  isGood: boolean
  color: string
}

const StatCard = ({ icon, label, value, delta, isGood, color }: StatCardProps) => (
  <Paper elevation={0} sx={{ p: 2.2, borderRadius: '12px', border: '1px solid var(--border)', bgcolor: 'var(--paper)', position: 'relative', overflow: 'hidden', transition: 'all 0.3s ease', cursor: 'pointer', '&:hover': { transform: 'translateY(-4px)', boxShadow: `0 12px 24px -8px ${color}40`, borderColor: `${color}80` } }}>
    <Box sx={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: `radial-gradient(circle at top right, ${color}15, transparent)`, borderRadius: '0 0 0 100%' }} />
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 2 }}>
      <Box sx={{ color: color, fontSize: 24, lineHeight: 1 }}>{icon}</Box>
      <Chip label={delta} size="small" sx={{ height: 20, fontSize: 10, fontWeight: 700, bgcolor: isGood ? '#ecfdf5' : '#fef2f2', color: isGood ? '#10b981' : '#ef4444' }} />
    </Stack>
    <Typography sx={{ fontSize: 13, color: '#64748b', mb: 0.5, fontWeight: 500 }}>{label}</Typography>
    <Typography sx={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>{value}</Typography>
  </Paper>
)

const MatchCard = () => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', bgcolor: 'var(--paper)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
      <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Upcoming Match</Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#2563eb', cursor: 'pointer' }}>View All →</Typography>
    </Stack>
    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a', textAlign: 'center' }}>No upcoming matches scheduled.</Typography>
  </Paper>
)

type ActivityRowProps = {
  icon: string
  title: string
  time: string
  action?: { text: string; color: string }
  color: string
}

const ActivityRow = ({ icon, title, time, action, color }: ActivityRowProps) => (
  <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 1.5, borderRadius: '12px', border: '1px solid transparent', transition: 'all 0.2s ease', '&:hover': { bgcolor: '#f8fafc', borderColor: '#e2e8f0' } }}>
    <Stack direction="row" alignItems="center" gap={1.5}>
      <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: `${color}15`, color: color, display: 'grid', placeItems: 'center', fontSize: 18 }}>{icon}</Box>
      <Box>
        <Typography sx={{ fontSize: 13.5, fontWeight: 600, color: '#0f172a', mb: 0.2 }}>{title}</Typography>
        <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{time}</Typography>
      </Box>
    </Stack>
    {action && <Typography sx={{ fontSize: 12, fontWeight: 700, color: action.color }}>{action.text}</Typography>}
  </Stack>
)

type StudentData = {
  user: Student
  profile?: Student['profile']
}

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<StudentData | null>(null)

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const email = sessionData.session?.user.email ?? localStorage.getItem('cricket_academy_user_email') ?? localStorage.getItem('kings11_student_token') ?? null

        if (!sessionData.session && !email) {
          // try local demo student from storage
          const stored = localStorage.getItem('cricket_academy_students')
          if (stored) {
            const arr = JSON.parse(stored) as Student[]
            if (arr.length > 0) {
              setStudentData({ user: arr[0], profile: arr[0].profile })
              return
            }
          }
          return
        }

        const userEmail = sessionData.session?.user.email ?? (typeof email === 'string' ? email : null)
        if (!userEmail) return

        // Try Supabase users table
        const { data, error } = await supabase.from('users').select('*').eq('email', userEmail).single()

        if (error || !data) {
          // fallback to local storage or mock
          const stored = localStorage.getItem('cricket_academy_students')
          const arr: Student[] = stored ? (JSON.parse(stored) as Student[]) : []
          const found = arr.find((s) => s.email === userEmail)
          if (found) {
            setStudentData({ user: found, profile: found.profile })
          } else {
            setStudentData({
              user: {
                id: sessionData.session?.user.id ?? 'demo-id',
                email: userEmail,
                full_name: (sessionData.session?.user.user_metadata as Record<string, string>)?.full_name ?? 'Student',
                role: 'student',
                is_active: true,
                created_at: new Date().toISOString(),
                admission_status: 'pending',
                skills: [],
              },
            })
          }
          return
        }

        const mapped: Student = {
          id: String((data as Record<string, unknown>).id),
          email: String((data as Record<string, unknown>).email),
          full_name: String((data as Record<string, unknown>).full_name ?? (data as Record<string, unknown>).fullName ?? 'Student'),
          role: 'student',
          is_active: true,
          created_at: String((data as Record<string, unknown>).created_at ?? new Date().toISOString()),
          admission_status: ((data as Record<string, unknown>).admission_status as Student['admission_status']) ?? 'pending',
          skills: Array.isArray((data as Record<string, unknown>).skills) ? ((data as Record<string, unknown>).skills as string[]) : [],
        }
        setStudentData({ user: mapped })
      } catch (err) {
        console.error('Failed to load student profile via Supabase:', err)
      }
    }
    fetchMe()
  }, [])

  const name: string = studentData?.user?.full_name || 'Student'

  return (
    <StudentLayout activePath="/student-dashboard">
      <Box sx={{ p: { xs: 2, sm: 3, md: 4 }, maxWidth: 1100, mx: 'auto' }}>
        <FadeUpBox delay={0}>
          <Box sx={{ position: 'relative', borderRadius: '12px', bgcolor: '#041d3b', overflow: 'hidden', p: { xs: 3, md: 5 }, mb: 4, boxShadow: 'var(--shadow-md)' }}>
            <Box sx={{ position: 'absolute', top: '-50%', right: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(29,78,216,0.3) 0%, transparent 70%)', zIndex: 0 }} />
            <Box sx={{ position: 'absolute', bottom: '-30%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)', zIndex: 0 }} />
            <Box sx={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: { xs: '0%', md: '50%' }, zIndex: 1, maskImage: 'linear-gradient(to right, transparent 0%, black 30%)', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)', animation: 'float 6s ease-in-out infinite', '@keyframes float': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } } }}>
              <Box component="img" src="/banner.png" alt="3D Cricket Action" sx={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', mixBlendMode: 'screen' }} />
            </Box>
            <Box sx={{ position: 'relative', zIndex: 2, maxWidth: 460 }}>
              <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 400, color: '#e2e8f0', letterSpacing: '-0.5px' }}>Welcome back,</Typography>
              <Typography sx={{ fontSize: { xs: 32, md: 44 }, fontWeight: 800, color: '#facc15', lineHeight: 1.1, mb: 2, letterSpacing: '-1px' }}>{name}</Typography>
              <Typography sx={{ fontSize: 14.5, color: '#cbd5e1', lineHeight: 1.6, mb: 4, fontWeight: 400 }}>
                Your batting strike rate has improved by 12% this week. Keep up the momentum for the upcoming playoffs. Supabase synced.
              </Typography>
              <Stack direction="row" gap={2}>
                <Button variant="contained" sx={{ bgcolor: '#f59e0b', color: '#78350f', fontWeight: 700, py: 1.2, px: 3, borderRadius: '10px', textTransform: 'none', fontSize: 13.5, boxShadow: 'none', '&:hover': { bgcolor: '#fbbf24', boxShadow: 'none' } }}>
                  Schedule Practice
                </Button>
                <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#fff', fontWeight: 600, py: 1.2, px: 3, borderRadius: '10px', textTransform: 'none', fontSize: 13.5, backdropFilter: 'blur(8px)', bgcolor: 'rgba(255,255,255,0.05)', '&:hover': { bgcolor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' } }}>
                  View Analytics
                </Button>
              </Stack>
            </Box>
          </Box>
        </FadeUpBox>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {[
            { delay: 0.1, icon: '🏏', label: 'Total Runs', value: '340', delta: '+12%', isGood: true, color: '#3b82f6' },
            { delay: 0.2, icon: '🎯', label: 'Wickets', value: '8', delta: '+6%', isGood: true, color: '#f59e0b' },
            { delay: 0.3, icon: '⚡', label: 'Strike Rate', value: '128.5', delta: '-2%', isGood: false, color: '#8b5cf6' },
            { delay: 0.4, icon: '📅', label: 'Attendance', value: '92%', delta: 'On Track', isGood: true, color: '#10b981' },
          ].map((stat, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}>
              <FadeUpBox delay={stat.delay}>
                <StatCard {...stat} />
              </FadeUpBox>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <FadeUpBox delay={0.5}>
              <MatchCard />
            </FadeUpBox>
            <FadeUpBox delay={0.6}>
              <Box sx={{ mt: 4 }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a', mb: 2 }}>Performance Analytics</Typography>
                <Paper elevation={0} sx={{ p: 3, borderRadius: '12px', border: '1px solid var(--border)', display: 'flex', alignItems: 'flex-end', gap: 2, height: 180 }}>
                  {[40, 60, 100, 50, 90, 30, 20].map((h, i) => (
                    <Box key={i} sx={{ flex: 1, height: `${h}%`, bgcolor: i === 4 ? '#b45309' : i === 2 ? '#0f172a' : '#e2e8f0', borderRadius: '4px 4px 0 0', position: 'relative', transition: 'all 0.3s ease', '&:hover': { transform: 'scaleY(1.05)', bgcolor: i === 4 ? '#d97706' : i === 2 ? '#1e293b' : '#cbd5e1' } }} />
                  ))}
                </Paper>
              </Box>
            </FadeUpBox>
          </Grid>

          <Grid item xs={12} md={5}>
            <FadeUpBox delay={0.55}>
              <Typography sx={{ fontSize: 16, fontWeight: 700, color: '#0f172a', mb: 2 }}>Recent Activity</Typography>
              <Paper elevation={0} sx={{ p: 1.5, borderRadius: '12px', border: '1px solid var(--border)', bgcolor: 'var(--paper)', mb: 4 }}>
                <ActivityRow icon="🏋️‍♂️" title="Strength Training" time="2 hours ago" action={{ text: '+20pts', color: '#2563eb' }} color="#2563eb" />
                <ActivityRow icon="💳" title="Fees Paid" time="Yesterday" action={{ text: '✓', color: '#10b981' }} color="#10b981" />
                <ActivityRow icon="📹" title="Technique Review" time="Nov 20, 2023" action={{ text: '▶', color: '#64748b' }} color="#64748b" />
              </Paper>
            </FadeUpBox>
            <FadeUpBox delay={0.65}>
              <Paper elevation={0} sx={{ p: 3, pb: 4, borderRadius: '12px', bgcolor: '#1e293b', position: 'relative', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', bottom: -20, right: -10, fontSize: 120, color: 'rgba(255,255,255,0.03)', fontWeight: 900, lineHeight: 1 }}>99</Box>
                <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#fff', mb: 1.5 }}>Coach&apos;s Note</Typography>
                <Typography sx={{ fontSize: 13, fontStyle: 'italic', color: '#cbd5e1', lineHeight: 1.7, mb: 3 }}>{`"${name}, focus on your front-foot weight transfer during tomorrow's nets. Your balance is drifting slightly off-side."`}</Typography>
                <Stack direction="row" alignItems="center" gap={1.5}>
                  <Box sx={{ width: 32, height: 32, borderRadius: '50%', bgcolor: '#f59e0b', pt: 0.3, textAlign: 'center' }}>👨‍🏫</Box>
                  <Box>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#facc15' }}>Coach Vikram</Typography>
                    <Typography sx={{ fontSize: 10, color: '#94a3b8', letterSpacing: 0.5 }}>HEAD COACH</Typography>
                  </Box>
                </Stack>
              </Paper>
            </FadeUpBox>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <FadeUpBox delay={0.7}>{null}</FadeUpBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <FadeUpBox delay={0.75}>{null}</FadeUpBox>
          </Grid>
        </Grid>
      </Box>
    </StudentLayout>
  )
}