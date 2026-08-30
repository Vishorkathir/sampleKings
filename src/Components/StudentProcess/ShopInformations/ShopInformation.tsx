// @ts-nocheck
import { useState } from 'react'
import {
  Avatar, Box, Button, Chip, Grid, IconButton,
  Paper, Stack, Typography, Badge
} from '@mui/material'
import StudentLayout from '../StudentDashboard/StudentLayout'

const products = [
  {
    id: 1,
    emoji: '🏏',
    name: 'Elite Pro Grade 1 Willow',
    category: 'Bat',
    rating: 4.8,
    reviews: 124,
    description: 'Selected Grade 1 English Willow, handcrafted for maximum ping and explosive power.',
    price: 499.0,
    originalPrice: 649.0,
    bestseller: true,
    color: '#3b82f6',
  },
  {
    id: 2,
    emoji: '🎯',
    name: 'Academy Special Match Ball',
    category: 'Ball',
    rating: 4.7,
    reviews: 89,
    description: 'Box of 6 — Hand-stitched four-piece alum-tanned leather for premium play.',
    price: 120.0,
    originalPrice: 150.0,
    bestseller: false,
    color: '#f59e0b',
  },
  {
    id: 3,
    emoji: '🦺',
    name: 'Pro-Lite Batting Pads',
    category: 'Protection',
    rating: 4.8,
    reviews: 201,
    description: 'High-density foam with reinforced cane rods for elite-level batting protection.',
    price: 185.0,
    originalPrice: 220.0,
    bestseller: false,
    color: '#10b981',
  },
  {
    id: 4,
    emoji: '🧤',
    name: 'Kings11 Wicket Keeping Gloves',
    category: 'Gloves',
    rating: 4.6,
    reviews: 67,
    description: 'Premium leather palm, moisture-wicking inner gloves with superior grip and feel.',
    price: 89.0,
    originalPrice: 110.0,
    bestseller: false,
    color: '#8b5cf6',
  },
  {
    id: 5,
    emoji: '⛑️',
    name: 'Carbon Pro Batting Helmet',
    category: 'Helmet',
    rating: 4.9,
    reviews: 312,
    description: 'ABS shell with carbon fiber inlay, fully adjustable peak for maximum visibility.',
    price: 299.0,
    originalPrice: 380.0,
    bestseller: true,
    color: '#ef4444',
  },
  {
    id: 6,
    emoji: '👟',
    name: 'Speed Spike Cricket Shoes',
    category: 'Footwear',
    rating: 4.5,
    reviews: 155,
    description: 'Lightweight spike shoes with ankle support for fast outfield movement.',
    price: 159.0,
    originalPrice: 199.0,
    bestseller: false,
    color: '#0b5aa0',
  },
]

const categories = ['All', 'Bat', 'Ball', 'Protection', 'Gloves', 'Helmet', 'Footwear']

function StarRating({ value }) {
  return (
    <Stack direction="row" alignItems="center" gap={0.4}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i} sx={{ fontSize: 11, color: i <= Math.round(value) ? '#f59e0b' : '#e2e8f0' }}>★</Box>
      ))}
      <Typography sx={{ fontSize: 11, color: '#94a3b8', ml: 0.4 }}>{value}</Typography>
    </Stack>
  )
}

function ProductCard({ product, onAdd, cartCount }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: '20px',
        border: '1px solid #e1e8f2',
        bgcolor: '#fff',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 20px 40px -12px ${product.color}25`,
          borderColor: `${product.color}60`,
        },
      }}
    >
      {/* Product image / emoji area */}
      <Box
        sx={{
          height: 160,
          bgcolor: `${product.color}0d`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          borderBottom: `1px solid ${product.color}20`,
        }}
      >
        {/* Radial glow */}
        <Box sx={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(circle at center, ${product.color}18 0%, transparent 70%)`,
        }} />

        <Box sx={{
          fontSize: 72,
          animation: 'float 4s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-8px)' },
          },
          filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.12))',
          position: 'relative',
          zIndex: 1,
        }}>
          {product.emoji}
        </Box>

        {product.bestseller && (
          <Chip
            label="BESTSELLER"
            size="small"
            sx={{
              position: 'absolute', top: 12, left: 12,
              bgcolor: '#f59e0b', color: '#78350f',
              fontWeight: 800, fontSize: 9.5, height: 20, letterSpacing: 0.5,
            }}
          />
        )}

        <Chip
          label={`-${discount}%`}
          size="small"
          sx={{
            position: 'absolute', top: 12, right: 12,
            bgcolor: '#dcfce7', color: '#15803d',
            fontWeight: 700, fontSize: 10, height: 20,
          }}
        />
      </Box>

      {/* Info */}
      <Box sx={{ p: 2.5 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1 }}>
          <Box sx={{ flex: 1, pr: 1 }}>
            <Chip label={product.category} size="small" sx={{ mb: 0.7, height: 18, fontSize: 10, bgcolor: '#f1f5f9', color: '#475569', fontWeight: 600 }} />
            <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#0f172a', lineHeight: 1.3 }}>
              {product.name}
            </Typography>
          </Box>
        </Stack>

        <Typography sx={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, mb: 1.5 }}>
          {product.description}
        </Typography>

        <StarRating value={product.rating} />
        <Typography sx={{ fontSize: 10.5, color: '#94a3b8', mt: 0.3, mb: 2 }}>
          {product.reviews} reviews
        </Typography>

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" alignItems="baseline" gap={1}>
            <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.5px' }}>
              ${product.price.toFixed(0)}
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#94a3b8', textDecoration: 'line-through' }}>
              ${product.originalPrice.toFixed(0)}
            </Typography>
          </Stack>

          <Button
            onClick={() => onAdd(product.id)}
            size="small"
            variant="contained"
            sx={{
              borderRadius: '10px',
              textTransform: 'none',
              fontWeight: 700,
              fontSize: 12.5,
              py: 0.8,
              px: 2,
              bgcolor: product.color,
              boxShadow: `0 6px 16px -4px ${product.color}60`,
              '&:hover': {
                bgcolor: product.color,
                filter: 'brightness(1.1)',
                transform: 'scale(1.04)',
              },
            }}
          >
            Add to Cart
          </Button>
        </Stack>
      </Box>
    </Paper>
  )
}

export default function ShopInformation() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState({})
  const [search, setSearch] = useState('')

  const totalCartItems = Object.values(cart).reduce((a, b) => a + b, 0)

  const handleAdd = (id) => setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }))

  const filtered = products.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <StudentLayout activePath="/student-shop">
      <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1100, mx: 'auto' }}>

        {/* Hero Banner */}
        <Paper
          elevation={0}
          sx={{
            borderRadius: '24px',
            background: 'linear-gradient(135deg, #041d3b 0%, #0b5aa0 60%, #1d4ed8 100%)',
            overflow: 'hidden',
            p: { xs: 3, md: 5 },
            mb: 4,
            position: 'relative',
          }}
        >
          <Box sx={{ position: 'absolute', top: -40, right: -40, width: 280, height: 280, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.04)' }} />
          <Box sx={{ position: 'absolute', bottom: -60, right: 80, width: 200, height: 200, borderRadius: '50%', bgcolor: 'rgba(245,158,11,0.08)' }} />

          <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="space-between" gap={3}>
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography sx={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: '#fbbf24', mb: 1 }}>
                ⚡ NEW ARRIVALS
              </Typography>
              <Typography sx={{ fontSize: { xs: 26, md: 36 }, fontWeight: 800, color: '#fff', lineHeight: 1.15, mb: 1.5, letterSpacing: '-0.5px' }}>
                Precision Grade 1<br />
                <Box component="span" sx={{ color: '#facc15' }}>Cricket Gear</Box>
              </Typography>
              <Typography sx={{ fontSize: 14, color: '#cbd5e1', mb: 3, maxWidth: 360 }}>
                Engineered for elite performance. Gear used by coaches and players of Kings11.
              </Typography>
              <Stack direction="row" gap={2}>
                <Button variant="contained" sx={{ bgcolor: '#f59e0b', color: '#78350f', fontWeight: 700, borderRadius: '10px', textTransform: 'none', px: 3, '&:hover': { bgcolor: '#fbbf24' } }}>
                  Shop Collection
                </Button>
                <Button variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.25)', color: '#fff', borderRadius: '10px', textTransform: 'none', px: 3, backdropFilter: 'blur(8px)', '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' } }}>
                  View Offers
                </Button>
              </Stack>
            </Box>

            <Stack direction="row" gap={2} sx={{ position: 'relative', zIndex: 1 }}>
              {[
                { label: 'Pro Academy', sub: 'Member Discounts', icon: '🏆' },
                { label: 'Summer Sale', sub: 'Up to 30% Off', icon: '🔥' },
              ].map((item) => (
                <Paper key={item.label} elevation={0} sx={{ p: 2.2, borderRadius: '16px', bgcolor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', minWidth: 130 }}>
                  <Typography sx={{ fontSize: 28, mb: 0.5 }}>{item.icon}</Typography>
                  <Typography sx={{ fontSize: 13.5, fontWeight: 700, color: '#fff' }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#93c5fd' }}>{item.sub}</Typography>
                </Paper>
              ))}
            </Stack>
          </Stack>
        </Paper>

        {/* Filters + Search Bar */}
        <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={2} sx={{ mb: 3 }}>
          <Stack direction="row" gap={1} flexWrap="wrap">
            {categories.map((cat) => (
              <Chip
                key={cat}
                label={cat}
                onClick={() => setActiveCategory(cat)}
                sx={{
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: 12.5,
                  height: 34,
                  px: 0.5,
                  bgcolor: activeCategory === cat ? '#0b5aa0' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#475569',
                  border: '1px solid',
                  borderColor: activeCategory === cat ? '#0b5aa0' : '#e2e8f0',
                  borderRadius: '10px',
                  transition: 'all 0.2s',
                  '&:hover': { bgcolor: activeCategory === cat ? '#0a4a84' : '#f1f5f9' },
                }}
              />
            ))}
          </Stack>

          <Stack direction="row" alignItems="center" gap={1.5}>
            <Box
              component="input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search gear..."
              sx={{
                height: 36, px: 2, fontSize: 13, borderRadius: '10px',
                border: '1px solid #e2e8f0', outline: 'none', bgcolor: '#fff',
                color: '#0f172a', width: 180,
                '&::placeholder': { color: '#cbd5e1' },
              }}
            />
            <Badge badgeContent={totalCartItems} color="error">
              <IconButton sx={{ bgcolor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', width: 36, height: 36 }}>
                🛒
              </IconButton>
            </Badge>
          </Stack>
        </Stack>

        {/* Products Grid */}
        {filtered.length > 0 ? (
          <Grid container spacing={3}>
            {filtered.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ProductCard product={product} onAdd={handleAdd} cartCount={cart[product.id] || 0} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 12 }}>
            <Typography sx={{ fontSize: 48 }}>🔍</Typography>
            <Typography sx={{ fontSize: 16, color: '#94a3b8', mt: 1 }}>No products found for "{search}"</Typography>
          </Box>
        )}

      </Box>
    </StudentLayout>
  )
}
