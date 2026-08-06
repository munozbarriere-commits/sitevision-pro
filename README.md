SiteVision Pro — Proyecto

Resumen de cambios recientes:

- Mejora de la landing: `apps/web/app/page.tsx`, `apps/web/components/Hero.tsx`, `apps/web/components/FeatureGrid.tsx`, `apps/web/components/InsightsPanel.tsx`.
- Estilos globales mejorados: `apps/web/app/globals.css` (tipografía, espaciado, botones, utilidades).
- Logging mejorado en API: `apps/web/app/api/analyze/route.ts` para facilitar depuración.
- Se inicializó un repositorio Git en la raíz y se hizo un commit local.

Cómo ejecutar localmente:

1. Instalar dependencias (en la raíz del proyecto):

   npm --prefix apps/web install

2. Desarrollo:

   npm --prefix apps/web run dev -- --hostname 0.0.0.0 --port 3000

3. Build de producción:

   npm --prefix apps/web run build
   npm --prefix apps/web run start -- --hostname 0.0.0.0 --port 3000

Notas:
- Para subir a un remoto, añade un `remote` y ejecuta `git push` desde la raíz o configura `apps/web` como submódulo si quieres incluir su contenido separado.
- Si quieres que cree el repositorio en GitHub y lo empuje, necesitaré que me proveas la URL remota o permisos (o hacerlo manualmente desde tu máquina).

Siguientes pasos sugeridos:
- Pulir visualmente componentes específicos y generar variantes de plantilla para exportar a PDF.
- Preparar un pipeline de CI/CD para build y despliegue.
