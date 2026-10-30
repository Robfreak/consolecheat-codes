import { dayNote, joinName, phrases, same, type Copy } from "./locale";
import { summaries } from "./summaries";

export type { Lang } from "./locale";
export { langs } from "./locale";

export type RegionId = "americas" | "europe" | "japan" | "korea" | "asia" | "unknown";

export type CodeKind = "avatar" | "dlc";

export type Era = "2026" | "2025" | "2024" | "archive";

export type StoreCode = {
  region: RegionId;
  code: string;
  note?: Copy;
  /** Set only when this one code disagrees with the pack. Aktuell shows working codes. */
  live?: boolean;
};

export type Offer = {
  id: string;
  kind: CodeKind;
  era: Era;
  /** Whole pack still redeems. Omit and era "2026" means yes. */
  live?: boolean;
  images?: string[];
  title: string;
  added: string;
  until?: string;
  summary: Copy;
  source?: { name: string; url: string };
  codes: StoreCode[];
};

function row(region: RegionId, code: string, note?: Copy, live?: boolean): StoreCode {
  return { region, code, ...(note ? { note } : {}), ...(live !== undefined ? { live } : {}) };
}

/** A code is in Aktuell when it was still redeeming in October 2026. */
export function codeWorks(offer: Offer, code: StoreCode) {
  if (code.live !== undefined) return code.live;
  if (offer.live !== undefined) return offer.live;
  return offer.era === "2026";
}

/** Public multi-redeem promo codes. No single-use wallet codes, no invented strings. */
export const offers: Offer[] = [
  {
    id: "spiderman-bnd",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/spiderman-1.webp",
      "/avatars/spiderman-2.webp",
      "/avatars/spiderman-3.webp",
      "/avatars/spiderman-4.webp",
      "/avatars/spiderman-5.webp",
    ],
    title: "Spider-Man: Brand New Day",
    added: "2026-10-06",
    until: "2027-10-06",
    summary: summaries["spiderman-bnd"],
    source: {
      name: "La Crème du Gaming",
      url: "https://www.lacremedugaming.fr/consoles/playstation/ps5-et-ps4-sony-offre-5-cadeaux-spider-man-a-recuperer-avec-ces-codes-meme-sans-abonnement-ps-plus-232248.html",
    },
    codes: [
      row("americas", "726X-HNE4-P22M"),
      row("europe", "RG8L-32NF-3NLP"),
      row("japan", "4GL5-8MMT-4C94"),
    ],
  },
  {
    id: "helldivers-2",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/helldivers-1.webp",
      "/avatars/helldivers-2.webp",
      "/avatars/helldivers-3.webp",
      "/avatars/helldivers-4.webp",
    ],
    title: "Helldivers 2",
    added: "2026-08-19",
    summary: summaries["helldivers-2"],
    source: {
      name: "PSX Brasil",
      url: "https://psxbrasil.com.br/novos-avatares-de-helldivers-2-da-psn-podem-ser-resgatados/",
    },
    codes: [
      row("americas", "N7TM-CPAQ-E89P"),
      row("europe", "3RPJ-TAR4-C72P", phrases.alsoInAuNzMeAf),
      row("asia", "3NQC-DQ63-D94D"),
      row("japan", "AQAT-DL9N-ECTX"),
    ],
  },
  {
    id: "black-desert-kr",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/bdo-1.webp",
      "/avatars/bdo-2.webp",
      "/avatars/bdo-3.webp",
      "/avatars/bdo-4.webp",
      "/avatars/bdo-5.webp",
      "/avatars/bdo-6.webp",
      "/avatars/bdo-7.webp",
      "/avatars/bdo-8.webp",
      "/avatars/bdo-9.webp",
      "/avatars/bdo-10.webp",
    ],
    title: "Black Desert",
    added: "2026-10-21",
    until: "2027-03-31",
    summary: summaries["black-desert-kr"],
    source: {
      name: "Ruliweb",
      url: "https://m.ruliweb.com/market/board/1020/read/108206",
    },
    codes: [row("korea", "ECA8-T7NA-FEMF")],
  },
  {
    id: "tlou-day-2026",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/tlou-1.webp",
      "/avatars/tlou-2.webp",
      "/avatars/tlou-3.webp",
      "/avatars/tlou-4.webp",
    ],
    title: "The Last of Us Day 2026",
    added: "2026-09-28",
    summary: summaries["tlou-day-2026"],
    source: {
      name: "PlayStation Lifestyle",
      url: "https://www.playstationlifestyle.net/2026/09/29/free-last-of-us-ps5-download-codes-ps-store",
    },
    codes: [
      row("americas", "QDFN-GT5D-AMG7"),
      row("europe", "9EBR-7QEJ-R3CG", phrases.alsoInAuNzMeAf),
      row("asia", "MMLL-XQGG-Q9BG", phrases.restAsia),
      row("korea", "LH7H-CE4H-J527"),
      row("japan", "JQ38-ER84-H78R"),
    ],
  },
  {
    id: "days-of-play-2026",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/days-of-play-1.webp",
      "/avatars/days-of-play-2.webp",
      "/avatars/days-of-play-3.webp",
    ],
    title: "Days of Play 2026",
    added: "2026-05-27",
    summary: summaries["days-of-play-2026"],
    source: {
      name: "Push Square",
      url: "https://www.pushsquare.com/news/2026/05/playstation-offers-free-psn-avatars-with-this-download-code",
    },
    codes: [
      row("americas", "BD3Q-NNBB-5843"),
      row("europe", "AAET-4A2C-LLNP", phrases.euMeAfAuNz),
      row("asia", "EK8R-B23R-NEJ2"),
      row("korea", "9T2P-CJKC-9GX6"),
      row("japan", "B4A8-JABE-Q7GL"),
    ],
  },
  {
    id: "saros",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/saros-1.webp",
      "/avatars/saros-2.webp",
      "/avatars/saros-3.webp",
      "/avatars/saros-4.webp",
      "/avatars/saros-5.webp",
      "/avatars/saros-6.webp",
    ],
    title: "Saros",
    added: "2026-05-03",
    summary: summaries["saros"],
    source: {
      name: "Sportskeeda",
      url: "https://www.sportskeeda.com/esports/how-get-saros-psn-avatars-free",
    },
    codes: [
      row("americas", "BN5Q-7B28-G7ND"),
      row("europe", "QLD2-2HD4-4NA2"),
      row("asia", "T23N-MDCL-569D"),
      row("korea", "ED22-899Q-69JN"),
      row("japan", "HEKJ-925F-XG3M"),
    ],
  },
  {
    id: "uncharted",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/uncharted-1.webp",
      "/avatars/uncharted-2.webp",
      "/avatars/uncharted-3.webp",
      "/avatars/uncharted-4.webp",
    ],
    title: "Uncharted 4",
    added: "2026-05-01",
    summary: summaries["uncharted"],
    codes: [
      row("americas", "HG23-6T4H-RNHQ"),
      row("europe", "R3ED-24QD-E4DM"),
      row("asia", "PEC5-32RK-EPEQ"),
      row("korea", "FHT3-4RGP-RBJ8"),
      row("japan", "L8EF-LAC6-PH3B"),
    ],
  },
  {
    id: "ghost-of-yotei",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/yotei-1.webp",
      "/avatars/yotei-2.webp",
      "/avatars/yotei-3.webp",
      "/avatars/yotei-4.webp",
      "/avatars/yotei-5.webp",
      "/avatars/yotei-6.webp",
      "/avatars/yotei-7.webp",
      "/avatars/yotei-8.webp",
    ],
    title: "Ghost of Yōtei",
    added: "2025-12-01",
    summary: summaries["ghost-of-yotei"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "8GGE-5H6P-QMTC"),
      row("europe", "QEH9-3Q25-5QMB"),
      row("asia", "BD8B-8C53-6CND"),
      row("korea", "6HP7-NHQ2-FJED"),
      row("japan", "DMH5-XBJD-KXCQ"),
    ],
  },
  {
    id: "ronin",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/ronin-1.webp",
      "/avatars/ronin-2.webp",
      "/avatars/ronin-3.webp",
      "/avatars/ronin-4.webp",
      "/avatars/ronin-5.webp",
      "/avatars/ronin-6.webp",
    ],
    title: "Rise of the Rōnin",
    added: "2026-10-06",
    summary: summaries["ronin"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "94CX-4DEJ-X2DM", same("Naosuke II")),
      row("americas", "4RBJ-TJCF-XFJ5", same("Taka Murayama")),
      row("americas", "H78G-Q498-2MCA", same("Ryoma Sakamoto")),
      row("americas", "CX5L-R89X-9M4G", same("Kogoro Katsura")),
      row("americas", "B38M-HX89-QX5M", same("Matthew Perry")),
      row("americas", "3PB3-M2RP-PXGQ", same("Rutherford Alcock")),
      row("americas", "2MMJ-2MPQ-86JD", same("Isami Kondo")),
      row("europe", "MLFJ-EDNH-EFH8", joinName("Naosuke II", phrases.alsoAuIn)),
      row("europe", "QMAX-QELC-J78H", joinName("Taka Murayama", phrases.alsoAuIn)),
      row("europe", "QAJ7-JBE5-8656", joinName("Ryoma Sakamoto", phrases.alsoAuIn)),
      row("europe", "GGGM-8Q97-J94T", joinName("Kogoro Katsura", phrases.alsoAuIn)),
      row("europe", "QKAC-DDPM-5A29", joinName("Matthew Perry", phrases.alsoAuIn)),
      row("europe", "CE33-BJPT-4LR9", joinName("Rutherford Alcock", phrases.alsoAuIn)),
    ],
  },
  {
    id: "dave",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/dave-1.webp",
      "/avatars/dave-2.webp",
      "/avatars/dave-3.webp",
      "/avatars/dave-4.webp",
      "/avatars/dave-5.webp",
      "/avatars/dave-6.webp",
      "/avatars/dave-7.webp",
    ],
    title: "Dave the Diver",
    added: "2026-10-06",
    summary: summaries["dave"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [row("americas", "RBKQ-T9TL-KJ3M")],
  },
  {
    id: "deathloop",
    kind: "avatar",
    era: "2026",
    images: [
      "/avatars/deathloop-1.webp",
      "/avatars/deathloop-2.webp",
      "/avatars/deathloop-3.webp",
      "/avatars/deathloop-4.webp",
      "/avatars/deathloop-5.webp",
      "/avatars/deathloop-6.webp",
      "/avatars/deathloop-7.webp",
      "/avatars/deathloop-8.webp",
      "/avatars/deathloop-9.webp",
    ],
    title: "Deathloop",
    added: "2026-10-06",
    summary: summaries["deathloop"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [row("americas", "7673-6HNN-K887")],
  },
  {
    id: "tsushima",
    kind: "avatar",
    era: "2025",
    live: true,
    images: [
      "/avatars/tsushima-1.webp",
      "/avatars/tsushima-2.webp",
      "/avatars/tsushima-3.webp",
    ],
    title: "Ghost of Tsushima",
    added: "2025-07-01",
    summary: summaries["tsushima"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "JMCP-KMTE-3HG2"),
      row("europe", "9M9T-ND7G-7H2A", phrases.alsoAustralia),
      row("japan", "JF28-69XM-EA95"),
      row("korea", "X3BP-MKG5-AQ6R"),
      row("asia", "HBE4-B797-AKME"),
    ],
  },
  {
    id: "gow",
    kind: "avatar",
    era: "2025",
    live: true,
    images: [
      "/avatars/gow-1.webp",
    ],
    title: "God of War",
    added: "2025-03-01",
    summary: summaries["gow"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "F27X-L946-8PTH"),
      row("europe", "HMCJ-N3JM-4TT2"),
      row("japan", "6F3K-RR8X-2KEM"),
      row("korea", "HRLN-L4AG-88GD"),
      row("asia", "8RC3-DEFT-NJPC"),
    ],
  },
  {
    id: "psplus-15",
    kind: "avatar",
    era: "2025",
    images: [
      "/avatars/p15-3.webp",
      "/avatars/p15-2.webp",
      "/avatars/p15-5.webp",
      "/avatars/p15-4.webp",
      "/avatars/p15-1.webp",
    ],
    title: "PS Plus, 15 Jahre",
    added: "2025-08-01",
    summary: summaries["psplus-15"],
    codes: [
      row("americas", "JGE9-RHJ3-3DLC"),
      row("europe", "PEDN-MARA-T2M9", phrases.alsoAustralia),
      row("asia", "HRK4-G9LC-LHLC"),
      row("japan", "4E9K-GTKL-5476"),
    ],
  },
  {
    id: "advent-2024",
    kind: "avatar",
    era: "2024",
    title: "PlayStation Adventskalender 2024",
    added: "2024-11-25",
    summary: summaries["advent-2024"],
    source: {
      name: "Beyond Pixels",
      url: "https://www.beyondpixels.at/alle-playstation-adventskalender-2024-avatar-codes-holt-euch-die-kostenlosen-geschenke/",
    },
    codes: [
      row("europe", "TKRQ-K433-2N22", dayNote(11, 25)),
      row("europe", "NJE4-D8XE-KMTT", dayNote(11, 26)),
      row("europe", "262Q-F5F2-JA95", dayNote(11, 27)),
      row("europe", "HTC3-CJAX-GX5K", dayNote(11, 28)),
      row("europe", "TTLT-JFJQ-XHK2", dayNote(11, 29)),
      row("europe", "GLBH-N8A6-89KJ", dayNote(11, 30)),
      row("europe", "K23G-P29H-T54L", dayNote(12, 1)),
      row("europe", "PT2B-2E8M-HFH2", dayNote(12, 2)),
      row("europe", "CTML-8GN6-8P24", dayNote(12, 3)),
      row("europe", "NGB4-LF4L-N2J4", dayNote(12, 4)),
      row("europe", "JNGX-ALQ5-P43G", dayNote(12, 5)),
      row("europe", "QAGC-4BP9-Q7N7", dayNote(12, 6)),
      row("europe", "6DQ9-F969-ME4J", dayNote(12, 7)),
      row("europe", "RPXF-B95N-DG5F", dayNote(12, 8)),
      row("europe", "NG4X-MLCB-6KN2", dayNote(12, 9)),
      row("europe", "FE29-C5HF-9Q95", dayNote(12, 10)),
      row("europe", "94FF-M3RM-MTB5", dayNote(12, 11)),
      row("europe", "M5H8-NXGN-6B2T", dayNote(12, 12)),
      row("europe", "9AB5-HK9B-A2NE", dayNote(12, 13)),
      row("europe", "9PM5-B7FP-E9L8", dayNote(12, 14)),
      row("europe", "TP59-LNKQ-A6JP", dayNote(12, 15)),
      row("europe", "4MRG-8K3A-BBL7", dayNote(12, 16)),
      row("europe", "EX27-XRFF-DPGD", dayNote(12, 17)),
      row("europe", "QKMA-CMET-862Q", dayNote(12, 18)),
      row("europe", "FMGX-65C4-QRMP", dayNote(12, 19)),
      row("europe", "G2JD-JMNR-HPAC", dayNote(12, 20)),
      row("europe", "85CJ-GX64-9QGH", dayNote(12, 21)),
      row("europe", "47QB-MXRN-ML83", dayNote(12, 22)),
      row("europe", "LH7D-BA4R-LJQD", dayNote(12, 23)),
      row("europe", "5XCL-4HRC-KFXT", dayNote(12, 24)),
    ],
  },
  {
    id: "wrap-up-2024",
    kind: "avatar",
    era: "2024",
    images: ["/avatars/wrap24-1.webp"],
    title: "Wrap-Up 2024",
    added: "2024-12-01",
    summary: summaries["wrap-up-2024"],
    codes: [
      row("americas", "KHKG-H25M-5757", undefined, true),
      row("europe", "Q237-5LR9-357P"),
      row("japan", "5H8Q-A37B-6DJ6"),
      row("asia", "4T9C-FJQE-3JKH", phrases.restAsia),
    ],
  },
  {
    id: "tlou-day-2024",
    kind: "avatar",
    era: "2024",
    images: [
      "/avatars/tlou24-1.webp",
      "/avatars/tlou24-2.webp",
      "/avatars/tlou24-3.webp",
    ],
    title: "The Last of Us Day 2024",
    added: "2024-09-26",
    summary: summaries["tlou-day-2024"],
    codes: [
      row("americas", "EENL-3K57-EE8R"),
      row("europe", "E92P-28D4-DKN8", phrases.alsoMena),
      row("asia", "29LF-GDBC-CP7D"),
    ],
  },
  {
    id: "astro-dop-2024",
    kind: "avatar",
    era: "2024",
    images: [
      "/avatars/astro-1.webp",
      "/avatars/astro-2.webp",
      "/avatars/astro-3.webp",
      "/avatars/astro-4.webp",
    ],
    title: "Astro Bot, Days of Play 2024",
    added: "2024-06-01",
    summary: summaries["astro-dop-2024"],
    codes: [
      row("americas", "MKHX-PJGL-HQA2"),
      row("europe", "JPFQ-66LN-QGLJ", phrases.alsoAuNz),
      row("japan", "4GDE-JE36-4L6E"),
      row("korea", "8M8N-HE7E-A8XP"),
      row("asia", "7M3H-D6JE-JDAJ", phrases.hongKong),
    ],
  },
  {
    id: "psplus-dop-2024",
    kind: "dlc",
    era: "2024",
    title: "PS Plus Days of Play 2024",
    added: "2024-06-01",
    summary: summaries["psplus-dop-2024"],
    codes: [
      row("europe", "9EKG-C3QP-RLNH"),
      row("europe", "LAH6-GA7X-263G"),
      row("americas", "AF4A-4C9R-AP66"),
    ],
  },
  {
    id: "ronin-2024",
    kind: "avatar",
    era: "2024",
    images: [
      "/avatars/ronin-1.webp",
      "/avatars/ronin-2.webp",
      "/avatars/ronin-3.webp",
      "/avatars/ronin-4.webp",
      "/avatars/ronin-5.webp",
      "/avatars/ronin-6.webp",
    ],
    title: "Rise of the Rōnin, 2024",
    added: "2024-03-22",
    summary: summaries["ronin-2024"],
    codes: [
      row("europe", "LFG8-GH4X-TMLB", same("Kaishu Katsu")),
      row("europe", "J823-QGD8-K7R8", same("Kondo Isami")),
      row("europe", "LJB2-GNGK-L7G5", same("Genzui Kusaka")),
    ],
  },
  {
    id: "season-of-play-2023",
    kind: "avatar",
    era: "archive",
    images: [
      "/avatars/sop-1.webp",
      "/avatars/sop-2.webp",
      "/avatars/sop-3.webp",
      "/avatars/sop-4.webp",
      "/avatars/sop-5.webp",
    ],
    title: "Season of Play 2023",
    added: "2023-12-01",
    summary: summaries["season-of-play-2023"],
    codes: [
      row("americas", "DGNJ-4J45-6DQB"),
      row("europe", "3GAA-D9L3-2G97"),
      row("japan", "RFAH-BHAR-9K8L"),
    ],
  },
  {
    id: "psplus-2023",
    kind: "avatar",
    era: "archive",
    images: [
      "/avatars/p23-1.webp",
      "/avatars/p23-2.webp",
      "/avatars/p23-3.webp",
      "/avatars/p23-4.webp",
    ],
    title: "PS Plus Jubiläum 2023",
    added: "2023-06-01",
    summary: summaries["psplus-2023"],
    codes: [
      row("americas", "GL8M-E67D-J43Q", phrases.northAmerica),
      row("europe", "DFPX-HA4L-QDFP", phrases.uk),
    ],
  },
  {
    id: "hfw",
    kind: "avatar",
    era: "archive",
    images: [
      "/avatars/hfw-1.webp",
      "/avatars/hfw-2.webp",
      "/avatars/hfw-3.webp",
      "/avatars/hfw-4.webp",
      "/avatars/hfw-5.webp",
      "/avatars/hfw-6.webp",
      "/avatars/hfw-7.webp",
      "/avatars/hfw-8.webp",
      "/avatars/hfw-9.webp",
      "/avatars/hfw-10.webp",
      "/avatars/hfw-11.webp",
    ],
    title: "Horizon Forbidden West",
    added: "2023-02-01",
    summary: summaries["hfw"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "G7XK-TNNR-NPLL", undefined, true),
      row("europe", "B2B9-X5NK-494R", phrases.alsoMena),
      row("japan", "H7LG-45N4-BNKE"),
      row("asia", "2QHR-8QN2-BQ2C"),
      row("korea", "E5AQ-H8N6-EFQQ"),
    ],
  },
  {
    id: "death-stranding",
    kind: "avatar",
    era: "archive",
    images: [
      "/avatars/ds-1.webp",
      "/avatars/ds-2.webp",
      "/avatars/ds-3.webp",
      "/avatars/ds-4.webp",
    ],
    title: "Death Stranding 2, BB Pod",
    added: "2022-12-01",
    summary: summaries["death-stranding"],
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "PRKT-2QNQ-DH4X", undefined, true),
      row("europe", "EHNA-6MNB-PGL5", phrases.alsoMena),
      row("asia", "CRBA-GKNP-J9EK"),
      row("japan", "JP2J-A5NG-PT2F"),
      row("korea", "3D86-9PNF-KABQ"),
    ],
  },
  {
    id: "wrap-up-2022-eu",
    kind: "avatar",
    era: "archive",
    images: ["/avatars/wrap22-1.webp"],
    title: "Wrap-Up 2022, Astro Bot",
    added: "2022-12-01",
    summary: summaries["wrap-up-2022-eu"],
    codes: [
      row("europe", "XJAK-XHN5-J6NQ", phrases.general),
      row("europe", "E2EC-A4NE-NK8C", phrases.shooter),
      row("europe", "88QQ-GPN2-C4JB", phrases.combat),
      row("europe", "MKQG-B9N7-H3KE", phrases.racing),
      row("europe", "4NAG-MQN6-B3FG", phrases.sport),
    ],
  },
  {
    id: "wrap-up-2022",
    kind: "avatar",
    era: "archive",
    images: ["/avatars/wrap22-1.webp"],
    title: "Wrap-Up 2022",
    added: "2022-12-01",
    summary: summaries["wrap-up-2022"],
    codes: [
      row("unknown", "2LJB-8JND-4H9G"),
      row("unknown", "CPDR-JFN9-TJA2"),
      row("unknown", "H75N-8HNP-H5EP"),
      row("unknown", "BA5N-RNNE-P3EK"),
      row("unknown", "MNNX-CXNG-L6GB"),
      row("unknown", "C5CD-C2NJ-R239"),
    ],
  },
  {
    id: "re-village",
    kind: "avatar",
    era: "archive",
    images: ["/avatars/re-1.webp", "/avatars/re-2.webp"],
    title: "Resident Evil Village",
    added: "2021-05-01",
    summary: summaries["re-village"],
    codes: [
      row("unknown", "LEJH-M8N9-E5XF"),
      row("unknown", "QG9R-NEN7-RP5L"),
      row("unknown", "C3F6-DMNX-NGKP"),
      row("unknown", "QQGD-99NL-53ND"),
      row("unknown", "A5NX-8NN8-BGXB"),
      row("unknown", "M38B-ACN7-74HH"),
      row("unknown", "22KT-G8NJ-TLBJ"),
      row("unknown", "7HD2-75NA-D4KD"),
      row("unknown", "B26P-APNA-7C6B"),
      row("unknown", "83EP-67N8-BX9K"),
      row("unknown", "X6PM-GGN5-K955"),
      row("unknown", "486E-XNN8-GKF9"),
    ],
  },
];

export const regionOrder: RegionId[] = ["americas", "europe", "japan", "korea", "asia", "unknown"];

export const eraOrder: Era[] = ["2026", "2025", "2024", "archive"];
