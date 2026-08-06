# SiteVision Pro — Especificación Maestra del Producto

## 1. Visión general

SiteVision Pro es una plataforma SaaS orientada a auditar sitios web, detectar problemas técnicos y de negocio, y generar reportes accionables con ayuda de inteligencia artificial.

El producto está diseñado para cubrir tres capas clave:
- infraestructura y arquitectura del producto
- motor de auditoría modular
- motor de IA para interpretación y recomendación

Esta especificación representa la base de diseño de la primera fase de producto y no incluye implementación de código.

---

## 2. Áreas documentadas

### Arquitectura del producto
- [docs/architecture/sitevision-pro-architecture.md](architecture/sitevision-pro-architecture.md)
- Define visión general, arquitectura de alto nivel, frontend, backend, monorepo, escalabilidad y seguridad.

### API REST
- [docs/architecture/sitevision-pro-api-spec.md](architecture/sitevision-pro-api-spec.md)
- Define endpoints para autenticación, proyectos, auditorías, reportes y exportación.

### Motor de Auditoría
- [docs/architecture/sitevision-pro-audit-engine.md](architecture/sitevision-pro-audit-engine.md)
- Define el motor modular, plugins, flujo de ejecución, puntuación, normalización y observabilidad.

### Motor de IA
- [docs/architecture/sitevision-pro-ai-engine.md](architecture/sitevision-pro-ai-engine.md)
- Define el flujo del motor de IA, perfil del sitio, recomendaciones, plan de acción y generación de reportes.

### Design System
- [docs/design/sitevision-pro-design-system.md](design/sitevision-pro-design-system.md)
- Define colores, tipografía, espaciados, botones, tarjetas, tablas, modales, badges, iconografía y dark mode.

### Componentes React
- [docs/design/sitevision-pro-react-components.md](design/sitevision-pro-react-components.md)
- Define componentes como AuditCard, HealthScore, Sidebar, Navbar, ProjectCard, URLInput, ScoreChart, LoadingAnimation y RecommendationCard.

---

## 3. Resumen ejecutivo del sistema

### Propuesta de producto
SiteVision Pro permite:
- recibir una URL
- ejecutar una auditoría técnica y estratégica
- consolidar hallazgos
- generar recomendaciones priorizadas
- producir reportes ejecutivos y accionables

### Arquitectura recomendada
- frontend moderno con React/Next.js
- backend empresarial con NestJS
- procesamiento asíncrono con workers
- base de datos relacional con PostgreSQL
- almacenamiento de artefactos y reportes
- cola de mensajes para escalabilidad
- motor de IA para interpretación estratégica

### Enfoque de diseño
- modular
- escalable
- seguro
- observable
- extensible

---

## 4. Flujo de valor del producto

1. El usuario ingresa una URL.
2. El sistema crea un job de auditoría.
3. El motor ejecuta módulos especializados en paralelo.
4. Los resultados se consolidan y normalizan.
5. El motor de IA interpreta los hallazgos y genera recomendaciones.
6. Se genera un reporte ejecutivo y técnico.
7. El usuario puede consultar, exportar y profundizar en los resultados.

---

## 5. Prioridades para la siguiente fase

### Fase de implementación inicial
- definir contratos de API
- implementar el pipeline base del motor de auditoría
- construir los primeros plugins: performance y SEO
- definir el payload estándar de entrada/salida para la IA
- preparar observabilidad y logging

### Fase de expansión
- agregar seguridad, accesibilidad y tecnologías detectadas
- integrar reportes más ricos y exportaciones
- perfeccionar la IA conversacional
- mejorar el diseño de UI y experiencia de usuario

---

## 6. Recomendación final

La propuesta de SiteVision Pro combina una arquitectura sólida, un motor de auditoría modular, un motor de IA orientado a negocio y una interfaz profesional y escalable. Esta base permite construir un producto de alto valor con una ruta clara de evolución.
