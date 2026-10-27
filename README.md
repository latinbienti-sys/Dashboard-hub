# LATINBIEN Dashboard Hub

Biblioteca visual estática que centraliza los accesos a los tableros publicados en `latinbienti-sys.github.io`, con los colores de marca de Latinbien (azul `#213C83`, naranja `#F98B10`, azul medio `#3D6194`).

## Catálogo

| Categoría | Tableros |
| --- | --- |
| LATINBIEN | Cartera y Cobranza, Cierre Comercial, Facturación Histórica, CRM Solicitudes, Productos más Vendidos (en construcción), Stock en Almacenes (en construcción), Histórico por Servicio, Scoring Crediticio, Estudio de Mercado, Comparación de Precios |
| TI | Gestión de Tareas TI, Roadmap Estratégico TI |
| HONDA | CRM Financiamiento, Inventario Vehículos, Simulador Honda |
| BERA | Dashboard Bera |

## Ejecutar

El proyecto no requiere dependencias. Desde esta carpeta, ejecuta:

```bash
python3 -m http.server 3000
```

## Agregar o editar un tablero

Edita el arreglo `dashboards` al inicio de `app.js`. Cada objeto acepta `id`, `name`, `category`, `icon`, `color`, `description`, `keywords` , `url` y opcionalmente `building: true` para marcarlo "En construcción". Usa los colores de marca para LATINBIEN y TI, `#cc0000` para HONDA.

Los favoritos se guardan en `localStorage` del navegador, sin backend.
