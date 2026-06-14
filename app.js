// App de predicciones del Mundial 2026
// Guarda los nombres de los amigos y las predicciones en localStorage.

const STORAGE_AMIGOS = "mundial2026_amigos";
const STORAGE_PRED = "mundial2026_predicciones";
const STORAGE_NUM = "mundial2026_numAmigos";
const STORAGE_GUARDADAS = "mundial2026_guardadas";

let amigos = ["", "", ""];
let predicciones = {}; // { [idPartido]: { 0:{l,v}, 1:{l,v}, 2:{l,v} } }
let filtroActivo = "Todos";
let numAmigos = 3; // cuántas personas predicen (1, 2 o 3)
let guardadas = []; // lista de predicciones guardadas (historial)

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
  const n = parseInt(localStorage.getItem(STORAGE_NUM), 10);
  if (n === 1 || n === 2 || n === 3) numAmigos = n;
  try {
    const g = JSON.parse(localStorage.getItem(STORAGE_GUARDADAS));
    if (Array.isArray(g)) guardadas = g;
  } catch (e) {}
}

function guardarDatos() {
  localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
  localStorage.setItem(STORAGE_PRED, JSON.stringify(predicciones));
  localStorage.setItem(STORAGE_NUM, String(numAmigos));

  // Crear una "foto" (snapshot) de las predicciones actuales en el historial
  const snapshot = {
    id: Date.now(),
    fechaTexto: new Date().toLocaleString("es-ES", {
      day: "2-digit", month: "2-digit", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    }),
    numAmigos: numAmigos,
    amigos: amigos.slice(),
    predicciones: JSON.parse(JSON.stringify(predicciones)),
  };
  guardadas.unshift(snapshot);
  if (guardadas.length > 30) guardadas = guardadas.slice(0, 30);
  localStorage.setItem(STORAGE_GUARDADAS, JSON.stringify(guardadas));

  actualizarBotonVer();
  mostrarAviso("✅ ¡Guardado! Pulsa \"Ver mis predicciones\" para revisarlas.");
}

// Cuenta cuántos marcadores tienen ambos números puestos
function contarPredicciones(preds) {
  let total = 0;
  Object.keys(preds || {}).forEach((idPartido) => {
    Object.keys(preds[idPartido]).forEach((amigoIdx) => {
      const p = preds[idPartido][amigoIdx];
      if (p && p.l !== "" && p.v !== "") total++;
    });
  });
  return total;
}

// ---------- Predicciones guardadas (modal) ----------
function actualizarBotonVer() {
  const btn = document.getElementById("btnVer");
  if (!btn) return;
  btn.classList.toggle("oculto", guardadas.length === 0);
}

function abrirModalGuardadas() {
  renderListaGuardadas();
  document.getElementById("modalGuardadas").classList.remove("oculto");
}

function cerrarModalGuardadas() {
  document.getElementById("modalGuardadas").classList.add("oculto");
}

function renderListaGuardadas() {
  const lista = document.getElementById("modalLista");
  lista.innerHTML = "";

  if (guardadas.length === 0) {
    const vacio = document.createElement("p");
    vacio.className = "modal-vacio";
    vacio.textContent = "Todavía no has guardado ninguna predicción.";
    lista.appendChild(vacio);
    return;
  }

  guardadas.forEach((snap) => {
    const item = document.createElement("div");
    item.className = "guardada";

    const info = document.createElement("div");
    info.className = "guardada-info";

    const nombres = document.createElement("span");
    nombres.className = "guardada-nombres";
    const listaNombres = snap.amigos
      .slice(0, snap.numAmigos)
      .map((n, i) => (n && n.length ? n : "Amigo " + (i + 1)));
    nombres.textContent = listaNombres.join(", ");

    const meta = document.createElement("span");
    meta.className = "guardada-meta";
    meta.textContent = `${snap.fechaTexto} · ${contarPredicciones(snap.predicciones)} marcadores`;

    info.appendChild(nombres);
    info.appendChild(meta);

    const borrar = document.createElement("button");
    borrar.className = "guardada-borrar";
    borrar.textContent = "🗑️";
    borrar.addEventListener("click", (ev) => {
      ev.stopPropagation();
      eliminarGuardada(snap.id);
    });

    item.appendChild(info);
    item.appendChild(borrar);
    item.addEventListener("click", () => cargarGuardada(snap.id));
    lista.appendChild(item);
  });
}

function cargarGuardada(id) {
  const snap = guardadas.find((s) => s.id === id);
  if (!snap) return;
  numAmigos = snap.numAmigos;
  amigos = ["", "", ""];
  snap.amigos.forEach((n, i) => { amigos[i] = n; });
  predicciones = JSON.parse(JSON.stringify(snap.predicciones));

  localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
  localStorage.setItem(STORAGE_PRED, JSON.stringify(predicciones));
  localStorage.setItem(STORAGE_NUM, String(numAmigos));

  initSelectorCantidad();
  initAmigos();
  renderPartidos();
  cerrarModalGuardadas();
  mostrarAviso("📂 Predicción cargada.");
}

function eliminarGuardada(id) {
  guardadas = guardadas.filter((s) => s.id !== id);
  localStorage.setItem(STORAGE_GUARDADAS, JSON.stringify(guardadas));
  renderListaGuardadas();
  actualizarBotonVer();
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
  aplicarVisibilidadAmigos();
}

// Muestra solo las cajas de nombre de las personas activas
function aplicarVisibilidadAmigos() {
  [1, 2, 3].forEach((n) => {
    const label = document.querySelector(".amigo-" + n);
    if (label) label.style.display = n <= numAmigos ? "" : "none";
  });
}

// ---------- Selector de cantidad de personas ----------
function initSelectorCantidad() {
  const cont = document.getElementById("opcionesCantidad");
  if (!cont) return;
  cont.querySelectorAll(".num-btn").forEach((btn) => {
    const num = parseInt(btn.getAttribute("data-num"), 10);
    btn.classList.toggle("activo", num === numAmigos);
    btn.addEventListener("click", () => {
      numAmigos = num;
      localStorage.setItem(STORAGE_NUM, String(numAmigos));
      initSelectorCantidad();
      aplicarVisibilidadAmigos();
      renderPartidos();
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

// Un partido está finalizado si su fecha ya pasó (antes de hoy)
function estaFinalizado(fechaISO) {
  try {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    const fecha = new Date(fechaISO + "T00:00:00");
    return fecha < hoy;
  } catch (e) {
    return false;
  }
}

function crearTarjetaPartido(partido) {
  const card = document.createElement("article");
  card.className = "partido";

  const finalizado = estaFinalizado(partido.fecha);
  if (finalizado) card.classList.add("finalizado");

  const cab = document.createElement("div");
  cab.className = "partido-cab";

  const equipos = document.createElement("div");
  equipos.className = "equipos";
  equipos.innerHTML = `
    <span class="equipo"><span class="bandera">${partido.local.bandera}</span>${partido.local.nombre}</span>
    <span class="vs">vs</span>
    <span class="equipo"><span class="bandera">${partido.visitante.bandera}</span>${partido.visitante.nombre}</span>
  `;

  const meta = document.createElement("div");
  meta.className = "partido-meta";

  if (finalizado) {
    const estado = document.createElement("span");
    estado.className = "estado-finalizado";
    estado.textContent = "Finalizado";
    meta.appendChild(estado);
  }

  const fecha = document.createElement("span");
  fecha.className = "fecha";
  let textoFecha = formatearFecha(partido.fecha);
  if (partido.hora) textoFecha += " · " + partido.hora + " h";
  if (partido.sede) textoFecha += " · " + partido.sede;
  if (partido.estimado) textoFecha += " (por confirmar)";
  fecha.textContent = textoFecha;
  meta.appendChild(fecha);

  cab.appendChild(equipos);
  cab.appendChild(meta);

  const preds = document.createElement("div");
  preds.className = "predicciones";
  for (let i = 0; i < numAmigos; i++) {
    preds.appendChild(crearFilaPrediccion(partido, i));
  }

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

// Borra solo los nombres de las personas (no toca predicciones ni historial)
function borrarPersonas() {
  amigos = ["", "", ""];
  localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
  initAmigos();
  actualizarNombresEnPredicciones();
  mostrarAviso("🗑️ Nombres borrados.");
}

// ---------- Reset ----------
function resetTodo() {
  if (!confirm("¿Seguro que quieres borrar TODOS los nombres y predicciones?")) return;
  amigos = ["", "", ""];
  predicciones = {};
  numAmigos = 3;
  localStorage.removeItem(STORAGE_AMIGOS);
  localStorage.removeItem(STORAGE_PRED);
  localStorage.removeItem(STORAGE_NUM);
  initAmigos();
  initSelectorCantidad();
  initFiltros();
  renderPartidos();
  mostrarAviso("🗑️ Todo borrado.");
}

// ---------- Init ----------
function init() {
  cargarDatos();
  initSelectorCantidad();
  initAmigos();
  initFiltros();
  renderPartidos();
  actualizarBotonVer();
  document.getElementById("btnGuardar").addEventListener("click", guardarDatos);
  document.getElementById("btnReset").addEventListener("click", resetTodo);
  document.getElementById("btnBorrarPersonas").addEventListener("click", borrarPersonas);
  document.getElementById("btnVer").addEventListener("click", abrirModalGuardadas);
  document.getElementById("modalCerrar").addEventListener("click", cerrarModalGuardadas);
  document.getElementById("modalFondo").addEventListener("click", cerrarModalGuardadas);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrarModalGuardadas();
  });
  // Guardado automático al cerrar/cambiar de pestaña
  window.addEventListener("beforeunload", () => {
    localStorage.setItem(STORAGE_AMIGOS, JSON.stringify(amigos));
    localStorage.setItem(STORAGE_PRED, JSON.stringify(predicciones));
    localStorage.setItem(STORAGE_NUM, String(numAmigos));
  });
}

document.addEventListener("DOMContentLoaded", init);
