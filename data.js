// Datos del Mundial FIFA 2026 (sedes: 🇺🇸 EE.UU., 🇨🇦 Canadá y 🇲🇽 México)
// Equipos y calendario tomados del fixture oficial de la fase de grupos.
// Las fechas marcadas como "estimado: true" están por confirmar.

const GRUPOS = {
  A: [
    { nombre: "México", bandera: "🇲🇽" },
    { nombre: "Sudáfrica", bandera: "🇿🇦" },
    { nombre: "Corea del Sur", bandera: "🇰🇷" },
    { nombre: "Chequia", bandera: "🇨🇿" },
  ],
  B: [
    { nombre: "Canadá", bandera: "🇨🇦" },
    { nombre: "Bosnia y Herzegovina", bandera: "🇧🇦" },
    { nombre: "Catar", bandera: "🇶🇦" },
    { nombre: "Suiza", bandera: "🇨🇭" },
  ],
  C: [
    { nombre: "Estados Unidos", bandera: "🇺🇸" },
    { nombre: "Paraguay", bandera: "🇵🇾" },
    { nombre: "Australia", bandera: "🇦🇺" },
    { nombre: "Turquía", bandera: "🇹🇷" },
  ],
  D: [
    { nombre: "Brasil", bandera: "🇧🇷" },
    { nombre: "Marruecos", bandera: "🇲🇦" },
    { nombre: "Haití", bandera: "🇭🇹" },
    { nombre: "Escocia", bandera: "🏴󠁧󠁢󠁳󠁣󠁴󠁿" },
  ],
  E: [
    { nombre: "Países Bajos", bandera: "🇳🇱" },
    { nombre: "Japón", bandera: "🇯🇵" },
    { nombre: "Suecia", bandera: "🇸🇪" },
    { nombre: "Túnez", bandera: "🇹🇳" },
  ],
  F: [
    { nombre: "Alemania", bandera: "🇩🇪" },
    { nombre: "Curazao", bandera: "🇨🇼" },
    { nombre: "Costa de Marfil", bandera: "🇨🇮" },
    { nombre: "Ecuador", bandera: "🇪🇨" },
  ],
  G: [
    { nombre: "España", bandera: "🇪🇸" },
    { nombre: "Cabo Verde", bandera: "🇨🇻" },
    { nombre: "Bélgica", bandera: "🇧🇪" },
    { nombre: "Egipto", bandera: "🇪🇬" },
  ],
  H: [
    { nombre: "Arabia Saudí", bandera: "🇸🇦" },
    { nombre: "Uruguay", bandera: "🇺🇾" },
    { nombre: "Irán", bandera: "🇮🇷" },
    { nombre: "Nueva Zelanda", bandera: "🇳🇿" },
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
    { nombre: "Ghana", bandera: "🇬🇭" },
    { nombre: "Panamá", bandera: "🇵🇦" },
  ],
  L: [
    { nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { nombre: "Croacia", bandera: "🇭🇷" },
    { nombre: "Uzbekistán", bandera: "🇺🇿" },
    { nombre: "Colombia", bandera: "🇨🇴" },
  ],
};

// Calendario por grupo: [localIdx, visitanteIdx, fecha, hora, estimado]
// Los partidos sin fecha/hora confirmada se marcan con estimado = true.
const CALENDARIO = {
  A: [
    [0, 1, "2026-06-11", "12:30 PM", false],
    [2, 3, "2026-06-11", "7:45 PM", false],
    [3, 1, "2026-06-18", "9:45 AM", false],
    [0, 2, "2026-06-18", "8:30 PM", false],
    [0, 3, "2026-06-24", "", true],
    [1, 2, "2026-06-24", "", true],
  ],
  B: [
    [0, 1, "2026-06-12", "12:45 PM", false],
    [2, 3, "2026-06-13", "12:45 PM", false],
    [3, 1, "2026-06-18", "12:45 PM", false],
    [0, 2, "2026-06-18", "3:45 PM", false],
    [0, 3, "2026-06-24", "", true],
    [1, 2, "2026-06-24", "", true],
  ],
  C: [
    [0, 1, "2026-06-12", "6:40 PM", false],
    [2, 3, "2026-06-13", "9:45 PM", false],
    [0, 2, "2026-06-19", "12:45 PM", false],
    [3, 1, "2026-06-19", "8:45 PM", false],
    [0, 3, "2026-06-25", "", true],
    [1, 2, "2026-06-25", "", true],
  ],
  D: [
    [0, 1, "2026-06-13", "3:40 PM", false],
    [2, 3, "2026-06-13", "6:45 PM", false],
    [3, 1, "2026-06-19", "3:45 PM", false],
    [0, 2, "2026-06-19", "6:10 PM", false],
    [0, 3, "2026-06-25", "", true],
    [1, 2, "2026-06-25", "", true],
  ],
  E: [
    [0, 1, "2026-06-14", "1:40 PM", false],
    [2, 3, "2026-06-14", "7:45 PM", false],
    [0, 2, "2026-06-20", "10:40 AM", false],
    [3, 1, "2026-06-20", "8:45 PM", false],
    [0, 3, "2026-06-26", "", true],
    [1, 2, "2026-06-26", "", true],
  ],
  F: [
    [0, 1, "2026-06-14", "10:45 AM", false],
    [2, 3, "2026-06-14", "4:45 PM", false],
    [0, 2, "2026-06-20", "1:45 PM", false],
    [3, 1, "2026-06-20", "5:45 PM", false],
    [0, 3, "2026-06-26", "", true],
    [1, 2, "2026-06-26", "", true],
  ],
  G: [
    [0, 1, "2026-06-15", "9:45 AM", false],
    [2, 3, "2026-06-15", "12:45 PM", false],
    [0, 2, "2026-06-21", "", true],
    [1, 3, "2026-06-21", "", true],
    [0, 3, "2026-06-24", "", true],
    [1, 2, "2026-06-24", "", true],
  ],
  H: [
    [0, 1, "2026-06-15", "3:45 PM", false],
    [2, 3, "2026-06-15", "6:45 PM", false],
    [0, 2, "2026-06-21", "", true],
    [1, 3, "2026-06-21", "", true],
    [0, 3, "2026-06-24", "", true],
    [1, 2, "2026-06-24", "", true],
  ],
  I: [
    [0, 1, "2026-06-16", "12:45 PM", false],
    [2, 3, "2026-06-16", "3:45 PM", false],
    [0, 2, "2026-06-22", "", true],
    [1, 3, "2026-06-22", "", true],
    [0, 3, "2026-06-25", "", true],
    [1, 2, "2026-06-25", "", true],
  ],
  J: [
    [0, 1, "2026-06-16", "6:40 PM", false],
    [2, 3, "2026-06-16", "9:45 PM", false],
    [0, 2, "2026-06-22", "", true],
    [1, 3, "2026-06-22", "", true],
    [0, 3, "2026-06-25", "", true],
    [1, 2, "2026-06-25", "", true],
  ],
  K: [
    [0, 1, "2026-06-17", "10:45 AM", false],
    [2, 3, "2026-06-17", "4:45 PM", false],
    [0, 2, "2026-06-23", "", true],
    [1, 3, "2026-06-23", "", true],
    [0, 3, "2026-06-26", "", true],
    [1, 2, "2026-06-26", "", true],
  ],
  L: [
    [0, 1, "2026-06-17", "1:40 PM", false],
    [2, 3, "2026-06-17", "7:45 PM", false],
    [0, 2, "2026-06-23", "", true],
    [1, 3, "2026-06-23", "", true],
    [0, 3, "2026-06-26", "", true],
    [1, 2, "2026-06-26", "", true],
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
        estimado: m[4] || false,
      });
    });
  });
  return partidos;
}

// Eliminatorias (los equipos se definen al terminar la fase de grupos)
const ELIMINATORIAS = [
  { id: "D32", etapa: "Dieciseisavos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-06-28", hora: "", estimado: true },
  { id: "OF", etapa: "Octavos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-04", hora: "", estimado: true },
  { id: "CF", etapa: "Cuartos de final", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-09", hora: "", estimado: true },
  { id: "SF", etapa: "Semifinal", local: { nombre: "Por definir", bandera: "⚽" }, visitante: { nombre: "Por definir", bandera: "⚽" }, fecha: "2026-07-14", hora: "", estimado: true },
  { id: "3P", etapa: "Tercer puesto", local: { nombre: "Por definir", bandera: "🥉" }, visitante: { nombre: "Por definir", bandera: "🥉" }, fecha: "2026-07-18", hora: "", estimado: true },
  { id: "FINAL", etapa: "Final", local: { nombre: "Por definir", bandera: "🏆" }, visitante: { nombre: "Por definir", bandera: "🏆" }, fecha: "2026-07-19", hora: "", estimado: true },
];

const PARTIDOS = [...construirPartidos(), ...ELIMINATORIAS];
