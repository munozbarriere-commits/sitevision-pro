import Link from 'next/link';

export function Navbar() {
  return (
    <header className="container" style={{ padding: '1.2rem 0' }}>
      <nav className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 800 }}>SiteVision Pro</div>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)' }}>
          <Link href="#features">Características</Link>
          <Link href="#insights">Insights</Link>
          <Link href="#demo">Demo</Link>
        </div>
      </nav>
    </header>
  );
}
