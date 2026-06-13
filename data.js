// Datos del Mundial FIFA 2026 (sedes: EE.UU., México y Canadá)
// Formato: 48 equipos en 12 grupos de 4. Aquí se incluyen equipos
// representativos/probables, ya que el sorteo oficial define los grupos.
// Puedes editar los nombres de los equipos libremente.

const GRUPOS = {
  A: [
    { nombre: "México", bandera: "🇲🇽" },
    { nombre: "Polonia", bandera: "🇵🇱" },
    { nombre: "Egipto", bandera: "🇪🇬" },
    { nombre: "Catar", bandera: "🇶🇦" },
  ],
  B: [
    { nombre: "Canadá", bandera: "🇨🇦" },
    { nombre: "Croacia", bandera: "🇭🇷" },
    { nombre: "Ecuador", bandera: "🇪🇨" },
    { nombre: "Túnez", bandera: "🇹🇳" },
  ],
  C: [
    { nombre: "Estados Unidos", bandera: "🇺🇸" },
    { nombre: "Uruguay", bandera: "🇺🇾" },
    { nombre: "Senegal", bandera: "🇸🇳" },
    { nombre: "Corea del Sur", bandera: "🇰🇷" },
  ],
  D: [
    { nombre: "Argentina", bandera: "🇦🇷" },
    { nombre: "Japón", bandera: "🇯🇵" },
    { nombre: "Nigeria", bandera: "🇳🇬" },
    { nombre: "Australia", bandera: "🇦🇺" },
  ],
  E: [
    { nombre: "Francia", bandera: "🇫🇷" },
    { nombre: "Suiza", bandera: "🇨🇭" },
    { nombre: "Marruecos", bandera: "🇲🇦" },
    { nombre: "Costa Rica", bandera: "🇨🇷" },
  ],
  F: [
    { nombre: "Brasil", bandera: "🇧🇷" },
    { nombre: "Países Bajos", bandera: "🇳🇱" },
    { nombre: "Ghana", bandera: "🇬🇭" },
    { nombre: "Arabia Saudita", bandera: "🇸🇦" },
  ],
  G: [
    { nombre: "España", bandera: "🇪🇸" },
    { nombre: "Dinamarca", bandera: "🇩🇰" },
    { nombre: "Camerún", bandera: "🇨🇲" },
    { nombre: "Irán", bandera: "🇮🇷" },
  ],
  H: [
    { nombre: "Alemania", bandera: "🇩🇪" },
    { nombre: "Serbia", bandera: "🇷🇸" },
    { nombre: "Costa de Marfil", bandera: "🇨🇮" },
    { nombre: "Panamá", bandera: "🇵🇦" },
  ],
  I: [
    { nombre: "Inglaterra", bandera: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { nombre: "Colombia", bandera: "🇨🇴" },
    { nombre: "Argelia", bandera: "🇩🇿" },
    { nombre: "Nueva Zelanda", bandera: "🇳🇿" },
  ],
  J: [
    { nombre: "Portugal", bandera: "🇵🇹" },
    { nombre: "Bélgica", bandera: "🇧🇪" },
    { nombre: "Mali", bandera: "🇲🇱" },
    { nombre: "Jordania", bandera: "🇯🇴" },
  ],
  K: [
    { nombre: "Italia", bandera: "🇮🇹" },
    { nombre: "Estados Unidos B", bandera: "🇺🇸" },
    { nombre: "Sudáfrica", bandera: "🇿🇦" },
    { nombre: "Honduras", bandera: "🇭🇳" },
  ],
  L: [
    { nombre: "Países Bajos B", bandera: "🇳🇱" },
    { nombre: "Perú", bandera: "🇵🇪" },
    { nombre: "Túnez B", bandera: "🇹🇳" },
    { nombre: "Uzbekistán", bandera: "🇺🇿" },
  ],
};

// Genera los 6 partidos (todos contra todos) de un grupo de 4 equipos
function generarPartidosGrupo(letra, equipos, fechaInicio) {
  const enfrentamientos = [
    [0, 1], [2, 3],
    [0, 2], [1, 3],
    [0, 3], [1, 2],
  ];
  const partidos = [];
  let dia = 0;
  enfrentamientos.forEach((par, idx) => {
    const fecha = new Date(fechaInicio);
    fecha.setDate(fecha.getDate() + Math.floor(idx / 2) + dia);
    partidos.push({
      id: `G${letra}-${idx + 1}`,
      etapa: `Grupo ${letra}`,
      local: equipos[par[0]],
      visitante: equipos[par[1]],
      fecha: fecha.toISOString().slice(0, 10),
    });
  });
  return partidos;
}

// Construye la lista completa de partidos de la fase de grupos
function construirPartidos() {
  const partidos = [];
  const letras = Object.keys(GRUPOS);
  const inicio = new Date("2026-06-11");
  letras.forEach((letra, i) => {
    const fechaGrupo = new Date(inicio);
    fechaGrupo.setDate(fechaGrupo.getDate() + Math.floor(i / 2));
    partidos.push(...generarPartidosGrupo(letra, GRUPOS[letra], fechaGrupo));
  });
  return partidos;
}

// Partidos destacados de eliminatorias (se llenan con el avance del torneo)
const ELIMINATORIAS = [
  { id: "OF-1", etapa: "Octavos de final", local: { nombre: "1º Grupo A", bandera: "🏆" }, visitante: { nombre: "2º Grupo B", bandera: "🥈" }, fecha: "2026-06-28" },
  { id: "OF-2", etapa: "Octavos de final", local: { nombre: "1º Grupo C", bandera: "🏆" }, visitante: { nombre: "2º Grupo D", bandera: "🥈" }, fecha: "2026-06-29" },
  { id: "CF-1", etapa: "Cuartos de final", local: { nombre: "Ganador OF-1", bandera: "⚽" }, visitante: { nombre: "Ganador OF-2", bandera: "⚽" }, fecha: "2026-07-04" },
  { id: "SF-1", etapa: "Semifinal", local: { nombre: "Ganador CF-1", bandera: "⚽" }, visitante: { nombre: "Ganador CF-2", bandera: "⚽" }, fecha: "2026-07-14" },
  { id: "FINAL", etapa: "Final", local: { nombre: "Finalista 1", bandera: "🏅" }, visitante: { nombre: "Finalista 2", bandera: "🏅" }, fecha: "2026-07-19" },
];

const PARTIDOS = [...construirPartidos(), ...ELIMINATORIAS];
