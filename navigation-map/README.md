# Mapa de navegacion de Glass Point

Este directorio contiene material visual para presentar la navegacion de la aplicacion.

## Archivos

- `index.html`: esquema visual autocontenido para abrir en navegador y usar en presentaciones.
- `screenshots/`: capturas reales de pantallas por rol y pantallas comunes.

## Fuente del mapa

El mapa se ha construido a partir de:

- `apps/web/src/App.tsx`, que define las rutas activas con `wouter`.
- `apps/web/src/components/AppMenu.tsx`, `apps/web/src/components/layout/Navbar.tsx` y varias paginas, que contienen enlaces internos y navegacion por `setLocation`.
- `apps/api/prisma/schema.prisma`, que define los estados `CallUpStatus` y `MatchStatus`.
- `apps/api/src/matches/matches.service.ts`, que calcula el estado efectivo de convocatoria y el estado visual del partido.

## Bloques actuales

- Entrada y rol: login, registro y redireccion automatica segun rol.
- Jugador: dashboard, perfil, autoevaluacion, postpartido y resumen.
- Convocatorias y partidos: listados separados, detalle de convocatoria, alineacion y detalle de partido.
- Gestion de club: dashboard capitan, listado de jugadores, panel coordinador, admin y formularios.

## Estados documentados

Convocatoria:

`PENDING_ATTENDANCE -> READY_FOR_LINEUP -> MATCHES_CREATED -> RESULTS_COMPLETED -> POST_MATCH_OPEN -> CLOSED`

Partido:

- Tecnicos de BD: `DRAFT`, `LINEUP_SELECTED`, `PLAYED`, `CLOSED`.
- Visuales en listado: `pdtJuego`, `pdtPostPartido`, `cerrado`.

## Capturas incluidas

Las capturas actuales se generaron con usuarios locales de seed:

- Admin: `admin@local.test`.
- Coordinador: `coord@local.test`.
- Coach: `coach@local.test`.
- Capitan: `captain@local.test`.
- Jugador: `player1@local.test`.

Pantallas capturadas:

- Login clasico.
- Dashboard jugador y perfil jugador.
- Dashboard capitan, convocatorias y partidos.
- Listado de jugadores para coach.
- Panel coordinador y panel admin.
- Compatibilidad y arquetipos.

## Notas

- Las pantallas marcadas como "ruta activa" estan registradas en `App.tsx`.
- La navegacion principal diferencia `Convocatorias`, `Partidos` y administracion de equipos.
- Compatibilidad y Arquetipos viven en el menu lateral comun para roles autenticados.
- Para refrescar capturas, hay que tener levantada la app web y backend local con datos seed suficientes.
