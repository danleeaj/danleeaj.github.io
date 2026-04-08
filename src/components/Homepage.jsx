import { useState, useEffect, useRef } from "react";

const PAGES = { HOME: "home", DEV: "dev", MUS: "mus", BIO: "bio" };

function Toggle({ title, subtitle, tag, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`toggle-block${open ? " open" : ""}`}>
      <div className="toggle-header" onClick={() => setOpen(!open)}>
        <span className="toggle-caret">▶</span>
        <span className="toggle-title">
          <strong>{title}</strong> <span className="tag">{tag}</span>
          <br /><span style={{ color: "var(--text-secondary)", fontSize: "0.85rem" }}>{subtitle}</span>
        </span>
      </div>
      {open && <div className="toggle-body" style={{ display: "block" }}>{children}</div>}
    </div>
  );
}

function Topbar({ section, onBack }) {
  return (
    <>
      <nav className="topbar">
        <div className="topbar-inner">
          <a href="#" className="breadcrumb-link" onClick={e => { e.preventDefault(); onBack(); }}>anjie</a>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{section}</span>
        </div>
      </nav>
      <a href="#" className="back-arrow" aria-label="Back to home" onClick={e => { e.preventDefault(); onBack(); }}>‹</a>
    </>
  );
}

function DevPage({ onBack }) {
  return (
    <div className="subpage-shell slide-in-anim">
      <Topbar section="developer" onBack={onBack} />
      <div className="page">
        <span className="subpage-cover">💻</span>
        <h1 className="subpage-title">i'm a developer!</h1>
        <p className="subpage-desc">
          I'm currently pursuing a master's program at the University of Pennsylvania (MCIT). My journey started building little side projects as an undergrad and now I hope it becomes a full-time, rest-of-my-life, put-a-ring-on-it kind of thing.
        </p>
        <p className="section-heading">Projects</p>
        <div className="project-list">
          <a href="https://github.com/danleeaj/musicboxd" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">Musicboxd</span>
            <span className="project-desc">Letterboxd, but for music — log, rate, and review albums</span>
          </a>
          <a href="https://github.com/danleeaj/subs" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">Subs</span>
            <span className="project-desc">Desktop app for video transcription and subtitle translation</span>
          </a>
          <a href="https://summate-ai.streamlit.app/" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">Summate AI</span>
            <span className="project-desc">Multi-agent debate framework for grading — 64% to 90% accuracy</span>
          </a>
          <a href="https://github.com/danleeaj/feynman" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">Feynman</span>
            <span className="project-desc">Multimodal AI tutoring platform — built at HackPrinceton 2025</span>
          </a>
          <a href="https://github.com/danleeaj/flow-ai" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">Flow AI</span>
            <span className="project-desc">Privacy-first Chrome extension using on-device Gemini Nano</span>
          </a>
          <a href="https://pypi.org/project/copyrepo/" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">CopyRepo</span>
            <span className="project-desc">CLI tool to copy repo contents to clipboard — published on PyPI</span>
          </a>
          <a href="https://github.com/danleeaj/d_wordle.py" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">d_wordle.py</span>
            <span className="project-desc">Terminal-based Wordle clone with save/resume and difficulty levels</span>
          </a>
          <a href="https://github.com/danleeaj/danleeaj.github.io" target="_blank" rel="noopener" className="project-item">
            <span className="project-name">this site</span>
            <span className="project-desc">The page you're looking at right now</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function MusCard({ title, subtitle, tag, children, index }) {
  return (
    <div className="mus-card" style={{ animationDelay: `${index * 0.08}s` }}>
      <div className="mus-card-header">
        <div className="mus-card-info">
          <span className="mus-card-title">{title}</span>
          <span className="mus-card-subtitle">{subtitle}</span>
        </div>
        <span className="tag">{tag}</span>
      </div>
      <div className="mus-card-embed">{children}</div>
    </div>
  );
}

function MusPage({ onBack }) {
  return (
    <div className="subpage-shell slide-in-anim">
      <Topbar section="music" onBack={onBack} />
      <div className="page">
        <span className="subpage-cover">🎵</span>
        <h1 className="subpage-title">singer-songwriter &amp; producer</h1>
        <p className="subpage-desc">
          based in suzhou / singapore / san diego — i've been making music for the past 8 years. when i started college during the pandemic i thought, let's actually produce these songs and release them. so that's what i did. curated songs on{" "}
          <a href="https://open.spotify.com/artist/0f6uqts7zv87P3xQbF2HMu" target="_blank" rel="noopener">spotify</a>, full collection on{" "}
          <a href="https://anjie.bandcamp.com/" target="_blank" rel="noopener">bandcamp</a>.
        </p>
        <p className="section-heading">Discography</p>
        <div className="mus-grid">
          <MusCard title="坐车去海边" subtitle="a song about traveling the world" tag="suzhou" index={0}>
            <iframe style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/track/31UWx5Z5b6inZCL0EJ6ucy?utm_source=generator&theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </MusCard>
          <MusCard title="一世纪相爱" subtitle="first single off my upcoming album" tag="for the centuries" index={1}>
            <iframe style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/track/2KdBl3cDs1zK0agPLXM9xu?utm_source=generator&theme=0" width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </MusCard>
          <MusCard title="有一个地方" subtitle="my first ever album" tag="there was a place" index={2}>
            <iframe style={{ border: 0, width: "100%", height: 439, borderRadius: 12 }} src="https://bandcamp.com/EmbeddedPlayer/album=3545554598/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/" seamless />
          </MusCard>
        </div>
      </div>
    </div>
  );
}

function BioPage({ onBack }) {
  return (
    <div className="subpage-shell slide-in-anim">
      <Topbar section="neuroscience" onBack={onBack} />
      <div className="page">
        <span className="subpage-cover">🧬</span>
        <h1 className="subpage-title">i was a researcher!</h1>
        <p className="subpage-desc">
          I currently hold a <strong>M.S., Biology</strong> and <strong>B.S., Neurobiology</strong> from <b><em>University of California, San Diego</em></b>. During my time at UCSD, I did research with Dr. Aksinya Derevyanko under the mentorship of Dr. Nicola Allen at the Salk Institute. My thesis will be available{" "}
          <a href="https://www.proquest.com/docview/3226851826" target="_blank" rel="noopener">here</a> once the embargo is lifted.
          <br /><br />
          During this period, I explored the potential of machine learning and computer vision in counting and identifying cells in immunohistochemical images in the context of Alzheimer's disease in mice.
        </p>

      </div>
    </div>
  );
}

function HomePage({ onNavigate }) {
  const [hoveredRole, setHoveredRole] = useState(null);
  const roles = [
    { key: PAGES.DEV, icon: "💻", label: "developer" },
    { key: PAGES.MUS, icon: "🎵", label: "singer-songwriter & producer" },
    { key: PAGES.BIO, icon: "🧬", label: "neuroscience researcher" },
  ];
  return (
    <div className="landing">
      <div className="landing-content">
        <h1 className="landing-title">hellooo, i'm anjie</h1>
        <p className="landing-subtitle">
          <b className="daniel-hover">daniel</b> also works! and i'm a{" "}
          <span className={`role-ellipsis${hoveredRole ? " active" : ""}`}>
            {hoveredRole || "..."}
          </span>
        </p>
        <div className="role-list">
          {roles.map(r => (
            <a
              key={r.key}
              href="#"
              className="role-link"
              onMouseEnter={() => setHoveredRole(r.label)}
              onMouseLeave={() => setHoveredRole(null)}
              onClick={e => { e.preventDefault(); onNavigate(r.key); }}
            >
              <span className="role-link-icon">{r.icon}</span>
              <span className="role-link-text">{r.label}</span>
              <span className="role-link-arrow">›</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState(PAGES.HOME);
  const [transitioning, setTransitioning] = useState(false);

  const navigate = (p) => {
    setPage(p);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    setPage(PAGES.HOME);
    window.scrollTo(0, 0);
  };

  return (
    <div className="app-root">
      <style>{CSS_TEXT}</style>
      {page === PAGES.HOME && <HomePage onNavigate={navigate} />}
      {page === PAGES.DEV && <DevPage onBack={goBack} />}
      {page === PAGES.MUS && <MusPage onBack={goBack} />}
      {page === PAGES.BIO && <BioPage onBack={goBack} />}
    </div>
  );
}

const CSS_TEXT = `
*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
:root {
  --bg:#ffffff; --bg-hover:#f7f7f5; --bg-tag:#f1f1ef;
  --text:#37352f; --text-secondary:#787774; --text-light:#9b9a97;
  --accent:#37352f; --link:#2383e2; --border:#e3e2de; --border-light:#ebebea;
  --font-sans:-apple-system,BlinkMacSystemFont,'Segoe UI','Noto Sans',Helvetica,Arial,sans-serif;
  --font-mono:'SFMono-Regular',Menlo,Consolas,'PT Mono','Liberation Mono',Courier,monospace;
  --font-serif:Lyon-Text,Georgia,ui-serif,serif;
  --page-width:720px;
}
.app-root { font-family:var(--font-sans); color:var(--text); background:var(--bg); line-height:1.5; -webkit-font-smoothing:antialiased; height:100%; }
a { color:var(--text); text-decoration:underline; text-decoration-color:var(--border); text-underline-offset:2px; transition:text-decoration-color .15s ease; }
a:hover { text-decoration-color:var(--text); }
::selection { background:rgba(35,131,226,.15); }
.page { max-width:var(--page-width); margin:0 auto; padding:0 1.5rem; }
.landing { height:100%; display:flex; align-items:center; justify-content:center; overflow:hidden; }
.landing-content { padding:4rem 0; width:100%; max-width:var(--page-width); padding-left:1.5rem; padding-right:1.5rem; }
.landing-title { font-size:2.5rem; font-weight:700; letter-spacing:-0.03em; line-height:1.2; margin-bottom:.25rem; }
.landing-subtitle { font-size:1rem; color:var(--text-secondary); margin-bottom:2.5rem; }
.daniel-hover { display:inline-block; cursor:default; transition:transform .2s ease; }
.daniel-hover:hover { animation:daniel-wave .5s ease; }
@keyframes daniel-wave { 0%{transform:rotate(0)} 25%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} 75%{transform:rotate(-2deg)} 100%{transform:rotate(0)} }
.role-ellipsis { transition:color .2s ease; }
.role-ellipsis.active { color:var(--text); font-weight:600; }
.role-list { display:flex; flex-direction:column; gap:1px; background:var(--border-light); border-radius:8px; overflow:hidden; }
.role-link { display:flex; align-items:center; gap:.75rem; padding:.75rem 1rem; background:var(--bg); text-decoration:none; color:var(--text); transition:background .1s ease; }
.role-link:hover { background:var(--bg-hover); text-decoration:none; }
.role-link-icon { font-size:1.25rem; width:1.75rem; text-align:center; flex-shrink:0; }
.role-link-text { flex:1; font-size:.95rem; }
.role-link-arrow { color:var(--text-light); font-size:.8rem; opacity:0; transition:opacity .15s ease; }
.role-link:hover .role-link-arrow { opacity:1; }

/* Subpage */
.subpage-shell { min-height:100vh; }
@keyframes slideInRight { from{transform:translateX(60px);opacity:0} to{transform:translateX(0);opacity:1} }
.slide-in-anim { animation:slideInRight .35s ease-out both; }
.topbar { position:sticky; top:0; z-index:50; background:rgba(255,255,255,.95); backdrop-filter:blur(8px); border-bottom:1px solid var(--border-light); padding:.6rem 1.5rem; }
.topbar-inner { max-width:var(--page-width); margin:0 auto; display:flex; align-items:center; gap:.5rem; }
.breadcrumb-link { font-size:.8rem; color:var(--text-light); text-decoration:none; }
.breadcrumb-link:hover { color:var(--text); text-decoration:none; }
.breadcrumb-sep { font-size:.75rem; color:var(--text-light); }
.breadcrumb-current { font-size:.8rem; color:var(--text-secondary); }
.subpage-cover { font-size:4rem; margin-bottom:.75rem; display:block; margin-top:5rem; }
.subpage-title { font-size:2.25rem; font-weight:700; letter-spacing:-0.03em; margin-bottom:.25rem; }
.subpage-desc { font-size:.95rem; color:var(--text-secondary); line-height:1.7; margin-bottom:2.5rem; }
.subpage-desc a { color:var(--link); text-decoration:underline; text-decoration-color:rgba(35,131,226,.4); }
.subpage-desc a:hover { text-decoration-color:var(--link); }
.section-heading { font-size:.75rem; font-weight:600; text-transform:uppercase; letter-spacing:.08em; color:var(--text-light); margin-bottom:.75rem; padding-bottom:.5rem; border-bottom:1px solid var(--border-light); }
.back-arrow { position:fixed; left:1.25rem; top:50%; transform:translateY(-50%); z-index:100; font-size:2rem; color:var(--text-light); text-decoration:none; width:2.5rem; height:2.5rem; display:flex; align-items:center; justify-content:center; border-radius:50%; transition:background .15s ease,color .15s ease; }
.back-arrow:hover { background:var(--bg-hover); color:var(--text); text-decoration:none; }

/* Table */
.db-table { width:100%; border-collapse:collapse; margin-bottom:2.5rem; font-size:.9rem; }
.db-table th { text-align:left; font-weight:500; font-size:.75rem; text-transform:uppercase; letter-spacing:.05em; color:var(--text-light); padding:.5rem .75rem; border-bottom:1px solid var(--border); white-space:nowrap; }
.db-table td { padding:.6rem .75rem; border-bottom:1px solid var(--border-light); vertical-align:top; color:var(--text); }
.db-table tr:hover td { background:var(--bg-hover); }
.db-table tr:last-child td { border-bottom:none; }

/* Tags */
.tag { display:inline-block; font-size:.75rem; padding:.1rem .5rem; background:var(--bg-tag); border-radius:3px; color:var(--text-secondary); white-space:nowrap; }
.tag-blue { background:rgba(35,131,226,.1); color:#2383e2; }
.tag-green { background:rgba(15,123,108,.1); color:#0f7b6c; }
.tag-purple { background:rgba(103,36,222,.1); color:#6724de; }
.tag-orange { background:rgba(217,115,13,.1); color:#d9730d; }

/* Bullet list */
.bullet-list { list-style:none; padding:0; margin:0; }
.bullet-list li { position:relative; padding-left:1.5rem; margin-bottom:.25rem; font-size:.9rem; color:var(--text); line-height:1.6; }
.bullet-list li::before { content:'•'; position:absolute; left:.25rem; color:var(--text-secondary); }

/* Toggle */
.toggle-list { display:flex; flex-direction:column; }
.toggle-block { border-bottom:1px solid var(--border-light); }
.toggle-block:last-child { border-bottom:none; }
.toggle-header { display:flex; align-items:flex-start; gap:.25rem; padding:.6rem 0; cursor:pointer; user-select:none; }
.toggle-caret { width:1.5rem; height:1.5rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--text-light); font-size:.7rem; transition:transform .15s ease; border-radius:3px; }
.toggle-caret:hover { background:var(--bg-hover); }
.toggle-block.open .toggle-caret { transform:rotate(90deg); }
.toggle-title { flex:1; font-size:.95rem; line-height:1.5; }
.toggle-title strong { font-weight:600; }
.toggle-title .tag { margin-left:.5rem; font-weight:400; vertical-align:middle; }
.toggle-body { padding:0 0 .75rem 1.75rem; }
.toggle-body iframe { border-radius:8px; margin-top:.25rem; }

/* Music cards */
.mus-grid { display:flex; flex-direction:column; gap:1.25rem; margin-bottom:2.5rem; }
.mus-card { background:var(--bg); border:1px solid var(--border-light); border-radius:10px; overflow:hidden; transition:box-shadow .2s ease, border-color .2s ease; animation:musCardIn .4s ease-out both; }
.mus-card:hover { border-color:var(--border); box-shadow:0 2px 12px rgba(0,0,0,.06); }
@keyframes musCardIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
.mus-card-header { display:flex; align-items:flex-start; justify-content:space-between; gap:.75rem; padding:1rem 1.25rem .5rem; }
.mus-card-info { display:flex; flex-direction:column; gap:.1rem; }
.mus-card-title { font-size:1.05rem; font-weight:600; color:var(--text); }
.mus-card-subtitle { font-size:.85rem; color:var(--text-secondary); }
.mus-card-embed { padding:0 1.25rem 1.25rem; }

/* Project flat list */
.project-list { display:flex; flex-direction:column; margin-bottom:2.5rem; }
.project-item { display:flex; align-items:baseline; gap:.5rem; padding:.5rem .75rem; text-decoration:none; color:var(--text); border-radius:4px; transition:background .1s ease; }
.project-item:hover { background:var(--bg-hover); text-decoration:none; }
.project-name { font-weight:600; font-size:.95rem; white-space:nowrap; flex-shrink:0; }
.project-desc { font-size:.85rem; color:var(--text-secondary); }

@media(max-width:640px) {
  .landing-title { font-size:2rem; }
  .subpage-title { font-size:1.75rem; }
  .db-table { font-size:.8rem; }
  .db-table th,.db-table td { padding:.5rem; }
  .back-arrow { left:.5rem; font-size:1.5rem; width:2rem; height:2rem; }
}
`;