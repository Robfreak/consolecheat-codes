export type Lang = "de" | "en";

export type RegionId = "americas" | "europe" | "japan" | "korea" | "asia" | "unknown";

export type CodeKind = "avatar" | "dlc";

export type StoreCode = {
  region: RegionId;
  code: string;
  note?: Record<Lang, string>;
};

export type Offer = {
  id: string;
  kind: CodeKind;
  title: string;
  added: string;
  until?: string;
  summary: Record<Lang, string>;
  source: { name: string; url: string };
  codes: StoreCode[];
};

/** Public multi-redeem promo codes. No single-use wallet codes, no invented strings. */
export const offers: Offer[] = [
  {
    id: "spiderman-bnd",
    kind: "avatar",
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
      { region: "europe", code: "RG8L-32NF-3NLP" },
      { region: "americas", code: "726X-HNE4-P22M" },
      { region: "japan", code: "4GL5-8MMT-4C94" },
    ],
  },
  {
    id: "black-desert-kr",
    kind: "avatar",
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
    codes: [{ region: "korea", code: "ECA8-T7NA-FEMF" }],
  },
  {
    id: "tlou-day-2026",
    kind: "avatar",
    title: "The Last of Us",
    added: "2026-09-28",
    summary: {
      de: "Vier Avatare zum The Last of Us Day 2026: Seraphiten, W.L.F., Ellies Space-Pin, Rattlers.",
      en: "Four The Last of Us Day 2026 avatars: Seraphites, W.L.F., Ellie’s space pin, Rattlers.",
    },
    source: {
      name: "PlayStation Lifestyle",
      url: "https://www.playstationlifestyle.net/2026/09/29/free-last-of-us-ps5-download-codes-ps-store",
    },
    codes: [
      { region: "americas", code: "QDFN-GT5D-AMG7" },
      {
        region: "europe",
        code: "9EBR-7QEJ-R3CG",
        note: {
          de: "Auch Indien, Australien, Neuseeland, Naher Osten, Afrika.",
          en: "Also India, Australia, New Zealand, Middle East, Africa.",
        },
      },
      { region: "japan", code: "JQ38-ER84-H78R" },
      { region: "korea", code: "LH7H-CE4H-J527" },
      { region: "asia", code: "MMLL-XQGG-Q9BG" },
    ],
  },
  {
    id: "days-of-play-2026",
    kind: "avatar",
    title: "Days of Play 2026",
    added: "2026-05-27",
    summary: {
      de: "Indie-Avatare aus Baby Steps, Cairn und Lumines. Der Amerika-Code stand im Oktober 2026 noch auf aktiven Listen.",
      en: "Indie avatars from Baby Steps, Cairn and Lumines. The Americas code was still on active lists in October 2026.",
    },
    source: {
      name: "Push Square",
      url: "https://www.pushsquare.com/news/2026/05/playstation-offers-free-psn-avatars-with-this-download-code",
    },
    codes: [
      { region: "americas", code: "BD3Q-NNBB-5843" },
      {
        region: "europe",
        code: "AAET-4A2C-LLNP",
        note: {
          de: "Europa, Naher Osten, Afrika, Australien, Neuseeland.",
          en: "Europe, Middle East, Africa, Australia, New Zealand.",
        },
      },
      { region: "asia", code: "EK8R-B23R-NEJ2" },
      { region: "japan", code: "B4A8-JABE-Q7GL" },
      { region: "korea", code: "9T2P-CJKC-9GX6" },
    ],
  },
  {
    id: "saros",
    kind: "avatar",
    title: "Saros",
    added: "2026-05-03",
    summary: {
      de: "Sechs Saros-Avatare. Amerika im Oktober 2026 noch als aktiv geführt, die anderen Regionen seit Mai 2026.",
      en: "Six Saros avatars. Americas still listed active in October 2026; other regions date from May 2026.",
    },
    source: {
      name: "Sportskeeda",
      url: "https://www.sportskeeda.com/esports/how-get-saros-psn-avatars-free",
    },
    codes: [
      { region: "americas", code: "BN5Q-7B28-G7ND" },
      { region: "europe", code: "QLD2-2HD4-4NA2" },
      { region: "japan", code: "HEKJ-925F-XG3M" },
      { region: "asia", code: "T23N-MDCL-569D" },
      { region: "korea", code: "ED22-899Q-69JN" },
    ],
  },
  {
    id: "ghost-of-yotei",
    kind: "avatar",
    title: "Ghost of Yōtei",
    added: "2026-10-06",
    summary: {
      de: "Avatar-Code, im Oktober 2026 für Amerika und Südamerika als aktiv genannt.",
      en: "Avatar code listed active for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "8GGE-5H6P-QMTC" }],
  },
  {
    id: "ronin",
    kind: "avatar",
    title: "Rise of the Rōnin",
    added: "2026-10-06",
    summary: {
      de: "Fünf einzelne Avatare. Im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Five separate avatars. Listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [
      { region: "americas", code: "94CX-4DEJ-X2DM", note: { de: "Naosuke II", en: "Naosuke II" } },
      { region: "americas", code: "4RBJ-TJCF-XFJ5", note: { de: "Taka Murayama", en: "Taka Murayama" } },
      { region: "americas", code: "H78G-Q498-2MCA", note: { de: "Ryoma Sakamoto", en: "Ryoma Sakamoto" } },
      { region: "americas", code: "CX5L-R89X-9M4G", note: { de: "Kogoro Katsura", en: "Kogoro Katsura" } },
      { region: "americas", code: "B38M-HX89-QX5M", note: { de: "Matthew Perry", en: "Matthew Perry" } },
    ],
  },
  {
    id: "tsushima",
    kind: "avatar",
    title: "Ghost of Tsushima",
    added: "2026-10-06",
    summary: {
      de: "Avatar-Code. Die Oktober-Liste nennt keine Region.",
      en: "Avatar code. The October list does not name a region.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "unknown", code: "JMCP-KMTE-3HG2" }],
  },
  {
    id: "uncharted",
    kind: "avatar",
    title: "Uncharted",
    added: "2026-10-06",
    summary: {
      de: "Avatar-Code. Die Oktober-Liste nennt keine Region.",
      en: "Avatar code. The October list does not name a region.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "unknown", code: "HG23-6T4H-RNHQ" }],
  },
  {
    id: "dave",
    kind: "avatar",
    title: "Dave the Diver",
    added: "2026-10-06",
    summary: {
      de: "Avatare, im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Avatars listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "RBKQ-T9TL-KJ3M" }],
  },
  {
    id: "gow",
    kind: "avatar",
    title: "God of War",
    added: "2026-10-06",
    summary: {
      de: "Avatar, im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Avatar listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "F27X-L946-8PTH" }],
  },
  {
    id: "hfw",
    kind: "avatar",
    title: "Horizon Forbidden West",
    added: "2026-10-06",
    summary: {
      de: "Avatare, im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Avatars listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "G7XK-TNNR-NPLL" }],
  },
  {
    id: "deathloop",
    kind: "avatar",
    title: "Deathloop",
    added: "2026-10-06",
    summary: {
      de: "Avatare, im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Avatars listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "7673-6HNN-K887" }],
  },
  {
    id: "death-stranding",
    kind: "avatar",
    title: "Death Stranding",
    added: "2026-10-06",
    summary: {
      de: "Avatare, im Oktober 2026 für Amerika und Südamerika genannt.",
      en: "Avatars listed for the Americas in October 2026.",
    },
    source: {
      name: "PSNProfiles",
      url: "https://forum.psnprofiles.com/topic/200663-list-of-active-psn-avatar-codes/",
    },
    codes: [{ region: "americas", code: "PRKT-2QNQ-DH4X" }],
  },
];

export const regionOrder: RegionId[] = ["americas", "europe", "japan", "korea", "asia", "unknown"];
