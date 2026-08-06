import { AppShell } from '@/components/AppShell';

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <section className="grid grid-2">
        <article className="card" style={{ padding: '1.2rem' }}>
          <h2 style={{ marginTop: 0 }}>Resumen</h2>
          <p style={{ color: 'var(--muted)' }}>3 proyectos activos, 2 auditorías en progreso y 1 informe listo para entregar.</p>
          <div style={{ height: '10px', background: 'rgba(255,255,255,0.08)', borderRadius: '999px', overflow: 'hidden' }}>
            <div style={{ width: '78%', height: '100%', background: 'linear-gradient(90deg, var(--brand), var(--brand-2))' }} />
          </div>
        </article>
        <article className="card" style={{ padding: '1.2rem' }}>
          <h2 style={{ marginTop: 0 }}>Alertas</h2>
          <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
            <li>Tiempo de carga alto en el home</li>
            <li>Falta de contraste en botón CTA</li>
            <li>Meta description duplicada</li>
          </ul>
        </article>
      </section>
    </AppShell>
  );
}
