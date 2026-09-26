'use client';
import { usePathname } from 'next/navigation';
// @ts-nocheck
import { useState } from 'react'
import { useRouter } from 'next/navigation';


import { Avatar, Box, Stack, Typography, IconButton, Drawer, List, ListItem } from '@mui/material'

const navLinks = [
    { label: 'Dashboard', icon: '📊', path: '/student-dashboard' },
    { label: 'Activities', icon: '👥', path: '/student-activities' },
    { label: 'Matches', icon: '🏏', path: '/student-matches' },
    { label: 'Shop', icon: '🛒', path: '/student-shop' },
    { label: 'Settings', icon: '⚙️', path: '/student-info' },
]

export default function StudentNavbar({ studentData }) {
    const router = useRouter()
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    const name = studentData?.user?.full_name || 'Student'
    const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)

    return (
        <>
            {/* ─── Main Navbar ─── */}
            <Box
                sx={{
                    position: 'fixed',
                    top: 0, left: 0, right: 0,
                    zIndex: 1200,
                    height: 64,
                    px: { xs: 2, md: 4 },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    bgcolor: 'rgba(255,255,255,0.88)',
                    borderBottom: '1px solid rgba(226,232,240,0.8)',
                    boxShadow: '0 4px 24px rgba(15,23,42,0.06)',
                }}
            >
                {/* Logo */}
                <Stack direction="row" alignItems="center" gap={1.2} sx={{ cursor: 'pointer' }} onClick={() => router.push('/student-dashboard')}>
                    <Box
                        sx={{
                            width: 36, height: 36,
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #0b5aa0 0%, #1d4ed8 100%)',
                            display: 'grid', placeItems: 'center',
                            fontSize: 18,
                            boxShadow: '0 4px 12px rgba(29,78,216,0.35)',
                        }}
                    >
                        🏆
                    </Box>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.3px', lineHeight: 1.1 }}>
                            Kings11
                        </Typography>
                        <Typography sx={{ fontSize: 10, fontWeight: 600, color: '#64748b', letterSpacing: 1 }}>
                            SPORTS ACADEMY
                        </Typography>
                    </Box>
                </Stack>

                {/* Desktop Nav Links */}
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={0.5}
                    sx={{ display: { xs: 'none', md: 'flex' } }}
                >
                    {navLinks.map((link) => {
                        const active = pathname === link.path
                        return (
                            <Box
                                key={link.path}
                                onClick={() => router.push(link.path)}
                                sx={{
                                    position: 'relative',
                                    px: 2,
                                    py: 1,
                                    borderRadius: '10px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.7,
                                    color: active ? '#1d4ed8' : '#475569',
                                    fontWeight: active ? 700 : 500,
                                    bgcolor: active ? '#eff6ff' : 'transparent',
                                    transition: 'all 0.2s ease',
                                    '&:hover': { bgcolor: '#f1f5f9', color: '#1d4ed8' },
                                    // animated underline dot
                                    '&::after': active ? {
                                        content: '""',
                                        position: 'absolute',
                                        bottom: 4,
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: 4, height: 4,
                                        borderRadius: '50%',
                                        bgcolor: '#1d4ed8',
                                    } : {},
                                }}
                            >
                                <Box sx={{ fontSize: 14, lineHeight: 1 }}>{link.icon}</Box>
                                <Typography sx={{ fontSize: 13.5, fontWeight: 'inherit', color: 'inherit' }}>
                                    {link.label}
                                </Typography>
                            </Box>
                        )
                    })}
                </Stack>

                {/* Right actions */}
                <Stack direction="row" alignItems="center" gap={1.5}>
                    <IconButton
                        sx={{
                            width: 36, height: 36,
                            bgcolor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: 16,
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: '#eff6ff', borderColor: '#bfdbfe' },
                        }}
                    >
                        🔔
                    </IconButton>

                    {/* Avatar with name tooltip */}
                    <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{
                            px: 1.2, py: 0.6,
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            bgcolor: '#f8fafc',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            '&:hover': { bgcolor: '#eff6ff', borderColor: '#bfdbfe' },
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 28, height: 28,
                                fontSize: 11, fontWeight: 800,
                                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                color: '#fff',
                            }}
                        >
                            {initials}
                        </Avatar>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a', lineHeight: 1.2 }}>
                                {name}
                            </Typography>
                            <Typography sx={{ fontSize: 10, color: '#94a3b8', letterSpacing: 0.3 }}>
                                Student
                            </Typography>
                        </Box>
                    </Stack>

                    {/* Mobile Hamburger */}
                    <IconButton
                        onClick={() => setOpen(true)}
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            width: 36, height: 36,
                            bgcolor: '#f8fafc',
                            border: '1px solid #e2e8f0',
                            borderRadius: '10px',
                            fontSize: 18,
                        }}
                    >
                        ☰
                    </IconButton>
                </Stack>
            </Box>

            {/* ─── Mobile Drawer ─── */}
            <Drawer anchor="right" open={open} onClose={() => setOpen(false)}
                PaperProps={{ sx: { width: 260, pt: 2 } }}
            >
                <Stack direction="row" alignItems="center" gap={1.2} sx={{ px: 2, mb: 3 }}>
                    <Avatar sx={{ width: 40, height: 40, bgcolor: '#f59e0b', fontWeight: 800 }}>{initials}</Avatar>
                    <Box>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{name}</Typography>
                        <Typography sx={{ fontSize: 11, color: '#94a3b8' }}>Student Portal</Typography>
                    </Box>
                </Stack>

                <List sx={{ px: 1 }}>
                    {navLinks.map((link) => {
                        const active = pathname === link.path
                        return (
                            <ListItem
                                key={link.path}
                                onClick={() => { router.push(link.path); setOpen(false) }}
                                sx={{
                                    borderRadius: '10px',
                                    mb: 0.5,
                                    gap: 1.5,
                                    cursor: 'pointer',
                                    bgcolor: active ? '#eff6ff' : 'transparent',
                                    color: active ? '#1d4ed8' : '#475569',
                                    fontWeight: active ? 700 : 500,
                                    '&:hover': { bgcolor: '#f1f5f9' },
                                }}
                            >
                                <Box sx={{ fontSize: 18 }}>{link.icon}</Box>
                                <Typography sx={{ fontSize: 14, fontWeight: 'inherit', color: 'inherit' }}>{link.label}</Typography>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </>
    )
}