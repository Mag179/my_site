const { useState, useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/ {
  theme: "cream",
  accent: "sage",
  density: "comfortable",
  showClock: true,
}; /*EDITMODE-END*/

const ACCENT_OPTIONS = [
  { value: "sage", color: "#8aa68a", label: "セージ" },
  { value: "peach", color: "#d8a48a", label: "ピーチ" },
  { value: "sky", color: "#8aaac0", label: "スカイ" },
  { value: "rose", color: "#c89aa0", label: "ローズ" },
];

function useTime() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function fmtIshikawa(d) {
  try {
    return new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Ishikawa",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(d);
  } catch {
    return d.toTimeString().slice(0, 5);
  }
}

function Pill({ children }) {
  return <span className="pill">{children}</span>;
}

function SectionHead({ title, sub }) {
  return (
    <header className="sec-head">
      <h2>{title}</h2>
      {sub && <span className="sec-sub">{sub}</span>}
    </header>
  );
}

function LinkCard({ label, value, note, href, external, disabled = false }) {
  const cardClassName = `link-card${disabled ? " is-disabled" : ""}`;

  if (disabled) {
    return (
      <div className={cardClassName} aria-disabled="true">
        <div className="link-card-top">
          <span className="link-card-label">{label}</span>
          <span className="link-card-arrow" aria-hidden="true">
            →
          </span>
        </div>
        <div className="link-card-value">{value}</div>
        {note && <div className="link-card-note">{note}</div>}
      </div>
    );
  }

  return (
    <a
      className={cardClassName}
      href={href}
      target={external ? "_blank" : undefined}
      rel="noreferrer"
    >
      <div className="link-card-top">
        <span className="link-card-label">{label}</span>
        <span className="link-card-arrow" aria-hidden="true">
          →
        </span>
      </div>
      <div className="link-card-value">{value}</div>
      {note && <div className="link-card-note">{note}</div>}
    </a>
  );
}

function App() {
  const [t, setT] = useState(TWEAK_DEFAULTS);
  const setTweak = (key, value) => {
    if (typeof key === "object") {
      setT((prev) => ({ ...prev, ...key }));
      window.parent?.postMessage(
        { type: "__edit_mode_set_keys", edits: key },
        "*",
      );
    } else {
      setT((prev) => ({ ...prev, [key]: value }));
      window.parent?.postMessage(
        { type: "__edit_mode_set_keys", edits: { [key]: value } },
        "*",
      );
    }
  };

  const [editOpen, setEditOpen] = useState(false);
  useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === "__activate_edit_mode") setEditOpen(true);
      if (d.type === "__deactivate_edit_mode") setEditOpen(false);
    };
    window.addEventListener("message", onMsg);
    window.parent?.postMessage({ type: "__edit_mode_available" }, "*");
    return () => window.removeEventListener("message", onMsg);
  }, []);

  const now = useTime();

  const skills = [
    {
      title: "フロントエンド",
      note: "見た目と触り心地",
      items: ["React", "Next.js", "TypeScript", "TailwindCSS"],
    },
    {
      title: "バックエンド",
      note: "ロジックとデータ",
      items: ["Node.js", "Go", "Prisma", "MySQL"],
    },
    {
      title: "インフラ",
      note: "土台づくり",
      items: ["AWS", "Docker", "Nginx", "Cloudflare", "Linux"],
    },
  ];

  const cssVars = {
    "--gap-y":
      t.density === "compact"
        ? "4.5rem"
        : t.density === "spacious"
          ? "8.5rem"
          : "6.5rem",
  };

  return (
    <div
      className={`page theme-${t.theme} accent-${t.accent}`}
      style={cssVars}
      data-screen-label="Portfolio"
    >
      <div className="bg-blob bg-blob-1" aria-hidden="true" />
      <div className="bg-blob bg-blob-2" aria-hidden="true" />

      <nav className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  fill="currentColor"
                  opacity="0.18"
                />
                <circle cx="12" cy="12" r="4.5" fill="currentColor" />
              </svg>
            </span>
            <span className="brand-name">宮崎 真之介</span>
          </div>
          <div className="topbar-right">
            {t.showClock && (
              <span className="clock">
                <span className="clock-loc">石川県 / Ishikawa</span>
                <span className="clock-time">{fmtIshikawa(now)}</span>
              </span>
            )}
            <button
              className="theme-btn"
              onClick={() =>
                setTweak("theme", t.theme === "night" ? "cream" : "night")
              }
              aria-label="テーマ切り替え"
              title={t.theme === "night" ? "ライトに切替" : "ダークに切替"}
            >
              <span>{t.theme === "night" ? "☀" : "☾"}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="col">
        {/* HERO */}
        <section className="hero" data-screen-label="Hero">
          <h1 className="hero-name">
            宮崎 <span className="hero-name-given">進之介</span>
            <span className="hero-name-en">Shinnosuke Miyazaki</span>
          </h1>
          <p className="hero-role">ソフトウェアエンジニア</p>
          <div className="hero-tags">
            <Pill>フロントエンド</Pill>
            <Pill>バックエンド</Pill>
            <Pill>インフラ</Pill>
          </div>
          <p className="hero-bio">
            フロントエンドからバックエンドまで、幅広く開発しています。
            <br />
            気持ちよく使えるプロダクトを、丁寧につくることが好きです。
            <br />
            石川県を拠点に、国内外のチームとお仕事しています。
          </p>
          <div className="hero-meta">
            <div className="meta-row">
              <span className="meta-key">所在地</span>
              <span className="meta-val">石川県 / Ishikawa</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">仕事</span>
              <span className="meta-val">Web プロダクトをつくっています</span>
            </div>
            <div className="meta-row">
              <span className="meta-key">言語</span>
              <span className="meta-val">日本語</span>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="sec" data-screen-label="Skills">
          <SectionHead title="できること" sub="Skills" />
          <div className="skills">
            {skills.map((g) => (
              <div className="skill-group" key={g.title}>
                <div className="skill-group-head">
                  <h3>{g.title}</h3>
                  <span className="skill-group-note">— {g.note}</span>
                </div>
                <div className="pills">
                  {g.items.map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section className="sec" data-screen-label="Projects">
          <SectionHead title="つくったもの" sub="Projects" />
          <div className="empty-card">
            <div className="empty-illust" aria-hidden="true">
              <svg viewBox="0 0 120 80" width="120" height="80">
                <rect
                  x="6"
                  y="14"
                  width="108"
                  height="60"
                  rx="10"
                  fill="currentColor"
                  opacity="0.08"
                />
                <rect
                  x="14"
                  y="22"
                  width="44"
                  height="6"
                  rx="3"
                  fill="currentColor"
                  opacity="0.25"
                />
                <rect
                  x="14"
                  y="34"
                  width="92"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.15"
                />
                <rect
                  x="14"
                  y="42"
                  width="78"
                  height="4"
                  rx="2"
                  fill="currentColor"
                  opacity="0.15"
                />
                <rect
                  x="14"
                  y="56"
                  width="30"
                  height="10"
                  rx="5"
                  fill="currentColor"
                  opacity="0.20"
                />
                <circle
                  cx="98"
                  cy="22"
                  r="3"
                  fill="currentColor"
                  opacity="0.30"
                />
                <circle
                  cx="88"
                  cy="22"
                  r="3"
                  fill="currentColor"
                  opacity="0.20"
                />
              </svg>
            </div>
            <div className="empty-title">準備中です</div>
          </div>
        </section>

        {/* LINKS */}
        <section className="sec" data-screen-label="Links">
          <SectionHead title="連絡先" sub="Links" />
          <div className="links">
            <LinkCard
              label="GitHub"
              value="@Mag179"
              note="コードはこちらに"
              href="https://github.com/Mag179"
              external
            />
            <LinkCard
              label="お問い合わせ"
              value="shinnosuke@miyazaki.uk"
              note="お気軽にどうぞ"
              href="mailto:shinnosuke@miyazaki.uk"
            />
          </div>
        </section>

        <footer className="foot">
          <span>© 2026 宮崎 真之介</span>
          <span className="foot-sub">
            読んでくださってありがとうございました。
          </span>
        </footer>
      </main>

      {editOpen && (
        <TweaksPanel
          title="Tweaks"
          onClose={() => {
            setEditOpen(false);
            window.parent?.postMessage({ type: "__edit_mode_dismissed" }, "*");
          }}
        >
          <TweakSection title="見た目">
            <TweakRadio
              label="テーマ"
              value={t.theme}
              onChange={(v) => setTweak("theme", v)}
              options={[
                { value: "cream", label: "クリーム" },
                { value: "night", label: "ナイト" },
              ]}
            />
            <TweakRadio
              label="アクセント"
              value={t.accent}
              onChange={(v) => setTweak("accent", v)}
              options={ACCENT_OPTIONS.map((o) => ({
                value: o.value,
                label: o.label,
              }))}
            />
            <TweakSelect
              label="ゆとり"
              value={t.density}
              onChange={(v) => setTweak("density", v)}
              options={[
                { value: "compact", label: "つめて" },
                { value: "comfortable", label: "ちょうどよく" },
                { value: "spacious", label: "ゆったり" },
              ]}
            />
          </TweakSection>
          <TweakSection title="表示">
            <TweakToggle
              label="東京の時計"
              value={t.showClock}
              onChange={(v) => setTweak("showClock", v)}
            />
          </TweakSection>
        </TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
