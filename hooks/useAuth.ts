import { useAuthStore } from '@/stores/authStore'

export function useAuth() {
  return useAuthStore()
}

export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuthStore()
  
  return { isAuthenticated, isLoading }
}

export function useRequireAdmin() {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  
  const isAdmin = user?.role === 'ADMIN'
  
  return { isAdmin, isAuthenticated, isLoading }
}