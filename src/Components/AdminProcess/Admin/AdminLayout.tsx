'use client';
// @ts-nocheck
import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import AdminNavbar from '../../Common/AdminNavbar'
import { supabase } from '../../../utils/supabase'

export default function AdminLayout({ children }) {
  const [adminData, setAdminData] = useState(null)

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const { data: sessionData } = await supabase.auth.getSession()
        const email = sessionData.session?.user.email ?? localStorage.getItem('cricket_academy_user_email')
        if (!email) return
        const { data, error } = await supabase.from('users').select('*').eq('email', email).single()
        if (!error && data) {
          setAdminData({ user: data })
        } else {
          setAdminData({ user: { email, full_name: 'Admin' } })
        }
      } catch (err) {
        console.error('Failed to fetch admin via Supabase:', err)
      }
    }
    fetchAdmin()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('cricket_academy_admin_token')
    localStorage.removeItem('kings11_admin_token')
    localStorage.removeItem('cricket_academy_user_email')
  }

  return (
    <Box sx={{ bgcolor: '#f5f7fb', minHeight: '100vh' }}>
      <AdminNavbar userData={adminData} onLogout={handleLogout} />
      <Box sx={{ height: 70 }} />
      <Box sx={{ p: { xs: 2, md: 4 } }}>{children}</Box>
    </Box>
  )
}