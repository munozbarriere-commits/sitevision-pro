import Link from 'next/link';

export function Navbar() {
  return (
    <header className="container" style={{ padding: '1.2rem 0' }}>
      <nav className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
          <div style={{ width: '44px', height: '44px', borderRadius: '16px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, var(--brand), var(--brand-2))' }}>
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 12C4 7.582 7.582 4 12 4H17" stroke="#061018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 9V18C18 19.105 17.105 20 16 20H5C3.895 20 3 19.105 3 18V15" stroke="#061018" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M8 11H12" stroke="#061018" strokeWidth="2" strokeLinecap="round" />
              <path d="M8 15H12" stroke="#061018" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>SiteVision Pro</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Consultoría digital premium</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)' }}>
          <Link href="#features">Características</Link>
          <Link href="#insights">Insights</Link>
          <Link href="#demo">Demo</Link>
        </div>
      </nav>
    </header>
  );
}
