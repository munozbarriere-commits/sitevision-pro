'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/AppShell';

type StoredReport = {
  id: string;
  companyName: string;
  url: string;
  sector: string;
  goal: string;
  score: number;
  generatedAt: string;
  scoreBand?: string;
  uniqueObservations?: string[];
};

const REPORT_HISTORY_KEY = 'sitevision-reports-history';

export default function ReportsPage() {
  const [reports, setReports] = useState<StoredReport[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(REPORT_HISTORY_KEY);
      setReports(raw ? (JSON.parse(raw) as StoredReport[]) : []);
    } catch {
      setReports([]);
    }
  }, []);

  return (
    <AppShell title="Informes">
      <section className="grid grid-3">
        {reports.length ? reports.map((report) => (
          <article key={report.id} className="card" style={{ padding: '1.2rem', display: 'grid', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.6rem' }}>
              <h3 style={{ margin: 0 }}>{report.companyName}</h3>
              <span style={{ borderRadius: '999px', padding: '0.3rem 0.55rem', background: 'rgba(94,234,212,0.12)', color: 'var(--brand)', fontSize: '0.75rem', fontWeight: 700 }}>{report.scoreBand || 'Diagnóstico'}</span>
            </div>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{report.sector} • {report.goal}</p>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9rem' }}>{report.generatedAt}</p>
            <p style={{ color: 'var(--muted)', margin: 0, fontSize: '0.9rem' }}>Puntuación: {report.score}/100</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {(report.uniqueObservations || []).slice(0, 2).map((item) => (
                <span key={item} style={{ borderRadius: '999px', padding: '0.3rem 0.55rem', background: 'rgba(255,255,255,0.08)', color: 'var(--text)', fontSize: '0.72rem' }}>{item}</span>
              ))}
            </div>
          </article>
        )) : (
          <article className="card" style={{ padding: '1.2rem', gridColumn: '1 / -1' }}>
            <h3 style={{ marginTop: 0 }}>Aún no hay informes guardados</h3>
            <p style={{ color: 'var(--muted)', margin: 0 }}>Genera un diagnóstico desde la pantalla principal y aparecerá aquí para seguimiento y comparación.</p>
          </article>
        )}
      </section>
    </AppShell>
  );
}
