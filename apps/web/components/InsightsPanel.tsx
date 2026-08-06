export function InsightsPanel() {
  return (
    <section id="insights" className="container" style={{ padding: '2rem 0' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Conclusiones estratégicas</p>
            <h2 style={{ margin: '0.25rem 0 0' }}>La mejora digital no es solo técnica: también debe traducirse en mayor confianza, más ventas y mejor experiencia</h2>
          </div>
          <span className="btn btn-primary">+24% en calidad</span>
        </div>
        <div className="grid grid-2">
          <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
            <h3 style={{ marginTop: 0 }}>Áreas que más impactan</h3>
            <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              <li>Reducir el tiempo de carga del home en 1.6s para mejorar la percepción de velocidad.</li>
              <li>Mejorar el contraste y la jerarquía de formularios para aumentar la completitud de acciones.</li>
              <li>Reordenar la estructura de contenido para fortalecer el mensaje y la confianza del visitante.</li>
            </ul>
          </div>
          <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
            <h3 style={{ marginTop: 0 }}>Impacto esperado</h3>
            <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              <li>+12% de intención de compra y mayor probabilidad de contacto.</li>
              <li>+8% de retención y mejora continua de la experiencia.</li>
              <li>Mejor posicionamiento orgánico y mejor percepción de marca.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
