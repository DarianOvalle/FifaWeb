// App de predicciones del Mundial 2026
// Guarda los nombres de los amigos y las predicciones en localStorage.

const STORAGE_AMIGOS = "mundial2026_amigos";
const STORAGE_PRED = "mundial2026_predicciones";

let amigos = ["", "", ""];
let predicciones = {}; // { [idPartido]: { 0:{l,v}, 1:{l,v}, 2:{l,v} } }
let filtroActivo = "Todos";

// ---------- Almacenamiento ----------
function cargarDatos() {
  try {
    const a = JSON.parse(localStorage.getItem(STORAGE_AMIGOS));
    if (Array.isArray(a) && a.length === 3) amigos = a;
  } catch (e) {}
  try {
    const p = JSON.parse(localStorage.getItem(STORAGE_PRED));
    if (p && typeof p === "object") predicciones = p;
  } catch (e) {}
}

function guardarDatos() {
  localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
  localStorage.setItem(STORAGE_PRED, JSON.stringify(predicciones));
  mostrarAviso("✅ ¡Guardado! Tus predicciones quedaron en este navegador.");
}

function mostrarAviso(texto) {
  const aviso = document.getElementById("aviso");
  aviso.textContent = texto;
  aviso.classList.remove("oculto");
  clearTimeout(mostrarAviso._t);
  mostrarAviso._t = setTimeout(() => aviso.classList.add("oculto"), 2500);
}

// ---------- Nombres de amigos ----------
function initAmigos() {
  [1, 2, 3].forEach((n) => {
    const input = document.getElementById("amigo" + n);
    input.value = amigos[n - 1] || "";
    input.addEventListener("input", () => {
      amigos[n - 1] = input.value.trim();
      actualizarNombresEnPredicciones();
    });
  });
}

function nombreAmigo(i) {
  return amigos[i] && amigos[i].length ? amigos[i] : "Amigo " + (i + 1);
}

function actualizarNombresEnPredicciones() {
  document.querySelectorAll("[data-amigo-nombre]").forEach((el) => {
    const i = parseInt(el.getAttribute("data-amigo-nombre"), 10);
    el.textContent = nombreAmigo(i);
  });
}

// ---------- Filtros ----------
function etapasUnicas() {
  const set = [];
  PARTIDOS.forEach((p) => {
    if (!set.includes(p.etapa)) set.push(p.etapa);
  });
  return set;
}

function initFiltros() {
  const cont = document.getElementById("filtros");
  const etapas = ["Todos", ...etapasUnicas()];
  cont.innerHTML = "";
  etapas.forEach((e) => {
    const chip = document.createElement("button");
    chip.className = "chip" + (e === filtroActivo ? " activo" : "");
    chip.textContent = e;
    chip.addEventListener("click", () => {
      filtroActivo = e;
      initFiltros();
      renderPartidos();
    });
    cont.appendChild(chip);
  });
}

// ---------- Render de partidos ----------
function getPred(idPartido, amigoIdx) {
  if (!predicciones[idPartido]) predicciones[idPartido] = {};
  if (!predicciones[idPartido][amigoIdx]) predicciones[idPartido][amigoIdx] = { l: "", v: "" };
  return predicciones[idPartido][amigoIdx];
}

function crearInputMarcador(idPartido, amigoIdx, lado) {
  const input = document.createElement("input");
  input.type = "number";
  input.min = "0";
  input.max = "99";
  input.inputMode = "numeric";
  input.placeholder = "-";
  const pred = getPred(idPartido, amigoIdx);
  input.value = pred[lado] === "" ? "" : pred[lado];
  input.addEventListener("input", () => {
    let v = input.value.replace(/[^0-9]/g, "").slice(0, 2);
    input.value = v;
    getPred(idPartido, amigoIdx)[lado] = v === "" ? "" : parseInt(v, 10);
  });
  return input;
}

function crearFilaPrediccion(partido, amigoIdx) {
  const fila = document.createElement("div");
  fila.className = "prediccion p" + (amigoIdx + 1);

  const nombre = document.createElement("span");
  nombre.className = "pred-nombre";
  nombre.setAttribute("data-amigo-nombre", amigoIdx);
  nombre.textContent = nombreAmigo(amigoIdx);

  const marcador = document.createElement("div");
  marcador.className = "pred-marcador";
  const guion = document.createElement("span");
  guion.className = "guion";
  guion.textContent = "-";
  marcador.appendChild(crearInputMarcador(partido.id, amigoIdx, "l"));
  marcador.appendChild(guion);
  marcador.appendChild(crearInputMarcador(partido.id, amigoIdx, "v"));

  fila.appendChild(nombre);
  fila.appendChild(marcador);
  return fila;
}

function crearTarjetaPartido(partido) {
  const card = document.createElement("article");
  card.className = "partido";

  const cab = document.createElement("div");
  cab.className = "partido-cab";

  const equipos = document.createElement("div");
  equipos.className = "equipos";
  equipos.innerHTML = `
    <span class="equipo"><span class="bandera">${partido.local.bandera}</span>${partido.local.nombre}</span>
    <span class="vs">vs</span>
    <span class="equipo"><span class="bandera">${partido.visitante.bandera}</span>${partido.visitante.nombre}</span>
  `;

  const fecha = document.createElement("span");
  fecha.className = "fecha";
  fecha.textContent = formatearFecha(partido.fecha);

  cab.appendChild(equipos);
  cab.appendChild(fecha);

  const preds = document.createElement("div");
  preds.className = "predicciones";
  [0, 1, 2].forEach((i) => preds.appendChild(crearFilaPrediccion(partido, i)));

  card.appendChild(cab);
  card.appendChild(preds);
  return card;
}

function formatearFecha(iso) {
  try {
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
  } catch (e) {
    return iso;
  }
}

function renderPartidos() {
  const cont = document.getElementById("partidos");
  cont.innerHTML = "";

  const lista = filtroActivo === "Todos"
    ? PARTIDOS
    : PARTIDOS.filter((p) => p.etapa === filtroActivo);

  let etapaActual = null;
  lista.forEach((partido) => {
    if (partido.etapa !== etapaActual) {
      etapaActual = partido.etapa;
      const h = document.createElement("h3");
      h.className = "etapa-titulo";
      h.textContent = partido.etapa;
      cont.appendChild(h);
    }
    cont.appendChild(crearTarjetaPartido(partido));
  });
}

// ---------- Reset ----------
function resetTodo() {
  if (!confirm("¿Seguro que quieres borrar TODOS los nombres y predicciones?")) return;
  amigos = ["", "", ""];
  predicciones = {};
  localStorage.removeItem(STORAGE_AMIGOS);
  localStorage.removeItem(STORAGE_PRED);
  initAmigos();
  initFiltros();
  renderPartidos();
  mostrarAviso("🗑️ Todo borrado.");
}

// ---------- Init ----------
function init() {
  cargarDatos();
  initAmigos();
  initFiltros();
  renderPartidos();
  document.getElementById("btnGuardar").addEventListener("click", guardarDatos);
  document.getElementById("btnReset").addEventListener("click", resetTodo);
  // Guardado automático al cerrar/cambiar de pestaña
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
    localStorage.setItem(STORAGE_PRED, JSON.stringify(predicciones));
  });
}

document.addEventListener("DOMContentLoaded", init);
