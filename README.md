# 🏆 Predicciones Mundial FIFA 2026

Web sencilla para que **tres amigos** hagan sus predicciones de los marcadores
de todos los partidos del Mundial 2026 (sedes: 🇺🇸 EE.UU., 🇨🇦 Canadá y 🇲🇽 México).

## ✨ Qué hace

- Lista **todos los partidos** de la fase de grupos (12 grupos × 6 partidos) y
  partidos destacados de eliminatorias.
- Cada uno de los **3 amigos** escribe su nombre y predice el marcador.
  - Ejemplo: en `México vs Polonia`, un amigo dice **2 - 1**, otro **3 - 2** y otro **5 - 1**.
- Guarda todo en el navegador (`localStorage`): al volver, tus predicciones siguen ahí.
- Filtros por grupo / etapa, diseño moderno y responsive (móvil y PC).

## 🚀 Cómo usarla

1. Abre `index.html` en tu navegador (doble clic).
2. Escribe los nombres de los 3 amigos arriba.
3. Rellena el marcador de cada partido para cada amigo.
4. Pulsa **💾 Guardar** (también se guarda solo al cerrar la pestaña).

## 🌐 Publicar gratis con GitHub Pages

1. Sube este proyecto a un repositorio en GitHub.
2. En el repo: **Settings → Pages**.
3. En *Source* elige la rama `main` y carpeta `/root`. Guarda.
4. En unos minutos tendrás una URL pública tipo:
   `https://TU_USUARIO.github.io/NOMBRE_DEL_REPO/`

## 📁 Archivos

| Archivo      | Para qué sirve                                  |
|--------------|--------------------------------------------------|
| `index.html` | Estructura de la página                          |
| `styles.css` | Estilos / diseño                                 |
| `app.js`     | Lógica: nombres, predicciones y guardado         |
| `data.js`    | Equipos y partidos (puedes editarlos libremente) |

## ✏️ Editar equipos o partidos

Abre `data.js` y cambia los nombres/banderas dentro de `GRUPOS`.
Los partidos de cada grupo se generan automáticamente (todos contra todos).
Cuando se conozca el sorteo oficial, solo actualiza ese archivo.

---

Hecho con HTML, CSS y JavaScript puro. Sin dependencias.
