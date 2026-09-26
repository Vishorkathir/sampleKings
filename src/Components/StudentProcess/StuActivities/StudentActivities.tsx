'use client';
// @ts-nocheck
import {
	Avatar,
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	Paper,
	Stack,
	Typography,
} from '@mui/material'
import { useRouter } from 'next/navigation';


import StudentLayout from '../StudentDashboard/StudentLayout'

const attendanceStats = [
	{ label: 'Nets', value: 12 },
	{ label: 'Gym', value: 8 },
	{ label: 'Match', value: 4 },
]

const calendarDays = [
	{ day: 'M', date: 25 },
	{ day: 'T', date: 26 },
	{ day: 'W', date: 27 },
	{ day: 'T', date: 28 },
	{ day: 'F', date: 29 },
	{ day: 'S', date: 30 },
	{ day: 'S', date: 1, active: true },
	{ day: 'M', date: 2 },
	{ day: 'T', date: 3, selected: true },
	{ day: 'W', date: 4 },
	{ day: 'T', date: 5 },
	{ day: 'F', date: 6 },
	{ day: 'S', date: 7 },
	{ day: 'S', date: 8 },
	{ day: 'M', date: 9 },
	{ day: 'T', date: 10 },
	{ day: 'W', date: 11 },
	{ day: 'T', date: 12, dot: '#f59e0b' },
	{ day: 'F', date: 13 },
	{ day: 'S', date: 14 },
	{ day: 'S', date: 15 },
]

const activityLog = [
	{
		title: 'Net Session with Coach Jonathan',
		meta: 'Oct 02, 2023 • 2 hours session',
		icon: '🎯',
	},
	{
		title: 'Fitness Assessment',
		meta: 'Sep 29, 2023 • High Intensity',
		icon: '⚡',
	},
	{
		title: 'Batting Video Analysis',
		meta: 'Sep 27, 2023 • Tech Review',
		icon: '🎥',
	},
]

const milestones = [
	{
		title: 'Batting',
		subtitle: '100 runs in inter-academy',
		meta: 'vs. Rising Stars • 72 balls',
		tag: 'Batter',
	},
	{
		title: 'Bowler',
		subtitle: '5 wickets haul',
		meta: 'vs. City Knights • 4/22',
		tag: 'Bowler',
	},
]

export default function StudentActivities() {
	const router = useRouter()

	return (
		<StudentLayout activePath="/student-activities">
			<Box sx={{ p: 3 }}>
				<Stack
					direction={{ xs: 'column', sm: 'row' }}
					alignItems={{ xs: 'stretch', sm: 'center' }}
					justifyContent="space-between"
					gap={1.5}
					sx={{ mb: 2 }}
				>
					<Box
						component="input"
						placeholder="Search sessions..."
						sx={{
							width: { xs: '100%', sm: 240, md: 300 },
							height: 34,
							borderRadius: 999,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							px: 2,
							fontSize: 12,
							color: '#64748b',
							outline: 'none',
							'&::placeholder': { color: '#cbd5e1' },
						}}
					/>
					<Stack direction="row" alignItems="center" gap={1} flexWrap="wrap">
						<Button
							variant="contained"
							sx={{
								bgcolor: '#0b5aa0',
								textTransform: 'none',
								fontSize: 12,
								fontWeight: 600,
								borderRadius: 2,
								px: 2,
								transition: 'transform 0.2s ease',
								'&:hover': { bgcolor: '#0a4b86', transform: 'translateY(-2px)' },
							}}
						>
							Download Report
						</Button>
						<Button
							variant="contained"
							sx={{
								bgcolor: '#f9b90e',
								color: '#7b4e00',
								textTransform: 'none',
								fontSize: 12,
								fontWeight: 700,
								borderRadius: 2,
								px: 2,
								transition: 'transform 0.2s ease',
								'&:hover': { bgcolor: '#f1b000', transform: 'translateY(-2px)' },
							}}
						>
							Book Net Session
						</Button>
						<IconButton sx={{ width: 32, height: 32, border: '1px solid #e8edf5' }}>⚙️</IconButton>
					</Stack>
				</Stack>

				<Box sx={{ mb: 2 }}>
					<Typography sx={{ fontSize: 11, color: '#94a3b8', letterSpacing: 1 }}>STUDENT DASHBOARD</Typography>
					<Typography sx={{ fontSize: 22, fontWeight: 700, color: '#0f172a' }}>Activities & Progress</Typography>
				</Box>

				<Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
					<Paper
						elevation={0}
						sx={{
							p: 2.2,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							width: { xs: '100%', lg: 260 },
							animation: 'fadeUp 0.5s ease both',
						}}
					>
						<Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1.2 }}>
							<Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>Attendance</Typography>
							<IconButton size="small" sx={{ width: 24, height: 24, border: '1px solid #eef2f7' }}>✏️</IconButton>
						</Stack>
						<Stack direction="row" alignItems="baseline" gap={1}>
							<Typography sx={{ fontSize: 26, fontWeight: 700, color: '#0f172a' }}>92%</Typography>
							<Chip label="+2.5%" size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 700, fontSize: 10.5 }} />
						</Stack>
						<Typography sx={{ fontSize: 11, color: '#94a3b8', mt: 0.6 }}>Total sessions: 24 / 26</Typography>
						<Divider sx={{ my: 1.4 }} />
						<Stack direction="row" gap={1}>
							{attendanceStats.map((item) => (
								<Paper
									key={item.label}
									elevation={0}
									sx={{
										flex: 1,
										p: 1,
										borderRadius: 1.5,
										border: '1px solid #eef2f7',
										textAlign: 'center',
										bgcolor: '#f8fafc',
									}}
								>
									<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>{item.label.toUpperCase()}</Typography>
									<Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{item.value}</Typography>
								</Paper>
							))}
						</Stack>
					</Paper>

					<Paper
						elevation={0}
						sx={{
							flex: 1,
							p: 2.2,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							animation: 'fadeUp 0.6s ease both',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.2 }}>
							<Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a' }}>Training Calendar</Typography>
							<Stack direction="row" alignItems="center" gap={0.6}>
								<Typography sx={{ fontSize: 11, color: '#94a3b8' }}>October 2023</Typography>
								<IconButton size="small" sx={{ width: 24, height: 24, border: '1px solid #eef2f7' }}>‹</IconButton>
								<IconButton size="small" sx={{ width: 24, height: 24, border: '1px solid #eef2f7' }}>›</IconButton>
							</Stack>
						</Stack>
						<Box
							sx={{
								display: 'grid',
								gridTemplateColumns: 'repeat(7, 1fr)',
								gap: 1,
							}}
						>
							{calendarDays.map((item, idx) => (
								<Box
									key={`${item.date}-${idx}`}
									sx={{
										p: 1,
										borderRadius: 1.5,
										border: '1px solid #eef2f7',
										textAlign: 'center',
										bgcolor: item.selected ? '#0b5aa0' : item.active ? '#eaf1ff' : '#fff',
										color: item.selected ? '#fff' : '#0f172a',
										position: 'relative',
										transition: 'all 0.2s ease',
										'&:hover': {
											transform: 'translateY(-2px)',
											boxShadow: '0 10px 16px rgba(15,23,42,0.06)',
										},
									}}
								>
									<Typography sx={{ fontSize: 10, color: item.selected ? 'rgba(255,255,255,0.7)' : '#94a3b8' }}>{item.day}</Typography>
									<Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{item.date}</Typography>
									{item.dot ? (
										<Box
											sx={{
												width: 6,
												height: 6,
												borderRadius: '50%',
												bgcolor: item.dot,
												position: 'absolute',
												bottom: 6,
												left: '50%',
												transform: 'translateX(-50%)',
											}}
										/>
									) : null}
								</Box>
							))}
						</Box>
						<Stack direction="row" gap={2} sx={{ mt: 1.5 }}>
							<Stack direction="row" gap={0.6} alignItems="center">
								<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0b5aa0' }} />
								<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>Net Practice</Typography>
							</Stack>
							<Stack direction="row" gap={0.6} alignItems="center">
								<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#f59e0b' }} />
								<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>Fitness Test</Typography>
							</Stack>
							<Stack direction="row" gap={0.6} alignItems="center">
								<Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#ef4444' }} />
								<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>Match Day</Typography>
							</Stack>
						</Stack>
					</Paper>
				</Stack>

				<Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ mt: 2 }}>
					<Paper
						elevation={0}
						sx={{
							flex: 1,
							p: 2.2,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							animation: 'fadeUp 0.7s ease both',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.4 }}>
							<Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Activity Log</Typography>
							<Typography sx={{ fontSize: 11.5, color: '#2563eb', fontWeight: 600 }}>View All</Typography>
						</Stack>
						<Stack gap={1}>
							{activityLog.map((item) => (
								<Paper
									key={item.title}
									elevation={0}
									sx={{
										p: 1.4,
										borderRadius: 2,
										border: '1px solid #eef2f7',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'space-between',
										transition: 'all 0.2s ease',
										'&:hover': {
											transform: 'translateY(-2px)',
											boxShadow: '0 10px 16px rgba(15,23,42,0.06)',
										},
									}}
								>
									<Stack direction="row" alignItems="center" gap={1.2}>
										<Box
											sx={{
												width: 32,
												height: 32,
												borderRadius: 1.6,
												bgcolor: '#eaf1ff',
												color: '#1d4ed8',
												display: 'grid',
												placeItems: 'center',
												fontSize: 14,
											}}
										>
											{item.icon}
										</Box>
										<Box>
											<Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>{item.title}</Typography>
											<Typography sx={{ fontSize: 11, color: '#94a3b8' }}>{item.meta}</Typography>
										</Box>
									</Stack>
									<Typography sx={{ fontSize: 14, color: '#94a3b8' }}>›</Typography>
								</Paper>
							))}
						</Stack>
					</Paper>

					<Paper
						elevation={0}
						sx={{
							width: { xs: '100%', lg: 320 },
							p: 2.2,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							animation: 'fadeUp 0.8s ease both',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.4 }}>
							<Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Performance Milestones</Typography>
							<IconButton size="small" sx={{ width: 24, height: 24, border: '1px solid #eef2f7' }}>🏆</IconButton>
						</Stack>
						<Stack gap={1.2}>
							{milestones.map((item) => (
								<Paper
									key={item.title}
									elevation={0}
									sx={{
										p: 1.4,
										borderRadius: 2,
										border: '1px solid #eef2f7',
										transition: 'all 0.2s ease',
										'&:hover': {
											transform: 'translateY(-2px)',
											boxShadow: '0 10px 16px rgba(15,23,42,0.06)',
										},
									}}
								>
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<Typography sx={{ fontSize: 11.5, fontWeight: 700, color: '#0f172a' }}>{item.title}</Typography>
										<Chip label={item.tag} size="small" sx={{ bgcolor: '#eaf1ff', color: '#1d4ed8', fontWeight: 700, fontSize: 10.5 }} />
									</Stack>
									<Typography sx={{ fontSize: 11.5, color: '#0f172a', mt: 0.6 }}>{item.subtitle}</Typography>
									<Typography sx={{ fontSize: 10.5, color: '#94a3b8', mt: 0.4 }}>{item.meta}</Typography>
								</Paper>
							))}
						</Stack>
						<Divider sx={{ my: 1.6 }} />
						<Box
							sx={{
								p: 1.4,
								borderRadius: 2,
								border: '1px solid #eef2f7',
								bgcolor: '#f8fafc',
								textAlign: 'center',
							}}
						>
							<Typography sx={{ fontSize: 11, color: '#94a3b8' }}>Next target: 500 seasonal runs</Typography>
							<Box
								sx={{
									height: 6,
									borderRadius: 999,
									bgcolor: '#e2e8f0',
									mt: 1,
									overflow: 'hidden',
								}}
							>
								<Box sx={{ width: '62%', height: '100%', bgcolor: '#1d4ed8' }} />
							</Box>
						</Box>
					</Paper>
				</Stack>
			</Box>
		</StudentLayout>
	)
}