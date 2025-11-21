import { create } from 'zustand'

interface User {
  id: string
  discordId: string
  discordUsername: string
  discordAvatar: string | null
  email: string | null
  role: 'USER' | 'ADMIN'
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setLoading: (loading: boolean) => void
  logout: () => Promise<void>
  fetchSession: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setUser: (user) =>
    set({ user, isAuthenticated: !!user, isLoading: false }),

  setLoading: (loading) => set({ isLoading: loading }),

  fetchSession: async () => {
    set({ isLoading: true })
    try {
      const response = await fetch('/api/auth/session')
      const data = await response.json()
      set({
        user: data.user,
        isAuthenticated: data.isAuthenticated,
        isLoading: false,
      })
    } catch (error) {
      console.error('Failed to fetch session:', error)
      set({ user: null, isAuthenticated: false, isLoading: false })
    }
  },

  logout: async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      set({ user: null, isAuthenticated: false })
      window.location.href = '/'
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  },
}))