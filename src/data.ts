export type StickerItem = {
  id: string;
  code: string;
  player: string;
  note?: string;
};

export type CountryBlock = {
  countryCode: string;
  countryName: string;
  items: StickerItem[];
};

export const DATA: CountryBlock[] = [
  { countryCode: "FWC", countryName: "Intro — láminas FWC", items: [
    { id: "FWC-8", code: "FWC 8", player: "Host Country Emblem", note: "Página sedes / anfitriones (no es una selección)." },
  ]},
  { countryCode: "GER", countryName: "Alemania", items: [
    { id: "GER-5", code: "GER 5", player: "Nico Schlotterbeck" },
    { id: "GER-9", code: "GER 9", player: "Maximilian Mittelstädt" },
  ]},
  { countryCode: "AUS", countryName: "Australia", items: [
    { id: "AUS-11", code: "AUS 11", player: "Jackson Irvine" },
    { id: "AUS-15", code: "AUS 15", player: "Connor Metcalfe" },
  ]},
  { countryCode: "AUT", countryName: "Austria", items: [
    { id: "AUT-18", code: "AUT 18", player: "Christoph Baumgartner" },
  ]},
  { countryCode: "BIH", countryName: "Bosnia y Herzegovina", items: [
    { id: "BIH-18", code: "BIH 18", player: "Edin Džeko" },
  ]},
  { countryCode: "CPV", countryName: "Cabo Verde", items: [
    { id: "CPV-8", code: "CPV 8", player: "João Paulo" },
  ]},
  { countryCode: "CAN", countryName: "Canadá", items: [
    { id: "CAN-6", code: "CAN 6", player: "Richie Laryea" },
    { id: "CAN-15", code: "CAN 15", player: "Mathieu Choinière" },
    { id: "CAN-19", code: "CAN 19", player: "Cyle Larin" },
    { id: "CAN-20", code: "CAN 20", player: "Jonathan David" },
  ]},
  { countryCode: "CZE", countryName: "Chequia", items: [
    { id: "CZE-3", code: "CZE 3", player: "Jindřich Staněk" },
  ]},
  { countryCode: "COL", countryName: "Colombia", items: [
    { id: "COL-7", code: "COL 7", player: "Johan Mojica" },
    { id: "COL-11", code: "COL 11", player: "Kevin Castaño" },
  ]},
  { countryCode: "CIV", countryName: "Costa de Marfil", items: [
    { id: "CIV-5", code: "CIV 5", player: "Odilon Kossounou" },
    { id: "CIV-13", code: "CIV 13", player: "Lámina especial (bandera / país — texto multilingüe en el álbum)" },
  ]},
  { countryCode: "COD", countryName: "Congo DR (COD)", items: [
    { id: "COD-4", code: "COD 4", player: "Axel Tuanzebe" },
    { id: "COD-14", code: "COD 14", player: "Théo Bongonda" },
    { id: "COD-18", code: "COD 18", player: "Fiston Mayele" },
  ]},
  { countryCode: "CUW", countryName: "Curazao", items: [
    { id: "CUW-9", code: "CUW 9", player: "Livano Comenencia" },
  ]},
  { countryCode: "ECU", countryName: "Ecuador", items: [
    { id: "ECU-4", code: "ECU 4", player: "Piero Hincapié" },
    { id: "ECU-6", code: "ECU 6", player: "William Pacho" },
    { id: "ECU-10", code: "ECU 10", player: "Alan Franco" },
    { id: "ECU-13", code: "ECU 13", player: "Foto de equipo (hueco sin retrato en tu foto)" },
  ]},
  { countryCode: "USA", countryName: "Estados Unidos", items: [
    { id: "USA-6", code: "USA 6", player: "Alex Freeman" },
    { id: "USA-10", code: "USA 10", player: "Weston McKennie" },
    { id: "USA-17", code: "USA 17", player: "Brenden Aaronson" },
    { id: "USA-20", code: "USA 20", player: "Folarin Balogun" },
  ]},
  { countryCode: "FRA", countryName: "Francia", items: [
    { id: "FRA-16", code: "FRA 16", player: "Bradley Barcola" },
    { id: "FRA-20", code: "FRA 20", player: "Kylian Mbappé" },
  ]},
  { countryCode: "HAI", countryName: "Haití", items: [
    { id: "HAI-4", code: "HAI 4", player: "Martin Expérience" },
    { id: "HAI-14", code: "HAI 14", player: "Carnegy Antoine" },
  ]},
  { countryCode: "IRQ", countryName: "Irak", items: [
    { id: "IRQ-13", code: "IRQ 13", player: "Foto de equipo o lámina sin nombre visible en tu foto" },
    { id: "IRQ-18", code: "IRQ 18", player: "Ali Al-Hamadi" },
  ]},
  { countryCode: "JPN", countryName: "Japón", items: [
    { id: "JPN-8", code: "JPN 8", player: "Kaishu Sano" },
  ]},
  { countryCode: "JOR", countryName: "Jordania", items: [
    { id: "JOR-19", code: "JOR 19", player: "Mohammad Abu Zrayq" },
  ]},
  { countryCode: "MAR", countryName: "Marruecos", items: [
    { id: "MAR-4", code: "MAR 4", player: "Achraf Hakimi" },
    { id: "MAR-13", code: "MAR 13", player: "Lámina sin nombre legible en la foto (suele ser foto de equipo en Panini)" },
  ]},
  { countryCode: "MEX", countryName: "México", items: [
    { id: "MEX-13", code: "MEX 13", player: "Foto de equipo (hueco sin nombre en tu foto; habitualmente posición 13)" },
  ]},
  { countryCode: "PAN", countryName: "Panamá", items: [
    { id: "PAN-13", code: "PAN 13", player: "Foto de equipo (hueco sin retrato en tu foto; habitualmente posición 13)" },
  ]},
  { countryCode: "PAR", countryName: "Paraguay", items: [
    { id: "PAR-1", code: "PAR 1", player: "Escudo (APF / logo)" },
    { id: "PAR-5", code: "PAR 5", player: "Fabián Balbuena" },
    { id: "PAR-13", code: "PAR 13", player: "Sin nombre impreso visible en tu foto" },
    { id: "PAR-18", code: "PAR 18", player: "Ramón Sosa" },
    { id: "PAR-19", code: "PAR 19", player: "Ángel Romero" },
  ]},
  { countryCode: "UZB", countryName: "Uzbekistán", items: [
    { id: "UZB-5", code: "UZB 5", player: "Umar Eshmurodov" },
    { id: "UZB-8", code: "UZB 8", player: "Khojiakbar Alijonov" },
    { id: "UZB-9", code: "UZB 9", player: "Abdukodir Khusanov" },
    { id: "UZB-16", code: "UZB 16", player: "Eldor Shomurodov" },
  ]},
  { countryCode: "SEN", countryName: "Senegal", items: [
    { id: "SEN-10", code: "SEN 10", player: "Pape Matar Sarr" },
  ]},
  { countryCode: "SWE", countryName: "Suecia", items: [
    { id: "SWE-3", code: "SWE 3", player: "Isak Hien" },
    { id: "SWE-6", code: "SWE 6", player: "Victor Nilsson Lindelöf" },
    { id: "SWE-7", code: "SWE 7", player: "Gustaf Lagerbielke" },
    { id: "SWE-10", code: "SWE 10", player: "Jesper Karlström" },
    { id: "SWE-13", code: "SWE 13", player: "Sin nombre visible en el hueco de tu foto" },
  ]},
  { countryCode: "SUI", countryName: "Suiza", items: [
    { id: "SUI-1", code: "SUI 1", player: "Escudo (ASF / logo — sin nombre en el hueco)" },
    { id: "SUI-15", code: "SUI 15", player: "Johan Manzambi" },
  ]},
  { countryCode: "TUN", countryName: "Túnez", items: [
    { id: "TUN-2", code: "TUN 2", player: "Bechir Ben Saïd" },
    { id: "TUN-4", code: "TUN 4", player: "Yan Valery" },
    { id: "TUN-6", code: "TUN 6", player: "Yassine Meriah" },
    { id: "TUN-8", code: "TUN 8", player: "Dylan Bronn" },
    { id: "TUN-9", code: "TUN 9", player: "Ellyes Skhiri" },
    { id: "TUN-17", code: "TUN 17", player: "Hazem Mastouri" },
  ]},
  { countryCode: "TUR", countryName: "Turquía (Türkiye)", items: [
    { id: "TUR-1", code: "TUR 1", player: "Escudo (TFF — hueco vacío en tu foto)" },
    { id: "TUR-2", code: "TUR 2", player: "Uğurcan Çakır" },
    { id: "TUR-5", code: "TUR 5", player: "Abdülkerim Bardakcı" },
    { id: "TUR-9", code: "TUR 9", player: "Kaan Ayhan" },
    { id: "TUR-10", code: "TUR 10", player: "İsmail Yüksek" },
    { id: "TUR-11", code: "TUR 11", player: "Hakan Çalhanoğlu" },
    { id: "TUR-12", code: "TUR 12", player: "Orkun Kökçü" },
    { id: "TUR-19", code: "TUR 19", player: "Kerem Aktürkoğlu" },
  ]},
  { countryCode: "URU", countryName: "Uruguay", items: [
    { id: "URU-5", code: "URU 5", player: "José María Giménez" },
    { id: "URU-9", code: "URU 9", player: "Nahitan Nández" },
    { id: "URU-15", code: "URU 15", player: "Nicolás De La Cruz" },
    { id: "URU-18", code: "URU 18", player: "Federico Viñas" },
  ]},
];

export function slug(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
}

export const COUNTRY_ORDER = [
  "Intro — láminas FWC",
  "México", "Sudáfrica", "Ecuador", "Suecia",
  "Canadá", "Bosnia y Herzegovina", "Corea del Sur", "Argelia",
  "Brasil", "Marruecos", "Suiza", "Irak",
  "Estados Unidos", "Paraguay", "Ghana", "Turquía (Türkiye)",
  "Alemania", "Curazao", "Escocia", "Costa de Marfil",
  "Países Bajos", "Japón", "Colombia", "Noruega",
  "Bélgica", "Egipto", "Australia", "Chequia",
  "España", "Cabo Verde", "Uruguay", "Jordania",
  "Portugal", "Irán", "Dinamarca", "Haití",
  "Francia", "Arabia Saudita", "Croacia", "Congo DR (COD)",
  "Argentina", "Uzbekistán", "Túnez", "Austria",
  "Inglaterra", "Senegal", "Nueva Zelanda", "Panamá"
];
