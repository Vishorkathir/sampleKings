'use client';
// @ts-nocheck
import { useState } from 'react'
import { Box, Container, Typography, Grid, Button, Modal, IconButton } from '@mui/material'
import { useRouter } from 'next/navigation';


import { FiArrowLeft, FiX, FiCamera, FiImage, FiMaximize2 } from 'react-icons/fi'
import { FaWhatsapp, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

// ─── ADD YOUR IMAGES HERE ──────────────────────────────────────────────────────
// Replace `src: null` with a real image path like `src: '/gallery/match1.jpg'`
// or an imported asset like `src: img1`
const GALLERY_ITEMS = [
    { id: 1, src: null, category: 'Training', caption: 'Morning Net Session', sub: 'Intensive batting drills' },
    { id: 2, src: null, category: 'Match', caption: 'District Tournament Final', sub: 'Winning moment — 2024' },
    { id: 3, src: null, category: 'Ceremony', caption: 'Trophy Presentation', sub: 'State Champions Celebration' },
    { id: 4, src: null, category: 'Training', caption: 'Bowling Mechanics Workshop', sub: 'Spin & Pace coaching' },
    { id: 5, src: null, category: 'Match', caption: 'Night Match Under Lights', sub: 'Kings11 v/s District XI' },
    { id: 6, src: null, category: 'Ceremony', caption: 'Annual Award Night', sub: 'Best performer awards' },
    { id: 7, src: null, category: 'Training', caption: 'Fielding & Catching Drills', sub: 'Ground fielding session' },
    { id: 8, src: null, category: 'Match', caption: 'Youth Championship 2023', sub: 'Quarter-final victory' },
    { id: 9, src: null, category: 'Behind Scenes', caption: 'Team Strategy Huddle', sub: 'Pre-match analysis session' },
    { id: 10, src: null, category: 'Training', caption: 'Strength & Conditioning', sub: 'Fitness camp — Season 2024' },
    { id: 11, src: null, category: 'Match', caption: 'Opening Ceremony', sub: 'Inter-Academy League 2023' },
    { id: 12, src: null, category: 'Behind Scenes', caption: 'Coach Mentoring Session', sub: '1-on-1 player feedback' },
]

const CATEGORIES = ['All', 'Training', 'Match', 'Ceremony', 'Behind Scenes']

const CATEGORY_COLOR = {
    Training: '#00e57a',
    Match: '#ff9500',
    Ceremony: '#a78bfa',
    'Behind Scenes': '#38bdf8',
}

const animStyles = `
  @keyframes pulseGlow {
    0%   { opacity: 0.4; transform: scale(1); }
    50%  { opacity: 0.65; transform: scale(1.04); }
    100% { opacity: 0.4; transform: scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

export default function Gallery() {
    const router = useRouter()
    const [filter, setFilter] = useState('All')
    const [lightbox, setLightbox] = useState(null) // holds the item being previewed

    const shown = filter === 'All'
        ? GALLERY_ITEMS
        : GALLERY_ITEMS.filter(i => i.category === filter)

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#050a07', color: '#fff', overflowX: 'hidden' }}>
            <style>{animStyles}</style>

            {/* ─── Floating WhatsApp ─── */}
            <Box
                component="a"
                href="https://wa.me/919710572229?text=Hi%20Kings11%20Cricket%20Academy"
                target="_blank" rel="noreferrer"
                sx={{
                    position: 'fixed', bottom: 40, right: 40, zIndex: 1400,
                    width: 60, height: 60, borderRadius: '50%',
                    bgcolor: '#25D366', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 30px rgba(37,211,102,0.4)',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: 'scale(1.12) translateY(-5px)', bgcolor: '#1ebe57' },
                }}
            >
                <FaWhatsapp size={30} />
            </Box>

            {/* ─── Sticky Navbar ─── */}
            <Box sx={{
                position: 'sticky', top: 0, zIndex: 1200,
                bgcolor: 'rgba(5,10,7,0.85)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => router.push('/')}>
                            <Box component="img" src="/Logo.png" alt="Logo" sx={{ width: 40, height: 40, objectFit: 'contain' }} />
                            <Typography sx={{ fontWeight: 800, fontSize: 16, background: 'linear-gradient(90deg, #fff, #a3a3a3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: { xs: 'none', sm: 'block' } }}>
                                KINGS11
                            </Typography>
                        </Box>
                        <Button onClick={() => router.push('/')} startIcon={<FiArrowLeft />}
                            sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.2)', px: 3, py: 1, borderRadius: 8, fontWeight: 600, textTransform: 'none', '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' } }}>
                            Back to Home
                        </Button>
                    </Box>
                </Container>
            </Box>

            {/* ─── Hero Banner ─── */}
            <Box sx={{ position: 'relative', pt: { xs: 12, md: 16 }, pb: 10, textAlign: 'center', overflow: 'hidden' }}>
                <Box sx={{ position: 'absolute', top: '-10%', left: '15%', width: 600, height: 600, bgcolor: 'rgba(0,229,122,0.1)', borderRadius: '50%', filter: 'blur(120px)', animation: 'pulseGlow 7s ease-in-out infinite' }} />
                <Box sx={{ position: 'absolute', bottom: '-10%', right: '10%', width: 500, height: 500, bgcolor: 'rgba(255,149,0,0.08)', borderRadius: '50%', filter: 'blur(100px)', animation: 'pulseGlow 9s ease-in-out infinite' }} />

                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2.5, py: 1.2, mb: 4, borderRadius: 8, bgcolor: 'rgba(0,229,122,0.07)', border: '1px solid rgba(0,229,122,0.2)', color: '#00e57a' }}>
                        <FiCamera size={16} />
                        <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>Photo Gallery</Typography>
                    </Box>

                    <Typography sx={{ fontSize: { xs: 40, md: 64 }, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, mb: 3 }}>
                        Moments that{' '}
                        <Box component="span" sx={{ background: 'linear-gradient(90deg, #00e57a, #00b35f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                            Define Us
                        </Box>
                    </Typography>
                    <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: 'rgba(255,255,255,0.5)', maxWidth: 560, mx: 'auto', lineHeight: 1.8 }}>
                        From the crack of the willow to the roar of the crowd — every image tells a story of hard work and triumph at Kings11.
                    </Typography>
                </Container>
            </Box>

            {/* ─── Category Filter Pills ─── */}
            <Container maxWidth="lg" sx={{ mb: 8 }}>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                    {CATEGORIES.map(cat => (
                        <Button key={cat} onClick={() => setFilter(cat)}
                            sx={{
                                px: 3, py: 1.2, borderRadius: 8, fontWeight: 700, fontSize: 13, textTransform: 'none',
                                transition: 'all 0.3s ease',
                                bgcolor: filter === cat ? '#00e57a' : 'rgba(255,255,255,0.04)',
                                color: filter === cat ? '#041c10' : 'rgba(255,255,255,0.6)',
                                border: filter === cat ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                                '&:hover': { bgcolor: filter === cat ? '#00ff88' : 'rgba(255,255,255,0.08)', transform: 'translateY(-2px)' }
                            }}>
                            {cat}
                        </Button>
                    ))}
                </Box>
            </Container>

            {/* ─── Gallery Grid ─── */}
            <Container maxWidth="xl" sx={{ pb: 16 }}>
                <Grid container spacing={3}>
                    {shown.map((item, idx) => {
                        const accentColor = CATEGORY_COLOR[item.category] || '#00e57a'
                        return (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}
                                sx={{ animation: `fadeUp 0.4s ease ${idx * 0.05}s both` }}>
                                <Box
                                    onClick={() => setLightbox(item)}
                                    sx={{
                                        position: 'relative', borderRadius: 5, overflow: 'hidden', cursor: 'pointer',
                                        bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.4s ease',
                                        '&:hover': {
                                            transform: 'translateY(-8px) scale(1.01)',
                                            borderColor: accentColor,
                                            boxShadow: `0 20px 50px ${accentColor}25`,
                                        },
                                        '&:hover .card-overlay': { opacity: 1 },
                                        '&:hover .expand-icon': { opacity: 1, transform: 'scale(1)' },
                                    }}>

                                    {/* ── Image / Placeholder ── */}
                                    <Box sx={{
                                        width: '100%', aspectRatio: '4/3', bgcolor: '#0c1610', position: 'relative',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                                    }}>
                                        {item.src ? (
                                            <Box component="img" src={item.src} alt={item.caption}
                                                sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                        ) : (
                                            /* ── PLACEHOLDER — replace item.src with your image path ── */
                                            <>
                                                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.07, textAlign: 'center' }}>
                                                    <FiImage size={60} color={accentColor} />
                                                </Box>
                                                {/* Diagonal stripe pattern */}
                                                <Box sx={{
                                                    position: 'absolute', inset: 0,
                                                    backgroundImage: `repeating-linear-gradient(135deg, ${accentColor}06 0px, ${accentColor}06 1px, transparent 1px, transparent 30px)`,
                                                }} />
                                                {/* Corner accent triangle */}
                                                <Box sx={{ position: 'absolute', top: 0, right: 0, width: 0, height: 0, borderStyle: 'solid', borderWidth: '0 64px 64px 0', borderColor: `transparent ${accentColor}22 transparent transparent` }} />
                                                {/* Placeholder label */}
                                                <Typography sx={{ position: 'relative', zIndex: 2, fontSize: 11, fontWeight: 700, color: `${accentColor}60`, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                                                    Image Coming Soon
                                                </Typography>
                                            </>
                                        )}

                                        {/* Expand icon appears on hover */}
                                        <Box className="expand-icon" sx={{
                                            position: 'absolute', top: 12, right: 12,
                                            width: 34, height: 34, borderRadius: '50%',
                                            bgcolor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            color: '#fff', opacity: 0, transform: 'scale(0.7)',
                                            transition: 'all 0.3s ease',
                                        }}>
                                            <FiMaximize2 size={14} />
                                        </Box>
                                    </Box>

                                    {/* ── Caption Section ── */}
                                    <Box sx={{ p: 2.5 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                                            <Typography sx={{ fontSize: 15, fontWeight: 800, lineHeight: 1.3, flex: 1, pr: 1 }}>
                                                {item.caption}
                                            </Typography>
                                            <Box sx={{ px: 1.5, py: 0.5, borderRadius: 4, bgcolor: `${accentColor}15`, color: accentColor, fontSize: 10, fontWeight: 800, whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: 0.5, flexShrink: 0 }}>
                                                {item.category}
                                            </Box>
                                        </Box>
                                        <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                                            {item.sub}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

            {/* ─── Lightbox Modal ─── */}
            <Modal open={!!lightbox} onClose={() => setLightbox(null)} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2 }}>
                <Box sx={{
                    position: 'relative', maxWidth: 800, width: '100%', borderRadius: 6, overflow: 'hidden',
                    bgcolor: '#0c1610', border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8)', outline: 'none',
                }}>
                    {lightbox && (
                        <>
                            {/* Close button */}
                            <IconButton onClick={() => setLightbox(null)}
                                sx={{ position: 'absolute', top: 16, right: 16, zIndex: 10, bgcolor: 'rgba(0,0,0,0.6)', color: '#fff', backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(0,0,0,0.9)' } }}>
                                <FiX size={20} />
                            </IconButton>

                            {/* Full image / Placeholder */}
                            <Box sx={{ width: '100%', aspectRatio: '16/9', bgcolor: '#0a110d', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                                {lightbox.src ? (
                                    <Box component="img" src={lightbox.src} alt={lightbox.caption} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <>
                                        <Box sx={{
                                            position: 'absolute', inset: 0,
                                            backgroundImage: `repeating-linear-gradient(135deg, ${CATEGORY_COLOR[lightbox.category] || '#00e57a'}06 0px, ${CATEGORY_COLOR[lightbox.category] || '#00e57a'}06 1px, transparent 1px, transparent 40px)`,
                                        }} />
                                        <Box sx={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
                                            <FiImage size={72} color={`${CATEGORY_COLOR[lightbox.category] || '#00e57a'}40`} />
                                            <Typography sx={{ mt: 2, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase' }}>
                                                Image Coming Soon
                                            </Typography>
                                        </Box>
                                    </>
                                )}
                            </Box>

                            {/* Caption bar */}
                            <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                                <Box>
                                    <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 0.5 }}>{lightbox.caption}</Typography>
                                    <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{lightbox.sub}</Typography>
                                </Box>
                                <Box sx={{ px: 2, py: 1, borderRadius: 6, bgcolor: `${CATEGORY_COLOR[lightbox.category] || '#00e57a'}15`, color: CATEGORY_COLOR[lightbox.category] || '#00e57a', fontSize: 11, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                                    {lightbox.category}
                                </Box>
                            </Box>
                        </>
                    )}
                </Box>
            </Modal>

            {/* ─── Footer ─── */}
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.05)', py: 6, bgcolor: '#020403' }}>
                <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box component="img" src="/Logo.png" alt="Logo" sx={{ width: 30, height: 30, opacity: 0.5 }} />
                        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>© 2026 Kings11 Cricket Academy.</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 4 }}>
                        {['Privacy Policy', 'Terms of Service', 'Contact'].map(l => (
                            <Typography key={l} sx={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', cursor: 'pointer', '&:hover': { color: '#00e57a' } }}>{l}</Typography>
                        ))}
                    </Box>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, idx) => (
                            <Box key={idx} sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,255,255,0.4)', '&:hover': { bgcolor: '#00e57a', color: '#041c10' }, transition: 'all 0.3s ease' }}>
                                <Icon size={14} />
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>
        </Box>
    )
}