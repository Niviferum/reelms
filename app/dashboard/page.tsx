'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl">Chargement...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Bienvenue, {user.discordUsername} ! 👋
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Ton Dashboard</h2>
          <p className="mb-4">Tu es maintenant connecté avec Discord !</p>
          <p className="text-sm text-gray-300">
            Cette page sera ton point central pour gérer tes réservations de sessions RP.
          </p>
        </div>
      </div>
    </div>
  )
}