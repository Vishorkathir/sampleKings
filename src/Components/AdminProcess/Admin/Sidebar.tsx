// @ts-nocheck
import { Box, Button, Stack, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const menuItems = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
  { label: 'Student Activities', icon: '👥', path: '/student-activities' },
  // { label: 'Match Information', icon: '🏏', path: '/student-matches' },
  // { label: 'Media Upload', icon: '📤', path: '/media-upload' },
  // { label: 'Shop Information', icon: '🛒', path: '/student-shop' },
  { label: 'New Registration', icon: '📝', path: '/registration' },
  { label: 'Settings', icon: '⚙️', path: '/settings' },
]

export default function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        width: 260,
        bgcolor: '#fff',
        borderRight: '1px solid #e8edf5',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
      }}
    >
      {/* Logo */}
      <Box sx={{ p: 2, borderBottom: '1px solid #eef2f7' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Box
            sx={{
              width: 30,
              height: 30,
              borderRadius: 1.5,
              bgcolor: '#0b5aa0',
              color: '#fff',
              display: 'grid',
              placeItems: 'center',
              fontSize: 14,
            }}
          >
            🏆
          </Box>
          <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>
            Kings11SportsAcademy
          </Typography>
        </Stack>
      </Box>

      {/* Menu Section */}
      <Box sx={{ p: 2, flex: 1 }}>
        <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#64748b', mb: 0.8 }}>
          Admin Panel
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: '#94a3b8', mb: 2 }}>
          Excellence in Performance
        </Typography>

        <Stack gap={0.5}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path

            return (
              <Box
                key={item.label}
                onClick={() => navigate(item.path)}
                sx={{
                  p: 1.3,
                  borderRadius: 2,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.1,
                  color: isActive ? '#1d4ed8' : '#64748b',
                  bgcolor: isActive ? '#eaf1ff' : 'transparent',
                  position: 'relative',
                  transition: 'all 0.2s',
                  '&::before': isActive
                    ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 8,
                      bottom: 8,
                      width: 3,
                      borderRadius: 999,
                      bgcolor: '#1d4ed8',
                    }
                    : {},
                  '&:hover': {
                    bgcolor: isActive ? '#eaf1ff' : '#e8edf5',
                    color: isActive ? '#1d4ed8' : '#0b5aa0',
                  },
                }}
              >
                <Box sx={{ fontSize: 15 }}>{item.icon}</Box>
                <Typography sx={{ fontSize: 12.5, fontWeight: isActive ? 700 : 500 }}>
                  {item.label}
                </Typography>
              </Box>
            )
          })}
        </Stack>
      </Box>

      {/* Buttons */}
      <Box sx={{ p: 2, borderTop: '1px solid #eef2f7' }}>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#0b5aa0',
            color: '#fff',
            textTransform: 'none',
            fontSize: 12.5,
            fontWeight: 600,
            py: 1,
            borderRadius: 2,
            mb: 1,
            '&:hover': { bgcolor: '#0a4b86' },
          }}
        >
          Upgrade to Pro
        </Button>
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: '#f9b90e',
            color: '#7b4e00',
            textTransform: 'none',
            fontSize: 12.5,
            fontWeight: 600,
            py: 1.2,
            borderRadius: 2,
            '&:hover': { bgcolor: '#f1b000' },
          }}
        >
          View Benefits
        </Button>
      </Box>
    </Box>
  )
}