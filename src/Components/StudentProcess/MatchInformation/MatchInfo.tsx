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

import StudentLayout from '../StudentDashboard/StudentLayout'

const notifications = [
	{ title: 'Match Day Reminder', message: 'Net session at 6:30 AM. Bring full kit.', time: '5m ago', tone: 'info' },
	{ title: 'Coach Feedback', message: 'Work on footwork during spin drills.', time: '2h ago', tone: 'success' },
	{ title: 'Fitness Check', message: 'Complete endurance test by Friday.', time: '1d ago', tone: 'warning' },
]

const inboxMessages = [
	{ name: 'Coach Jonathan', preview: 'Great progress. Let’s discuss match plan.', time: '10:24 AM', unread: true },
	{ name: 'Team Analyst', preview: 'Video clips ready for review.', time: 'Yesterday', unread: false },
	{ name: 'Admin Desk', preview: 'Update your medical form.', time: 'Mon', unread: false },
]

const quickActions = [
	{ label: 'Open Match Report', icon: '📄' },
	{ label: 'View Practice Plan', icon: '🧩' },
	{ label: 'Share Stats', icon: '📤' },
]

export default function MatchInfo() {
	return (
		<StudentLayout activePath="/student-matches">
			<Box sx={{ flex: 1, p: 3 }}>
				<Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1.5} sx={{ mb: 2 }}>
					<Box>
						<Typography sx={{ fontSize: 12, color: '#94a3b8', letterSpacing: 1 }}>
							MATCH INFORMATION
						</Typography>
						<Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, color: '#0f172a' }}>
							Notifications & Messages
						</Typography>
					</Box>
					<Stack direction="row" gap={1} flexWrap="wrap">
						<Button
							variant="contained"
							sx={{
								bgcolor: '#0b5aa0',
								textTransform: 'none',
								fontWeight: 600,
								borderRadius: 2,
								px: 2.2,
								transition: 'transform 0.2s ease',
								'&:hover': { bgcolor: '#0a4b86', transform: 'translateY(-2px)' },
							}}
						>
							New Message
						</Button>
						<Button
							variant="contained"
							sx={{
								bgcolor: '#f9b90e',
								color: '#7b4e00',
								textTransform: 'none',
								fontWeight: 700,
								borderRadius: 2,
								px: 2.2,
								transition: 'transform 0.2s ease',
								'&:hover': { bgcolor: '#f1b000', transform: 'translateY(-2px)' },
							}}
						>
							Send Update
						</Button>
					</Stack>
				</Stack>

				<Stack direction={{ xs: 'column', lg: 'row' }} spacing={2}>
					<Paper
						elevation={0}
						sx={{
							width: { xs: '100%', lg: 340 },
							p: 2.3,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							animation: 'fadeUp 0.6s ease both',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
							<Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Notifications</Typography>
							<Chip label="Live" size="small" sx={{ bgcolor: '#dcfce7', color: '#16a34a', fontWeight: 700 }} />
						</Stack>
						<Stack gap={1.2}>
							{notifications.map((item) => (
								<Paper
									key={item.title}
									elevation={0}
									sx={{
										p: 1.4,
										borderRadius: 2,
										border: '1px solid #eef2f7',
										bgcolor: '#f8fafc',
										transition: 'transform 0.2s ease',
										'&:hover': { transform: 'translateX(4px)' },
									}}
								>
									<Stack direction="row" justifyContent="space-between" alignItems="center">
										<Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>{item.title}</Typography>
										<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>{item.time}</Typography>
									</Stack>
									<Typography sx={{ fontSize: 11.5, color: '#64748b', mt: 0.5 }}>{item.message}</Typography>
								</Paper>
							))}
						</Stack>
					</Paper>

					<Paper
						elevation={0}
						sx={{
							flex: 1,
							p: 2.3,
							borderRadius: 2.5,
							border: '1px solid #e8edf5',
							bgcolor: '#fff',
							animation: 'fadeUp 0.7s ease both',
						}}
					>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
							<Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#0f172a' }}>Message Inbox</Typography>
							<IconButton size="small" sx={{ border: '1px solid #e8edf5', width: 28, height: 28 }}>
								🔍
							</IconButton>
						</Stack>

						<Stack gap={1.2}>
							{inboxMessages.map((msg) => (
								<Paper
									key={msg.name}
									elevation={0}
									sx={{
										p: 1.4,
										borderRadius: 2,
										border: '1px solid #eef2f7',
										bgcolor: msg.unread ? '#eef4ff' : '#f8fafc',
										display: 'flex',
										alignItems: 'center',
										gap: 1.2,
										transition: 'transform 0.2s ease',
										'&:hover': { transform: 'translateX(4px)' },
									}}
								>
									<Avatar sx={{ width: 32, height: 32, bgcolor: '#1d4ed8' }}>{msg.name[0]}</Avatar>
									<Box sx={{ flex: 1 }}>
										<Typography sx={{ fontSize: 12.5, fontWeight: 600, color: '#0f172a' }}>{msg.name}</Typography>
										<Typography sx={{ fontSize: 11, color: '#64748b' }}>{msg.preview}</Typography>
									</Box>
									<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>{msg.time}</Typography>
								</Paper>
							))}
						</Stack>

						<Divider sx={{ my: 2 }} />

						<Typography sx={{ fontSize: 12.5, fontWeight: 700, color: '#0f172a', mb: 1 }}>
							Reply Box
						</Typography>
						<Box
							component="textarea"
							placeholder="Type your reply here..."
							sx={{
								width: '100%',
								minHeight: 120,
								borderRadius: 2,
								border: '1px solid #eef2f7',
								bgcolor: '#f8fafc',
								px: 1.6,
								py: 1.2,
								fontSize: 12,
								color: '#0f172a',
								outline: 'none',
								resize: 'none',
							}}
						/>
						<Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 1.6 }}>
							<Stack direction="row" gap={1}>
								{quickActions.map((action) => (
									<Button
										key={action.label}
										variant="outlined"
										startIcon={<span>{action.icon}</span>}
										sx={{
											textTransform: 'none',
											fontSize: 11.5,
											borderRadius: 2,
											borderColor: '#e8edf5',
											color: '#64748b',
											'&:hover': { borderColor: '#1d4ed8', color: '#1d4ed8' },
										}}
									>
										{action.label}
									</Button>
								))}
							</Stack>
							<Button
								variant="contained"
								sx={{
									bgcolor: '#1d4ed8',
									textTransform: 'none',
									fontWeight: 600,
									borderRadius: 2,
									px: 2.2,
									transition: 'transform 0.2s ease',
									'&:hover': { bgcolor: '#1e40af', transform: 'translateY(-2px)' },
								}}
							>
								Send Reply
							</Button>
						</Stack>
					</Paper>
				</Stack>
			</Box>
		</StudentLayout>
	)
}