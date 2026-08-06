import { AppShell } from '@/components/AppShell';

const projects = [
  { name: 'Landing SaaS B2B', state: 'Auditoría completa', score: '87/100' },
  { name: 'Tienda médica', state: 'En revisión', score: '81/100' },
  { name: 'Portal inmobiliario', state: 'Pendiente', score: '74/100' },
];

export default function ProjectsPage() {
  return (
    <AppShell title="Proyectos">
      <section className="grid grid-3">
        {projects.map((project) => (
          <article key={project.name} className="card" style={{ padding: '1.2rem' }}>
            <h3 style={{ marginTop: 0 }}>{project.name}</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '0.7rem' }}>{project.state}</p>
            <div className="btn btn-secondary" style={{ width: 'fit-content' }}>{project.score}</div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}
