import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Check, Copy, Moon, Sun, Ticket } from "lucide-react";
import { offers, regionOrder, type Lang, type Offer, type RegionId } from "@/data/codes";
import { subscribeEmail, unsubscribeEmail } from "@/lib/subscribers.functions";

type KindFilter = "all" | "avatar" | "dlc";
type RegionFilter = "all" | RegionId;
type Notice = "saved" | "already" | "removed" | "missing" | "bad" | "fail" | null;

const MAIL_KEY = "consolecheat-codes-mail";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ui = {
  de: {
    brand: "consolecheat",
    hub: "Hub",
    language: "Sprache",
    themeLight: "Hell",
    themeDark: "Dunkel",
    eyebrow: "PSN-Codes · Unlimited",
    title: "Codes, die jeder einlösen kann.",
    lede: "Mehrfach nutzbare PlayStation-Codes für Avatare und kostenlose DLCs. Kein Shop, keine Banner, nichts Abgelaufenes.",
    freeClaim: "Komplett kostenlos. Auf dieser Seite kostet nichts Geld und es gibt keine Werbung.",
    mailClaim: "Die Adresse wird nur gespeichert, um neue Codes zu schicken. Kein Verkauf, keine Werbe-Mails.",
    unofficial: "Inoffiziell. Nicht von Sony. Der Code muss zur Region des PSN-Kontos passen.",
    notifyKicker: "Nur neue Codes",
    notifyTitle: "Mail, wenn etwas dazukommt",
    notifyBody: "Kein Newsletter. Keine Angebote. Eine Mail nur, wenn ein neuer Unlimited-Code auf der Liste steht.",
    emailLabel: "E-Mail",
    emailPlaceholder: "name@mail.com",
    subscribe: "Eintragen",
    unsubscribe: "Austragen",
    saving: "Speichert …",
    saved: "Eingetragen. Es kommt nur eine Mail zu neuen Codes.",
    already: "Diese Adresse ist schon eingetragen.",
    removed: "Ausgetragen. Es kommt keine Mail mehr.",
    missing: "Diese Adresse stand nicht auf der Liste.",
    bad: "Die Adresse sieht nicht gültig aus.",
    fail: "Speichern ging gerade nicht. Versuch es noch einmal.",
    codesHeading: "Aktive Codes",
    searchLabel: "Suche",
    searchPlaceholder: "Spiel oder Code",
    kindAll: "Alle",
    kindAvatar: "Avatare",
    kindDlc: "Gratis-DLC",
    regionAll: "Alle Regionen",
    empty: "Dazu liegt gerade kein Unlimited-Code vor. Einmal-Codes und Abgelaufenes stehen hier nicht.",
    copy: "Kopieren",
    copied: "Kopiert",
    until: "Bis",
    listed: "Stand",
    source: "Quelle",
    howTitle: "Einlösen",
    howBody:
      "PS5: PlayStation Store, die drei Punkte, Code einlösen. PS4: Store, links Codes einlösen. Die Website und die PlayStation-App gehen auch. Eine falsche Region wird abgelehnt, der Code bleibt für andere gültig.",
    unlimited: "Unlimited",
    fresh: "Neu",
    avatar: "Avatar",
    dlc: "DLC",
    packs: "Pakete",
    footerNote: "Bezahlt wird nirgends auf dieser Seite. Sie ist nicht Sony.",
    regions: {
      americas: "Amerika",
      europe: "Europa",
      japan: "Japan",
      korea: "Korea",
      asia: "Asien",
      unknown: "Region offen",
    } satisfies Record<RegionId, string>,
  },
  en: {
    brand: "consolecheat",
    hub: "Hub",
    language: "Language",
    themeLight: "Light",
    themeDark: "Dark",
    eyebrow: "PSN codes · unlimited",
    title: "Codes anyone can redeem.",
    lede: "Multi-use PlayStation codes for avatars and free DLC. No shop, no banners, nothing expired.",
    freeClaim: "Completely free. Nothing on this page costs money, and there are no ads.",
    mailClaim: "The address is stored only to send new codes. It is not sold, and there is no promo mail.",
    unofficial: "Unofficial. Not Sony. The code has to match the PSN account region.",
    notifyKicker: "New codes only",
    notifyTitle: "Mail when something new lands",
    notifyBody: "Not a newsletter. No offers. One mail only when a new unlimited code is added.",
    emailLabel: "Email",
    emailPlaceholder: "name@mail.com",
    subscribe: "Subscribe",
    unsubscribe: "Remove",
    saving: "Saving …",
    saved: "Saved. Mail only when a new code is added.",
    already: "This address is already on the list.",
    removed: "Removed. No further mail.",
    missing: "This address was not on the list.",
    bad: "That address does not look valid.",
    fail: "Saving failed just now. Try again.",
    codesHeading: "Active codes",
    searchLabel: "Search",
    searchPlaceholder: "Game or code",
    kindAll: "All",
    kindAvatar: "Avatars",
    kindDlc: "Free DLC",
    regionAll: "All regions",
    empty: "No unlimited code for that yet. Single-use and expired codes stay off this page.",
    copy: "Copy",
    copied: "Copied",
    until: "Until",
    listed: "Listed",
    source: "Source",
    howTitle: "Redeem",
    howBody:
      "PS5: PlayStation Store, the three dots, Redeem Code. PS4: Store, Redeem Codes in the sidebar. The website and the PlayStation app work too. A wrong region is rejected and the code stays valid for everyone else.",
    unlimited: "Unlimited",
    fresh: "New",
    avatar: "Avatar",
    dlc: "DLC",
    packs: "packs",
    footerNote: "Nothing is paid for on this page. It is not Sony.",
    regions: {
      americas: "Americas",
      europe: "Europe",
      japan: "Japan",
      korea: "Korea",
      asia: "Asia",
      unknown: "Region open",
    } satisfies Record<RegionId, string>,
  },
} as const;

function formatDate(iso: string, lang: Lang) {
  const [year, month, day] = iso.split("-");
  if (!year || !month || !day) return iso;
  if (lang === "de") return `${day}.${month}.${year}`;
  return `${Number(day)} ${months[Number(month) - 1]} ${year}`;
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
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [notice, setNotice] = useState<Notice>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    const storedLang = localStorage.getItem("consolecheat-lang");
    const nextLang: Lang = storedLang === "en" ? "en" : "de";
    setLang(nextLang);
    applyLang(nextLang);
    const nextTheme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(nextTheme);
    const storedMail = localStorage.getItem(MAIL_KEY);
    if (storedMail) {
      setEmail(storedMail);
      setNotice("saved");
    }
  }, []);

  const t = ui[lang];

  const visible = useMemo(() => {
    const query = search.trim().toLowerCase();
    return offers
      .filter((offer) => kind === "all" || offer.kind === kind)
      .map((offer) => ({
        ...offer,
        codes: offer.codes.filter((code) => region === "all" || code.region === region),
      }))
      .filter((offer) => offer.codes.length > 0)
      .filter((offer) => {
        if (!query) return true;
        const blob = [
          offer.title,
          offer.summary[lang],
          ...offer.codes.flatMap((code) => [code.code, code.note?.[lang] ?? ""]),
        ]
          .join(" ")
          .toLowerCase();
        return blob.includes(query);
      });
  }, [kind, lang, region, search]);

  const codeCount = visible.reduce((sum, offer) => sum + offer.codes.length, 0);

  async function onCopy(id: string, value: string) {
    await copyText(value);
    setCopied(id);
    window.setTimeout(() => setCopied((current) => (current === id ? null : current)), 1600);
  }

  async function onSubscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const trap = form.elements.namedItem("company");
    const company = trap instanceof HTMLInputElement ? trap.value : "";
    setBusy(true);
    setNotice(null);
    try {
      const result = await subscribeEmail({ data: { email, company } });
      setNotice(result.status);
      if (result.status === "saved" || result.status === "already") {
        localStorage.setItem(MAIL_KEY, email.trim().toLowerCase());
      }
    } catch (error) {
      setNotice(error instanceof Error && error.message === "email" ? "bad" : "fail");
    } finally {
      setBusy(false);
    }
  }

  async function onUnsubscribe() {
    setBusy(true);
    setNotice(null);
    try {
      const result = await unsubscribeEmail({ data: { email, company: "" } });
      if (result.removed) {
        localStorage.removeItem(MAIL_KEY);
        setNotice("removed");
      } else {
        setNotice("missing");
      }
    } catch (error) {
      setNotice(error instanceof Error && error.message === "email" ? "bad" : "fail");
    } finally {
      setBusy(false);
    }
  }

  const noticeText =
    notice === "saved"
      ? t.saved
      : notice === "already"
        ? t.already
        : notice === "removed"
          ? t.removed
          : notice === "missing"
            ? t.missing
            : notice === "bad"
              ? t.bad
              : notice === "fail"
                ? t.fail
                : null;

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
                const next: Lang = event.target.value === "en" ? "en" : "de";
                setLang(next);
                applyLang(next);
              }}
              className="h-11 w-28 rounded-lg border border-line bg-surface px-2 text-sm text-fg sm:w-36"
            >
              <option value="de">Deutsch</option>
              <option value="en">English</option>
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
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <p className="panel rounded-xl px-4 py-4 text-base font-medium leading-relaxed text-fg">{t.freeClaim}</p>
          <p className="panel rounded-xl px-4 py-4 text-base font-medium leading-relaxed text-fg">{t.mailClaim}</p>
        </div>
        <p className="mt-4 text-sm text-subtle">{t.unofficial}</p>

        <section id="notify" className="panel mt-10 scroll-mt-28 rounded-xl p-5 sm:p-6">
          <p className="eyebrow text-xs font-medium uppercase text-steel">{t.notifyKicker}</p>
          <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight">{t.notifyTitle}</h2>
          <p className="mt-2 max-w-2xl leading-relaxed text-muted">{t.notifyBody}</p>
          <form className="mt-5 flex flex-col gap-2 sm:flex-row" noValidate onSubmit={onSubscribe}>
            <label className="sr-only" htmlFor="notify-email">
              {t.emailLabel}
            </label>
            <input
              id="notify-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              autoCorrect="off"
              spellCheck={false}
              required
              value={email}
              placeholder={t.emailPlaceholder}
              onChange={(event) => {
                setEmail(event.target.value);
                if (notice === "bad" || notice === "fail") setNotice(null);
              }}
              className="h-11 min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 text-fg outline-none placeholder:text-subtle"
            />
            <input name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" className="sr-only" />
            <button
              type="submit"
              disabled={busy}
              className="h-11 shrink-0 rounded-lg bg-accent px-4 font-medium text-accent-fg disabled:opacity-60"
            >
              {busy ? t.saving : t.subscribe}
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={onUnsubscribe}
              className="h-11 shrink-0 rounded-lg border border-line bg-surface px-4 font-medium text-fg disabled:opacity-60"
            >
              {t.unsubscribe}
            </button>
          </form>
          <p
            className={notice === "bad" || notice === "fail" ? "mt-3 text-sm text-bad" : "mt-3 text-sm text-subtle"}
            role="status"
          >
            {noticeText ?? t.mailClaim}
          </p>
        </section>

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
          <p>{t.mailClaim}</p>
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
  t: (typeof ui)[Lang];
  copied: string | null;
  onCopy: (id: string, value: string) => void;
}) {
  const fresh = offer.added >= "2026-09-01";
  return (
    <article className="panel rounded-xl p-5 sm:p-6">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-md bg-raised px-2 py-1 text-xs font-medium text-ok">{t.unlimited}</span>
        <span className="rounded-md bg-raised px-2 py-1 text-xs font-medium text-steel">
          {offer.kind === "avatar" ? t.avatar : t.dlc}
        </span>
        {fresh ? <span className="rounded-md bg-raised px-2 py-1 text-xs font-medium text-warn">{t.fresh}</span> : null}
      </div>
      <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">{offer.title}</h3>
      <p className="mt-2 max-w-3xl leading-relaxed text-muted">{offer.summary[lang]}</p>
      <p className="mt-3 text-sm text-subtle">
        {t.listed} {formatDate(offer.added, lang)}
        {offer.until ? ` · ${t.until} ${formatDate(offer.until, lang)}` : ""}
        {" · "}
        {t.source}{" "}
        <a href={offer.source.url} className="text-steel underline-offset-4 hover:underline">
          {offer.source.name}
        </a>
      </p>
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
