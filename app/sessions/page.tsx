import { prisma } from '@/lib/prisma'
import SessionCard from './SessionCard'
import './sessions.css'

export default async function SessionsPage() {
  // Récupérer toutes les sessions actives depuis la DB
  const sessions = await prisma.sessionType.findMany({
    where: {
      active: true,
    },
    orderBy: {
      priceMin: 'asc',
    },
  })

  return (
    <div className="sessions-page">
      <div className="container">
        {/* Header */}
        <header className="sessions-header">
          <h1>Nos Sessions de Jeu de Rôle</h1>
          <p className="sessions-subtitle">
            Choisissez l'aventure qui vous correspond. Du oneshot découverte aux campagnes 
            épiques, chaque session est une porte vers l'univers de Reelms.
          </p>
        </header>

        {/* Sessions Grid */}
        <div className="sessions-grid">
          {sessions.length === 0 ? (
            <div className="empty-state">
              <p>Aucune session disponible pour le moment.</p>
              <p>Revenez bientôt pour découvrir nos prochaines aventures !</p>
            </div>
          ) : (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} />
            ))
          )}
        </div>

        {/* Info Section */}
        <section className="sessions-info">
          <h2>Comment ça marche ?</h2>
          <div className="info-steps">
            <div className="info-step">
              <div className="step-number">1</div>
              <h3>Choisissez votre session</h3>
              <p>Parcourez nos différentes offres et sélectionnez celle qui vous attire.</p>
            </div>
            <div className="info-step">
              <div className="step-number">2</div>
              <h3>Réservez en ligne</h3>
              <p>Connectez-vous avec Discord et effectuez votre paiement sécurisé via Stripe.</p>
            </div>
            <div className="info-step">
              <div className="step-number">3</div>
              <h3>Planifiez votre date</h3>
              <p>Choisissez un créneau disponible qui vous convient via Calendly.</p>
            </div>
            <div className="info-step">
              <div className="step-number">4</div>
              <h3>Jouez !</h3>
              <p>Rejoignez la session sur Discord et vivez votre aventure épique.</p>
            </div>
          </div>
        </section>

        {/* FAQ rapide */}
        <section className="sessions-faq">
          <h2>Questions Fréquentes</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Besoin d'expérience ?</h3>
              <p>
                Pas du tout ! Nos sessions accueillent tous les niveaux, du débutant complet 
                au vétéran. Le MJ adapte son style à votre expérience.
              </p>
            </div>
            <div className="faq-item">
              <h3>Quel matériel ?</h3>
              <p>
                Un ordinateur avec micro, une connexion internet stable, et un compte Discord. 
                C'est tout ! Les dés et plateaux sont virtuels.
              </p>
            </div>
            <div className="faq-item">
              <h3>Annulation possible ?</h3>
              <p>
                Sessions individuelles : annulation gratuite jusqu'à 24h à l'avance. 
                Sessions de groupe : remboursement par coupon de réduction.
              </p>
            </div>
            <div className="faq-item">
              <h3>Combien de joueurs ?</h3>
              <p>
                Cela dépend de la session ! En général, 3-6 joueurs pour les groupes, 
                1 joueur pour les coachings individuels.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}