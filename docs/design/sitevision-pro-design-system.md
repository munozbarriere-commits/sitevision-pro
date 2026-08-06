# Design System — SiteVision Pro

## 1. Objetivo

El Design System de SiteVision Pro busca proporcionar una experiencia visual consistente, profesional y escalable para una plataforma SaaS orientada a auditorías técnicas, reportes ejecutivos y análisis web avanzados.

El sistema debe ser:
- claro y moderno
- accesible
- consistente entre web y productos relacionados
- escalable para crecimiento futuro
- adecuado para modo claro y oscuro

---

## 2. Principios de diseño

- Profesionalismo: apariencia seria y empresarial.
- Claridad: información fácil de leer y priorizar.
- Confianza: visuales estables, consistentes y fiables.
- Escalabilidad: componentes reutilizables y tokenizados.
- Accesibilidad: contraste, legibilidad y foco visibles.

---

## 3. Paleta de colores

### 3.1 Colores base

| Token | Valor | Uso |
|---|---|---|
| `--color-primary-500` | `#2563EB` | color principal de acciones y enlaces |
| `--color-primary-600` | `#1D4ED8` | hover / estado activo |
| `--color-primary-700` | `#1E40AF` | énfasis mayor |
| `--color-secondary-500` | `#7C3AED` | acentos secundarios |
| `--color-accent-500` | `#06B6D4` | información técnica / highlights |

### 3.2 Colores de estado

| Token | Valor | Uso |
|---|---|---|
| `--color-success-500` | `#16A34A` | éxito, completado |
| `--color-warning-500` | `#F59E0B` | advertencia |
| `--color-danger-500` | `#DC2626` | error o riesgo crítico |
| `--color-info-500` | `#0EA5E9` | información |

### 3.3 Neutrales

| Token | Valor | Uso |
|---|---|---|
| `--color-neutral-0` | `#FFFFFF` | fondo principal claro |
| `--color-neutral-50` | `#F8FAFC` | fondos suaves |
| `--color-neutral-100` | `#F1F5F9` | bordes y superficies |
| `--color-neutral-300` | `#CBD5E1` | bordes secundarios |
| `--color-neutral-600` | `#475569` | texto secundario |
| `--color-neutral-800` | `#1E293B` | texto principal |
| `--color-neutral-950` | `#0F172A` | texto muy fuerte |

### 3.4 Reglas de uso
- El azul primario debe usarse para acciones primarias y navegación relevante.
- El verde indica éxito, el amarillo advertencia y el rojo riesgo o error.
- Los neutrales deben dominar la UI para mantener una sensación corporativa y limpia.

---

## 4. Tipografía

### 4.1 Fuente recomendada
- `Inter` para interfaces modernas y legibles.
- `Source Sans 3` como alternativa si se desea una experiencia más editorial.

### 4.2 Escala tipográfica

| Token | Tamaño | Uso |
|---|---:|---|
| `--font-size-xs` | 12px | etiquetas, pequeños detalles |
| `--font-size-sm` | 14px | texto secundario |
| `--font-size-md` | 16px | texto base |
| `--font-size-lg` | 20px | subtítulos |
| `--font-size-xl` | 24px | encabezados pequeños |
| `--font-size-2xl` | 32px | encabezados principales |
| `--font-size-3xl` | 40px | hero / títulos destacados |

### 4.3 Pesos
- `400` regular
- `500` medium
- `600` semibold
- `700` bold

### 4.4 Line-height
- `1.2` para títulos
- `1.5` para texto largo
- `1.4` para etiquetas y UI compacta

---

## 5. Espaciados

Se recomienda una escala basada en 4px.

| Token | Valor |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |

### Reglas de uso
- Los grupos de contenido deben usar espaciado de 16–24px.
- Los componentes compactos deben usar 8–12px.
- Los separadores entre secciones deben usar 32–48px.

---

## 6. Botones

### 6.1 Variantes
- `primary`: acción principal
- `secondary`: acción de apoyo
- `ghost`: acción ligera sin fondo
- `danger`: acción destructiva
- `link`: comportamiento tipo enlace

### 6.2 Tamaños
- `sm`: 32px de altura
- `md`: 40px de altura
- `lg`: 48px de altura

### 6.3 Estilo base
- radio de borde 8px
- padding horizontal 16px
- font-weight 600
- hover con leve elevación
- focus visible con anillo azul

### Ejemplo visual recomendado
```text
Primary Button
- background: primary-600
- text: neutral-0
- border: none
```

---

## 7. Tarjetas

Las tarjetas deben comunicar jerarquía visual y separar contenido sin sobrecargar la interfaz.

### Atributos recomendados
- fondo: `neutral-0` o superficie ligera
- borde sutil: `neutral-100`
- radio: 12px
- sombra: `0 1px 3px rgba(15, 23, 42, 0.08)`
- padding interno: 20px

### Uso recomendado
- resúmenes de reportes
- métricas clave
- listas de proyectos
- estados de auditoría

---

## 8. Tablas

### Estilo recomendado
- encabezado con fondo neutro claro
- filas alternadas para facilitar lectura
- hover sutil sobre filas
- bordes suaves y consistentes
- texto alineado a la izquierda para datos de texto

### Reglas de uso
- Usar tablas para datos estructurados y comparables.
- Mantener columnas limitadas y claras.
- Incluir estado visual para métricas o resultados.

### Ejemplo de densidad
- `compact` para dashboards
- `comfortable` para vistas de detalle

---

## 9. Modales

Los modales deben usarse para tareas de alta concentración, como:
- crear proyectos
- editar configuración
- confirmar acciones críticas
- visualizar detalles de reportes

### Reglas recomendadas
- ancho máximo: 640px
- radio: 16px
- padding: 24px
- header claro con título y cierre
- acciones alineadas al final
- overlay con opacidad media

---

## 10. Badges

Los badges ayudan a resaltar estados o categorías.

### Variantes recomendadas
- `success` -> verde
- `warning` -> amarillo
- `danger` -> rojo
- `info` -> azul
- `neutral` -> gris

### Ejemplo de uso
- estado del análisis: `queued`, `running`, `completed`, `failed`
- tipo de hallazgo: `seo`, `performance`, `security`

---

## 11. Iconografía

### Estilo recomendado
- iconos outline o filled consistentes
- tamaño base: 16px, 20px, 24px
- uso claro de color según estado o acción

### Categorías sugeridas
- navegación: home, dashboard, projects, reports
- acciones: add, edit, delete, export, search
- estado: check, warning, error, info
- análisis técnico: chart, shield, lightning, monitor

### Recomendación
Usar una librería como:
- Lucide React
- Heroicons
- Phosphor Icons

---

## 12. Dark mode

### Objetivo
Proporcionar una experiencia visual cómoda, elegante y legible en entornos oscuros, sin perder jerarquía de información.

### Paleta oscura sugerida

| Token | Valor |
|---|---|
| `--color-dark-bg` | `#020617` |
| `--color-dark-surface` | `#0F172A` |
| `--color-dark-surface-elevated` | `#111827` |
| `--color-dark-border` | `#1F2937` |
| `--color-dark-text` | `#F8FAFC` |
| `--color-dark-text-muted` | `#94A3B8` |

### Reglas de dark mode
- Mantener suficiente contraste para texto y acciones.
- Reducir el brillo de fondos y aumentar el contraste de textos.
- Usar superficies elevadas para tarjetas y paneles.
- Mantener los colores de estado intactos para claridad semántica.

### Comportamiento recomendado
- Activar automáticamente según preferencias del sistema.
- Permitir override manual por usuario.
- Asegurar consistencia en todos los componentes.

---

## 13. Componentes recomendados

### Layout
- App shell con sidebar, header y contenido principal
- Grid de 12 columnas para pantallas grandes

### Formularios
- Inputs con borde suave y focus visible
- Labels claros y mensajes de error en rojo

### Estados vacíos
- mensajes claros para ausencia de proyectos, reportes o auditorías

### Loading states
- skeletons o spinners suaves para procesos largos

---

## 14. Guía de implementación

### Tokens base
Definir los tokens en un archivo central como:
- `tokens/colors.css`
- `tokens/spacing.css`
- `tokens/typography.css`

### Componentes reutilizables
- `Button`
- `Card`
- `Badge`
- `Table`
- `Modal`
- `Input`
- `Select`
- `Alert`

### Recomendación técnica
- Implementar con Tailwind CSS y un sistema de tokens personalizado.
- Usar CSS variables para facilitar el cambio entre light/dark mode.

---

## 15. Recomendación final

El Design System de SiteVision Pro debe ser visualmente corporativo, técnico y profesional. La combinación de una paleta azul/indigo, tipografía limpia, espaciado sistemático y componentes consistentes permitirá construir una interfaz sólida, escalable y preparada para productos empresariales.
