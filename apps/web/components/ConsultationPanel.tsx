'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import CustomSelect from '@/components/CustomSelect';

type Finding = {
  title: string;
  impact: string;
  detail: string;
};

type ReportData = {
  companyName: string;
  url: string;
  sector: string;
  goal: string;
  score: number;
  generatedAt: string;
  title?: string;
  description?: string;
  executiveSummary?: string;
  confidence?: string;
  priorityFocus?: string;
  scoreBand?: string;
  metrics: Array<{ label: string; value: string }>;
  findings: Finding[];
  recommendations: string[];
  nextSteps: string[];
  uniqueObservations?: string[];
  personalizationProfile?: {
    variant: number;
    sectorBias: string;
    goalBias: string;
    detectedSignals: Record<string, unknown>;
  };
};

const normalizeUrl = (value: string) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
};



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

const readStoredReports = (): StoredReport[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(REPORT_HISTORY_KEY);
    return raw ? (JSON.parse(raw) as StoredReport[]) : [];
  } catch {
    return [];
  }
};

const saveReportToHistory = (report: ReportData) => {
  if (typeof window === 'undefined') return;
  const entry: StoredReport = {
    id: `${report.companyName}-${Date.now()}`,
    companyName: report.companyName,
    url: report.url,
    sector: report.sector,
    goal: report.goal,
    score: report.score,
    generatedAt: report.generatedAt,
    scoreBand: report.scoreBand,
    uniqueObservations: report.uniqueObservations,
  };
  const next = [entry, ...readStoredReports().filter((item) => `${item.companyName}-${item.generatedAt}` !== `${entry.companyName}-${entry.generatedAt}`)].slice(0, 8);
  window.localStorage.setItem(REPORT_HISTORY_KEY, JSON.stringify(next));
};

export function ConsultationPanel() {
  const [companyName, setCompanyName] = useState('');
  const [url, setUrl] = useState('');
  const [sector, setSector] = useState('');
  const [goal, setGoal] = useState('');
  const [report, setReport] = useState<ReportData | null>(null);
  const [savedReports, setSavedReports] = useState<StoredReport[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setSavedReports(readStoredReports());
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedUrl = normalizeUrl(url.trim());
    if (!normalizedUrl) {
      setError('Por favor ingresa una URL válida.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setReport(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyName, url: normalizedUrl, sector, goal }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'No se pudo generar el informe');
      }

      const nextReport = data as ReportData;
      setReport(nextReport);
      saveReportToHistory(nextReport);
      setSavedReports(readStoredReports());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo generar el informe');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadReport = () => {
    if (!report) return;
    const localScoreLabel = (() => {
      const s = report.score;
      if (s >= 90) return 'Muy fuerte';
      if (s >= 82) return 'Buen potencial';
      return 'Requiere revisión';
    })();

    const html = `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Informe de consultoría web - ${report.companyName}</title>
    <style>
      :root { --brand: #2563eb; --muted: #6b7280; --text: #0b1220; --bg: #ffffff }
      body { font-family: Inter, Arial, sans-serif; color: var(--text); background: var(--bg); padding: 28px; }
      .header { display:flex; align-items:center; gap:18px; margin-bottom:22px }
      .logo { width:78px; height:auto; object-fit:contain }
      h1 { margin:0; font-size:20px; color:var(--text) }
      .meta { color:var(--muted); font-size:13px }
      .card { border-radius:12px; padding:16px; margin-bottom:14px; border:1px solid #e6eefc }
      .score { font-size:34px; font-weight:800; color:var(--brand); margin:8px 0 }
      .grid { display:grid; grid-template-columns: 1fr 1fr; gap:12px }
      ul { padding-left:18px }
      footer { margin-top:26px; font-size:12px; color:var(--muted); border-top:1px solid #f1f5f9; padding-top:12px }
      @media (max-width:700px){ .grid{grid-template-columns:1fr} .header{gap:12px} }
    </style>
  </head>
  <body>
    <div class="header">
      <img src="/logo.png" alt="Logo" class="logo" onerror="this.style.display='none'" />
      <div>
        <h1>Informe profesional — ${report.companyName}</h1>
        <div class="meta">Generado: ${report.generatedAt} • URL: ${report.url}</div>
      </div>
    </div>

    <section class="card">
      <strong>Resumen ejecutivo</strong>
      <div style="display:flex; align-items:center; justify-content:space-between; margin-top:8px">
        <div>
          <div class="score">${report.score}/100</div>
            <div class="meta">Estado general: ${localScoreLabel}</div>
        </div>
        <div style="text-align:right; max-width:60%">
          <p style="margin:0; color:var(--muted)">La evaluación identifica oportunidades claras para mejorar la percepción de marca, la confianza y la conversión en el sitio.</p>
        </div>
      </div>
    </section>

    <div class="grid">
      <div class="card">
        <strong>Métricas clave</strong>
        <ul style="margin-top:8px">
          ${report.metrics.map((metric) => `<li><strong>${metric.label}:</strong> ${metric.value}</li>`).join('')}
        </ul>
      </div>

      <div class="card">
        <strong>Observaciones únicas</strong>
        <ul style="margin-top:8px">
          ${(report.uniqueObservations || []).map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <strong>Datos detectados</strong>
        <p style="margin:8px 0 0"><strong>Título:</strong> ${report.title || '—'}</p>
        <p style="margin:6px 0 0"><strong>Descripción:</strong> ${report.description || '—'}</p>
      </div>
    </div>

    <div class="card">
      <strong>Hallazgos principales</strong>
      <ul style="margin-top:8px">
        ${report.findings.map((item) => `<li><strong>${item.title}</strong> (${item.impact}) — ${item.detail}</li>`).join('')}
      </ul>
    </div>

    <div class="card">
      <strong>Recomendaciones</strong>
      <ul style="margin-top:8px">
        ${report.recommendations.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <div class="card">
      <strong>Próximos pasos sugeridos</strong>
      <ul style="margin-top:8px">
        ${report.nextSteps.map((item) => `<li>${item}</li>`).join('')}
      </ul>
    </div>

    <footer>
      SiteVision Pro — Informe generado automáticamente • Visita https://sitevision.pro
    </footer>
  </body>
</html>`;

    const printWindow = window.open('', '_blank', 'width=900,height=700');
    if (!printWindow) return;

    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
    }, 400);
  };

  const downloadPdfDirect = async () => {
    if (!report) return;
    try {
      const localScoreLabel = (() => {
        const s = report.score;
        if (s >= 90) return 'Muy fuerte';
        if (s >= 82) return 'Buen potencial';
        return 'Requiere revisión';
      })();

      const docHtml = `<!doctype html>${document.doctype ? new XMLSerializer().serializeToString(document.doctype) : ''}${document.documentElement.outerHTML}`;

      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding:20px; font-family:Inter, Arial, sans-serif; color:#0b1220;">
          <div style="display:flex;align-items:center;gap:12px;margin-bottom:18px">
            <img src="/logo.png" style="width:80px;object-fit:contain" onerror="this.style.display='none'" />
            <div>
              <h2 style="margin:0">Informe ejecutivo — ${report.companyName}</h2>
              <div style="font-size:12px;color:#6b7280">Generado: ${report.generatedAt} • ${report.url}</div>
            </div>
          </div>
          <div style="background:#f8fbff;border:1px solid #dbeafe;padding:14px;border-radius:12px;margin-bottom:12px">
            <strong>Resumen ejecutivo</strong>
            <p style="margin:8px 0 0">${report.executiveSummary || 'Resumen ejecutivo preparado para presentación.'}</p>
            <div style="margin-top:8px;font-size:13px;color:#475569">Puntuación: ${report.score}/100 • Estado: ${localScoreLabel}</div>
          </div>
          <div style="margin-top:8px">
            <strong>Observaciones únicas</strong>
            <ul>${(report.uniqueObservations || []).map((item) => `<li>${item}</li>`).join('')}</ul>
          </div>
          <div style="margin-top:8px">
            <strong>Métricas clave</strong>
            <ul>
              ${report.metrics.map((m) => `<li>${m.label}: ${m.value}</li>`).join('')}
            </ul>
          </div>
          <div style="margin-top:8px">
            <strong>Hallazgos</strong>
            <ul>${report.findings.map((f) => `<li><strong>${f.title}</strong> — ${f.detail}</li>`).join('')}</ul>
          </div>
        </div>`;

      document.body.appendChild(element);
      const html2pdf = (await import('html2pdf.js')).default;
      await html2pdf().from(element).set({ margin: 12, filename: `${report.companyName}-informe.pdf`, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } }).save();
      document.body.removeChild(element);
    } catch (err) {
      console.error(err);
      alert('No fue posible generar el PDF directamente. Puedes usar la opción de imprimir.');
    }
  };

  const scoreLabel = useMemo(() => {
    if (!report) return 'Pendiente';
    if (report.score >= 90) return 'Muy fuerte';
    if (report.score >= 82) return 'Buen potencial';
    return 'Requiere revisión';
  }, [report]);

  return (
    <section className="container" style={{ padding: '2rem 0 3rem' }}>
      <div className="card" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div className="card" style={{ padding: '1.1rem 1.2rem', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(94,234,212,0.16)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '0.75rem' }}>
              {['Diagnóstico ejecutivo', 'Recomendaciones priorizadas', 'Informe listo para presentar'].map((chip) => (
                <span key={chip} style={{ borderRadius: '999px', padding: '0.35rem 0.7rem', background: 'rgba(94,234,212,0.12)', color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700 }}>
                  {chip}
                </span>
              ))}
            </div>
            <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em' }}>Consultoría web para negocios</p>
            <h2 style={{ margin: '0.35rem 0 0.6rem', fontSize: '1.8rem' }}>Convierte la evaluación de una web en un diagnóstico ejecutivo y profesional</h2>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              El flujo recoge datos clave de la empresa, analiza la web y entrega un informe estructurado para presentar a un cliente, inversionista o referente interno.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
            <div className="grid grid-2">
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>Nombre de la empresa</span>
                <input
                  value={companyName}
                  onChange={(event) => setCompanyName(event.target.value)}
                  placeholder="Nombre de la empresa o pyme"
                  style={{ padding: '0.95rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(10, 17, 31, 0.8)', color: 'var(--text)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
                />
              </label>
              <label style={{ display: 'grid', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.92rem', color: 'var(--muted)' }}>URL del sitio</span>
                <input
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://empresa.com"
                  style={{ padding: '0.95rem 1rem', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.22)', background: 'rgba(10, 17, 31, 0.8)', color: 'var(--text)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
                />
              </label>
            </div>

            <div className="grid grid-2">
              <CustomSelect
                options={[
                  { value: '', label: 'Selecciona el sector' },
                  { value: 'Retail', label: 'Retail' },
                  { value: 'Salud', label: 'Salud' },
                  { value: 'Educación', label: 'Educación' },
                  { value: 'Servicios', label: 'Servicios' },
                  { value: 'E-commerce', label: 'E-commerce' },
                ]}
                value={sector}
                onChange={(v) => setSector(v)}
              />
              <CustomSelect
                options={[
                  { value: '', label: 'Objetivo principal' },
                  { value: 'Vender más', label: 'Vender más' },
                  { value: 'Captar leads', label: 'Captar leads' },
                  { value: 'Mostrar confianza', label: 'Mostrar confianza' },
                  { value: 'Mejorar marca', label: 'Mejorar marca' },
                ]}
                value={goal}
                onChange={(v) => setGoal(v)}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" type="submit" disabled={isGenerating}>
                {isGenerating ? 'Generando diagnóstico ejecutivo…' : 'Generar diagnóstico profesional'}
              </button>
              {report ? (
                <button type="button" className="btn btn-secondary" onClick={downloadReport}>
                  Descargar informe
                </button>
              ) : null}
              {report ? (
                <button type="button" className="btn" style={{ background: 'linear-gradient(90deg,#2563eb,#60a5fa)', color: '#061018' }} onClick={downloadPdfDirect}>
                  Descargar PDF
                </button>
              ) : null}
            </div>
            {error ? <p style={{ color: '#fda4af', margin: 0 }}>{error}</p> : null}
          </form>

          {savedReports.length ? (
            <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
              <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Historial de informes guardados</p>
              <p style={{ color: 'var(--muted)', margin: '0.3rem 0 0.5rem' }}>Se conservan los últimos {savedReports.length} diagnósticos para seguimiento y comparación.</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                {savedReports.map((item) => (
                  <span key={item.id} style={{ borderRadius: '999px', padding: '0.35rem 0.65rem', background: 'rgba(255,255,255,0.08)', color: 'var(--text)', fontSize: '0.85rem' }}>
                    {item.companyName} • {item.score}/100
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {report ? (
            <div className="grid grid-2" style={{ marginTop: '0.5rem' }}>
              <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Resultado ejecutivo</p>
                <h3 style={{ margin: '0.35rem 0' }}>{report.score}/100</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>{scoreLabel}</p>
                <p style={{ color: 'var(--muted)', margin: '0.45rem 0 0' }}>{report.executiveSummary || 'Resumen ejecutivo preparado para presentación.'}</p>
              </article>
              <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                <p style={{ margin: 0, color: 'var(--brand)', fontWeight: 700 }}>Enfoque prioritario</p>
                <h3 style={{ margin: '0.35rem 0' }}>{report.priorityFocus || report.goal}</h3>
                <p style={{ color: 'var(--muted)', margin: 0 }}>Confianza detectada: {report.confidence || 'Media'}</p>
                <p style={{ color: 'var(--muted)', margin: '0.45rem 0 0' }}>{report.sector} • {report.goal}</p>
                {report.personalizationProfile ? (
                  <div style={{ marginTop: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', borderRadius: '999px', padding: '0.35rem 0.65rem', background: 'rgba(94,234,212,0.12)', color: 'var(--brand)', fontSize: '0.8rem', fontWeight: 700 }}>
                    Personalizado • Perfil {report.personalizationProfile.variant + 1}
                  </div>
                ) : null}
              </article>
            </div>
          ) : null}

          {report ? (
            <div className="grid grid-2">
              <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                <h3 style={{ marginTop: 0 }}>Métricas clave</h3>
                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {report.metrics.map((metric) => {
                    const numericValue = Number(metric.value.split('/')[0]);
                    const width = `${Math.max(12, Math.min(100, numericValue))}%`;
                    return (
                      <div key={metric.label}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem', color: 'var(--muted)' }}>
                          <span>{metric.label}</span>
                          <strong style={{ color: 'var(--text)' }}>{metric.value}</strong>
                        </div>
                        <div style={{ height: '8px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)' }}>
                          <div style={{ height: '100%', width, borderRadius: '999px', background: 'linear-gradient(90deg, var(--brand), var(--brand-2))' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </article>
              <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                <h3 style={{ marginTop: 0 }}>Hallazgos profesionales</h3>
                <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                  {report.findings.map((item) => (
                    <li key={item.title}>
                      <strong style={{ color: 'var(--text)' }}>{item.title}</strong> — {item.detail}
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          ) : null}

          {report ? (
            <>
              <div className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                <h3 style={{ marginTop: 0 }}>Observaciones únicas para esta empresa</h3>
                <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                  {(report.uniqueObservations || []).map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-2">
                <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                  <h3 style={{ marginTop: 0 }}>Recomendaciones accionables</h3>
                  <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                    {report.recommendations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="card" style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)' }}>
                  <h3 style={{ marginTop: 0 }}>Próximos pasos</h3>
                  <ul style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
                    {report.nextSteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
