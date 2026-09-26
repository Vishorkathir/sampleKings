'use client';
import { useState, useEffect } from 'react';
import { Box, Container, Button, Typography, AppBar, Toolbar, Grid, IconButton, Drawer, List, ListItem } from '@mui/material';
import { useRouter } from 'next/navigation';

;
import { FiArrowRight, FiTarget, FiUsers, FiAward, FiPlay, FiMapPin, FiMail, FiPhone, FiCheckCircle, FiStar, FiActivity, FiShield } from 'react-icons/fi';
import { FaWhatsapp, FaInstagram, FaTwitter, FaFacebookF } from 'react-icons/fa';
import Logo from "../../assets/images/logo.jpg"
import heroBatsman from "../../assets/hero-batsman.png"
import trainingNets from "../../assets/training-nets.png"

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Programs', href: '#programs' },
  { label: 'Coaches', href: '#coaches' },
  { label: 'Contact', href: '#contact' },
];

export default function Hero() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <Box sx={{ bgcolor: '#060A07', color: '#fff', overflowX: 'hidden' }}>
      {/* WhatsApp */}
      <Box component="a" href="https://wa.me/919710572229?text=Hi%20Kings11%20Cricket%20Academy" target="_blank" rel="noreferrer"
        sx={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1400, width: 56, height: 56, borderRadius: '50%', bgcolor: 'oklch(0.72 0.19 145)', color: '#fff', display: 'grid', placeItems: 'center', boxShadow: '0 10px 28px oklch(0.6 0.15 145 / 0.35)', transition: 'transform 260ms var(--ease-out)', '&:hover': { transform: 'translateY(-2px)' }, '&:active': { transform: 'translateY(0)' } }}>
        <FaWhatsapp size={26} />
      </Box>

      {/* Nav */}
      <AppBar position="fixed" elevation={0} sx={{ bgcolor: scrolled ? 'rgba(6,10,7,0.92)' : 'transparent', backdropFilter: scrolled ? 'blur(14px)' : 'none', borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none', transition: 'all 360ms var(--ease-out-quint)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: scrolled ? 0.5 : 1, minHeight: { xs: 64, md: 72 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }} onClick={() => window.scrollTo(0, 0)}>
              <Box component="img" src={Logo} alt="Kings11 logo" sx={{ width: 40, height: 40, borderRadius: '9px', objectFit: 'cover', border: '1px solid rgba(255,255,255,0.12)' }} />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em', lineHeight: 1 }}>KINGS11</Typography>
                <Typography sx={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', color: 'oklch(0.84 0.18 158)', lineHeight: 1 }}>CRICKET ACADEMY</Typography>
              </Box>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3 }}>
              {navLinks.map((l) => (
                <Typography key={l.href} component="a" href={l.href} sx={{ color: 'rgba(255,255,255,0.72)', textDecoration: 'none', fontSize: 13.5, fontWeight: 600, letterSpacing: '-0.01em', '&:hover': { color: 'oklch(0.84 0.18 158)' } }}>{l.label}</Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Button onClick={() => router.push('/login')} sx={{ display: { xs: 'none', sm: 'inline-flex' }, color: '#fff', border: '1px solid rgba(255,255,255,0.16)', px: 2.4, borderRadius: '10px', fontWeight: 700, fontSize: 13 }}>Admin</Button>
              <Button onClick={() => router.push('/login')} endIcon={<FiArrowRight />} sx={{ bgcolor: 'oklch(0.84 0.18 158)', color: 'oklch(0.16 0.02 260)', px: 2.8, borderRadius: '10px', fontWeight: 800, fontSize: 13.5, '&:hover': { bgcolor: 'oklch(0.79 0.18 158)' } }}>Student Login</Button>
              <IconButton onClick={() => setMobileOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff', border: '1px solid rgba(255,255,255,0.12)' }}><Box sx={{ fontSize: 18 }}>☰</Box></IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ sx: { width: 300, bgcolor: '#0A1210', color: '#fff', borderLeft: '1px solid rgba(255,255,255,0.06)' } }}>
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}><Typography sx={{ fontWeight: 800 }}>Menu</Typography><IconButton onClick={() => setMobileOpen(false)} sx={{ color: '#fff' }}>✕</IconButton></Box>
          <List sx={{ p: 0 }}>
            {navLinks.map((l) => (<ListItem key={l.href} component="a" href={l.href} onClick={() => setMobileOpen(false)} sx={{ color: 'rgba(255,255,255,0.8)', py: 1.6, borderBottom: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', fontWeight: 600 }}>{l.label}</ListItem>))}
            <ListItem sx={{ px: 0, py: 2 }}><Typography onClick={() => { router.push('/login'); setMobileOpen(false); }} sx={{ color: 'oklch(0.84 0.18 158)', fontWeight: 800, cursor: 'pointer' }}>Sign in →</Typography></ListItem>
          </List>
        </Box>
      </Drawer>

      {/* HERO — Cinematic field, left copy, right photographic */}
      <Box sx={{ position: 'relative', minHeight: { xs: 'auto', md: '100svh' }, display: 'flex', alignItems: 'center', pt: { xs: 10, md: 0 }, pb: { xs: 6, md: 0 }, bgcolor: '#050A07', overflow: 'hidden' }}>
        <Box component="img" src={heroBatsman} alt="Cricket batsman under floodlights" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', opacity: 0.52 }} />
        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(5,10,7,0.98) 0%, rgba(5,10,7,0.92) 36%, rgba(5,10,7,0.46) 68%, rgba(5,10,7,0.18) 100%)' }} />
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 220, background: 'linear-gradient(to top, rgba(5,10,7,1) 0%, transparent 100%)' }} />
        <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 2, py: { xs: 4, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              {/* single, intentional kicker — not repeated */}
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 1.4, py: 0.7, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'oklch(0.84 0.18 158)', mb: 3 }}>
                <FiActivity size={14} />
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.10em' }}>EST. 2009 · THURAIYUR</Typography>
              </Box>
              <Typography variant="h1" sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 'clamp(2.6rem, 6vw, 4.6rem)', fontWeight: 800, lineHeight: 0.92, letterSpacing: '-0.03em', mb: 2, color: '#fff', maxWidth: '11ch' }}>
                Forge your<br />
                <Box component="span" sx={{ color: 'oklch(0.84 0.18 158)' }}>cricket</Box> legacy.
              </Typography>
              <Typography sx={{ fontSize: { xs: 15.5, md: 16.5 }, lineHeight: 1.7, color: 'rgba(255,255,255,0.68)', maxWidth: '52ch', mb: 4, textWrap: 'pretty' }}>
                Modern nets, match simulation, and coaches who've stayed at the crease. We build technique, temperament, and the courage to walk out first.
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2, flexWrap: 'wrap', mb: 5 }}>
                <Button onClick={() => router.push('/login')} endIcon={<FiArrowRight />} sx={{ bgcolor: 'oklch(0.84 0.18 158)', color: '#0a1f14', px: 3.4, py: 1.5, borderRadius: '10px', fontWeight: 800, fontSize: 15, '&:hover': { bgcolor: 'oklch(0.79 0.18 158)' } }}>Start your trial</Button>
                <Button onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })} startIcon={<FiPlay />} sx={{ color: '#fff', border: '1px solid rgba(255,255,255,0.16)', px: 3, py: 1.5, borderRadius: '10px', fontWeight: 700, bgcolor: 'rgba(255,255,255,0.04)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>Watch a session</Button>
              </Box>
              {/* proof strip — not ghost cards */}
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 1.2, maxWidth: 520 }}>
                {[
                  { v: '1,284', l: 'Players coached' },
                  { v: '15 yrs', l: 'On this ground' },
                  { v: '4.9★', l: 'Parent rating' },
                ].map((s) => (
                  <Box key={s.l} sx={{ py: 1.6, px: 1.4, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
                    <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 22, color: '#fff' }}>{s.v}</Typography>
                    <Typography sx={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.52)', letterSpacing: '0.04em' }}>{s.l}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              {/* quiet credential — replaces floaty neon orb + glass card jungle */}
              <Box sx={{ width: 'min(420px, 100%)', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', bgcolor: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)' }}>
                <Box sx={{ p: 2.2, display: 'flex', gap: 1.4, alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <Box sx={{ width: 44, height: 44, borderRadius: '10px', bgcolor: 'oklch(0.84 0.18 158)', display: 'grid', placeItems: 'center', color: '#0a1f14' }}><FiTarget size={20} /></Box>
                  <Box>
                    <Typography sx={{ fontWeight: 800, fontSize: 13, color: '#fff' }}>Next intake · 24 Nov</Typography>
                    <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.58)' }}>Lords Ground, Pitch 2 — 24 balls assessment</Typography>
                  </Box>
                  <Box sx={{ ml: 'auto', width: 8, height: 8, borderRadius: '50%', bgcolor: 'oklch(0.72 0.19 145)', boxShadow: '0 0 10px oklch(0.72 0.19 145)' }} />
                </Box>
                <Box sx={{ p: 2.2, display: 'flex', alignItems: 'center', gap: 1.2, color: 'rgba(255,255,255,0.66)', fontSize: 12, fontWeight: 600 }}>
                  <FiAward /> BCCI-certified coaches · Video analysis · Match temperament
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ABOUT — photographic, asymmetric, no centered trophy */}
      <Box id="about" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#F7F8F7', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', bgcolor: '#0B1410', border: '1px solid rgba(0,0,0,0.08)', aspectRatio: '4/3' }}>
                <Box component="img" src={trainingNets} alt="Training nets at dusk, Thuraiyur" sx={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.94 }} />
                <Box sx={{ position: 'absolute', bottom: 16, left: 16, px: 1.8, py: 1.2, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.96)', border: '1px solid rgba(0,0,0,0.08)' }}>
                  <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: 'oklch(0.52 0.20 260)' }}> SINCE 2009</Typography>
                  <Typography sx={{ fontSize: 22, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>Thuraiyur, Trichy</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1.4, alignItems: 'center', mb: 1.6 }}>
                <Box sx={{ width: 36, height: 2, bgcolor: 'oklch(0.52 0.20 260)' }} />
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', color: 'oklch(0.52 0.20 260)' }}>FIELD NOTES</Typography>
              </Box>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 'clamp(1.9rem, 3.6vw, 2.8rem)', fontWeight: 800, lineHeight: 1.02, color: 'var(--ink)', mb: 2 }}>
                Passion, with a<br />forward defence.
              </Typography>
              <Typography sx={{ color: 'var(--muted)', lineHeight: 1.75, mb: 3, maxWidth: '60ch' }}>
                Kings11 began under a single floodlight. Fifteen years later the light is brighter and the principles are the same: stay low, watch the ball, respect the game, and earn every run.
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, maxWidth: 560 }}>
                {['Elite net sessions', 'Match simulation', 'Temperament work', 'Video & data'].map((f) => (
                  <Box key={f} sx={{ display: 'flex', gap: 1, alignItems: 'center', py: 0.9, px: 1.2, borderRadius: '10px', bgcolor: 'oklch(0.985 0.01 255)', border: '1px solid oklch(0.92 0.02 260)' }}>
                    <FiCheckCircle size={14} color="oklch(0.52 0.20 260)" />
                    <Typography sx={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{f}</Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* PROGRAMS — asymmetric, not 4 identical cards */}
      <Box id="programs" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#0B1410', color: '#fff', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3, alignItems: 'end', flexWrap: 'wrap', mb: 5 }}>
            <Box sx={{ maxWidth: 640 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.14em', color: 'oklch(0.84 0.18 158)', mb: 1 }}>PATHWAYS</Typography>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 'clamp(2rem, 3.6vw, 3rem)', fontWeight: 800, lineHeight: 0.98 }}>Four ways in. One way forward.</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, mt: 1.4, maxWidth: '62ch' }}>
                Clear entry points by age and ambition. Each programme is a full season — not a weekend clinic.
              </Typography>
            </Box>
            <Button onClick={() => router.push('/login')} sx={{ color: 'rgba(255,255,255,0.88)', border: '1px solid rgba(255,255,255,0.14)', px: 2.8, borderRadius: '10px', fontWeight: 800, '&:hover': { borderColor: 'rgba(255,255,255,0.24)', bgcolor: 'rgba(255,255,255,0.06)' } }}>Compare programmes →</Button>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.2fr 0.8fr', lg: '1.2fr 0.8fr 1fr' }, gap: 1.6 }}>
            {/* featured */}
            <Box sx={{ borderRadius: '16px', p: 3.2, bgcolor: 'oklch(0.97 0.02 85)', color: 'oklch(0.18 0.04 45)', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', minHeight: 340 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: '#0B1410', color: 'oklch(0.84 0.18 158)', display: 'grid', placeItems: 'center' }}><FiTarget size={22} /></Box>
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', bgcolor: '#0B1410', color: '#fff', px: 1.4, py: 0.7, borderRadius: '999px' }}>11–15 YRS · FLAGSHIP</Typography>
              </Box>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 26, fontWeight: 800, lineHeight: 1 }}>Development Squad</Typography>
              <Typography sx={{ fontSize: 14, lineHeight: 1.65, opacity: 0.72, mt: 1.2, maxWidth: '48ch' }}>Where pace and spin arrive. Technique under pressure, running between wickets, and learning to build an innings.</Typography>
              <Box sx={{ mt: 'auto', display: 'flex', gap: 1, pt: 3 }}>
                <Button sx={{ bgcolor: '#0B1410', color: '#fff', borderRadius: '10px', px: 2.6, fontWeight: 800, '&:hover': { bgcolor: '#111f16' } }}>Apply for trial</Button>
                <Button sx={{ color: 'oklch(0.32 0.05 45)', fontWeight: 800 }}>Syllabus →</Button>
              </Box>
            </Box>
            {/* stack */}
            <Box sx={{ display: 'grid', gap: 1.6 }}>
              {[
                { t: 'Grassroots', a: '6–10 yrs', d: 'Grip, stance, balance — and joy.', icon: <FiUsers size={18} /> },
                { t: 'Tactical Labs', a: 'All ages', d: 'Death bowling. Playing spin. 1:1.', icon: <FiShield size={18} /> },
              ].map((c) => (
                <Box key={c.t} sx={{ borderRadius: '16px', p: 2.6, bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                  <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'center', mb: 1 }}><Box sx={{ width: 32, height: 32, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center' }}>{c.icon}</Box><Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: 'oklch(0.84 0.18 158)' }}>{c.a}</Typography></Box>
                  <Typography sx={{ fontWeight: 800, fontSize: 18 }}>{c.t}</Typography>
                  <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.64)', lineHeight: 1.6 }}>{c.d}</Typography>
                </Box>
              ))}
            </Box>
            {/* elite */}
            <Box sx={{ borderRadius: '16px', p: 3.2, bgcolor: '#111A15', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', flexDirection: 'column', minHeight: 340 }}>
              <Box sx={{ width: 48, height: 48, borderRadius: '12px', bgcolor: 'oklch(0.84 0.18 158)', color: '#0B1410', display: 'grid', placeItems: 'center', mb: 2.2 }}><FiStar size={22} /></Box>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 22, fontWeight: 800, color: '#fff' }}>Elite Performance</Typography>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.06em', color: 'oklch(0.84 0.18 158)', mb: 1 }}>16+ · SELECTION</Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65 }}>Conditioning, nets under lights, and preparation for district & beyond. By invitation.</Typography>
              <Box sx={{ mt: 'auto', pt: 2, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 1.4, flexWrap: 'wrap' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.52)' }}>6:1 ATHLETE : COACH</Typography>
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.52)' }}>· VIDEO REVIEW</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* WALL — restrained, not icon parade */}
      <Box id="achievements" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F7F8F7', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 2, mb: 3 }}>
            <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 'clamp(1.8rem, 3vw, 2.6rem)', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--ink)' }}>Making waves, locally.</Typography>
            <Button onClick={() => router.push('/gallery')} variant="outlined" sx={{ borderColor: 'var(--border)', color: 'var(--ink)', borderRadius: '10px', fontWeight: 800, display: { xs: 'none', sm: 'inline-flex' } }}>View gallery</Button>
          </Box>
          <Box sx={{ borderRadius: '16px', p: { xs: 2.4, md: 4 }, bgcolor: 'var(--paper)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.1fr 1fr' }, gap: 3 }}>
            <Box>
              <Typography sx={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', color: 'var(--muted)', mb: 1 }}>TROPHIES & TOURNAMENTS</Typography>
              <Typography sx={{ fontSize: 15, lineHeight: 1.65, color: 'var(--ink-2)', maxWidth: '52ch' }}>
                District selections, U14 semi-finals, and a habit of turning close games around. The cabinet is growing — come add to it.
              </Typography>
              <Box sx={{ display: 'flex', gap: 0.8, mt: 2.4 }}>
                {['District U14 SF', 'Trichy League — Runners', 'School Zone Champions'].map((t) => (
                  <Box key={t} sx={{ px: 1.2, py: 0.6, borderRadius: '999px', bgcolor: 'var(--surface)', border: '1px solid var(--border)', fontSize: 11, fontWeight: 700, color: 'var(--ink-2)' }}>{t}</Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ borderRadius: '12px', bgcolor: 'var(--surface)', border: '1px dashed var(--border)', p: 2.6, display: 'grid', placeItems: 'center', minHeight: 140 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', color: 'var(--muted)' }}>GALLERY PREVIEW SOON</Typography>
              <Typography sx={{ fontSize: 13, color: 'var(--muted)', mt: 0.6 }}>Full showcase assembling · <Box component="span" onClick={() => router.push('/gallery')} sx={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 800 }}>open gallery →</Box></Typography>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* COACHES — varied, not 4 equal */}
      <Box id="coaches" sx={{ py: { xs: 8, md: 12 }, bgcolor: '#0B1410', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', flexWrap: 'wrap', gap: 2, mb: 4 }}>
            <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 'clamp(1.9rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#fff' }}>Coaches who stay late.</Typography>
            <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.52)' }}>BCCI · LEVEL II & III · SPORTS SCIENCE</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.35fr 0.9fr 0.9fr' }, gap: 1.6 }}>
            <Box sx={{ borderRadius: '16px', overflow: 'hidden', bgcolor: '#0F1F15', border: '1px solid rgba(255,255,255,0.08)', display: 'grid', gridTemplateColumns: '1.1fr 1fr' }}>
              <Box sx={{ p: 3.2, color: '#fff' }}>
                <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.10em', color: 'oklch(0.84 0.18 158)' }}>HEAD COACH</Typography>
                <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 26, fontWeight: 800, mt: 0.6 }}>Dhanasekaran M</Typography>
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.64)', lineHeight: 1.6, mt: 1 }}>15 years, still obsessed with front-foot stride. Runs the marquee sessions at 6am.</Typography>
                <Box sx={{ display: 'flex', gap: 0.8, mt: 2 }}><Box sx={{ px: 1, py: 0.4, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.08)', fontSize: 11, fontWeight: 800 }}>Tactics</Box><Box sx={{ px: 1, py: 0.4, borderRadius: '999px', bgcolor: 'rgba(255,255,255,0.08)', fontSize: 11, fontWeight: 800 }}>Temperament</Box></Box>
              </Box>
              <Box sx={{ bgcolor: '#0D2517', display: 'grid', placeItems: 'center', borderLeft: '1px solid rgba(255,255,255,0.06)' }}><Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontWeight: 800, fontSize: 72, color: 'rgba(255,255,255,0.14)' }}>DM</Typography></Box>
            </Box>
            {[
              { n: 'Priya Singh', r: 'Performance Analyst', k: 'Video & data · 8 yrs', bg: 'rgba(255,255,255,0.04)' },
              { n: 'Amit Patel', r: 'Pace Lab', k: 'Seam & swing · 10 yrs', bg: 'rgba(255,255,255,0.04)' },
            ].map((c) => (
              <Box key={c.n} sx={{ borderRadius: '16px', p: 2.6, bgcolor: c.bg, border: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                <Typography sx={{ fontWeight: 800, fontSize: 15 }}>{c.n}</Typography>
                <Typography sx={{ fontSize: 12, fontWeight: 800, color: 'oklch(0.84 0.18 158)', letterSpacing: '0.02em' }}>{c.r}</Typography>
                <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.62)', mt: 1 }}>{c.k}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* CONTACT — real form, not fake boxes, with image */}
      <Box id="contact" sx={{ py: { xs: 8, md: 10 }, bgcolor: '#F7F8F7', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="lg">
          <Box sx={{ borderRadius: '16px', overflow: 'hidden', bgcolor: 'var(--paper)', border: '1px solid var(--border)', display: 'grid', gridTemplateColumns: { xs: '1fr', md: '0.95fr 1.05fr' } }}>
            <Box sx={{ p: { xs: 3, md: 5 }, bgcolor: '#0B1410', color: '#fff' }}>
              <Typography sx={{ fontFamily: '"Bricolage Grotesque"', fontSize: 28, fontWeight: 800, color: '#fff' }}>Step up to the crease.</Typography>
              <Typography sx={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, mt: 1.4, maxWidth: '46ch' }}>Enquiries answered within a day. Visit the nets any evening after 5pm — no appointment needed.</Typography>
              <Box sx={{ display: 'grid', gap: 1.6, mt: 4 }}>
                {[
                  { icon: <FiMapPin />, t: 'Thuraiyur, Trichy — behind bus stand' },
                  { icon: <FiPhone />, t: '+91 97105 72229' },
                  { icon: <FiMail />, t: 'kings11sportsacademy@gmail.com' },
                ].map((r) => (
                  <Box key={r.t} sx={{ display: 'flex', gap: 1.2, alignItems: 'center', color: 'rgba(255,255,255,0.84)', fontSize: 13.5, fontWeight: 600 }}>
                    <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: 'rgba(255,255,255,0.08)', display: 'grid', placeItems: 'center', color: 'oklch(0.84 0.18 158)' }}>{r.icon}</Box>
                    {r.t}
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Typography sx={{ fontWeight: 800, fontSize: 14, color: 'var(--ink)' }}>Quick enquiry</Typography>
              <Typography sx={{ fontSize: 12.5, color: 'var(--muted)', mb: 2.2 }}>We’ll get back within 12 hours.</Typography>
              <Box component="form" onSubmit={(e) => { e.preventDefault(); (e.target as HTMLFormElement).reset(); }} sx={{ display: 'grid', gap: 1.2 }}>
                <Box component="input" name="name" placeholder="Full name" required sx={{ width: '100%', px: 1.4, py: 1.2, borderRadius: '10px', border: '1px solid var(--border)', bgcolor: 'var(--surface)', fontSize: 14, outline: 'none', '&:focus': { borderColor: 'var(--primary)', bgcolor: '#fff' } }} />
                <Box component="input" name="email" type="email" placeholder="Email" required sx={{ width: '100%', px: 1.4, py: 1.2, borderRadius: '10px', border: '1px solid var(--border)', bgcolor: 'var(--surface)', fontSize: 14, outline: 'none', '&:focus': { borderColor: 'var(--primary)', bgcolor: '#fff' } }} />
                <Box component="textarea" name="message" placeholder="Age group, experience, what you want to work on" rows={3} sx={{ width: '100%', px: 1.4, py: 1.2, borderRadius: '10px', border: '1px solid var(--border)', bgcolor: 'var(--surface)', fontSize: 14, outline: 'none', resize: 'vertical', '&:focus': { borderColor: 'var(--primary)', bgcolor: '#fff' } }} />
                <Button type="submit" sx={{ bgcolor: 'var(--primary)', color: '#fff', borderRadius: '10px', py: 1.2, fontWeight: 800, mt: 0.6, '&:hover': { bgcolor: 'var(--primary-hover)' } }}>Send message</Button>
                <Typography sx={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>Or WhatsApp us directly → green button</Typography>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.08)', py: 3, bgcolor: '#070A08', color: 'rgba(255,255,255,0.48)' }}>
        <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', gap: 1.6, alignItems: 'center' }}><Box component="img" src="/Logo.png" alt="" sx={{ width: 26, height: 26, borderRadius: '7px', opacity: 0.9 }} /><Typography sx={{ fontSize: 12, fontWeight: 700 }}>© 2026 Kings11 Cricket Academy</Typography></Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (<Box key={i} component="a" href="#" sx={{ width: 36, height: 36, borderRadius: '999px', border: '1px solid rgba(255,255,255,0.1)', display: 'grid', placeItems: 'center', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: 'oklch(0.84 0.18 158)', borderColor: 'rgba(255,255,255,0.18)' } }}><Icon size={13} /></Box>))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
}