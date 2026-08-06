import { AppShell } from '@/components/AppShell';

const audits = [
  { name: 'Rendimiento', progress: '92%' },
  { name: 'SEO', progress: '88%' },
  { name: 'Accesibilidad', progress: '84%' },
];

export default function AuditsPage() {
  return (
    <AppShell title="Auditorías">
      <section className="grid grid-3">
        {audits.map((audit) => (
          <article key={audit.name} className="card" style={{ padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0 }}>{audit.name}</h3>
            <p style={{ color: 'var(--muted)' }}>Progreso actual</p>
            <div className="btn btn-primary" style={{ width: 'fit-content' }}>{audit.progress}</div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
