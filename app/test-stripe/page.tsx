'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

interface SessionType {
  id: string
  name: string
  slug: string
  description: string
  duration: number
  priceMin: number
  priceMax: number | null
  stripePriceId: string | null
  maxPlayers: number
  active: boolean
}

export default function TestStripePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [sessions, setSessions] = useState<SessionType[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSessions()
  }, [])

  const fetchSessions = async () => {
    try {
      const response = await fetch('/api/sessions')
      if (!response.ok) throw new Error('Failed to fetch sessions')
      const data = await response.json()
      setSessions(data.sessions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sessions')
    } finally {
      setLoading(false)
    }
  }

  const handleCheckout = async (sessionTypeId: string) => {
    setCheckoutLoading(sessionTypeId)
    setError(null)

    try {
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionTypeId }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout')
      }

      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
      setCheckoutLoading(null)
    }
  }

  const formatPrice = (min: number, max: number | null) => {
    const minEur = (min / 100).toFixed(2)
    if (max === null || max === min) {
      return `${minEur}€`
    }
    const maxEur = (max / 100).toFixed(2)
    return `${minEur}€ - ${maxEur}€`
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">🔒 Authentification requise</h1>
          <p className="text-gray-600 mb-6">
            Tu dois te connecter avec Discord pour tester le système de paiement.
          </p>
          <button
            onClick={() => router.push('/api/auth/discord')}
            className="w-full px-6 py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-colors"
          >
            Se connecter avec Discord
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">🧪 Test Stripe Checkout</h1>
          <p className="text-gray-600">Mode Test - Aucun vrai paiement ne sera effectué</p>
          
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <p className="font-semibold text-blue-900">Connecté en tant que :</p>
            <p className="text-blue-700">{user?.discordUsername}</p>
            {user?.email && (
              <p className="text-sm text-blue-600">{user.email}</p>
            )}
          </div>
        </div>

        {/* Erreur globale */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-red-700 font-medium">Erreur</p>
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Carte de test */}
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 mb-8 rounded-lg">
          <h3 className="font-bold text-yellow-900 mb-3 flex items-center">
            <span className="text-2xl mr-2">💳</span>
            Carte de test Stripe
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-yellow-900">Numéro :</p>
              <p className="font-mono text-yellow-800">4242 4242 4242 4242</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-900">Date d'expiration :</p>
              <p className="text-yellow-800">N'importe quelle date future</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-900">CVC :</p>
              <p className="text-yellow-800">N'importe quel 3 chiffres</p>
            </div>
            <div>
              <p className="font-semibold text-yellow-900">Code postal :</p>
              <p className="text-yellow-800">N'importe lequel</p>
            </div>
          </div>
        </div>

        {/* Liste des sessions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-lg ${
                !session.active || !session.stripePriceId ? 'opacity-60' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {session.name}
                  </h2>
                  {!session.active && (
                    <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
                      Inactif
                    </span>
                  )}
                </div>

                <p className="text-gray-600 mb-4 line-clamp-3">
                  {session.description}
                </p>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Durée :</span>
                    <span className="font-medium">{session.duration} min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Joueurs max :</span>
                    <span className="font-medium">{session.maxPlayers}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Prix :</span>
                    <span className="font-bold text-green-600">
                      {formatPrice(session.priceMin, session.priceMax)}
                    </span>
                  </div>
                </div>

                {session.stripePriceId ? (
                  <button
                    onClick={() => handleCheckout(session.id)}
                    disabled={!session.active || checkoutLoading === session.id}
                    className="w-full px-4 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {checkoutLoading === session.id ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Redirection...
                      </>
                    ) : (
                      <>
                        <span className="mr-2">🛒</span>
                        Acheter (Test Mode)
                      </>
                    )}
                  </button>
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-100 text-gray-500 font-semibold rounded-lg text-center">
                    ⚠️ Paiement non disponible (prix variable)
                  </div>
                )}

                {session.stripePriceId && (
                  <p className="text-xs text-gray-400 mt-2 text-center font-mono">
                    Price ID: {session.stripePriceId.slice(0, 20)}...
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {sessions.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Aucune session disponible</p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="font-bold mb-3">📝 Instructions de test</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Clique sur "Acheter (Test Mode)" pour une session</li>
            <li>Tu seras redirigé vers Stripe Checkout</li>
            <li>Utilise la carte de test ci-dessus</li>
            <li>Valide le paiement</li>
            <li>Vérifie dans Prisma Studio que le booking est créé</li>
            <li>Vérifie dans le Terminal Stripe CLI que le webhook est reçu</li>
          </ol>
        </div>
      </div>
    </div>
  )
}