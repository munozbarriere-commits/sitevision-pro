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

  const score = Math.min(
    97,
    70 +
      (hasContact ? 5 : 0) +
      (hasForms ? 4 : 0) +
      (headingCount > 2 ? 4 : 0) +
      (linkCount > 8 ? 4 : 0) +
      (wordCount > 500 ? 5 : 0) +
      (hasViewport ? 3 : 0) +
      (hasSocialProof ? 3 : 0) +
      (hasHero ? 2 : 0) +
      (hasProducts ? 2 : 0)
  );

  const seed = buildSeed([companyLabel, sectorLabel, goalLabel, normalizedUrl, titleText]);
  const variant = seed % 4;
  const confidence = score >= 90 ? 'Alta' : score >= 82 ? 'Media-alta' : 'Media';
  const scoreBand = getScoreBand(score);

  const executiveSummaryTemplates = [
    `Para ${companyLabel}, el diagnóstico identifica oportunidades relevantes en ${sectorBias}, con especial foco en ${goalBias}. La propuesta de valor está presente, pero aún se puede elevar la percepción de profesionalismo y la acción del usuario.`,
    `${companyLabel} muestra una base sólida para ${goalLabel.toLowerCase()}, aunque la experiencia de usuario todavía puede volverse más contundente y orientada a resultados. El informe prioriza los puntos que mejor impactan en confianza, claridad y conversión.`,
    `El análisis de ${companyLabel} sugiere que la marca tiene potencial para crecer, pero su recorrido actual aún deja margen para mejorar ${sectorBias} y reforzar ${goalBias}. La oportunidad está en convertir el sitio en una herramienta más comercial y más persuasiva.`,
    `En ${companyLabel}, el sitio ya comunica una intención de negocio, pero el informe destaca cómo mejorar la narrativa, la jerarquía visual y la ruta de conversión para que ${goalLabel.toLowerCase()} sea más natural y efectivo.`
  ];

  const priorityFocusTemplates = [
    `Optimizar la ruta de ${goalLabel.toLowerCase()} y la claridad del mensaje principal`,
    `Reforzar la experiencia de usuario y el impulso de conversión`,
    `Aumentar credibilidad visual y mejorar la señalización de acción`,
    `Potenciar la propuesta de valor y alinear cada bloque con el objetivo comercial`
  ];

  const tailoredFindings = [
    {
      title: hasHero ? 'Mensaje principal y narrativa de marca' : 'Narrativa de valor y posicionamiento',
      impact: 'Alta',
      detail: hasHero
        ? `El contenido principal de la portada parece tener intención, pero aún puede reforzarse para que ${companyLabel} comunique de forma más directa por qué elegirla y cómo ayudar a ${goalLabel.toLowerCase()}.`
        : `La web debería explicitar con más fuerza cómo ${companyLabel} resuelve el problema del usuario y por qué esa propuesta es relevante para ${goalLabel.toLowerCase()}.`
    },
    {
      title: hasForms || hasContact ? 'Captación y ruta de contacto' : 'Visibilidad de acción comercial',
      impact: 'Alta',
      detail: hasForms || hasContact
        ? `Se detecta una ruta de contacto que puede consolidarse mejor para convertir interés en acción y hacer más fluida la intención de ${goalLabel.toLowerCase()}.`
        : `El sitio puede ganar mucho si incorpora un llamado a la acción más visible y una ruta clara para que el usuario avance hacia ${goalLabel.toLowerCase()}.`
    },
    {
      title: hasSocialProof ? 'Confianza y prueba social' : 'Credibilidad y autoridad',
      impact: 'Media',
      detail: hasSocialProof
        ? `Los elementos de confianza y los signos de validación pueden reforzarse para aumentar seguridad y facilitar la decisión del visitante.`
        : `Añadir evidencias de autoridad, casos, testimonios o garantías mejoraría notablemente la percepción profesional del negocio.`
    },
    {
      title: hasViewport ? 'Experiencia móvil y claridad visual' : 'Experiencia móvil y rendimiento percibido',
      impact: 'Media',
      detail: hasViewport
        ? `La estructura parece preparada para una experiencia más móvil, aunque la jerarquía visual y la simplificación de bloques pueden mejorar el recorrido.`
        : `Un diseño más limpio y un enfoque móvil más consistente ayudarían a reducir fricción y a sostener mejor la intención de conversión.`
    }
  ];

  const sectorRecommendations = sectorLabel.toLowerCase().includes('ecommerce') || sectorLabel.toLowerCase().includes('retail')
    ? [
        'Optimizar las páginas clave para que el producto, la oferta y el botón de compra queden mucho más visibles.',
        'Reducir fricción en el proceso de compra y reforzar elementos de confianza como envío, devoluciones y seguridad.'
      ]
    : sectorLabel.toLowerCase().includes('salud')
      ? [
          'Priorizar mensajes de confianza, profesionalismo y claridad de contacto para facilitar la toma de decisión.',
          'Simplificar la reserva, la consulta o la acción principal para convertir más visitas en interés real.'
        ]
      : sectorLabel.toLowerCase().includes('educación')
        ? [
            'Mejorar la narrativa de beneficios y los llamados a la acción para captar más interés en los programas.',
            'Reordenar la información para que el usuario encuentre rápidamente qué ofrece, para quién y cómo se inicia.'
          ]
        : [
            'Alinear el mensaje principal con la propuesta de valor y los puntos de contacto más relevantes.',
            'Simplificar la arquitectura de navegación para que cada visitante encuentre más rápido lo que necesita.'
          ];

  const goalRecommendations = goalLabel.toLowerCase().includes('vender')
    ? [
        'Diseñar una ruta de compra o contacto más directa, con bloques de valor y llamados a la acción más visibles.',
        'Reforzar el contenido comercial en la parte superior del recorrido para captar mejor el interés del usuario.'
      ]
    : goalLabel.toLowerCase().includes('lead') || goalLabel.toLowerCase().includes('captar')
      ? [
          'Aumentar la relevancia del formulario o la acción principal para que la captación resulte más natural y convincente.',
          'Simplificar la oferta y destacar el beneficio concreto para incrementar la tasa de respuesta.'
        ]
      : goalLabel.toLowerCase().includes('confianza')
        ? [
            'Potenciar testimonios, garantías y elementos de autoridad para que la marca se perciba como más sólida.',
            'Reordenar visualmente los factores de confianza para que aparezcan antes y con mayor peso.'
          ]
        : [
            'Fortalecer la propuesta de valor y la narrativa del sitio para mejorar la percepción general.',
            'Alinear los contenidos y los CTA con la intención actual del visitante.'
          ];

  const recommendations = [
    `Alinear el mensaje principal con la propuesta de valor de ${companyLabel} y con ${goalLabel.toLowerCase()}.`,
    ...sectorRecommendations,
    ...goalRecommendations,
    'Optimizar la experiencia móvil y la jerarquía visual para que el recorrido sea más claro y más persuasivo.'
  ].slice(0, 4);

  const nextSteps = [
    `Priorizar una mejora visible del hero y los CTA de ${companyLabel}.`,
    `Revisar metadatos, encabezados y contenido clave para reforzar la intención de ${goalLabel.toLowerCase()}.`,
    'Convertir los puntos de contacto y la prueba social en un sistema de confianza más claro y accionable.'
  ];

  const uniqueObservations = [
    `${companyLabel} presenta un perfil de negocio con ${hasHero ? 'mensaje principal visible' : 'mensaje principal poco evidente'} y ${hasForms || hasContact ? 'ruta de contacto detectada' : 'área de acción menos visible'}; esto influye directamente en la captación inicial.`,
    hasSocialProof
      ? `Se observan señales de confianza o prueba social que pueden reforzarse para elevar la credibilidad.`
      : `La percepción de autoridad puede ganar mucho si se incorporan testimonios, casos o garantías visibles.`,
    sectorLabel.toLowerCase().includes('ecommerce') || sectorLabel.toLowerCase().includes('retail')
      ? 'El recorrido comercial es clave, por lo que la claridad del producto, la oferta y la acción deben ser prioritarias.'
      : sectorLabel.toLowerCase().includes('salud')
        ? 'La confianza clínica y la claridad de contacto son especialmente relevantes para este tipo de negocio.'
        : sectorLabel.toLowerCase().includes('educación')
          ? 'El mensaje de valor y la facilidad para entender lo que ofrece la marca son determinantes aquí.'
          : 'La narrativa de valor y la facilidad de navegación son los puntos que más impacto pueden generar.'
  ];

  const metrics = [
    { label: 'Rendimiento percibido', value: `${Math.max(70, score - 8)}/100` },
    { label: 'SEO y claridad', value: `${Math.max(72, score - 4)}/100` },
    { label: 'Conversión', value: `${Math.max(74, score - 6)}/100` },
    { label: 'Confianza', value: `${Math.max(76, score - 2)}/100` }
  ];

  return {
    companyName: companyLabel,
    url: normalizedUrl,
    sector: sectorLabel,
    goal: goalLabel,
    score,
    generatedAt: new Date().toLocaleString('es-ES'),
    title: titleText,
    description: descriptionText,
    executiveSummary: executiveSummaryTemplates[variant],
    confidence,
    priorityFocus: priorityFocusTemplates[variant],
    scoreBand,
    metrics,
    findings: tailoredFindings.slice(0, 4),
    recommendations,
    nextSteps,
    uniqueObservations,
    personalizationProfile: {
      variant,
      sectorBias,
      goalBias,
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
