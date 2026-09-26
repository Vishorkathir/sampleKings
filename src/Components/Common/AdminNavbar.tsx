'use client';
import { usePathname } from 'next/navigation';
// @ts-nocheck
import React, { useState, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation';


import {
  Box,
  Stack,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Divider,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import LogoutConfirm from './LogoutConfirm'
import { useThemeMode } from '../../config/ThemeContext'

const ADMIN_LINKS = [
  { label: 'Dashboard', icon: '🏠', path: '/Admin-dashboard' },
  { label: 'Registration', icon: '📝', path: '/registration' },
  { label: 'League', icon: '🏏', path: '/coming-soon' },
]

const GRADIENT_STYLE = 'linear-gradient(135deg, #0b5aa0 0%, #1d4ed8 100%)'

function AdminNavbar({ userData, onLogout }) {
  const router = useRouter()
  const pathname = usePathname()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const { isDarkMode, toggleTheme } = useThemeMode()

  const name = useMemo(() => userData?.user?.full_name || userData?.full_name || 'Admin', [userData])
  const initials = useMemo(() => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2), [name])

  const handleMenuOpen = useCallback((event) => setAnchorEl(event.currentTarget), [])
  const handleMenuClose = useCallback(() => setAnchorEl(null), [])
  
  const handleLogoutClick = useCallback(() => {
    handleMenuClose()
    setLogoutOpen(true)
  }, [])

  const handleConfirmLogout = useCallback(() => {
    setLogoutOpen(false)
    onLogout?.()
    localStorage.removeItem('kings11_admin_token')
    router.push('/login')
  }, [onLogout, router])

  const handleCancelLogout = useCallback(() => {
    setLogoutOpen(false)
  }, [])

  const handleNavigation = useCallback((path) => {
    router.push(path)
    setMobileOpen(false)
  }, [router])

  return (
    <>
      {/* ═══════════════════ MAIN NAVBAR ═══════════════════ */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1300,
          height: 70,
          background: 'var(--paper)',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          borderBottom: '1px solid rgba(203,213,225,0.5)',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          px: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ height: '100%' }}
        >
          {/* ─── LOGO SECTION ─── */}
          <Stack
            direction="row"
            alignItems="center"
            gap={1.5}
            sx={{
              cursor: 'pointer',
              '&:hover': { transform: 'translateX(2px)' },
              transition: 'transform 0.2s ease',
            }}
            onClick={() => router.push('/Admin-dashboard')}
          >
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: '12px',
                background: 'var(--primary)',
                display: 'grid',
                placeItems: 'center',
                fontSize: 22,
                boxShadow: 'none',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: '-50%',
                  right: '-50%',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                  animation: 'shimmer 3s infinite',
                },
                '@keyframes shimmer': {
                  '0%': { transform: 'translate(-50%, -50%)' },
                  '100%': { transform: 'translate(50%, 50%)' },
                },
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>🏆</span>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 800,
                  background: 'var(--primary)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.5px',
                  lineHeight: 1.1,
                }}
              >
                Kings11
              </Typography>
              <Typography
                sx={{
                  fontSize: 10,
                  fontWeight: 700,
                  color: '#64748b',
                  letterSpacing: '1.2px',
                  lineHeight: 1,
                }}
              >
                ACADEMY
              </Typography>
            </Box>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            gap={0.3}
            sx={{
              display: { xs: 'none', lg: 'flex' },
              flex: 1,
              justifyContent: 'center',
              px: 4,
            }}
          >
            {ADMIN_LINKS.map((link) => {
              const active = pathname === link.path
              return (
                <Box
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  sx={{
                    position: 'relative',
                    px: 2.5,
                    py: 1.2,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.8,
                    color: active ? '#1d4ed8' : '#475569',
                    fontWeight: active ? 700 : 600,
                    fontSize: 13.5,
                    bgcolor: active ? 'rgba(29,78,216,0.08)' : 'transparent',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                      bgcolor: 'rgba(29,78,216,0.12)',
                      color: '#1d4ed8',
                      transform: 'translateY(-1px)',
                    },
                    '&::after': active
                      ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 20,
                        height: 3,
                        borderRadius: '3px',
                        background: 'var(--primary)',
                        boxShadow: 'none',
                      }
                      : {},
                  }}
                >
                  <Box sx={{ fontSize: 16 }}>{link.icon}</Box>
                  <Typography sx={{ fontSize: 13.5 }}>{link.label}</Typography>
                </Box>
              )
            })}
          </Stack>

          {/* ─── RIGHT SECTION: NOTIFICATIONS & PROFILE ─── */}
          <Stack
            direction="row"
            alignItems="center"
            gap={{ xs: 1, md: 2 }}
          >
            {/* Theme Toggle */}
            <IconButton
              onClick={toggleTheme}
              sx={{
                width: 42,
                height: 42,
                borderRadius: '10px',
                bgcolor: 'rgba(29,78,216,0.08)',
                color: '#475569',
                '&:hover': {
                  bgcolor: 'rgba(29,78,216,0.15)',
                  color: '#1d4ed8',
                },
                transition: 'all 0.2s ease',
              }}
              title={isDarkMode ? 'Light Mode' : 'Dark Mode'}
            >
              <Box sx={{ fontSize: 20 }}>{isDarkMode ? '☀️' : '🌙'}</Box>
            </IconButton>

            {/* Notifications */}
            <IconButton
              sx={{
                width: 42,
                height: 42,
                borderRadius: '10px',
                bgcolor: 'rgba(29,78,216,0.08)',
                color: '#475569',
                '&:hover': {
                  bgcolor: 'rgba(29,78,216,0.15)',
                  color: '#1d4ed8',
                },
                transition: 'all 0.2s ease',
              }}
            >
              <Badge badgeContent={3} color="error">
                <Box sx={{ fontSize: 20 }}>🔔</Box>
              </Badge>
            </IconButton>

            {/* Profile Menu */}
            <Box
              onClick={handleMenuOpen}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.2,
                px: 1.5,
                py: 0.8,
                borderRadius: '10px',
                cursor: 'pointer',
                bgcolor: 'rgba(29,78,216,0.05)',
                transition: 'all 0.2s ease',
                '&:hover': {
                  bgcolor: 'rgba(29,78,216,0.12)',
                },
              }}
            >
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: 'var(--primary)',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                  border: '2px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 4px 12px rgba(29,78,216,0.3)',
                }}
              >
                {initials}
              </Avatar>
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexDirection: 'column', gap: 0.2 }}>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>
                  {name.split(' ')[0]}
                </Typography>
                <Typography sx={{ fontSize: 11, color: '#64748b' }}>
                  Admin
                </Typography>
              </Box>
              <Box
                sx={{
                  display: { xs: 'none', sm: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  borderRadius: '4px',
                  color: '#64748b',
                  fontSize: 16,
                }}
              >
                ▼
              </Box>
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              sx={{
                display: { lg: 'none' },
                width: 42,
                height: 42,
                borderRadius: '10px',
                bgcolor: 'rgba(29,78,216,0.08)',
                color: '#475569',
                '&:hover': { bgcolor: 'rgba(29,78,216,0.15)' },
              }}
              onClick={() => setMobileOpen(true)}
            >
              <Box sx={{ fontSize: 22 }}>☰</Box>
            </IconButton>
          </Stack>
        </Stack>
      </Box>

      {/* ═══════════════════ DROPDOWN MENU ═══════════════════ */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            borderRadius: '12px',
            minWidth: 200,
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(203,213,225,0.4)',
            background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          onClick={() => {
            router.push('/Admin-dashboard')
            handleMenuClose()
          }}
          sx={{
            py: 1.2,
            px: 2,
            color: '#475569',
            '&:hover': { bgcolor: 'rgba(29,78,216,0.1)', color: '#1d4ed8' },
          }}
        >
          <Box sx={{ mr: 1.5, fontSize: 16 }}>⚙️</Box>
          Settings
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem
          onClick={handleLogoutClick}
          sx={{
            py: 1.2,
            px: 2,
            color: '#ef4444',
            '&:hover': { bgcolor: 'rgba(239,68,68,0.1)' },
          }}
        >
          <Box sx={{ mr: 1.5, fontSize: 16 }}>🚪</Box>
          Logout
        </MenuItem>
      </Menu>

      {/* ═══════════════════ LOGOUT CONFIRMATION DIALOG ═══════════════════ */}
      <LogoutConfirm
        open={logoutOpen}
        onConfirm={handleConfirmLogout}
        onCancel={handleCancelLogout}
      />

      {/* ═══════════════════ MOBILE DRAWER ═══════════════════ */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: {
            width: 280,
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
            borderRight: '1px solid rgba(203,213,225,0.3)',
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Close Button */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <Box sx={{ fontSize: 22 }}>✕</Box>
            </IconButton>
          </Box>

          {/* Mobile Menu Items */}
          <List sx={{ gap: 0.5, display: 'flex', flexDirection: 'column' }}>
            {ADMIN_LINKS.map((link) => {
              const active = pathname === link.path
              return (
                <ListItem
                  key={link.path}
                  onClick={() => handleNavigation(link.path)}
                  sx={{
                    px: 1.5,
                    py: 1.2,
                    borderRadius: '10px',
                    cursor: 'pointer',
                    bgcolor: active ? 'rgba(29,78,216,0.1)' : 'transparent',
                    color: active ? '#1d4ed8' : '#475569',
                    fontWeight: active ? 700 : 600,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: 'rgba(29,78,216,0.12)',
                      color: '#1d4ed8',
                    },
                  }}
                >
                  <ListItemIcon sx={{ color: 'inherit', minWidth: 32 }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.label} />
                </ListItem>
              )
            })}
          </List>
        </Box>
      </Drawer>
    </>
  )
}

export default React.memo(AdminNavbar)