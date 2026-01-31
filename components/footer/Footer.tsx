import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p>&copy; 2026 Reelms. Tous droits réservés.</p>
        <nav className="footer-links">
          <a href="/legal">CGV/CGU</a>
          <span className="separator">•</span>
          <a href="https://discord.gg/w4z7m3JtdY" target="_blank" rel="noopener noreferrer">
            Discord
          </a>
        </nav>
      </div>
    </footer>
  )
}