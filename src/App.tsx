import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Box, CircularProgress, Typography } from '@mui/material'

// ─── Lazy-loaded route components ───────────────────────────────────────────
// Each import() creates a distinct JS chunk — only loaded when the route is visited
const HomePage = lazy(() => import('./Components/HomePage/Hero'))
const AcademyAchievements = lazy(() => import('./Components/HomePage/AcademyAchievements'))
const Gallery = lazy(() => import('./Components/HomePage/Gallery'))
const LoginPage = lazy(() => import('./Components/AdminProcess/Login Page/LoginPage'))
const AdminDashboard = lazy(() => import('./Components/AdminProcess/Admin/Dashboard'))
const Registeration = lazy(() => import('./Components/AdminProcess/RegisterationPage/Registeration'))
const UpdateStudent = lazy(() => import('./Components/AdminProcess/Admin/UpdateStudent'))

const StudentDashboard = lazy(() => import('./Components/StudentProcess/StudentDashboard/Dashboard'))
const StudentActivities = lazy(() => import('./Components/StudentProcess/StuActivities/StudentActivities'))
const MatchInfo = lazy(() => import('./Components/StudentProcess/MatchInformation/MatchInfo'))
const StudentShopInfo = lazy(() => import('./Components/StudentProcess/ShopInformations/ShopInformation'))
const Studentinfo = lazy(() => import('./Components/StudentProcess/StudentInfo/Studentinfo'))

// ─── Scoring Platform Components ────────────────────────────────────────────
const ScoringPlatform = lazy(() => import('./Components/ScoringProcess/ScoringPlatform'))



const ComingSoon = lazy(() => import('./Components/Common/ComingSoon'))


// ─── Shared full-screen loading fallback ────────────────────────────────────
function PageLoader() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        bgcolor: '#f5f7fb',
        animation: 'pulse 1.5s ease-in-out infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 },
        },
      }}
    >

      {/* loading box */}
      {/* <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: '14px',
          background: 'linear-gradient(135deg, #0b5aa0, #1d4ed8)',
          display: 'grid',
          placeItems: 'center',
          fontSize: 24,
          boxShadow: '0 8px 20px rgba(29,78,216,0.3)',
        }}
      >
        🏆
      </Box> */}
      <Box
        component="img"
        src="/Logo.png"
        alt="Kings11 Sports Academy Logo"
        sx={{ width: { xs: 32, md: 40 }, height: { xs: 32, md: 40 }, objectFit: 'contain', borderRadius: 2 }}
      />
      <CircularProgress size={28} thickness={4} sx={{ color: '#1d4ed8' }} />
      <Typography sx={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>
        Loading Kings11sportsacademy.....…
      </Typography>
    </Box>
  )
}

// ─── App ────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    // Suspense catches any lazy component while it loads and shows fallback
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Auth */}
        <Route path="/" element={<HomePage />} />
        <Route path="/academy-achievements" element={<AcademyAchievements />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin */}
        <Route path="/Admin-dashboard" element={<AdminDashboard />} />
        <Route path="/registration" element={<Registeration />} />
        <Route path="/Admin-dashboard/edit-student/:studentId" element={<UpdateStudent />} />
        <Route path="/coming-soon" element={<ComingSoon />} />


        {/* Student */}
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/student-activities" element={<StudentActivities />} />
        <Route path="/student-matches" element={<MatchInfo />} />
        <Route path="/student-shop" element={<StudentShopInfo />} />
        <Route path="/student-info" element={<Studentinfo />} />

        {/* Scoring Platform */}
        <Route path="/scoring" element={<ScoringPlatform />} />
      </Routes>
    </Suspense>
  )
}
