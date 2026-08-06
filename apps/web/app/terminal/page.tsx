import { AppShell } from '@/components/AppShell';

export default function TerminalPage() {
  return (
    <AppShell title="Terminal del proyecto">
      <section className="card" style={{ padding: '1.2rem' }}>
        <h2 style={{ marginTop: 0 }}>Terminal de la carpeta web</h2>
        <p style={{ color: 'var(--muted)' }}>Comandos útiles para trabajar con esta app:</p>
        <pre style={{ background: 'rgba(0,0,0,0.25)', padding: '1rem', borderRadius: '12px', overflowX: 'auto', color: '#dce7ff' }}>
{`cd apps/web
npm run dev
npm run build`}
        </pre>
      </section>
    </AppShell>
  );
}
