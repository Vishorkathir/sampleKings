import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Paper, Container, Button, List, ListItem, CircularProgress } from '@mui/material'
import { supabase } from '../../utils/supabase'

type Todo = {
  id: number
  name: string
}

export default function ScoringPlatform() {
  const navigate = useNavigate()
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    async function getTodos() {
      setLoading(true)
      const { data, error } = await supabase.from('todos').select('*')
      if (error) {
        console.error(error)
        setError(error.message)
        // Fallback mock todos for demo when table not exists
        setTodos([
          { id: 1, name: 'Setup Supabase scoring tables' },
          { id: 2, name: 'Create league and teams' },
          { id: 3, name: 'Schedule cricket match' },
        ])
        setLoading(false)
        return
      }
      setTodos((data as Todo[]) ?? [])
      setLoading(false)
    }
    getTodos()
  }, [])

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/')
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e8edf5', mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a', mb: 1 }}>
          🏏 Cricket Academy Scoring Platform
        </Typography>
        <Typography sx={{ fontSize: 13, color: '#64748b', mb: 2 }}>Powered by Supabase • Todos example with typed state</Typography>
        <Button variant="outlined" onClick={handleBack} sx={{ textTransform: 'none' }}>
          ← Back
        </Button>
      </Paper>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e8edf5' }}>
        <Typography sx={{ fontSize: 14, fontWeight: 700, mb: 2 }}>Supabase Todos (typed useState&lt;Todo[]&gt;)</Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} />
          </Box>
        ) : error ? (
          <Box>
            <Typography sx={{ fontSize: 12, color: '#b45309', mb: 1 }}>Supabase note: {error} — showing demo fallback</Typography>
            <List dense>
              {todos.map((todo) => (
                <ListItem key={todo.id} sx={{ bgcolor: '#f8fafc', borderRadius: 1, mb: 0.5 }}>
                  {todo.name}
                </ListItem>
              ))}
            </List>
          </Box>
        ) : (
          <List dense>
            {todos.length === 0 ? (
              <Typography sx={{ fontSize: 13, color: '#64748b' }}>No todos found. Add rows to Supabase `todos` table.</Typography>
            ) : (
              todos.map((todo) => (
                <ListItem key={todo.id} sx={{ bgcolor: '#f8fafc', borderRadius: 1, mb: 0.5 }}>
                  {todo.name}
                </ListItem>
              ))
            )}
          </List>
        )}
      </Paper>

      <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e8edf5', mt: 3, bgcolor: '#f8fafc' }}>
        <Typography sx={{ fontSize: 12, color: '#64748b' }}>
          Supabase URL: <code>{import.meta.env.VITE_SUPABASE_URL}</code>
        </Typography>
      </Paper>
    </Container>
  )
}
