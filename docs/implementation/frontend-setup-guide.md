# Guía de implementación inicial del frontend de SiteVision Pro

## 1. Objetivo

Esta guía prepara el terreno para construir la interfaz web de SiteVision Pro a partir de la arquitectura y el design system ya definidos.

No incluye lógica de negocio completa, pero sí una base estructurada para empezar a desarrollar la página web.

---

## 2. Estructura recomendada del proyecto

```text
apps/web/
  app/
    page.tsx
    layout.tsx
    globals.css
  components/
    ui/
    layout/
    audit/
  features/
    auth/
    projects/
    audit/
    reports/
  hooks/
  lib/
  types/
  services/
  styles/
```

---

## 3. Tecnologías base recomendadas

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui o Radix UI
- React Query / TanStack Query
- Lucide Icons
- Framer Motion (opcional)

---

## 4. Páginas iniciales recomendadas

### 4.1 Landing page
Objetivo:
- presentar el producto
- mostrar valor de negocio
- captar interés de usuario

Secciones sugeridas:
- hero
- beneficios
- métricas
- cómo funciona
- testimonios
- CTA final

### 4.2 Dashboard
Objetivo:
- ver proyectos
- iniciar auditorías
- revisar estado de reportes

Componentes sugeridos:
- Navbar
- Sidebar
- URLInput
- ProjectCard
- AuditCard

### 4.3 Reporte detallado
Objetivo:
- mostrar resultados de una auditoría
- visualización de scores
- hallazgos y recomendaciones

Componentes sugeridos:
- HealthScore
- ScoreChart
- RecommendationCard
- FindingsList
- StatusBadge

---

## 5. Componentes base para construir primero

### 5.1 Layout
- Navbar
- Sidebar
- PageContainer

### 5.2 UI básica
- Button
- Card
- Badge
- Input
- Modal
- Table
- Alert

### 5.3 Componentes de dominio
- URLInput
- AuditCard
- ProjectCard
- HealthScore
- ScoreChart
- RecommendationCard
- LoadingAnimation
- EmptyState

---

## 6. Flujo de desarrollo recomendado

### Fase A — Base visual
1. Configurar Tailwind y variables de diseño.
2. Crear layout principal.
3. Implementar Navbar y Sidebar.
4. Definir paleta, tipografía y espaciado.

### Fase B — Pantallas principales
1. Construir landing page.
2. Construir dashboard.
3. Construir vista de auditoría.

### Fase C — Integración con datos
1. Crear servicios de API.
2. Conectar formularios y listados.
3. Mostrar estados de carga y error.

### Fase D — Pulido visual
1. Dark mode.
2. microinteracciones.
3. accesibilidad y responsive.

---

## 7. Recomendaciones de implementación

### 7.1 Diseño de componentes
- construir componentes pequeños y reutilizables
- evitar lógica compleja dentro de presentaciones
- separar datos de UI

### 7.2 Estado de la UI
- loading
- empty
- error
- success

### 7.3 Accesibilidad
- usar labels correctos
- mantener contraste adecuado
- botones con foco visible
- soporte a teclado

### 7.4 Responsive
- sidebar colapsable en pantallas pequeñas
- tarjetas adaptables a columna única en móviles
- tablas con scroll horizontal si es necesario

---

## 8. Archivos iniciales sugeridos

### app/layout.tsx
- define la estructura global
- incluye providers si aplican

### app/page.tsx
- landing page o dashboard inicial

### app/globals.css
- variables de color
- estilos base
- clases de utilidad

### components/layout/Navbar.tsx
- barra superior

### components/layout/Sidebar.tsx
- navegación lateral

### components/ui/Button.tsx
- botón reutilizable

### components/ui/Card.tsx
- card base

### components/audit/URLInput.tsx
- input para iniciar auditorías

### components/audit/ProjectCard.tsx
- vista de proyecto

### components/audit/AuditCard.tsx
- resumen de auditoría

---

## 9. Datos de ejemplo para prototipado

Para empezar la UI, se pueden usar datos mock de ejemplo:
- proyectos
- auditorías recientes
- reportes de muestra
- hallazgos ficticios
- scores simulados

Esto permite validar la estructura visual antes de conectar con la API real.

---

## 10. Siguiente paso recomendado

El siguiente paso práctico es crear la estructura base del frontend en el monorepo y construir estas vistas en este orden:
1. landing page
2. layout principal
3. dashboard con proyectos y auditorías
4. vista de reporte detallado
5. integración con la API

---

## 11. Recomendación final

Para arrancar la página web de SiteVision Pro, lo más útil es construir primero la base visual y las vistas principales con datos mock. Luego se conecta la lógica de negocio y la API. Esto permite avanzar rápido sin perder coherencia con la arquitectura y el design system definidos.
