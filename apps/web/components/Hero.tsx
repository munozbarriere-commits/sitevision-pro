import Link from 'next/link';

export function Hero() {
  return (
    <section className="container hero-section">
      <div className="card hero-grid">
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '1rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '16px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--brand), var(--brand-2))' }}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 12C4 7.582 7.582 4 12 4H17" stroke="#061018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M18 9V18C18 19.105 17.105 20 16 20H5C3.895 20 3 19.105 3 18V15" stroke="#061018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 11H12" stroke="#061018" strokeWidth="2" strokeLinecap="round" />
                <path d="M8 15H12" stroke="#061018" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Plataforma de consultoría digital</p>
              <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.8rem)', lineHeight: 1.02, margin: '0.5rem 0 1rem' }}>
                Convierte tu web en una máquina de confianza, conversión y crecimiento.
              </h1>
            </div>
          </div>

          <p style={{ color: 'var(--muted)', fontSize: '1.05rem', marginBottom: '1.5rem', lineHeight: 1.85 }}>
            SiteVision Pro combina análisis técnico, experiencia de usuario, posicionamiento y estrategia comercial para entregar diagnósticos claros, accionables y listos para presentar a tu equipo o cliente.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <Link href="#demo" className="btn btn-primary">Probar demo</Link>
            <Link href="#features" className="btn btn-secondary">Explorar capacidades</Link>
          </div>

          <div className="hero-badges">
            {['SEO', 'Rendimiento', 'UX', 'Conversión', 'Accesibilidad', 'Estrategia'].map((item) => (
              <span key={item} className="hero-stat">{item}</span>
            ))}
          </div>
        </div>

        <div className="highlight-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <div>
              <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Madurez digital</p>
              <strong style={{ fontSize: '2.8rem', display: 'block', marginTop: '0.55rem' }}>87/100</strong>
            </div>
            <div style={{ color: 'var(--muted)', textAlign: 'right' }}>
              <p style={{ margin: 0 }}>Evaluación integral</p>
              <p style={{ margin: '0.4rem 0 0' }}>SEO, velocidad, usabilidad y estrategia.</p>
            </div>
          </div>

          <div style={{ height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '87%', height: '100%', background: 'linear-gradient(90deg, var(--brand), var(--brand-2))' }} />
          </div>

          <div style={{ marginTop: '1.3rem', display: 'grid', gap: '0.85rem' }}>
            {[
              ['Rendimiento', '92%'],
              ['SEO', '88%'],
              ['Accesibilidad', '84%'],
              ['Conversión', '90%'],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--muted)' }}>
                <span>{label}</span>
                <strong style={{ color: 'var(--text)' }}>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
