export default function CSSTestPage() {
  return (
    <>

      {/* Hero */}
      <section className="section text-center">
        <div className="container">
          <h1 style={{ marginBottom: '2rem' }}>Entrez dans Reelms</h1>
          <h2 style={{ marginBottom: '2rem', fontSize: '2rem' }}>Votre aventure commence ici</h2>
          <p style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="btn btn-primary btn-large">Découvrir les sessions</button>
        </div>
      </section>

      {/* Section avec cards */}
      <section className="section section-dark">
        <div className="container">
          <h2 className="text-center" style={{ marginBottom: '3rem' }}>Nos Sessions</h2>
          
          <div className="grid grid-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <h3 style={{ marginBottom: '1rem' }}>Session {i}</h3>
                <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-red" style={{ fontSize: '1.5rem', fontWeight: '600' }}>20€</span>
                  <button className="btn btn-secondary">Réserver</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
    </>
  )
}