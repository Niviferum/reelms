'use client'

import { useState } from 'react'
import './landing.css'

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const totalSlides = 4

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="landing">
      {/* Carousel Container */}
      <div 
        className="carousel-container" 
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {/* Slide 1 - Hero */}
        <section className="slide slide-hero">
          <div className="slide-content">
            <h1 className="hero-title">Bienvenue dans Reelms</h1>
            <p className="hero-subtitle">
              L'univers où vos aventures prennent vie
            </p>
            <p className="hero-description">
              Plongez dans des sessions de jeu de rôle épiques, guidées par des maîtres 
              du jeu passionnés. Que vous soyez débutant ou vétéran, votre légende commence ici.
            </p>
            <a href="/sessions" className="btn btn-primary btn-large hero-cta">
              Découvrir les Sessions
            </a>
          </div>
        </section>

        {/* Slide 2 - Univers */}
        <section className="slide slide-univers">
          <div className="slide-content">
            <h2 className="slide-title">Explorez l'Univers de Reelms</h2>
            <div className="univers-preview">
              <div className="univers-text">
                <p className="univers-intro">
                  introduction
                </p>
                <p className="univers-description">
                  description
                </p>
              </div>
              <div className="univers-cta">
                <a href="/lore" className="btn btn-primary btn-large">
                  Découvrir le Lore Complet
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Slide 3 - Sessions */}
        <section className="slide slide-sessions">
          <div className="slide-content">
            <h2 className="slide-title">Nos Sessions</h2>
            <div className="sessions-grid">
              <div className="session-card">
                <h3>Oneshot</h3>
                <p className="session-duration">3-4 heures</p>
                <p className="session-description">
                  Session unique parfaite pour découvrir le jeu de rôle ou vivre 
                  une aventure rapide.
                </p>
                <p className="session-price">20€</p>
              </div>
              <div className="session-card">
                <h3>Scénario</h3>
                <p className="session-duration">3-5 sessions</p>
                <p className="session-description">
                  Campagne complète avec développement de personnage et arc narratif épique.
                </p>
                <p className="session-price">50-80€</p>
              </div>
              <div className="session-card">
                <h3>Coaching</h3>
                <p className="session-duration">Variable</p>
                <p className="session-description">
                  Accompagnement personnalisé pour améliorer vos compétences en JDR.
                </p>
                <p className="session-price">50-200€</p>
              </div>
              <div className="session-card">
                <h3>Sur-Mesure</h3>
                <p className="session-duration">Personnalisé</p>
                <p className="session-description">
                  Session entièrement adaptée à vos envies et besoins spécifiques.
                </p>
                <p className="session-price">60-500€</p>
              </div>
            </div>
            <a href="/sessions" className="btn btn-secondary btn-large">
              Voir Toutes les Sessions
            </a>
          </div>
        </section>

        {/* Slide 4 - CTA Final */}
        <section className="slide slide-cta">
          <div className="slide-content">
            <h2 className="cta-title">Prêt à Commencer Votre Aventure ?</h2>
            <p className="cta-description">
              Rejoignez des centaines d'aventuriers qui ont déjà découvert l'univers de Reelms. 
              Chaque session est une opportunité unique de créer des souvenirs inoubliables.
            </p>
            <div className="cta-buttons">
              <a href="/sessions" className="btn btn-primary btn-large">
                Réserver une Session
              </a>
              <a href="/lore" className="btn btn-secondary btn-large">
                Découvrir l'Univers
              </a>
            </div>
            <p className="cta-note">
              Première session ? Pas de souci ! Nos MJ sont là pour vous guider.
            </p>
          </div>
        </section>
      </div>

      {/* Navigation Arrows */}
      <button 
        className="carousel-arrow carousel-arrow-left" 
        onClick={prevSlide}
        aria-label="Slide précédent"
      >
        ‹
      </button>
      <button 
        className="carousel-arrow carousel-arrow-right" 
        onClick={nextSlide}
        aria-label="Slide suivant"
      >
        ›
      </button>

      {/* Dots Navigation */}
      <div className="carousel-dots">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}