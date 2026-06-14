// Datos del Mundial FIFA 2026 (sedes: 🇺🇸 EE.UU., 🇨🇦 Canadá y 🇲🇽 México)
// Grupos A–F tomados del fixture oficial (con sede y horario en formato 24h).
// "Repechaje" = plaza de repesca/playoff aún por definir.
// Grupos G–L: pendientes de confirmar con la imagen en buena calidad
// (por eso salen marcados como "por confirmar").

const REPECHAJE = { nombre: "Repechaje", bandera: "🎟️" };

const GRUPOS = {
  A: [
    { nombre: "México", bandera: "🇲🇽" },
    { nombre: "Sudáfrica", bandera: "🇿🇦" },
    { nombre: "Corea del Sur", bandera: "🇰🇷" },
    REPECHAJE,
  ],
  B: [
    { nombre: "Canadá", bandera: "🇨🇦" },
    REPECHAJE,
    { nombre: "Catar", bandera: "🇶🇦" },
    { nombre: "Suiza", bandera: "🇨🇭" },
  ],
  C: [
    { nombre: "Brasil", bandera: "🇧🇷" },
    { nombre: "Marruecos", bandera: "🇲🇦" },
    { nombre: "Haití", bandera: "🇭🇹" },
    { nombre: "Escocia", bandera: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  ],
  D: [
    { nombre: "Estados Unidos", bandera: "🇺🇸" },
    { nombre: "Paraguay", bandera: "🇵🇾" },
    { nombre: "Australia", bandera: "🇦🇺" },
    REPECHAJE,
  ],
  E: [
    { nombre: "Alemania", bandera: "🇩🇪" },
    { nombre: "Curazao", bandera: "🇨🇼" },
    { nombre: "Costa de Marfil", bandera: "🇨🇮" },
    { nombre: "Ecuador", bandera: "🇪🇨" },
  ],
  F: [
    { nombre: "Países Bajos", bandera: "🇳🇱" },
    { nombre: "Japón", bandera: "🇯🇵" },
    REPECHAJE,
    { nombre: "Túnez", bandera: "🇹🇳" },
  ],
  // ----- Grupos G–L: equipos confirmados, fechas/sedes por confirmar -----
  G: [
    { nombre: "Bélgica", bandera: "🇧🇪" },
    { nombre: "Egipto", bandera: "🇪🇬" },
    { nombre: "Irán", bandera: "🇮🇷" },
    { nombre: "Nueva Zelanda", bandera: "🇳🇿" },
  ],
  H: [
    { nombre: "España", bandera: "🇪🇸" },
    { nombre: "Islas de Cabo Verde", bandera: "🇨🇻" },
    { nombre: "Arabia Saudí", bandera: "🇸🇦" },
    { nombre: "Uruguay", bandera: "🇺🇾" },
  ],
  I: [
    { nombre: "Francia", bandera: "🇫🇷" },
    { nombre: "Senegal", bandera: "🇸🇳" },
    { nombre: "Irak", bandera: "🇮🇶" },
    { nombre: "Noruega", bandera: "🇳🇴" },
  ],
  J: [
    { nombre: "Argentina", bandera: "🇦🇷" },
    { nombre: "Argelia", bandera: "🇩🇿" },
    { nombre: "Austria", bandera: "🇦🇹" },
    { nombre: "Jordania", bandera: "🇯🇴" },
  ],
  K: [
    { nombre: "Portugal", bandera: "🇵🇹" },
    { nombre: "RD Congo", bandera: "🇨🇩" },
    { nombre: "Uzbekistán", bandera: "🇺🇿" },
    { nombre: "Colombia", bandera: "🇨🇴" },
  ],
  L: [
    { nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { nombre: "Croacia", bandera: "🇭🇷" },
    { nombre: "Ghana", bandera: "🇬🇭" },
    { nombre: "Panamá", bandera: "🇵🇦" },
  ],
};

// Calendario por grupo: [localIdx, visitanteIdx, fecha, hora, sede, estimado]
// estimado = true cuando la fecha/hora aún no es oficial.
const CALENDARIO = {
  A: [
    [0, 1, "2026-06-11", "15:00", "CDMX", false],
    [2, 3, "2026-06-11", "22:00", "Guadalajara", false],
    [3, 1, "2026-06-18", "12:00", "Atlanta", false],
    [0, 2, "2026-06-18", "21:00", "Guadalajara", false],
    [3, 0, "2026-06-24", "", "CDMX", false],
    [1, 2, "2026-06-24", "21:00", "Monterrey", false],
  ],
  B: [
    [0, 1, "2026-06-12", "15:00", "Toronto", false],
    [2, 3, "2026-06-13", "15:00", "San Francisco", false],
    [3, 1, "2026-06-18", "15:00", "Los Ángeles", false],
    [0, 2, "2026-06-18", "18:00", "Vancouver", false],
    [3, 0, "2026-06-24", "15:00", "Vancouver", false],
    [1, 2, "2026-06-24", "15:00", "Seattle", false],
  ],
  C: [
    [0, 1, "2026-06-13", "18:00", "Nueva York / Nueva Jersey", false],
    [2, 3, "2026-06-13", "21:00", "Boston", false],
    [3, 1, "2026-06-19", "18:00", "Boston", false],
    [0, 2, "2026-06-19", "21:00", "Filadelfia", false],
    [3, 0, "2026-06-24", "18:00", "Miami", false],
    [1, 2, "2026-06-24", "18:00", "Atlanta", false],
  ],
  D: [
    [0, 1, "2026-06-12", "21:00", "Los Ángeles", false],
    [2, 3, "2026-06-13", "00:00", "Vancouver", false],
    [3, 1, "2026-06-19", "00:00", "San Francisco", false],
    [0, 2, "2026-06-19", "15:00", "Seattle", false],
    [3, 0, "2026-06-25", "22:00", "Los Ángeles", false],
    [1, 2, "2026-06-25", "22:00", "San Francisco", false],
  ],
  E: [
    [0, 1, "2026-06-14", "13:00", "Houston", false],
    [2, 3, "2026-06-14", "19:00", "Filadelfia", false],
    [0, 2, "2026-06-20", "16:00", "Toronto", false],
    [3, 1, "2026-06-20", "20:00", "Kansas City", false],
    [3, 0, "2026-06-25", "16:00", "Nueva York / Nueva Jersey", false],
    [1, 2, "2026-06-25", "16:00", "Filadelfia", false],
  ],
  F: [
    [0, 1, "2026-06-14", "16:00", "Dallas", false],
    [2, 3, "2026-06-14", "22:00", "Monterrey", false],
    [0, 2, "2026-06-20", "13:00", "Houston", false],
    [3, 1, "2026-06-20", "00:00", "Monterrey", false],
    [1, 2, "2026-06-25", "19:00", "Dallas", false],
    [3, 0, "2026-06-25", "19:00", "Kansas City", false],
  ],
  // Grupos G–L: fechas aproximadas, por confirmar
  G: [
    [0, 1, "2026-06-15", "", "", true],
    [2, 3, "2026-06-15", "", "", true],
    [0, 2, "2026-06-21", "", "", true],
    [1, 3, "2026-06-21", "", "", true],
    [0, 3, "2026-06-24", "", "", true],
    [1, 2, "2026-06-24", "", "", true],
  ],
  H: [
    [0, 1, "2026-06-15", "", "", true],
    [2, 3, "2026-06-15", "", "", true],
    [0, 2, "2026-06-21", "", "", true],
    [1, 3, "2026-06-21", "", "", true],
    [0, 3, "2026-06-24", "", "", true],
    [1, 2, "2026-06-24", "", "", true],
  ],
  I: [
    [0, 1, "2026-06-16", "", "", true],
    [2, 3, "2026-06-16", "", "", true],
    [0, 2, "2026-06-22", "", "", true],
    [1, 3, "2026-06-22", "", "", true],
    [0, 3, "2026-06-25", "", "", true],
    [1, 2, "2026-06-25", "", "", true],
  ],
  J: [
    [0, 1, "2026-06-16", "", "", true],
    [2, 3, "2026-06-16", "", "", true],
    [0, 2, "2026-06-22", "", "", true],
    [1, 3, "2026-06-22", "", "", true],
    [0, 3, "2026-06-25", "", "", true],
    [1, 2, "2026-06-25", "", "", true],
  ],
  K: [
    [0, 1, "2026-06-17", "", "", true],
    [2, 3, "2026-06-17", "", "", true],
    [0, 2, "2026-06-23", "", "", true],
    [1, 3, "2026-06-23", "", "", true],
    [0, 3, "2026-06-26", "", "", true],
    [1, 2, "2026-06-26", "", "", true],
  ],
  L: [
    [0, 1, "2026-06-17", "", "", true],
    [2, 3, "2026-06-17", "", "", true],
    [0, 2, "2026-06-23", "", "", true],
    [1, 3, "2026-06-23", "", "", true],
    [0, 3, "2026-06-26", "", "", true],
    [1, 2, "2026-06-26", "", "", true],
  ],
};

// Construye la lista completa de partidos de la fase de grupos
function construirPartidos() {
  const partidos = [];
  Object.keys(GRUPOS).forEach((letra) => {
    const equipos = GRUPOS[letra];
    CALENDARIO[letra].forEach((m, idx) => {
      partidos.push({
        id: `G${letra}-${idx + 1}`,
        etapa: `Grupo ${letra}`,
        local: equipos[m[0]],
        visitante: equipos[m[1]],
        fecha: m[2],
        hora: m[3],
        sede: m[4],
        estimado: m[5] || false,
      });
    });
  });
  return partidos;
}

// Eliminatorias (los equipos se definen al terminar la fase de grupos)
const ELIMINATORIAS = [
  { id: "D32", etapa: "Dieciseisavos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-06-28", hora: "", sede: "", estimado: true },
  { id: "OF", etapa: "Octavos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-04", hora: "", sede: "", estimado: true },
  { id: "CF", etapa: "Cuartos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-09", hora: "", sede: "", estimado: true },
  { id: "SF", etapa: "Semifinal", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-14", hora: "", sede: "", estimado: true },
  { id: "3P", etapa: "Tercer puesto", local: { nombre: "Por definir", bandera: "🥉" }, visitante: { nombre: "Por definir", bandera: "🥉" }, fecha: "2026-07-18", hora: "", sede: "", estimado: true },
  { id: "FINAL", etapa: "Final", local: { nombre: "Por definir", bandera: "🏆" }, visitante: { nombre: "Por definir", bandera: "🏆" }, fecha: "2026-07-19", hora: "", sede: "", estimado: true },
];

const PARTIDOS = [...construirPartidos(), ...ELIMINATORIAS];
