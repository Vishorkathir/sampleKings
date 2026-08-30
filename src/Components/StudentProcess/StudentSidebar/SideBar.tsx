// @ts-nocheck
import { Box, Stack, Typography } from '@mui/material'

const menuItems = [
	{ label: 'Dashboard', icon: '📊', path: '/student-dashboard' },
	{ label: 'Student Activities', icon: '👥', path: '/student-activities' },
	{ label: 'Match Information', icon: '🏏', path: '/student-matches' },
	{ label: 'Media Upload', icon: '📤', path: '/student-media' },
	{ label: 'Shop Information', icon: '🛒', path: '/student-shop' },
	{ label: 'Settings', icon: '⚙️', path: '/student-info' },
]

export default function StudentSideBar({ activePath = '/student-dashboard', onNavigate, studentData }) {
	const displayName = studentData?.user?.full_name || 'Kings11SportsAcademy'
	// Extract first chunk of UUID as a pseudo-User ID if actual profile ID not available, or just use the generic title
	const displayId = studentData?.user?.id
		? `ID: ${studentData.user.id.substring(0, 8).toUpperCase()}`
		: 'Student Portal'

	return (
		<Box
			sx={{
				width: 240,
				bgcolor: '#fff',
				borderRight: '1px solid #e8edf5',
				p: 2,
				height: '100vh',
			}}
		>
			<Stack direction="row" alignItems="center" gap={1.2} sx={{ mb: 2.2 }}>
				<Box
					sx={{
						width: 32,
						height: 32,
						borderRadius: 1.6,
						bgcolor: '#0b5aa0',
						color: '#fff',
						display: 'grid',
						placeItems: 'center',
						fontSize: 14,
					}}
				>
					🎓
				</Box>
				<Box>
					<Typography sx={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{displayName}</Typography>
					<Typography sx={{ fontSize: 10.5, color: '#94a3b8' }}>{displayId}</Typography>
				</Box>
			</Stack>

			<Stack gap={0.6}>
				{menuItems.map((item) => {
					const active = item.path === activePath
					return (
						<Box
							key={item.label}
							onClick={() => onNavigate?.(item.path)}
							sx={{
								p: 1.1,
								borderRadius: 2,
								display: 'flex',
								alignItems: 'center',
								gap: 1.1,
								color: active ? '#1d4ed8' : '#64748b',
								bgcolor: active ? '#eaf1ff' : 'transparent',
								fontWeight: active ? 700 : 500,
								position: 'relative',
								cursor: 'pointer',
								transition: 'all 0.2s ease',
								'&:hover': {
									bgcolor: '#eef4ff',
									color: '#1d4ed8',
								},
								'&::before': active
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
							}}
						>
							<Box sx={{ fontSize: 14 }}>{item.icon}</Box>
							<Typography sx={{ fontSize: 12 }}>{item.label}</Typography>
						</Box>
					)
				})}
			</Stack>
		</Box>
	)
}
