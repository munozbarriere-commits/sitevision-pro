import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeatureGrid } from '@/components/FeatureGrid';
import { InsightsPanel } from '@/components/InsightsPanel';
import { ConsultationPanel } from '@/components/ConsultationPanel';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />

      <section className="container section-split">
        <div style={{ marginBottom: '1rem' }}>
          <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Cómo trabajamos</p>
          <h2 style={{ margin: '0.35rem 0 0.75rem', fontSize: '1.9rem' }}>Un proceso claro para convertir hallazgos técnicos en decisiones estratégicas</h2>
          <p className="section-copy">
            Desde el análisis de datos hasta la recomendación ejecutiva, el flujo está pensado para que equipos de marketing, producto y liderazgo encuentren el valor sin perderse en el detalle técnico.
          </p>
        </div>
        <div className="grid grid-3">
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ marginTop: 0 }}>Descubre oportunidades</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 0, lineHeight: 1.75 }}>
              Identificamos los puntos de mejora más relevantes en rendimiento, SEO, UX, accesibilidad y conversión.
            </p>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ marginTop: 0 }}>Prioriza con criterio</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 0, lineHeight: 1.75 }}>
              Ordenamos las acciones por impacto y facilidad de ejecución para que cada recomendación tenga sentido comercial.
            </p>
          </div>
          <div className="card" style={{ padding: '1.25rem' }}>
            <h3 style={{ marginTop: 0 }}>Comunica con fuerza</h3>
            <p style={{ color: 'var(--muted)', marginBottom: 0, lineHeight: 1.75 }}>
              Generamos un informe listo para presentar que explica el “qué”, el “por qué” y el “cómo” a públicos ejecutivos.
            </p>
          </div>
        </div>
      </section>

      <FeatureGrid />
      <ConsultationPanel />
      <InsightsPanel />

      <section id="demo" className="container section-split">
        <div className="card panel-callout" style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
          <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Demostración de valor</p>
          <h2 style={{ margin: 0 }}>Un flujo de diagnóstico completo, claro y listo para presentar</h2>
          <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.8 }}>
            El sistema reúne información del negocio, del sitio y del contexto de la audiencia para convertir un diagnóstico técnico en una recomendación estratégica de alto nivel. Estas vistas están pensadas para mostrar el valor de manera profesional, tanto a clientes como a equipos internos.
          </p>
          <div className="grid demo-grid">
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Proyecto activo</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Landing de SaaS B2B con foco en conversión, confianza y credibilidad.</p>
            </div>
            <div className="card" style={{ padding: '1rem' }}>
              <h3 style={{ marginTop: 0 }}>Último informe</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Generado recientemente con una estructura ejecutiva y recomendaciones priorizadas.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
