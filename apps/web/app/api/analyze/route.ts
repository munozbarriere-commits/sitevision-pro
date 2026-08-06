import { NextResponse } from 'next/server';
import { buildReportAnalysis } from '@/lib/reportAnalyzer';

const normalizeUrl = (value: string) => {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawUrl = body?.url ?? '';
    const companyName = body?.companyName ?? 'Empresa';
    const sector = body?.sector ?? 'Negocio';
    const goal = body?.goal ?? 'captar clientes';
    const url = normalizeUrl(rawUrl.trim());

    if (!url) {
      return NextResponse.json({ error: 'Se requiere una URL' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SiteVisionPro/1.0; +https://sitevision.pro)',
      },
      redirect: 'follow',
    });

    if (!response.ok) {
      throw new Error(`No se pudo consultar la URL (${response.status})`);
    }

    const html = await response.text();
    const titleMatch = html.match(/<title[^>]*>(.*?)<\/title>/is);
    const descriptionMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/is) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["']/is);
    const title = titleMatch?.[1]?.replace(/<[^>]+>/g, '').trim() || 'Sin título';
    const description = descriptionMatch?.[1]?.trim() || 'Sin descripción disponible';

    const analysis = buildReportAnalysis({ companyName, url, sector, goal, html, title, description });

    return NextResponse.json({
      ...analysis,
      generatedAt: new Date().toLocaleString('es-ES'),
    });
  } catch (error) {
    // Log the actual error to the server console for debugging
    try {
      // eslint-disable-next-line no-console
      console.error('Error en /api/analyze:', error instanceof Error ? error.message : String(error));
    } catch (e) {}
    const message = error instanceof Error ? error.message : 'No se pudo analizar la web';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
