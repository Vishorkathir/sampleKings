// @ts-nocheck
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Box, Stack, Typography, IconButton, Menu, MenuItem, Avatar, Divider, Badge, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material'

const navLinks = [
  { label: 'Dashboard', icon: '📊', path: '/student-dashboard' },
  { label: 'Activities', icon: '👥', path: '/student-activities' },
  { label: 'Matches', icon: '🏏', path: '/student-matches' },
  { label: 'Shop', icon: '🛒', path: '/student-shop' },
]
const adminLinks = [
  { label: 'Dashboard', icon: '🏠', path: '/Admin-dashboard' },
  { label: 'Activities', icon: '👥', path: '/student-activities' },
  { label: 'Matches', icon: '🏏', path: '/student-matches' },
  { label: 'Registration', icon: '📝', path: '/registration' },
]

export default function ModernNavbar({ userData, isAdmin = false, onLogout }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = isAdmin ? adminLinks : navLinks
  const name = userData?.user?.full_name || userData?.full_name || 'User'
  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2)
  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget)
  const handleMenuClose = () => setAnchorEl(null)
  const handleLogout = () => { handleMenuClose(); onLogout?.(); localStorage.removeItem('cricket_academy_student_token'); localStorage.removeItem('cricket_academy_admin_token'); localStorage.removeItem('kings11_student_token'); localStorage.removeItem('kings11_admin_token'); navigate('/login') }
  const handleNavigation = (p) => { navigate(p); setMobileOpen(false) }

  return (
    <>
      <Box sx={{ position: 'fixed', inset: '0 0 auto 0', zIndex: 1300, height: 64, bgcolor: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)', px: { xs: 2, sm: 3, md: 4 } }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ height: '100%' }}>
          <Stack direction="row" alignItems="center" gap={1.4} sx={{ cursor: 'pointer' }} onClick={() => navigate(isAdmin ? '/Admin-dashboard' : '/student-dashboard')}>
            <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: 'var(--primary)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 16, fontWeight: 800 }}>11</Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 14.5, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)', lineHeight: 1 }}>KINGS11</Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: 'var(--muted)', lineHeight: 1 }}>CRICKET ACADEMY</Typography>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="center" gap={0.4} sx={{ display: { xs: 'none', lg: 'flex' }, flex: 1, justifyContent: 'center', px: 4 }}>
            {links.map((link) => {
              const active = location.pathname === link.path
              return (
                <Box key={link.path} onClick={() => navigate(link.path)} sx={{ px: 2, py: 0.7, borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.8, color: active ? 'var(--primary)' : 'var(--muted)', fontWeight: active ? 800 : 600, fontSize: 13, bgcolor: active ? 'var(--primary-soft)' : 'transparent', border: active ? '1px solid oklch(0.88 0.06 260)' : '1px solid transparent', transition: 'all 160ms var(--ease-out)', '&:hover': { color: 'var(--primary)', bgcolor: 'var(--primary-soft)' } }}>
                  <Box sx={{ fontSize: 14 }}>{link.icon}</Box>
                  <Typography sx={{ fontSize: 13, fontWeight: active ? 800 : 600 }}>{link.label}</Typography>
                </Box>
              )
            })}
          </Stack>

          <Stack direction="row" alignItems="center" gap={1}>
            <IconButton sx={{ width: 38, height: 38, borderRadius: '10px', border: '1px solid var(--border)', bgcolor: 'var(--paper)', color: 'var(--muted)', '&:hover': { bgcolor: 'var(--surface)', color: 'var(--ink)' }, transition: 'all 160ms var(--ease-out)' }}>
              <Badge badgeContent={3} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, minWidth: 14, height: 14 } }}>
                <Box sx={{ fontSize: 16 }}>🔔</Box>
              </Badge>
            </IconButton>
            <Box onClick={handleMenuOpen} sx={{ display: 'flex', alignItems: 'center', gap: 1.1, pl: 0.6, pr: 1, py: 0.4, borderRadius: '10px', cursor: 'pointer', border: '1px solid var(--border)', bgcolor: 'var(--paper)', '&:hover': { bgcolor: 'var(--surface)' } }}>
              <Avatar sx={{ width: 30, height: 30, bgcolor: 'var(--primary)', fontSize: 11, fontWeight: 800 }}>{initials}</Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, lineHeight: 1 }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{name.split(' ')[0]}</Typography>
                <Typography sx={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', lineHeight: 1 }}>{isAdmin ? 'ADMIN' : 'PLAYER'}</Typography>
              </Box>
              <Box sx={{ display: { xs: 'none', sm: 'block' }, color: 'var(--muted)', fontSize: 10, ml: 0.4 }}>▼</Box>
            </Box>
            <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { lg: 'none' }, width: 38, height: 38, borderRadius: '10px', border: '1px solid var(--border)', bgcolor: 'var(--paper)' }}><Box sx={{ fontSize: 16 }}>☰</Box></IconButton>
          </Stack>
        </Stack>
      </Box>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ sx: { mt: 1, borderRadius: '12px', minWidth: 200, border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)' } }} transformOrigin={{ horizontal: 'right', vertical: 'top' }} anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
        <MenuItem onClick={() => { navigate(isAdmin ? '/Admin-dashboard' : '/student-info'); handleMenuClose() }} sx={{ py: 1.1, fontSize: 13.5, fontWeight: 600, color: 'var(--ink-2)', '&:hover': { bgcolor: 'var(--surface)' } }}><Box sx={{ mr: 1.4, fontSize: 14 }}>⚙️</Box>Settings</MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleLogout} sx={{ py: 1.1, fontSize: 13.5, fontWeight: 700, color: 'oklch(0.55 0.20 28)', '&:hover': { bgcolor: 'oklch(0.97 0.02 28)' } }}><Box sx={{ mr: 1.4, fontSize: 14 }}>🚪</Box>Logout</MenuItem>
      </Menu>

      <Drawer anchor="left" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: 280, bgcolor: 'var(--paper)', borderRight: '1px solid var(--border)' } }}>
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}><IconButton onClick={() => setMobileOpen(false)}>✕</IconButton></Box>
          <List sx={{ display: 'flex', flexDirection: 'column', gap: 0.4 }}>
            {links.map((link) => {
              const active = location.pathname === link.path
              return (<ListItem key={link.path} onClick={() => handleNavigation(link.path)} sx={{ px: 1.4, py: 1, borderRadius: '10px', cursor: 'pointer', bgcolor: active ? 'var(--primary-soft)' : 'transparent', color: active ? 'var(--primary)' : 'var(--ink-2)', fontWeight: active ? 800 : 600, border: active ? '1px solid oklch(0.88 0.06 260)' : '1px solid transparent' }}><ListItemIcon sx={{ color: 'inherit', minWidth: 28 }}>{link.icon}</ListItemIcon><ListItemText primary={link.label} primaryTypographyProps={{ fontSize: 13.5, fontWeight: active ? 800 : 600 }} /></ListItem>)
            })}
          </List>
        </Box>
      </Drawer>
      <Box sx={{ height: 64 }} />
    </>
  )
}
