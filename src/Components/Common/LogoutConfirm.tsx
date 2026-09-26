'use client';
// @ts-nocheck
import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Stack,
} from '@mui/material'

export default function LogoutConfirm({ open, onConfirm, onCancel }) {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        },
      }}
      BackdropProps={{
        sx: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0,0,0,0.5)',
        },
      }}
    >
      <DialogContent
        sx={{
          pt: 4,
          pb: 2,
          px: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 2.5,
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 80,
            height: 80,
            borderRadius: '16px',
            background: 'oklch(0.84 0.16 85)',
            display: 'grid',
            placeItems: 'center',
            fontSize: 48,
            boxShadow: 'var(--shadow-sm)',
            animation: 'float-slow 4s var(--ease-out) infinite',
          }}
        >
          📧
        </Box>

        {/* Title */}
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-0.5px',
          }}
        >
          Are you sure, you want to Logout?
        </Typography>

        {/* Description */}
        <Typography
          sx={{
            fontSize: 14,
            color: '#b0b9c3',
            lineHeight: 1.6,
            maxWidth: 320,
          }}
        >
          Logging out will end your session. Save any changes before proceeding
        </Typography>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          display: 'flex',
          gap: 1.5,
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={onCancel}
          variant="outlined"
          sx={{
            px: 3.5,
            py: 1.2,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 700,
            border: '2px solid rgba(255,255,255,0.2)',
            color: '#b0b9c3',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: 'rgba(255,255,255,0.3)',
              color: '#ffffff',
            },
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          sx={{
            px: 3.5,
            py: 1.2,
            borderRadius: '10px',
            textTransform: 'none',
            fontSize: 14,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            color: '#ffffff',
            boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 12px 30px rgba(99, 102, 241, 0.4)',
            },
          }}
        >
          Logout
        </Button>
      </DialogActions>
    </Dialog>
  )
}