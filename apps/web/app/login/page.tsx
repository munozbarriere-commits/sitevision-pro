import Link from 'next/link';
import { AppShell } from '@/components/AppShell';

export default function LoginPage() {
  return (
    <AppShell title="Acceso">
      <section className="card" style={{ padding: '1.5rem', maxWidth: '520px' }}>
        <h2 style={{ marginTop: 0 }}>Iniciar sesión</h2>
        <p style={{ color: 'var(--muted)' }}>Conecta tu cuenta para gestionar auditorías y reportes.</p>
        <div style={{ display: 'grid', gap: '0.8rem' }}>
          <input placeholder="Email" style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          <input type="password" placeholder="Contraseña" style={{ padding: '0.85rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'rgba(255,255,255,0.04)', color: 'var(--text)' }} />
          <button className="btn btn-primary" style={{ justifySelf: 'start' }}>Entrar</button>
        </div>
        <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>
          ¿No tienes cuenta? <Link href="/" style={{ color: 'var(--brand)' }}>Volver al inicio</Link>
        </p>
      </section>
    </AppShell>
  );
}
