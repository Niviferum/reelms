'use client'

import { useAuth } from '@/hooks/useAuth'
import { useState } from 'react'
import './header.css'

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const avatarUrl = user?.discordAvatar
    ? `https://cdn.discordapp.com/avatars/${user.discordId}/${user.discordAvatar}.png`
    : `https://cdn.discordapp.com/embed/avatars/0.png`

  return (
    <header className="header">
      <div className="container header-content">
        {/* Logo */}
        <a href="/" className="logo">REELMS</a>

        {/* Navigation desktop */}
        <nav className="nav-desktop">
          <a href="/lore">Univers</a>
          <a href="/sessions">Sessions</a>
          {isAuthenticated && <a href="/dashboard">Mon Compte</a>}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {isAuthenticated ? (
            <div className="user-menu">
              <button 
                className="user-button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img src={avatarUrl} alt={user?.discordUsername} />
                <span>{user?.discordUsername}</span>
              </button>

              {menuOpen && (
                <div className="user-dropdown">
                  <a href="/dashboard" onClick={() => setMenuOpen(false)}>
                    Mon Compte
                  </a>
                  <button onClick={() => { logout(); setMenuOpen(false); }}>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          ) : (
            <a href="/login" className="btn btn-primary">
              Connexion
            </a>
          )}

          {/* Burger menu mobile */}
          <button 
            className="burger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <nav className="nav-mobile">
          <a href="/lore" onClick={() => setMenuOpen(false)}>Univers</a>
          <a href="/sessions" onClick={() => setMenuOpen(false)}>Sessions</a>
          {isAuthenticated && (
            <>
              <a href="/dashboard" onClick={() => setMenuOpen(false)}>Mon Compte</a>
              <button onClick={() => { logout(); setMenuOpen(false); }}>
                Déconnexion
              </button>
            </>
          )}
          {!isAuthenticated && (
            <a href="/login" onClick={() => setMenuOpen(false)}>Connexion</a>
          )}
        </nav>
      )}
    </header>
  )
}