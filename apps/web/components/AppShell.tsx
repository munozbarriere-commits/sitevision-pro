import Link from 'next/link';
import type { ReactNode } from 'react';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/projects', label: 'Proyectos' },
  { href: '/audits', label: 'Auditorías' },
  { href: '/reports', label: 'Informes' },
  { href: '/settings', label: 'Ajustes' },
  { href: '/terminal', label: 'Terminal' },
];

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', paddingBottom: '2rem' }}>
      <header className="container" style={{ padding: '1rem 0' }}>
        <nav className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.2rem' }}>
          <Link href="/" style={{ fontWeight: 800, fontSize: '1.05rem' }}>SiteVision Pro</Link>
          <div style={{ display: 'flex', gap: '1rem', color: 'var(--muted)', flexWrap: 'wrap' }}>
            {links.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
          </div>
        </nav>
      </header>

      <main className="container" style={{ display: 'grid', gap: '1rem' }}>
        <section className="card" style={{ padding: '1.2rem 1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div>
              <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Área operativa</p>
              <h1 style={{ margin: '0.2rem 0 0', fontSize: '1.7rem' }}>{title}</h1>
            </div>
            <Link href="/login" className="btn btn-primary">Entrar</Link>
          </div>
        </section>

        {children}
      </main>
    </div>
  );
}
