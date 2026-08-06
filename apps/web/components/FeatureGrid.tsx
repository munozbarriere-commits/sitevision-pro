const items = [
  {
    title: 'Auditorías automáticas',
    text: 'Revisa rendimiento, SEO, accesibilidad, seguridad, estructura de contenido y experiencia de usuario de forma continua.',
  },
  {
    title: 'Prioridades accionables',
    text: 'Convierte cada hallazgo en tareas claras, con impacto, urgencia y orden de ejecución para equipos de negocio o tecnología.',
  },
  {
    title: 'IA de síntesis ejecutiva',
    text: 'Genera informes ejecutivos, recomendaciones y próximos pasos con lenguaje claro, profesional y preparado para presentar.',
  },
  {
    title: 'Diagnóstico personalizado',
    text: 'Cada análisis se adapta al sector, al objetivo comercial y a la estructura real del sitio, evitando reportes genéricos.',
  },
  {
    title: 'Seguimiento de mejora',
    text: 'Guarda y compara los análisis para visualizar la evolución del sitio y el impacto de las mejoras implementadas.',
  },
  {
    title: 'Tomador de decisiones',
    text: 'Entrega una visión útil para equipos de marketing, ventas, producto, diseño y liderazgo sin depender de un análisis técnico excesivo.',
  },
];

export function FeatureGrid() {
  return (
    <section id="features" className="container">
      <div className="section-headline" style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Capacidades de la plataforma</p>
        <h2 style={{ margin: '0.5rem 0 0.75rem', fontSize: '1.95rem' }}>Una solución integral para evaluar, priorizar y comunicar mejoras digitales</h2>
      </div>
      <div className="grid grid-3">
        {items.map((item) => (
          <article key={item.title} className="card feature-card" style={{ padding: '1.4rem' }}>
            <div className="status-chip">✓</div>
            <h3 style={{ marginTop: '0.85rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 0, lineHeight: 1.8 }}>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
