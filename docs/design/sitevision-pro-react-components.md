# Componentes React — SiteVision Pro

## 1. Objetivo

Esta especificación define los componentes React principales de la interfaz de SiteVision Pro para la primera fase del producto. El enfoque es crear una biblioteca de UI consistente, reutilizable y alineada con el Design System.

Los componentes están pensados para:
- mostrar auditorías y reportes
- permitir navegación entre proyectos
- capturar URL de entrada
- mostrar estados de carga y resultados
- exponer recomendaciones y métricas claras

---

## 2. Principios de diseño de componentes

- Reutilizables: cada componente debe poder usarse en múltiples vistas.
- Compuestos: los componentes grandes deben construirse a partir de bloques menores.
- Consistentes: mismos patrones de spacing, color, tamaño y comportamiento.
- Accesibles: etiquetas, roles, foco, contraste y navegación por teclado.
- Preparados para estados: loading, empty, error y success.

---

## 3. Componentes propuestos

## 3.1 AuditCard

### Propósito
Mostrar un resumen ejecutivo de una auditoría realizada sobre un sitio o URL.

### Props sugeridas
```ts
interface AuditCardProps {
  id: string;
  title: string;
  url: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  score?: number;
  updatedAt?: string;
  summary?: string;
  onClick?: () => void;
}
```

### Estructura
- Header con título y estado badge
- URL o dominio principal
- Score principal si existe
- Resumen breve
- Footer con fecha y acción de ver detalle

### Estados
- loading: mostrar skeleton interno
- completed: mostrar score y resumen
- failed: mostrar mensaje de error y recomendación

### Estilo
- Card con borde sutil, padding 20px, radio 12px, hover ligero.

---

## 3.2 HealthScore

### Propósito
Mostrar una puntuación general de salud del sitio o del reporte.

### Props sugeridas
```ts
interface HealthScoreProps {
  score: number; // 0-100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'circle' | 'bar';
}
```

### Comportamiento
- Si el score es >= 80: verde
- 60-79: amarillo
- < 60: rojo

### Visualización
- Circular si `variant="circle"`
- Barra horizontal si `variant="bar"`

### Consideraciones
- Mostrar texto como “Excelente”, “Bueno”, “Atención” según rango.

---

## 3.3 Sidebar

### Propósito
Proporcionar navegación principal dentro de la aplicación.

### Props sugeridas
```ts
interface SidebarProps {
  items: Array<{
    id: string;
    label: string;
    icon?: React.ReactNode;
    href?: string;
    active?: boolean;
  }>;
  collapsed?: boolean;
  onNavigate?: (id: string) => void;
}
```

### Estructura
- Logo o marca
- Lista de items
- Sección de ayuda o configuración
- Estado activo visualmente destacado

### Comportamiento
- Soporta colapso en pantallas pequeñas
- Mantiene accesibilidad con `aria-current` en el activo

---

## 3.4 Navbar

### Propósito
Mostrar la barra superior de la aplicación con navegación contextual y acciones rápidas.

### Props sugeridas
```ts
interface NavbarProps {
  title?: string;
  actions?: React.ReactNode;
  userMenu?: React.ReactNode;
  breadcrumbs?: Array<{ label: string; href?: string }>;
}
```

### Estructura
- Título o breadcrumb
- Acciones de la derecha
- Botón de menú para móviles
- Área para usuario o perfil

### Estilo
- Fondo claro u oscuro según tema
- borde inferior sutil
- altura fija de 64px

---

## 3.5 ProjectCard

### Propósito
Representar un proyecto o sitio a auditar dentro del dashboard principal.

### Props sugeridas
```ts
interface ProjectCardProps {
  id: string;
  name: string;
  url: string;
  lastAuditDate?: string;
  healthScore?: number;
  status?: 'active' | 'paused' | 'archived';
  onOpen?: () => void;
}
```

### Estructura
- Nombre del proyecto
- URL base
- Última auditoría
- Health score si existe
- Badge de estado
- Botón de abrir o auditar

### Comportamiento
- Acceso rápido a la vista de detalle del proyecto.

---

## 3.6 URLInput

### Propósito
Recoger la URL a analizar desde la vista principal o una acción rápida.

### Props sugeridas
```ts
interface URLInputProps {
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  onSubmit?: (url: string) => void;
  onChange?: (value: string) => void;
}
```

### Estructura
- Input con icono de búsqueda o enlace
- Botón de “Auditar”
- Validación visual de URL
- Estado de carga al enviar

### Reglas
- Mostrar error si la URL está vacía o no es válida.
- Inhabilitar el botón mientras se procesa.

---

## 3.7 ScoreChart

### Propósito
Visualizar métricas agrupadas o desempeño general del sitio.

### Props sugeridas
```ts
interface ScoreChartProps {
  data: Array<{
    label: string;
    value: number;
    color?: string;
  }>;
  type?: 'bar' | 'radial' | 'line';
}
```

### Visualización
- Barras horizontales para métricas de categorías
- Gráfico radial para puntaje general
- Línea para tendencias temporales

### Consideraciones
- Debe ser claro y no saturado visualmente.
- Usar colores semánticos por categoría.

---

## 3.8 LoadingAnimation

### Propósito
Indicar que una tarea larga está en progreso, como un crawl o reporte.

### Props sugeridas
```ts
interface LoadingAnimationProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'pulse' | 'skeleton';
}
```

### Comportamiento
- Mostrar mensaje de progreso como “Analizando sitio…”
- Puede incluir barra de progreso opcional
- Acompañar con estado visual del job

---

## 3.9 RecommendationCard

### Propósito
Mostrar una recomendación accionable para resolver un hallazgo técnico.

### Props sugeridas
```ts
interface RecommendationCardProps {
  title: string;
  description: string;
  severity?: 'low' | 'medium' | 'high' | 'critical';
  category?: string;
  onAction?: () => void;
}
```

### Estructura
- Título
- Descripción
- Badge de severidad
- Etiqueta de categoría
- Botón de acción opcional

### Estilo
- Tarjeta con borde de color según severidad.

---

## 3.10 FindingsList

### Propósito
Listar hallazgos detectados en el análisis.

### Props sugeridas
```ts
interface FindingsListProps {
  findings: Array<{
    id: string;
    title: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    category: string;
    description: string;
  }>;
}
```

### Comportamiento
- Agrupar por categoría si es necesario
- Permitir selección de un hallazgo
- Mostrar estado visual por severidad

---

## 3.11 EmptyState

### Propósito
Mostrar un estado vacío cuando no hay proyectos, reportes o hallazgos.

### Props sugeridas
```ts
interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}
```

### Uso recomendado
- sin proyectos aún
- sin auditorías previas
- sin hallazgos encontrados

---

## 3.12 StatusBadge

### Propósito
Mostrar de forma compacta el estado de un proyecto o auditoría.

### Props sugeridas
```ts
interface StatusBadgeProps {
  status: 'queued' | 'running' | 'completed' | 'failed' | 'active' | 'paused' | 'archived';
}
```

### Estilo
- `queued`: azul
- `running`: azul brillante
- `completed`: verde
- `failed`: rojo
- `paused`: amarillo
- `archived`: gris

---

## 4. Composición recomendada

### Dashboard principal
- `Navbar`
- `Sidebar`
- `URLInput`
- `ProjectCard` grid
- `AuditCard` list

### Vista de reporte
- `HealthScore`
- `ScoreChart`
- `RecommendationCard`
- `FindingsList`
- `StatusBadge`

### Estados transversales
- `LoadingAnimation`
- `EmptyState`
- `Modal` para acciones y confirmaciones

---

## 5. Recomendaciones de implementación

### Tecnologías sugeridas
- React + TypeScript
- Tailwind CSS para estilos
- Shadcn/ui o Radix UI como base de componentes accesibles
- Framer Motion opcional para animaciones suaves

### Estructura sugerida de componentes
```text
components/
  ui/
    Button.tsx
    Card.tsx
    Badge.tsx
    Modal.tsx
    Table.tsx
  layout/
    Sidebar.tsx
    Navbar.tsx
  audit/
    AuditCard.tsx
    HealthScore.tsx
    ScoreChart.tsx
    RecommendationCard.tsx
    FindingsList.tsx
    LoadingAnimation.tsx
    URLInput.tsx
    ProjectCard.tsx
```

---

## 6. Recomendación final

Los componentes de SiteVision Pro deben ser claros, visualmente profesionales y fáciles de componer en flujos de auditoría y reportes. La arquitectura recomendada es una mezcla de componentes atómicos reutilizables, bloques de dominio y vistas orientadas a casos de uso, todo alineado con el Design System y preparado para dark mode.
