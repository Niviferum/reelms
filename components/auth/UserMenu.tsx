'use client'

import { useState } from 'react'
import { useAuthStore } from '@/stores/authStore'

export function UserMenu() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [isOpen, setIsOpen] = useState(false)

  if (!isAuthenticated || !user) {
    return null
  }

  const avatarUrl = user.discordAvatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/0.png`

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition-opacity"
      >
        <img
          src={avatarUrl}
          alt={user.discordUsername}
          className="w-10 h-10 rounded-full border-2 border-primary-500"
        />
        <span className="font-medium">{user.discordUsername}</span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-semibold">{user.discordUsername}</p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>

            <a
              href="/dashboard"
              className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </a>
            {user.role === 'ADMIN' && (
                <a
                href="/admin"
                className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors"
              >
                Administration
              </a>
            )}
            <button
              onClick={() => {
                setIsOpen(false)
                logout()
              }}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Se déconnecter
            </button>
          </div>
        </>
      )}
    </div>
  )
}