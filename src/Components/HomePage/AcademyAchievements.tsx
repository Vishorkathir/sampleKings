// @ts-nocheck
import { useState } from 'react'
import {
  Box, Container, Typography, Grid, Button,
  AppBar, Toolbar, Tabs, Tab, IconButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiArrowRight, FiTrendingUp, FiUsers, FiAward, FiZap } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { FaWhatsapp } from 'react-icons/fa'

const TABS = ['Tournament Victories', 'Player Milestones', 'Academy Records']

const ACHIEVEMENTS = {
  tournaments: [
    { title: 'National School Cricket Championship', year: 2024, position: '🥇 1st Place', details: 'Won the national championship with stellar performance in all matches.', color: '#00e57a' },
    { title: 'State Cricket Championship', year: 2024, position: '👑 State Champions', details: 'Dominated state-level competition with an undefeated streak throughout.', color: '#ff9500' },
    { title: 'District Cricket Tournament', year: 2024, position: '🌟 Tournament Winners', details: 'Impressive victory in district tournament with record-breaking scores.', color: '#00e57a' },
    { title: 'Inter-Academy Cricket League', year: 2023, position: '🥈 1st Runner-up', details: 'Strong performance against top academies across the region.', color: '#ff9500' },
    { title: 'Youth Cricket Championship', year: 2023, position: '🚀 Champions', details: 'Victorious in youth-level cricket competition showcasing young talent.', color: '#00e57a' },
    { title: 'Annual Academy Championship', year: 2023, position: '🎖️ Winners', details: 'Best performers selected for advanced training programs nationwide.', color: '#ff9500' },
  ],
  playerMilestones: [
    { title: 'National Team Selection', year: 2024, position: 'Arjun Sharma', details: 'Fast bowler selected for the national cricket team at just 17 years of age.', color: '#00e57a' },
    { title: 'U-19 National Squad', year: 2024, position: '3 Players Selected', details: 'Three academy students called up to the U-19 national squad simultaneously.', color: '#ff9500' },
    { title: 'IPL Auction Pick', year: 2023, position: 'Virat Singh', details: 'Former student picked up by a franchise in the IPL auction at age 19.', color: '#00e57a' },
    { title: 'International Training Camp', year: 2023, position: '5 Players', details: 'Academy students participated in an elite international cricket training camp.', color: '#ff9500' },
    { title: 'State Team Players', year: 2024, position: '20+ Players', details: 'Multiple students simultaneously active across state cricket teams.', color: '#00e57a' },
    { title: 'Best Batsman Award', year: 2023, position: 'Neha Gupta', details: 'Highest run-scorer in the national youth championship.', color: '#ff9500' },
  ],
  records: [
    { title: 'Highest Team Score', year: 2024, position: '285 / 25 overs', details: 'Established academy record in the district tournament final.', color: '#00e57a' },
    { title: 'Best Bowling Figures', year: 2024, position: '6 wickets / 12 runs', details: 'Best bowling figures in academy history by spinner Rajesh Patel.', color: '#ff9500' },
    { title: 'Fastest Half-Century', year: 2024, position: '18 balls', details: 'Quickest fifty on record in academy matches by Virat Singh.', color: '#00e57a' },
    { title: 'Most Catches in Tournament', year: 2023, position: '12 catches', details: 'Best individual fielding performance in the national championship.', color: '#ff9500' },
    { title: 'Consecutive Wins Streak', year: 2024, position: '15 matches', details: 'Undefeated streak achieved across the competitive cricket circuit.', color: '#00e57a' },
    { title: 'Players Developed', year: 2024, position: '50+ Alumni', details: 'More than 50 alumni now playing professional cricket at various levels.', color: '#ff9500' },
  ],
}

const STATS = [
  { val: '15+', label: 'Years of Heritage', icon: <FiAward size={22} /> },
  { val: '500+', label: 'Students Trained', icon: <FiUsers size={22} /> },
  { val: '50+', label: 'Professional Alumni', icon: <FiTrendingUp size={22} /> },
  { val: '20+', label: 'Expert Coaches', icon: <FiZap size={22} /> },
]

export default function AcademyAchievements() {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  const current = Object.values(ACHIEVEMENTS)[tab]

  const animStyles = `
    @keyframes pulseGlow {
      0% { opacity: 0.5; transform: scale(1); }
      50% { opacity: 0.75; transform: scale(1.04); }
      100% { opacity: 0.5; transform: scale(1); }
    }
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#050a07', color: '#fff', overflowX: 'hidden' }}>
      <style>{animStyles}</style>

      {/* Floating WhatsApp */}
      <Box
        component="a"
        href="https://wa.me/919710572229?text=Hi%20Kings11%20Cricket%20Academy,%20I%20would%20like%20to%20know%20more%20about%20the%20academy."
        target="_blank" rel="noreferrer"
        sx={{
          position: 'fixed', bottom: 40, right: 40, zIndex: 1400,
          width: 60, height: 60, borderRadius: '50%',
          bgcolor: '#25D366', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 30px rgba(37,211,102,0.4)', transition: 'all 0.3s ease',
          '&:hover': { transform: 'scale(1.1) translateY(-5px)', bgcolor: '#1ebe57' },
        }}
      >
        <FaWhatsapp size={30} />
      </Box>

      {/* ─── STICKY NAVBAR ─── */}
      <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'rgba(5,10,7,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => navigate('/')}>
              <Box component="img" src="/Logo.png" alt="Logo" sx={{ width: 40, height: 40, objectFit: 'contain' }} />
              <Typography sx={{ fontWeight: 800, fontSize: 16, background: 'linear-gradient(90deg, #fff, #a3a3a3)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: { xs: 'none', sm: 'block' } }}>
                KINGS11
              </Typography>
            </Box>
            <Button onClick={() => navigate('/')} startIcon={<FiArrowLeft />}
              sx={{
                color: '#fff', border: '1px solid rgba(255,255,255,0.2)',
                px: 3, py: 1, borderRadius: 8, fontWeight: 600, textTransform: 'none',
                '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
              }}>
              Back to Home
            </Button>
          </Toolbar>
        </Container>
      </AppBar>

      {/* ─── HERO BANNER ─── */}
      <Box sx={{ position: 'relative', py: { xs: 12, md: 18 }, textAlign: 'center', overflow: 'hidden' }}>
        {/* Background glow orbs */}
        <Box sx={{ position: 'absolute', top: '0%', left: '20%', width: 600, height: 600, bgcolor: 'rgba(0,229,122,0.12)', borderRadius: '50%', filter: 'blur(120px)', animation: 'pulseGlow 7s ease-in-out infinite' }} />
        <Box sx={{ position: 'absolute', bottom: '0%', right: '10%', width: 500, height: 500, bgcolor: 'rgba(255,149,0,0.08)', borderRadius: '50%', filter: 'blur(100px)', animation: 'pulseGlow 9s ease-in-out infinite' }} />

        <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 1, mb: 4, borderRadius: 8, bgcolor: 'rgba(0,229,122,0.08)', border: '1px solid rgba(0,229,122,0.2)', color: '#00e57a' }}>
            <FiAward size={16} />
            <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
              Hall of Excellence
            </Typography>
          </Box>
          <Typography sx={{ fontSize: { xs: 40, md: 64 }, fontWeight: 900, lineHeight: 1.1, letterSpacing: -1, mb: 3 }}>
            Our{' '}
            <Box component="span" sx={{ background: 'linear-gradient(90deg, #00e57a, #00b35f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trophies
            </Box>
            {' '}&{' '}
            <Box component="span" sx={{ background: 'linear-gradient(90deg, #ff9500, #e07800)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Triumphs
            </Box>
          </Typography>
          <Typography sx={{ fontSize: { xs: 16, md: 18 }, color: 'rgba(255,255,255,0.55)', maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
            A legacy built through discipline, dedication, and the relentless pursuit of excellence. Celebrating every player who wore our colours.
          </Typography>
        </Container>
      </Box>

      {/* ─── STATS STRIP ─── */}
      <Container maxWidth="lg" sx={{ mb: 10 }}>
        <Grid container spacing={3}>
          {STATS.map((s, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Box sx={{
                p: 3, borderRadius: 4, textAlign: 'center',
                background: 'linear-gradient(145deg, rgba(255,255,255,0.03), rgba(255,255,255,0))',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.3s ease',
                '&:hover': { borderColor: '#00e57a', transform: 'translateY(-6px)', boxShadow: '0 12px 40px rgba(0,229,122,0.1)' }
              }}>
                <Box sx={{ color: '#00e57a', mb: 1, display: 'flex', justifyContent: 'center' }}>{s.icon}</Box>
                <Typography sx={{ fontSize: { xs: 28, md: 38 }, fontWeight: 900, color: '#00e57a' }}>{s.val}</Typography>
                <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 600, mt: 0.5 }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── TABBED ACHIEVEMENT CARDS ─── */}
      <Container maxWidth="xl" sx={{ pb: 16 }}>
        {/* Category Tabs */}
        <Box sx={{
          display: 'flex', gap: 2, mb: 8, pb: 2, flexWrap: 'wrap',
          borderBottom: '1px solid rgba(255,255,255,0.06)'
        }}>
          {TABS.map((label, i) => (
            <Button key={i} onClick={() => setTab(i)}
              sx={{
                px: 3, py: 1.2, borderRadius: 8, fontWeight: 700, fontSize: 14, textTransform: 'none',
                transition: 'all 0.3s ease',
                bgcolor: tab === i ? '#00e57a' : 'rgba(255,255,255,0.04)',
                color: tab === i ? '#041c10' : 'rgba(255,255,255,0.6)',
                border: tab === i ? '1px solid transparent' : '1px solid rgba(255,255,255,0.08)',
                '&:hover': {
                  bgcolor: tab === i ? '#00ff88' : 'rgba(255,255,255,0.08)',
                  transform: 'translateY(-2px)'
                }
              }}>
              {label}
            </Button>
          ))}
        </Box>

        {/* Cards Grid */}
        <Grid container spacing={4}>
          {current.map((item, idx) => (
            <Grid item xs={12} sm={6} xl={4} key={idx}>
              <Box sx={{
                position: 'relative', height: '100%', p: 4, borderRadius: 6,
                bgcolor: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                overflow: 'hidden', transition: 'all 0.4s ease',
                '&:hover': {
                  transform: 'translateY(-10px)',
                  borderColor: item.color,
                  boxShadow: `0 24px 50px ${item.color}25`,
                  bgcolor: 'rgba(255,255,255,0.04)'
                }
              }}>
                {/* Top-right year badge */}
                <Box sx={{ position: 'absolute', top: 24, right: 24, px: 2, py: 0.8, borderRadius: 6, bgcolor: `${item.color}15`, color: item.color, fontSize: 12, fontWeight: 800 }}>
                  {item.year}
                </Box>

                {/* Glow accent */}
                <Box sx={{ position: 'absolute', top: 0, left: 0, width: 120, height: 120, background: `radial-gradient(circle at top left, ${item.color}20, transparent)`, borderRadius: 6 }} />

                {/* Icon letter avatar */}
                <Box sx={{ width: 60, height: 60, borderRadius: 4, bgcolor: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, fontSize: 28, fontWeight: 900 }}>
                  <FiAward size={28} />
                </Box>

                <Typography sx={{ fontSize: 20, fontWeight: 800, mb: 1.5, lineHeight: 1.3, pr: 6 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 13, fontWeight: 800, color: item.color, mb: 2, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  {item.position}
                </Typography>
                <Typography sx={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
                  {item.details}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ─── CTA SECTION ─── */}
      <Container maxWidth="lg" sx={{ pb: 16 }}>
        <Box sx={{
          borderRadius: 8, p: { xs: 6, md: 10 }, textAlign: 'center', position: 'relative', overflow: 'hidden',
          background: 'linear-gradient(135deg, #05140a 0%, #0c2b18 100%)',
          border: '1px solid rgba(0,229,122,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
        }}>
          <Box sx={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, bgcolor: 'rgba(0,229,122,0.08)', borderRadius: '50%', filter: 'blur(80px)', animation: 'pulseGlow 8s infinite' }} />
          <Box sx={{ position: 'relative', zIndex: 2 }}>
            <Typography sx={{ fontSize: { xs: 30, md: 44 }, fontWeight: 900, mb: 3 }}>
              Write Your Own Chapter.<br />
              <Box component="span" sx={{ background: 'linear-gradient(90deg, #00e57a, #00b35f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Start Today.
              </Box>
            </Typography>
            <Typography sx={{ color: 'rgba(255,255,255,0.55)', fontSize: 17, maxWidth: 550, mx: 'auto', mb: 5, lineHeight: 1.8 }}>
              Join the academy, train under elite coaches, and become part of a legacy that keeps growing every season.
            </Typography>
            <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button onClick={() => navigate('/')} endIcon={<FiArrowRight />}
                sx={{
                  bgcolor: '#00e57a', color: '#041c10', px: 5, py: 2, borderRadius: 8, fontWeight: 800, fontSize: 16, textTransform: 'none',
                  boxShadow: '0 0 30px rgba(0,229,122,0.3)', '&:hover': { bgcolor: '#00ff88', transform: 'translateY(-3px)' }
                }}>
                Enroll Now
              </Button>
              <Button onClick={() => navigate('/')} startIcon={<FiArrowLeft />}
                sx={{
                  color: '#fff', border: '1px solid rgba(255,255,255,0.2)', px: 5, py: 2, borderRadius: 8, fontWeight: 700, fontSize: 16, textTransform: 'none',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}>
                Back to Home
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ─── FOOTER ─── */}
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
