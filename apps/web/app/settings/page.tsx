import { AppShell } from '@/components/AppShell';

export default function SettingsPage() {
  return (
    <AppShell title="Ajustes">
      <section className="card" style={{ padding: '1.2rem' }}>
        <h2 style={{ marginTop: 0 }}>Preferencias del workspace</h2>
        <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
          <li>Notificaciones automáticas</li>
          <li>Sincronización con Slack</li>
          <li>Modo oscuro por defecto</li>
        </ul>
      </section>
    </AppShell>
  );
}
