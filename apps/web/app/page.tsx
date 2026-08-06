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
      <FeatureGrid />
      <ConsultationPanel />
      <InsightsPanel />
      <section id="demo" className="container" style={{ padding: '2rem 0 4rem' }}>
        <div className="card" style={{ padding: '1.5rem', display: 'grid', gap: '1rem' }}>
          <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Demostración de valor</p>
          <h2 style={{ margin: 0 }}>Un flujo de diagnóstico completo, claro y listo para presentar</h2>
          <p style={{ color: 'var(--muted)', margin: 0, lineHeight: 1.8 }}>
            El sistema reúne información del negocio, del sitio y del contexto de la audiencia para convertir un diagnóstico técnico en una recomendación estratégica de alto nivel. Estas vistas están pensadas para mostrar el valor de manera profesional, tanto a clientes como a equipos internos.
          </p>
          <div className="grid grid-2">
            <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
              <h3 style={{ marginTop: 0 }}>Proyecto activo</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Landing de SaaS B2B con foco en conversión, confianza y credibilidad.</p>
            </div>
            <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
              <h3 style={{ marginTop: 0 }}>Último informe</h3>
              <p style={{ color: 'var(--muted)', marginBottom: 0 }}>Generado recientemente con una estructura ejecutiva y recomendaciones priorizadas.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
