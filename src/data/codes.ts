export type Lang = "de" | "en";

export type RegionId = "americas" | "europe" | "japan" | "korea" | "asia" | "unknown";

export type CodeKind = "avatar" | "dlc";

export type Era = "2026" | "2025" | "2024" | "archive";

export type StoreCode = {
  region: RegionId;
  code: string;
  note?: Record<Lang, string>;
};

export type Offer = {
  id: string;
  kind: CodeKind;
  era: Era;
  /** Cropped portraits of the avatars this code unlocks. Same set in every region. */
  images?: string[];
  title: string;
  added: string;
  until?: string;
  summary: Record<Lang, string>;
  source?: { name: string; url: string };
  codes: StoreCode[];
};

function row(region: RegionId, code: string, de?: string, en?: string): StoreCode {
  if (!de) return { region, code };
  return { region, code, note: { de, en: en ?? de } };
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
    summary: {
      de: "Fünf Avatare: Peter Parker, MJ, Jean Grey, Ned Leeds, Frank Castle. Bis 6. Oktober 2027 gemeldet.",
      en: "Five avatars: Peter Parker, MJ, Jean Grey, Ned Leeds, Frank Castle. Reported through 6 October 2027.",
    },
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
    summary: {
      de: "Vier Avatare, August 2026. Die Aktion lief über PS Plus, eingelöst wurde der Code auch ohne Abo.",
      en: "Four avatars, August 2026. The campaign was framed around PS Plus, but the code was also redeemed without a subscription.",
    },
    source: {
      name: "PSX Brasil",
      url: "https://psxbrasil.com.br/novos-avatares-de-helldivers-2-da-psn-podem-ser-resgatados/",
    },
    codes: [
      row("americas", "N7TM-CPAQ-E89P"),
      row("europe", "3RPJ-TAR4-C72P", "Auch Indien, Australien, Neuseeland, Naher Osten, Afrika.", "Also India, Australia, New Zealand, Middle East, Africa."),
      row("asia", "3NQC-DQ63-D94D"),
      row("japan", "AQAT-DL9N-ECTX"),
    ],
  },
  {
    id: "black-desert-kr",
    kind: "avatar",
    era: "2026",
    title: "Black Desert",
    added: "2026-10-21",
    until: "2027-03-31",
    summary: {
      de: "Zehn Avatare, nur Korea. Fenster 21. Oktober 2026 bis 31. März 2027.",
      en: "Ten avatars, Korea only. Window 21 October 2026 through 31 March 2027.",
    },
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
    summary: {
      de: "Vier Avatare: Seraphiten, W.L.F., Ellies Space-Pin, Rattlers.",
      en: "Four avatars: Seraphites, W.L.F., Ellie’s space pin, Rattlers.",
    },
    source: {
      name: "PlayStation Lifestyle",
      url: "https://www.playstationlifestyle.net/2026/09/29/free-last-of-us-ps5-download-codes-ps-store",
    },
    codes: [
      row("americas", "QDFN-GT5D-AMG7"),
      row("europe", "9EBR-7QEJ-R3CG", "Auch Indien, Australien, Neuseeland, Naher Osten, Afrika.", "Also India, Australia, New Zealand, Middle East, Africa."),
      row("asia", "MMLL-XQGG-Q9BG", "Rest-Asien.", "Rest of Asia."),
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
    summary: {
      de: "Indie-Avatare aus Baby Steps, Cairn und Lumines.",
      en: "Indie avatars from Baby Steps, Cairn and Lumines.",
    },
    source: {
      name: "Push Square",
      url: "https://www.pushsquare.com/news/2026/05/playstation-offers-free-psn-avatars-with-this-download-code",
    },
    codes: [
      row("americas", "BD3Q-NNBB-5843"),
      row("europe", "AAET-4A2C-LLNP", "Europa, Naher Osten, Afrika, Australien, Neuseeland.", "Europe, Middle East, Africa, Australia, New Zealand."),
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
    summary: {
      de: "Sechs Saros-Avatare, Mai 2026.",
      en: "Six Saros avatars, May 2026.",
    },
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
    summary: {
      de: "Avatar-Paket, Mai 2026.",
      en: "Avatar pack, May 2026.",
    },
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
    summary: {
      de: "Avatar-Paket vom Dezember 2025. Im Oktober 2026 noch im Umlauf.",
      en: "Avatar pack from December 2025. Still circulating in October 2026.",
    },
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
    title: "Rise of the Rōnin",
    added: "2026-10-06",
    summary: {
      de: "Fünf einzelne Avatare. Im Oktober 2026 für Amerika genannt. Ältere Einzelcodes stehen unter 2024.",
      en: "Five separate avatars. Listed for the Americas in October 2026. Older single codes are under 2024.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "94CX-4DEJ-X2DM", "Naosuke II", "Naosuke II"),
      row("americas", "4RBJ-TJCF-XFJ5", "Taka Murayama", "Taka Murayama"),
      row("americas", "H78G-Q498-2MCA", "Ryoma Sakamoto", "Ryoma Sakamoto"),
      row("americas", "CX5L-R89X-9M4G", "Kogoro Katsura", "Kogoro Katsura"),
      row("americas", "B38M-HX89-QX5M", "Matthew Perry", "Matthew Perry"),
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
    summary: {
      de: "Avatare, im Oktober 2026 nur für Amerika genannt.",
      en: "Avatars listed for the Americas only in October 2026.",
    },
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
    summary: {
      de: "Avatare, im Oktober 2026 nur für Amerika genannt.",
      en: "Avatars listed for the Americas only in October 2026.",
    },
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
    images: [
      "/avatars/tsushima-1.webp",
      "/avatars/tsushima-2.webp",
      "/avatars/tsushima-3.webp",
    ],
    title: "Ghost of Tsushima",
    added: "2025-07-01",
    summary: {
      de: "Fünf Jahre Ghost of Tsushima, Juli 2025. Der Amerika-Code stand im Oktober 2026 noch auf einer aktiven Liste.",
      en: "Ghost of Tsushima’s fifth anniversary, July 2025. The Americas code was still on an active list in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "JMCP-KMTE-3HG2"),
      row("europe", "9M9T-ND7G-7H2A", "Auch Australien.", "Also Australia."),
      row("japan", "JF28-69XM-EA95"),
      row("korea", "X3BP-MKG5-AQ6R"),
      row("asia", "HBE4-B797-AKME"),
    ],
  },
  {
    id: "gow",
    kind: "avatar",
    era: "2025",
    images: [
      "/avatars/gow-1.webp",
    ],
    title: "God of War",
    added: "2025-03-01",
    summary: {
      de: "20 Jahre God of War, März 2025. Der Amerika-Code stand im Oktober 2026 noch auf einer aktiven Liste.",
      en: "20 years of God of War, March 2025. The Americas code was still on an active list in October 2026.",
    },
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
    title: "PS Plus, 15 Jahre",
    added: "2025-08-01",
    summary: {
      de: "Avatar-Paket zum 15-jährigen PS Plus, August 2025. Ein gemeldeter Südamerika-Code war nur der Platzhalter FREE-0000-0000 und fehlt hier.",
      en: "Avatar pack for 15 years of PS Plus, August 2025. A reported South America code was only the placeholder FREE-0000-0000 and is not listed.",
    },
    codes: [
      row("americas", "JGE9-RHJ3-3DLC"),
      row("europe", "PEDN-MARA-T2M9", "Auch Australien.", "Also Australia."),
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
    summary: {
      de: "30 Avatare, einer pro Tag, gedacht für Deutschland, Österreich und die Schweiz. Der Code vom 1. Dezember lautet K23G-P29H-T54L. Die längere Schreibweise mit einem zusätzlichen A war ein Tippfehler.",
      en: "30 avatars, one per day, aimed at Germany, Austria and Switzerland. The 1 December code is K23G-P29H-T54L. The longer spelling with an extra A was a typo.",
    },
    source: {
      name: "Beyond Pixels",
      url: "https://www.beyondpixels.at/alle-playstation-adventskalender-2024-avatar-codes-holt-euch-die-kostenlosen-geschenke/",
    },
    codes: [
      row("europe", "TKRQ-K433-2N22", "25.11.", "25 Nov"),
      row("europe", "NJE4-D8XE-KMTT", "26.11.", "26 Nov"),
      row("europe", "262Q-F5F2-JA95", "27.11.", "27 Nov"),
      row("europe", "HTC3-CJAX-GX5K", "28.11.", "28 Nov"),
      row("europe", "TTLT-JFJQ-XHK2", "29.11.", "29 Nov"),
      row("europe", "GLBH-N8A6-89KJ", "30.11.", "30 Nov"),
      row("europe", "K23G-P29H-T54L", "1.12.", "1 Dec"),
      row("europe", "PT2B-2E8M-HFH2", "2.12.", "2 Dec"),
      row("europe", "CTML-8GN6-8P24", "3.12.", "3 Dec"),
      row("europe", "NGB4-LF4L-N2J4", "4.12.", "4 Dec"),
      row("europe", "JNGX-ALQ5-P43G", "5.12.", "5 Dec"),
      row("europe", "QAGC-4BP9-Q7N7", "6.12.", "6 Dec"),
      row("europe", "6DQ9-F969-ME4J", "7.12.", "7 Dec"),
      row("europe", "RPXF-B95N-DG5F", "8.12.", "8 Dec"),
      row("europe", "NG4X-MLCB-6KN2", "9.12.", "9 Dec"),
      row("europe", "FE29-C5HF-9Q95", "10.12.", "10 Dec"),
      row("europe", "94FF-M3RM-MTB5", "11.12.", "11 Dec"),
      row("europe", "M5H8-NXGN-6B2T", "12.12.", "12 Dec"),
      row("europe", "9AB5-HK9B-A2NE", "13.12.", "13 Dec"),
      row("europe", "9PM5-B7FP-E9L8", "14.12.", "14 Dec"),
      row("europe", "TP59-LNKQ-A6JP", "15.12.", "15 Dec"),
      row("europe", "4MRG-8K3A-BBL7", "16.12.", "16 Dec"),
      row("europe", "EX27-XRFF-DPGD", "17.12.", "17 Dec"),
      row("europe", "QKMA-CMET-862Q", "18.12.", "18 Dec"),
      row("europe", "FMGX-65C4-QRMP", "19.12.", "19 Dec"),
      row("europe", "G2JD-JMNR-HPAC", "20.12.", "20 Dec"),
      row("europe", "85CJ-GX64-9QGH", "21.12.", "21 Dec"),
      row("europe", "47QB-MXRN-ML83", "22.12.", "22 Dec"),
      row("europe", "LH7D-BA4R-LJQD", "23.12.", "23 Dec"),
      row("europe", "5XCL-4HRC-KFXT", "24.12.", "24 Dec"),
    ],
  },
  {
    id: "wrap-up-2024",
    kind: "avatar",
    era: "2024",
    title: "Wrap-Up 2024",
    added: "2024-12-01",
    summary: {
      de: "Avatare zur Jahresrückschau 2024.",
      en: "Avatars from the 2024 year in review.",
    },
    codes: [
      row("americas", "KHKG-H25M-5757"),
      row("europe", "Q237-5LR9-357P"),
      row("japan", "5H8Q-A37B-6DJ6"),
      row("asia", "4T9C-FJQE-3JKH", "Rest-Asien.", "Rest of Asia."),
    ],
  },
  {
    id: "tlou-day-2024",
    kind: "avatar",
    era: "2024",
    title: "The Last of Us Day 2024",
    added: "2024-09-26",
    summary: {
      de: "Avatare zum The Last of Us Day 2024.",
      en: "Avatars from The Last of Us Day 2024.",
    },
    codes: [
      row("americas", "EENL-3K57-EE8R"),
      row("europe", "E92P-28D4-DKN8", "Auch Naher Osten und Afrika.", "Also Middle East and Africa."),
      row("asia", "29LF-GDBC-CP7D"),
    ],
  },
  {
    id: "astro-dop-2024",
    kind: "avatar",
    era: "2024",
    title: "Astro Bot, Days of Play 2024",
    added: "2024-06-01",
    summary: {
      de: "Astro-Bot-Avatare zu den Days of Play 2024.",
      en: "Astro Bot avatars from Days of Play 2024.",
    },
    codes: [
      row("americas", "MKHX-PJGL-HQA2"),
      row("europe", "JPFQ-66LN-QGLJ", "Auch Australien und Neuseeland.", "Also Australia and New Zealand."),
      row("japan", "4GDE-JE36-4L6E"),
      row("korea", "8M8N-HE7E-A8XP"),
      row("asia", "7M3H-D6JE-JDAJ", "Hongkong und Asien.", "Hong Kong and Asia."),
    ],
  },
  {
    id: "psplus-dop-2024",
    kind: "dlc",
    era: "2024",
    title: "PS Plus Days of Play 2024",
    added: "2024-06-01",
    summary: {
      de: "Kostenlose Inhalte aus der PS-Plus-Aktion: Tomb Raider, Sly Cooper, EA FC 24 und weitere. Keine Avatar-Codes. Ob sie noch gehen, ist offen.",
      en: "Free content from the PS Plus promotion: Tomb Raider, Sly Cooper, EA FC 24 and more. Not avatar codes. Whether they still redeem is open.",
    },
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
    title: "Rise of the Rōnin, Einzelavatare",
    added: "2024-03-22",
    summary: {
      de: "Ältere Einzelavatare. Die Region ist bei den meisten nicht genannt. Die fünf Amerika-Codes von 2026 stehen oben.",
      en: "Older single avatars. Region is unstated for most of them. The five 2026 Americas codes are in the current list.",
    },
    codes: [
      row("unknown", "MLFJ-EDNH-EFH8", "Naosuke II. Region nicht genannt.", "Naosuke II. Region not stated."),
      row("unknown", "QMAX-QELC-J78H", "Taka Murayama. Region nicht genannt.", "Taka Murayama. Region not stated."),
      row("unknown", "QAJ7-JBE5-8656", "Ryoma Sakamoto. Region nicht genannt.", "Ryoma Sakamoto. Region not stated."),
      row("unknown", "GGGM-8Q97-J94T", "Kogoro Katsura. Region nicht genannt.", "Kogoro Katsura. Region not stated."),
      row("unknown", "QKAC-DDPM-5A29", "Matthew Perry. Region nicht genannt.", "Matthew Perry. Region not stated."),
      row("unknown", "CE33-BJPT-4LR9", "Rutherford Alcock. Region nicht genannt.", "Rutherford Alcock. Region not stated."),
      row("unknown", "LFG8-GH4X-TMLB", "Kaishu Katsu. Region nicht genannt.", "Kaishu Katsu. Region not stated."),
      row("unknown", "J823-QGD8-K7R8", "Kondo Isami. Region nicht genannt.", "Kondo Isami. Region not stated."),
      row("unknown", "LJB2-GNGK-L7G5", "Genzui Kusaka. Region nicht genannt.", "Genzui Kusaka. Region not stated."),
      row("europe", "2MMJ-2MPQ-86JD", "Isami Kondo. Europa, Australien, Indien.", "Isami Kondo. Europe, Australia, India."),
    ],
  },
  {
    id: "season-of-play-2023",
    kind: "avatar",
    era: "archive",
    title: "Season of Play 2023",
    added: "2023-12-01",
    summary: {
      de: "Dezember 2023. Vermutlich abgelaufen.",
      en: "December 2023. Probably expired.",
    },
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
    title: "PS Plus Jubiläum 2023",
    added: "2023-06-01",
    summary: {
      de: "Juni 2023. Vermutlich abgelaufen.",
      en: "June 2023. Probably expired.",
    },
    codes: [
      row("americas", "GL8M-E67D-J43Q", "Nordamerika.", "North America."),
      row("europe", "DFPX-HA4L-QDFP", "Grossbritannien.", "United Kingdom."),
    ],
  },
  {
    id: "hfw",
    kind: "avatar",
    era: "archive",
    title: "Horizon Forbidden West",
    added: "2023-02-01",
    summary: {
      de: "Ein Jahr Forbidden West, Februar 2023. Der Amerika-Code stand im Oktober 2026 noch auf einer Forumsliste, die anderen Regionen gelten als abgelaufen.",
      en: "Forbidden West’s first anniversary, February 2023. The Americas code was still named on a forum list in October 2026. The other regions are treated as expired.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "G7XK-TNNR-NPLL"),
      row("europe", "B2B9-X5NK-494R", "Auch Naher Osten und Afrika.", "Also Middle East and Africa."),
      row("japan", "H7LG-45N4-BNKE"),
      row("asia", "2QHR-8QN2-BQ2C"),
      row("korea", "E5AQ-H8N6-EFQQ"),
    ],
  },
  {
    id: "death-stranding",
    kind: "avatar",
    era: "archive",
    title: "Death Stranding 2, BB Pod",
    added: "2022-12-01",
    summary: {
      de: "BB-Pod-Avatare, Dezember 2022 und April 2023. Der Amerika-Code stand im Oktober 2026 noch auf einer Forumsliste.",
      en: "BB Pod avatars, December 2022 and April 2023. The Americas code was still named on a forum list in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      row("americas", "PRKT-2QNQ-DH4X"),
      row("europe", "EHNA-6MNB-PGL5", "Auch Naher Osten und Afrika.", "Also Middle East and Africa."),
      row("asia", "CRBA-GKNP-J9EK"),
      row("japan", "JP2J-A5NG-PT2F"),
      row("korea", "3D86-9PNF-KABQ"),
    ],
  },
  {
    id: "wrap-up-2022-eu",
    kind: "avatar",
    era: "archive",
    title: "Wrap-Up 2022, Astro Bot",
    added: "2022-12-01",
    summary: {
      de: "Astro-Bot-Avatare zur Jahresrückschau 2022, Europa. Vermutlich abgelaufen.",
      en: "Astro Bot avatars from the 2022 year in review, Europe. Probably expired.",
    },
    codes: [
      row("europe", "XJAK-XHN5-J6NQ", "Allgemein.", "General."),
      row("europe", "E2EC-A4NE-NK8C", "Shooter.", "Shooter."),
      row("europe", "88QQ-GPN2-C4JB", "Kampf.", "Combat."),
      row("europe", "MKQG-B9N7-H3KE", "Rennen.", "Racing."),
      row("europe", "4NAG-MQN6-B3FG", "Sport.", "Sport."),
    ],
  },
  {
    id: "wrap-up-2022",
    kind: "avatar",
    era: "archive",
    title: "Wrap-Up 2022",
    added: "2022-12-01",
    summary: {
      de: "Weitere Jahresrückschau-Codes. Region nicht genannt, vermutlich Amerika. Vermutlich abgelaufen.",
      en: "Further year-in-review codes. Region not stated, probably the Americas. Probably expired.",
    },
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
    title: "Resident Evil Village",
    added: "2021-05-01",
    summary: {
      de: "Einzelavatare von 2021. Region nicht genannt. Vermutlich abgelaufen.",
      en: "Single avatars from 2021. Region not stated. Probably expired.",
    },
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
