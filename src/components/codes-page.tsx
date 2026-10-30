import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Moon, Sun, Ticket } from "lucide-react";
import { codeWorks, langs, offers, regionOrder, type Era, type Lang, type Offer, type RegionId } from "@/data/codes";
import { endonyms } from "@/data/locale";
import { ui, type Ui } from "@/data/ui";

type KindFilter = "all" | "avatar" | "dlc";
type RegionFilter = "all" | RegionId;
type EraFilter = "live" | "all" | Era;

function formatDate(iso: string, lang: Lang) {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  if (lang === "de") return `${day}.${month}.${year}`;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const locale = lang === "zh" ? "zh-Hans" : lang;
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(date);
}

function isLang(value: string | null): value is Lang {
  return !!value && (langs as readonly string[]).includes(value);
}

function preferredLang(): Lang {
  const stored = localStorage.getItem("consolecheat-lang");
  if (isLang(stored)) return stored;
  const nav = (navigator.languages?.[0] || navigator.language || "de").toLowerCase();
  if (nav.startsWith("zh")) return "zh";
  const base = nav.split("-")[0] ?? "de";
  return isLang(base) ? base : "de";
}

function applyLang(next: Lang) {
  document.documentElement.lang = next;
  localStorage.setItem("consolecheat-lang", next);
}

function applyTheme(next: "light" | "dark") {
  document.documentElement.dataset.theme = next;
  localStorage.setItem("consolecheat-theme", next);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "light" ? "#f4f1eb" : "#07090e");
}

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }
}

export function CodesPage() {
  const [lang, setLang] = useState<Lang>("de");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [kind, setKind] = useState<KindFilter>("all");
  const [region, setRegion] = useState<RegionFilter>("all");
  const [era, setEra] = useState<EraFilter>("live");
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const nextLang = preferredLang();
    setLang(nextLang);
    applyLang(nextLang);
    const nextTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(nextTheme);
  }, []);

  const t = ui[lang];

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return offers
      .filter((offer) => query || era === "all" || (era === "live" ? offer.codes.some((code) => codeWorks(offer, code)) : offer.era === era))
      .filter((offer) => kind === "all" || offer.kind === kind)
      .map((offer) => ({
        ...offer,
        codes: offer.codes.filter((code) => {
          if (region !== "all" && code.region !== region) return false;
          if (!query && era === "live" && !codeWorks(offer, code)) return false;
          return true;
        }),
      }))
      .filter((offer) => offer.codes.length > 0)
      .filter((offer) => {
        if (!query) return true;
        const blob = [
          offer.title,
          ...Object.values(offer.summary),
          ...offer.codes.flatMap((code) => [code.code, ...Object.values(code.note ?? {})]),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(query);
      });
  }, [era, kind, lang, region, search]);

  const codeCount = visible.reduce((sum, offer) => sum + offer.codes.length, 0);

  async function onCopy(id: string, value: string) {
    await copyText(value);
    setCopied(id);
    window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
  }

  const eraLabels = {
    live: t.eraLive,
    all: t.eraAll,
    "2026": "2026",
    "2025": t.era2025,
    "2024": t.era2024,
    archive: t.eraArchive,
  } satisfies Record<EraFilter, string>;

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <a href="https://consolecheat.com/" className="flex min-w-0 items-center gap-3">
            <Mark />
            <span className="truncate font-display text-lg font-semibold tracking-tight">{t.brand}</span>
          </a>
          <div className="flex items-center gap-2">
            <a
              href="https://consolecheat.com/"
              className="inline-flex h-11 items-center rounded-lg border border-line bg-surface px-3 text-sm font-medium text-fg"
            >
              {t.hub}
            </a>
            <label className="sr-only" htmlFor="lang">
              {t.language}
            </label>
            <select
              id="lang"
              value={lang}
              onChange={(event) => {
                const next = event.target.value;
                if (!isLang(next)) return;
                setLang(next);
                applyLang(next);
              }}
              className="h-11 max-w-44 rounded-lg border border-line bg-surface px-2 text-sm text-fg"
            >
              {langs.map((id) => (
                <option key={id} value={id}>
                  {endonyms[id]}
                </option>
              ))}
            </select>
            <button
              type="button"
              aria-label={theme === "dark" ? t.themeLight : t.themeDark}
              onClick={() => {
                const next = theme === "dark" ? "light" : "dark";
                setTheme(next);
                applyTheme(next);
              }}
              className="inline-flex size-11 items-center justify-center rounded-lg border border-line bg-surface text-fg"
            >
              {theme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <p className="eyebrow text-xs font-medium uppercase text-steel">{t.eyebrow}</p>
        <h1 className="display-title mt-3 max-w-3xl font-display text-4xl font-semibold tracking-tight sm:text-6xl">
          {t.title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">{t.lede}</p>
        <p className="mt-6 panel rounded-xl px-4 py-4 text-base font-medium leading-relaxed text-fg">{t.freeClaim}</p>
        <p className="mt-4 text-sm text-subtle">{t.unofficial}</p>

        <section id="codes" className="mt-10 scroll-mt-28">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-tight">{t.codesHeading}</h2>
              <p className="mt-1 text-sm text-subtle">
                {codeCount} · {visible.length} {t.packs}
              </p>
            </div>
            <label className="sr-only" htmlFor="code-search">
              {t.searchLabel}
            </label>
            <input
              id="code-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t.searchPlaceholder}
              className="h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-fg outline-none placeholder:text-subtle sm:max-w-xs"
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t.codesHeading}>
              {(
                [
                  ["all", t.kindAll],
                  ["avatar", t.kindAvatar],
                  ["dlc", t.kindDlc],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={kind === id}
                  onClick={() => setKind(id)}
                  className={
                    "h-11 rounded-lg border px-4 text-sm font-medium " +
                    (kind === id ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-fg")
                  }
                >
                  {label}
                </button>
              ))}
            </div>
            <label className="sr-only" htmlFor="region">
              {t.regionAll}
            </label>
            <select
              id="region"
              value={region}
              onChange={(event) => setRegion(event.target.value as RegionFilter)}
              className="h-11 w-full rounded-lg border border-line bg-surface px-3 text-sm text-fg sm:w-52"
            >
              <option value="all">{t.regionAll}</option>
              {regionOrder.map((id) => (
                <option key={id} value={id}>
                  {t.regions[id]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={t.eraAll}>
            {(["live", "2025", "2024", "archive", "all"] as const).map((id) => (
              <button
                key={id}
                type="button"
                aria-pressed={era === id}
                onClick={() => setEra(id)}
                className={
                  "h-11 rounded-lg border px-4 text-sm font-medium " +
                  (era === id ? "border-accent bg-accent text-accent-fg" : "border-line bg-surface text-fg")
                }
              >
                {eraLabels[id]}
              </button>
            ))}
          </div>
          {search.trim() ? <p className="mt-3 text-sm text-subtle">{t.searchAll}</p> : null}
          {!search.trim() && era === "live" ? <p className="mt-3 text-sm text-subtle">{t.eraLiveHint}</p> : null}
          {!search.trim() && (era === "2025" || era === "2024") ? (
            <p className="mt-3 text-sm text-subtle">{t.eraOlder}</p>
          ) : null}
          {!search.trim() && era === "archive" ? <p className="mt-3 text-sm text-subtle">{t.eraDead}</p> : null}

          {visible.length === 0 ? (
            <p className="panel mt-4 rounded-xl px-5 py-8 text-muted">{t.empty}</p>
          ) : (
            <ul className="mt-4 grid gap-3">
              {visible.map((offer) => (
                <li key={offer.id}>
                  <OfferCard
                    offer={offer}
                    lang={lang}
                    t={t}
                    copied={copied}
                    onCopy={onCopy}
                  />
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="panel mt-10 rounded-xl p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="inline-flex size-11 items-center justify-center rounded-lg bg-raised text-steel">
              <Ticket className="size-5" />
            </span>
            <h2 className="font-display text-2xl font-semibold tracking-tight">{t.howTitle}</h2>
          </div>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{t.howBody}</p>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm leading-relaxed text-subtle sm:px-6">
          <p className="text-fg">{t.brand}</p>
          <p className="text-fg">{t.freeClaim}</p>
          <p>{t.footerNote}</p>
        </div>
      </footer>
    </div>
  );
}

function OfferCard({
  offer,
  lang,
  t,
  copied,
  onCopy,
}: {
  offer: Offer;
  lang: Lang;
  t: Ui;
  copied: string | null;
  onCopy: (id: string, value: string) => void;
}) {
  const shownWorks = offer.codes.every((code) => codeWorks(offer, code));
  const marker =
    offer.era === "2026" && offer.added >= "2026-09-01"
      ? t.fresh
      : !shownWorks
        ? t.uncertain
        : offer.era === "2026"
          ? null
          : t.older;
  const warn = marker === t.uncertain;
  return (
    <article className="panel rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-raised px-2 py-1 text-xs font-medium text-ok">{t.unlimited}</span>
        <span className="rounded-md bg-raised px-2 py-1 text-xs font-medium text-steel">
          {offer.kind === "avatar" ? t.avatar : t.dlc}
        </span>
        {marker ? (
          <span
            className={
              "rounded-md bg-raised px-2 py-1 text-xs font-medium " +
              (warn ? "text-warn" : "text-steel")
            }
          >
            {marker}
          </span>
        ) : null}
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{offer.title}</h3>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted">{offer.summary[lang]}</p>
      <p className="mt-3 text-sm text-subtle">
        {t.listed} {formatDate(offer.added, lang)}
        {offer.until ? ` · ${t.until} ${formatDate(offer.until, lang)}` : ""}
        {offer.source ? (
          <>
            {" · "}
            {t.source}{" "}
            <a href={offer.source.url} className="text-steel underline-offset-4 hover:underline">
              {offer.source.name}
            </a>
          </>
        ) : null}
      </p>
      {offer.images?.length ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={offer.title}>
          {offer.images.map((src) => (
            <li key={src}>
              <img
                src={src}
                alt=""
                width={72}
                height={72}
                className="size-[4.5rem] rounded-lg border border-line bg-bg object-cover"
              />
            </li>
          ))}
        </ul>
      ) : null}
      <ul className="mt-4 grid gap-2">
        {offer.codes.map((code) => {
          const id = `${offer.id}-${code.code}`;
          const done = copied === id;
          return (
            <li
              key={id}
              className="flex flex-col gap-3 rounded-lg bg-raised px-3 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase text-subtle">{t.regions[code.region]}</p>
                <p className="mt-1 font-mono text-lg tracking-wide text-fg">{code.code}</p>
                {code.note ? <p className="mt-1 text-sm text-muted">{code.note[lang]}</p> : null}
              </div>
              <button
                type="button"
                onClick={() => onCopy(id, code.code)}
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg border border-line bg-surface px-4 text-sm font-medium text-fg"
              >
                {done ? <Check className="size-4 text-ok" /> : <Copy className="size-4 text-steel" />}
                {done ? t.copied : t.copy}
              </button>
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-9 shrink-0" aria-hidden="true">
      <rect width="32" height="32" rx="8" className="fill-raised" />
      <circle cx="16" cy="12" r="5" className="fill-steel" />
      <path d="M7 27c1.4-6 4.5-8.4 9-8.4S23.6 21 25 27H7z" className="fill-fg" />
    </svg>
  );
}
