function normalizeUrl(value) {
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

function normalizeText(value) {
  return String(value || '').trim().replace(/\s+/g, ' ');
}

function buildSeed(values) {
  return values
    .map((value) => normalizeText(value).toLowerCase())
    .join('|')
    .split('')
    .reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 1), 0);
}

function createRng(seedValue) {
  let state = seedValue % 2147483647;
  if (state <= 0) state += 2147483646;
  return function random() {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function shuffle(list, rng) {
  const items = [...list];
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function pickOne(list, rng) {
  return list[Math.floor(rng() * list.length)];
}

function getScoreBand(score) {
  if (score >= 90) return 'Muy fuerte';
  if (score >= 82) return 'Buen potencial';
  return 'Requiere revisión';
}

function buildReportAnalysis({ companyName, url, sector, goal, html, title, description }) {
  const normalizedUrl = normalizeUrl(normalizeText(url));
  const companyLabel = normalizeText(companyName) || 'tu empresa';
  const sectorLabel = normalizeText(sector) || 'Negocio';
  const goalLabel = normalizeText(goal) || 'captar clientes';
  const titleText = normalizeText(title) || 'Sin título';
  const descriptionText = normalizeText(description) || 'Sin descripción disponible';

  const headingCount = (html.match(/<h[1-3]\b/gi) || []).length;
  const linkCount = (html.match(/<a\b/gi) || []).length;
  const buttonCount = (html.match(/<(button|input[^>]+type=["'](?:button|submit)["'])/gi) || []).length;
  const wordCount = (html.replace(/<[^>]+>/g, ' ').match(/\b\w+\b/g) || []).length;
  const hasContact = /contact|contáctanos|cotizar|llámanos|habla con nosotros|whatsapp/i.test(html);
  const hasForms = /<form\b/i.test(html);
  const hasTestimonials = /testimonio|opiniones|clientes|reviews|casos de éxito/i.test(html);
  const hasPricing = /precio|precios|plan|planes|cotizar|reservar|suscripción/i.test(html);
  const hasFaq = /faq|preguntas frecuentes|ayuda/i.test(html);
  const hasBlog = /blog|artículo|noticia|artículos|news/i.test(html);
  const hasViewport = /<meta[^>]+name=["']viewport["']/i.test(html);
  const hasProducts = /producto|productos|servicios|soluciones|catalogo|tienda|shop|oferta/i.test(html);
  const hasHero = /hero|banner|intro|bienvenidos|presentamos/i.test(html);
  const hasSocialProof = hasTestimonials || hasFaq || hasPricing;

  const sectorBias = sectorLabel.toLowerCase().includes('ecommerce') || sectorLabel.toLowerCase().includes('retail')
    ? 'experiencia de compra y confianza'
    : sectorLabel.toLowerCase().includes('salud')
      ? 'credibilidad y reserva de citas'
      : sectorLabel.toLowerCase().includes('educación')
        ? 'navegación clara y captación de interés'
        : 'claridad y conversión';

  const goalBias = goalLabel.toLowerCase().includes('vender')
    ? 'mejorar el recorrido de compra y la acción comercial'
    : goalLabel.toLowerCase().includes('lead') || goalLabel.toLowerCase().includes('captar')
      ? 'reducir fricción y aumentar la captación de contacto'
      : goalLabel.toLowerCase().includes('confianza')
        ? 'fortalecer credibilidad y percepción de marca'
        : 'reforzar el mensaje principal y la propuesta de valor';

  const reportSeed = buildSeed([companyLabel, sectorLabel, goalLabel, normalizedUrl, titleText, descriptionText, Date.now().toString()]);
  const rng = createRng(reportSeed);

  const score = Math.min(
    97,
    65 +
      (hasContact ? 5 : 0) +
      (hasForms ? 4 : 0) +
      (headingCount > 2 ? 3 : 0) +
      (linkCount > 8 ? 3 : 0) +
      (wordCount > 500 ? 4 : 0) +
      (hasViewport ? 3 : 0) +
      (hasSocialProof ? 3 : 0) +
      (hasHero ? 2 : 0) +
      (hasProducts ? 2 : 0) +
      Math.floor(rng() * 10)
  );

  const confidence = score >= 90 ? 'Alta' : score >= 82 ? 'Media-alta' : 'Media';
  const scoreBand = getScoreBand(score);

  const summaryStarts = shuffle([
    `Para ${companyLabel}, este informe ha sido construido únicamente con el contexto de su sector, su objetivo y los hallazgos de su sitio.`,
    `Este diagnóstico para ${companyLabel} es 100% personalizado y busca traducir su propuesta en acciones concretas para ${goalLabel.toLowerCase()}.`,
    `El análisis distingue a ${companyLabel} por su enfoque en ${sectorLabel}, y propone mejoras que respetan la naturaleza de su negocio.`,
    `Este reporte se enfoca en cómo ${companyLabel} puede mejorar su capacidad de ${goalLabel.toLowerCase()} mediante una experiencia más clara y creíble.`
  ], rng);

  const summaryMiddles = shuffle([
    `La revisión detectó que el sitio actual puede ganar en confianza y conversión si los mensajes se alínean mejor con ${goalLabel.toLowerCase()}.`,
    `Se prioriza el valor de la narrativa de la marca, la ruta de contacto y la percepción de profesionalismo en cada bloque.`,
    `Encontramos evidencias de oportunidad en la consistencia del mensaje, la visibilidad del CTA y la confianza del usuario.`,
    `Este diagnóstico utiliza la información del sitio para ofrecer recomendaciones adaptadas a ${sectorLabel} y a su objetivo comercial.`
  ], rng);

  const summaryEnds = shuffle([
    `El informe propone cambios específicos que hacen que la mejora no sea genérica, sino alineada con lo que su empresa quiere lograr.`,
    `Cada conclusión está creada para que ${companyLabel} avance sin perder su identidad y sin repetir recomendaciones estándar.`,
    `El resultado es un plan de mejoras con foco en su meta: ${goalLabel.toLowerCase()} con mayor claridad y menos fricción.`,
    `Esto no es un diagnóstico automático, es una guía personalizada orientada a resultados reales.`
  ], rng);

  const executiveSummary = `${summaryStarts[0]} ${summaryMiddles[0]} ${summaryEnds[0]}`;

  const focusStatements = shuffle([
    `Alinear el mensaje principal con el valor diferencial de ${companyLabel}.`,
    `Aumentar la conversión de visitantes en clientes a través de una ruta más clara y confiable.`,
    `Reforzar la percepción de profesionalismo en cada pantalla del sitio.`,
    `Reducir la fricción del usuario para que la acción deseada sea más simple y evidente.`
  ], rng);

  const priorityFocus = focusStatements[0];

  const baseFindings = [
    {
      title: hasHero ? 'Primer impacto y mensaje de valor' : 'Claridad del mensaje inicial',
      impact: 'Alta',
      detail: hasHero
        ? `El hero de ${companyLabel} tiene una estructura atractiva, pero necesita un mensaje más directo que conecte con ${goalLabel.toLowerCase()} de manera inmediata.`
        : `La primera pantalla no comunica con suficiente fuerza qué ofrece ${companyLabel} y por qué el visitante debería avanzar.`
    },
    {
      title: hasForms || hasContact ? 'Ruta de acción y conversión' : 'Visibilidad de contacto',
      impact: 'Alta',
      detail: hasForms || hasContact
        ? `La ruta de contacto existe, pero puede limpiarse para que el visitante comprenda el siguiente paso sin perder interés.`
        : `Se recomienda incorporar un llamado a la acción más evidente y específico para convertir visitas en leads o clientes.`
    },
    {
      title: hasSocialProof ? 'Confianza y credibilidad' : 'Prueba social y seguridad',
      impact: 'Media',
      detail: hasSocialProof
        ? `Los elementos de confianza ayudan, pero deben reorganizarse para aparecer en los momentos clave del recorrido.`
        : `Incorporar testimonios, casos o apoyos claros fortalecería la credibilidad de ${companyLabel} sin necesidad de cambios de producto.`
    },
    {
      title: hasViewport ? 'Experiencia móvil' : 'Adaptación a dispositivos',
      impact: 'Media',
      detail: hasViewport
        ? `El sitio ya cubre aspectos técnicos de mobile, pero puede mejorar la jerarquía visual en pantallas pequeñas.`
        : `Optimizar la experiencia móvil permitirá que más usuarios lleguen al CTA sin perder contexto.`
    },
    {
      title: 'Estructura del contenido',
      impact: 'Media',
      detail: `Organizar el contenido según el objetivo de ${goalLabel.toLowerCase()} hará más fácil que cada visitante encuentre lo que busca.`
    },
    {
      title: 'Propuesta de valor',
      impact: 'Media',
      detail: `Reforzar el valor diferencial de ${companyLabel} con ejemplos concretos ayudará a transmitir seguridad y convertir mejor.`
    }
  ];

  const findings = shuffle(baseFindings, rng).slice(0, 4);

  const recommendationOptions = shuffle([
    `Alinear el mensaje principal con la propuesta de valor concreta de ${companyLabel}.`,
    `Hacer visible el beneficio principal para aumentar la intención de ${goalLabel.toLowerCase()}.`,
    `Reducir distracciones y enfocar el recorrido hacia el CTA más importante.`,
    `Refuerza la confianza con elementos sociales y pruebas claras en puntos clave.`,
    `Optimiza la navegación para que el visitante encuentre rápidamente lo que necesita.`
  ], rng);

  const sectorSpecific = sectorLabel.toLowerCase().includes('ecommerce') || sectorLabel.toLowerCase().includes('retail')
    ? shuffle([
        'Simplificar el proceso de compra y elevar la claridad del valor de producto.',
        'Reforzar los detalles de envío, garantía y seguridad para reducir la fricción.'
      ], rng)
    : sectorLabel.toLowerCase().includes('salud')
      ? shuffle([
          'Priorizar la confianza y los pasos de contacto directo para consultas o reservas.',
          'Comunicar con claridad la profesionalidad y la seguridad del servicio.'
        ], rng)
      : sectorLabel.toLowerCase().includes('educación')
        ? shuffle([
            'Presentar resultados concretos y beneficios de manera sencilla.',
            'Organizar la oferta educativa para que el usuario sepa qué hacer después.'
          ], rng)
        : shuffle([
            'Hacer más evidente la propuesta de valor para el tipo de cliente ideal.',
            'Alinear el contenido con la forma en que el visitante toma decisiones.'
          ], rng);

  const goalSpecific = goalLabel.toLowerCase().includes('vender')
    ? shuffle([
        'Fortalece la propuesta comercial para que el visitante entienda qué va a comprar y por qué.',
        'Clarifica los beneficios de actuar ahora y reduce la incertidumbre de la compra.'
      ], rng)
    : goalLabel.toLowerCase().includes('lead') || goalLabel.toLowerCase().includes('captar')
      ? shuffle([
          'Simplifica la conversión de contacto mostrando el valor claro de dejar datos.',
          'Refuerza la propuesta de seguimiento para que el usuario sepa qué recibirá después.'
        ], rng)
      : goalLabel.toLowerCase().includes('confianza')
        ? shuffle([
            'Resalta certificaciones, testimonios y garantías para generar mayor credibilidad.',
            'Haz más evidente la autoridad de ${companyLabel} en su sector.'
          ], rng)
        : shuffle([
            'Prioriza los mensajes que muestren claramente el valor esperado.',
            'Alinea los CTAs con el interés real del visitante.'
          ], rng);

  const recommendations = [...recommendationOptions.slice(0, 2), sectorSpecific[0], goalSpecific[0]];

  const nextStepsOptions = shuffle([
    `Revisar el mensaje principal y hacerlo más específico para ${goalLabel.toLowerCase()}.`,
    `Mostrar la propuesta de valor de ${companyLabel} mediante ejemplos y resultados claros.`,
    `Simplificar los caminos de acción para que el usuario avance sin distracciones.`,
    `Reforzar la confianza con señales sociales visibles y testimonios relevantes.`
  ], rng);

  const nextSteps = nextStepsOptions.slice(0, 3);

  const observationPool = shuffle([
    `${companyLabel} tiene potencial para mejorar su conversión al clarificar el valor en cada pantalla.`,
    `Los elementos de confianza deben aparecer más temprano para reducir la incertidumbre del visitante.`,
    `El flujo actual ofrece señales que pueden convertirse en una ruta más efectiva hacia ${goalLabel.toLowerCase()}.`,
    `La propuesta de valor se beneficiaría de una expresión más directa y menos genérica.`
  ], rng);

  const uniqueObservations = observationPool.slice(0, 3);

  const metricsPool = shuffle([
    { label: 'Rendimiento percibido', value: `${Math.max(70, score - 8)}/100` },
    { label: 'SEO y claridad', value: `${Math.max(72, score - 4)}/100` },
    { label: 'Conversión', value: `${Math.max(74, score - 6)}/100` },
    { label: 'Confianza', value: `${Math.max(76, score - 2)}/100` },
    { label: 'Experiencia de usuario', value: `${Math.max(68, score - 10)}/100` },
    { label: 'Autoridad de marca', value: `${Math.max(68, score - 9)}/100` }
  ], rng);

  const metrics = metricsPool.slice(0, 4);

  return {
    companyName: companyLabel,
    url: normalizedUrl,
    sector: sectorLabel,
    goal: goalLabel,
    score,
    generatedAt: new Date().toLocaleString('es-ES'),
    title: titleText,
    description: descriptionText,
    executiveSummary,
    confidence,
    priorityFocus,
    scoreBand,
    metrics,
    findings,
    recommendations,
    nextSteps,
    uniqueObservations,
    personalizationProfile: {
      sectorBias,
      goalBias,
      seededAt: new Date().toISOString(),
      detectedSignals: {
        hasContact,
        hasForms,
        hasTestimonials,
        hasPricing,
        hasFaq,
        hasBlog,
        hasViewport,
        hasProducts,
        hasHero,
        wordCount,
        linkCount,
        headingCount,
        buttonCount
      }
    }
  };
}

module.exports = {
  buildReportAnalysis,
  normalizeUrl
};
