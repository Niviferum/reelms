'use client'

import { DiscordLoginButton } from '@/components/auth/DiscordLoginButton'
import { UserMenu } from '@/components/auth/UserMenu'
import { useAuth } from '@/hooks/useAuth'

export default function AuthTestPage() {
  const { user, isAuthenticated, isLoading } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          🔐 Test d'Authentification Discord
        </h1>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">État de la session</h2>
          
          {isLoading && (
            <p className="text-yellow-300">⏳ Chargement de la session...</p>
          )}

          {!isLoading && !isAuthenticated && (
            <div>
              <p className="text-red-300 mb-4">❌ Non connecté</p>
              <DiscordLoginButton />
            </div>
          )}

          {!isLoading && isAuthenticated && user && (
            <div>
              <p className="text-green-300 mb-4">✅ Connecté !</p>
              <div className="bg-black/30 rounded-lg p-6 space-y-2">
                <p><strong>ID:</strong> {user.id}</p>
                <p><strong>Discord ID:</strong> {user.discordId}</p>
                <p><strong>Username:</strong> {user.discordUsername}</p>
                <p><strong>Email:</strong> {user.email || 'N/A'}</p>
                <p><strong>Role:</strong> <span className={user.role === 'ADMIN' ? 'text-yellow-400' : 'text-blue-400'}>{user.role}</span></p>
                <p><strong>Avatar:</strong></p>
                {user.discordAvatar && (
                  <img
                    src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`}
                    alt="Avatar"
                    className="w-20 h-20 rounded-full border-2 border-primary-500"
                  />
                )}
              </div>
              <div className="mt-6">
                <UserMenu />
              </div>
            </div>
          )}
        </div>

        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Clique sur "Se connecter avec Discord"</li>
            <li>Autorise l'application Reelms</li>
            <li>Tu seras redirigé vers /dashboard (qui n'existe pas encore)</li>
            <li>Reviens sur /auth-test pour voir tes infos</li>
            <li>Teste le menu utilisateur et la déconnexion</li>
          </ol>
        </div>
      </div>
    </div>
  )
}