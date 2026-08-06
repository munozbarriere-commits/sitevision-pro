# Especificación de API REST — SiteVision Pro

## 1. Objetivo

Esta especificación define una primera versión de la API REST para SiteVision Pro, orientada a:
- iniciar auditorías sobre URLs
- consultar reportes y estados de ejecución
- autenticar usuarios
- gestionar proyectos
- exportar resultados a PDF

La API está diseñada para ser consistente, segura y extensible.

---

## 2. Convenciones generales

### Formato de respuesta
Todas las respuestas siguen este patrón base:

```json
{
  "success": true,
  "data": {},
  "error": null
}
```

### Códigos HTTP
- 200 OK: operación exitosa
- 201 Created: recurso creado correctamente
- 202 Accepted: operación aceptada y procesada de forma asíncrona
- 400 Bad Request: datos inválidos
- 401 Unauthorized: autenticación requerida
- 403 Forbidden: permisos insuficientes
- 404 Not Found: recurso no encontrado
- 409 Conflict: conflicto de estado o duplicidad
- 422 Unprocessable Entity: validación de negocio fallida
- 500 Internal Server Error: error inesperado

### Autenticación
- Se utilizará JWT Bearer Token.
- El header requerido es:

```http
Authorization: Bearer <token>
```

---

## 3. Endpoints propuestos

## 3.1 Autenticación

### POST /login
Autentica un usuario y devuelve un token de acceso.

#### Request body
```json
{
  "email": "usuario@empresa.com",
  "password": "********"
}
```

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
    "tokenType": "bearer",
    "expiresIn": 3600,
    "user": {
      "id": "usr_123",
      "name": "Juan Pérez",
      "email": "usuario@empresa.com",
      "role": "analyst"
    }
  },
  "error": null
}
```

#### Errores
- 400: email o password faltantes
- 401: credenciales inválidas

---

## 3.2 Proyectos

### GET /projects
Obtiene la lista de proyectos del usuario autenticado o de la organización.

#### Query params
- `page` (opcional): número de página
- `limit` (opcional): tamaño de página
- `status` (opcional): `active`, `paused`, `archived`

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "proj_001",
        "name": "Landing de Marketing",
        "baseUrl": "https://example.com",
        "status": "active",
        "createdAt": "2026-07-22T10:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1
    }
  },
  "error": null
}
```

### POST /projects
Crea un nuevo proyecto o sitio a auditar.

#### Request body
```json
{
  "name": "Landing de Marketing",
  "baseUrl": "https://example.com",
  "organizationId": "org_001"
}
```

#### Respuesta exitosa - 201
```json
{
  "success": true,
  "data": {
    "id": "proj_001",
    "name": "Landing de Marketing",
    "baseUrl": "https://example.com",
    "status": "active"
  },
  "error": null
}
```

### GET /projects/{projectId}
Obtiene un proyecto específico.

---

## 3.3 Auditorías / Jobs

### POST /audit
Inicia una nueva auditoría para una URL o proyecto.

#### Request body
```json
{
  "projectId": "proj_001",
  "url": "https://example.com",
  "priority": 3,
  "analysisTypes": ["seo", "performance", "security", "accessibility"]
}
```

#### Respuesta exitosa - 202
```json
{
  "success": true,
  "data": {
    "jobId": "job_001",
    "status": "queued",
    "message": "Audit started successfully"
  },
  "error": null
}
```

#### Reglas de negocio
- La URL debe ser válida y HTTPS o HTTP válida.
- Si el proyecto no existe, devolver 404.
- Si el usuario no tiene permisos, devolver 403.
- Si el trabajo ya está en ejecución para la misma URL y proyecto, devolver 409.

### GET /audit/{jobId}
Consulta el estado del job de auditoría.

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "id": "job_001",
    "status": "running",
    "projectId": "proj_001",
    "requestedAt": "2026-07-22T10:05:00Z",
    "startedAt": "2026-07-22T10:05:10Z",
    "progress": 68,
    "errorMessage": null
  },
  "error": null
}
```

### GET /audit
Obtiene el historial de auditorías del usuario o proyecto.

#### Query params
- `projectId`
- `status`
- `page`
- `limit`

---

## 3.4 Reportes

### GET /reports
Obtiene una lista de reportes disponibles.

#### Query params
- `projectId`
- `status`
- `page`
- `limit`

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "report_001",
        "jobId": "job_001",
        "projectId": "proj_001",
        "status": "completed",
        "generatedAt": "2026-07-22T10:20:00Z",
        "summary": {
          "score": 82,
          "severity": "medium"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 1
    }
  },
  "error": null
}
```

### GET /reports/{reportId}
Devuelve el detalle completo del reporte.

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "id": "report_001",
    "jobId": "job_001",
    "projectId": "proj_001",
    "status": "completed",
    "summary": {
      "score": 82,
      "overallStatus": "warning"
    },
    "findings": [
      {
        "id": "finding_001",
        "category": "performance",
        "severity": "high",
        "title": "Time to first byte alto",
        "description": "El servidor responde lentamente",
        "remediation": "Optimizar el tiempo de respuesta"
      }
    ],
    "generatedAt": "2026-07-22T10:20:00Z"
  },
  "error": null
}
```

---

## 3.5 Exportación

### POST /export/pdf
Genera un PDF del reporte solicitado.

#### Request body
```json
{
  "reportId": "report_001",
  "includeCharts": true
}
```

#### Respuesta exitosa - 202
```json
{
  "success": true,
  "data": {
    "exportId": "exp_001",
    "status": "queued",
    "downloadUrl": null
  },
  "error": null
}
```

#### Respuesta final de exportación
```json
{
  "success": true,
  "data": {
    "exportId": "exp_001",
    "status": "completed",
    "downloadUrl": "/downloads/exp_001/report.pdf"
  },
  "error": null
}
```

---

## 3.6 Hallazgos / Findings

### GET /reports/{reportId}/findings
Devuelve los hallazgos del reporte.

### GET /findings/{findingId}
Obtiene el detalle de un hallazgo específico.

---

## 3.7 Health y soporte

### GET /health
Estado del servicio.

#### Respuesta exitosa - 200
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0"
  },
  "error": null
}
```

---

## 4. Modelo de datos asociado a los endpoints

### Recursos principales
- `User`
- `Project`
- `AuditJob`
- `Report`
- `Finding`
- `Export`

### Relaciones esperadas
- Un usuario pertenece a una organización.
- Una organización tiene muchos proyectos.
- Un proyecto tiene muchos audit jobs.
- Un audit job genera un reporte.
- Un reporte tiene muchos hallazgos.
- Un reporte puede tener múltiples exportaciones.

---

## 5. Reglas de negocio recomendadas

- Un usuario solo puede acceder a proyectos y reportes de su organización.
- Un `POST /audit` debe crear un job y devolverlo en estado `queued` inmediatamente.
- Los jobs deben ser procesados asincrónicamente por workers.
- Los reportes se generan solo cuando el job termina con éxito.
- Los exportes PDF deben ser generados de forma asíncrona para evitar bloquear la API.
- Los reportes deben ser inmutables una vez generados, salvo que se solicite una nueva versión.

---

## 6. Estructura sugerida de respuesta por recurso

### Proyecto
```json
{
  "id": "proj_001",
  "name": "Landing de Marketing",
  "baseUrl": "https://example.com",
  "status": "active",
  "createdAt": "2026-07-22T10:00:00Z"
}
```

### Audit job
```json
{
  "id": "job_001",
  "projectId": "proj_001",
  "status": "queued",
  "requestedAt": "2026-07-22T10:05:00Z",
  "startedAt": null,
  "finishedAt": null
}
```

### Reporte
```json
{
  "id": "report_001",
  "jobId": "job_001",
  "status": "completed",
  "summary": {
    "score": 82,
    "severity": "medium"
  }
}
```

---

## 7. Recomendación de implementación inicial

Para una primera iteración se recomienda implementar:
1. `POST /login`
2. `GET /projects`
3. `POST /audit`
4. `GET /audit/{jobId}`
5. `GET /reports`
6. `GET /reports/{reportId}`
7. `POST /export/pdf`

Estas rutas cubren el flujo principal del producto sin sobrecomplicar la fase inicial.
