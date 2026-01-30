'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const fetchSession = useAuthStore((state) => state.fetchSession)

  useEffect(() => {
    fetchSession()
  }, [fetchSession])

  return <>{children}</>
}