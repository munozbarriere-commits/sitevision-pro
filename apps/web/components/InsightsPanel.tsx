export function InsightsPanel() {
  return (
    <section id="insights" className="container">
      <div className="section-headline" style={{ marginBottom: '1.5rem' }}>
        <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Conclusiones estratégicas</p>
        <h2 style={{ margin: '0.5rem 0 0.75rem', fontSize: '1.95rem' }}>La mejora digital no es solo técnica: también debe traducirse en mayor confianza, más ventas y mejor experiencia</h2>
      </div>
      <div className="grid insights-grid" style={{ gap: '1rem' }}>
        <article className="card insights-card" style={{ padding: '1.4rem' }}>
          <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Áreas que más impactan</p>
          <h3 style={{ margin: '0.75rem 0 1rem' }}>Mejora los elementos que mueven la experiencia y la conversión</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: 1.85 }}>
            <li>Reducir el tiempo de carga del home en 1.6s para mejorar la percepción de velocidad.</li>
            <li>Mejorar el contraste y la jerarquía de formularios para aumentar la completitud de acciones.</li>
            <li>Reordenar la estructura de contenido para fortalecer el mensaje y la confianza del visitante.</li>
          </ul>
        </article>
        <article className="card insights-card" style={{ padding: '1.4rem' }}>
          <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Impacto esperado</p>
          <h3 style={{ margin: '0.75rem 0 1rem' }}>Resultados claros para el negocio</h3>
          <ul style={{ color: 'var(--muted)', lineHeight: 1.85 }}>
            <li>+12% de intención de compra y mayor probabilidad de contacto.</li>
            <li>+8% de retención y mejora continua de la experiencia.</li>
            <li>Mejor posicionamiento orgánico y mejor percepción de marca.</li>
          </ul>
        </article>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '1.25rem', alignItems: 'center' }}>
        <span className="btn btn-secondary">+24% en calidad</span>
        <p style={{ color: 'var(--muted)', margin: 0, maxWidth: '45ch' }}>Estas recomendaciones se traducen en mejoras visibles en experiencia, posicionamiento y tasa de contacto.</p>
      </div>
    </section>
  );
}
