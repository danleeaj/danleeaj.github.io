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
        <table className="db-table">
          <thead><tr><th>Project</th><th>Stack</th><th>Description</th><th>Link</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>Musicboxd</strong></td>
              <td><span className="tag tag-green">Next.js</span> <span className="tag tag-purple">Supabase</span> <span className="tag tag-blue">PostgreSQL</span></td>
              <td>Letterboxd, but for music — log, rate, and review albums
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>MusicBrainz import pipeline with cover art handling</li>
                  <li>Clerk + Supabase JWT auth integration</li>
                  <li>Star rating system, album/track/review UI</li>
                  <li>Row-level security policies for user data</li>
                </ul>
              </td>
              <td><a href="https://github.com/danleeaj/musicboxd" target="_blank" rel="noopener">Github</a></td>
            </tr>
            <tr>
              <td><strong>Subs</strong></td>
              <td><span className="tag tag-green">React</span> <span className="tag tag-blue">Tauri</span> <span className="tag tag-purple">FastAPI</span></td>
              <td>Desktop app for video transcription and subtitle translation
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>Parallel Whisper API processing — ~5× speedup</li>
                  <li>Silence-based audio chunking for accuracy</li>
                  <li>GPT translation with sliding context windows</li>
                  <li>SRT subtitle burning via ffmpeg</li>
                </ul>
              </td>
              <td><a href="https://github.com/danleeaj/subs" target="_blank" rel="noopener">Github</a></td>
            </tr>
            <tr>
              <td><strong>Summate AI</strong></td>
              <td><span className="tag tag-blue">Python</span> <span className="tag tag-purple">AWS</span></td>
              <td>Multi-agent debate framework for grading — boosted accuracy from 64% to 90%
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>REST API via API Gateway for querying and feedback</li>
                  <li>Serverless functions with AWS Lambda</li>
                  <li>Concurrent processing — 25% faster processing time</li>
                  <li>Streamlit UI for visual demos</li>
                </ul>
              </td>
              <td><a href="https://summate-ai.streamlit.app/" target="_blank" rel="noopener">Demo</a></td>
            </tr>
            <tr>
              <td><strong>Feynman</strong></td>
              <td><span className="tag tag-blue">Python</span> <span className="tag tag-green">FastAPI</span> <span className="tag tag-purple">WebSocket</span></td>
              <td>Multimodal AI tutoring platform — built at HackPrinceton 2025
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>Real-time interaction via WebSocket + FastAPI</li>
                  <li>Grok Vision for visual understanding</li>
                  <li>ElevenLabs voice synthesis for spoken explanations</li>
                </ul>
              </td>
              <td><a href="https://github.com/danleeaj/feynman" target="_blank" rel="noopener">Github</a></td>
            </tr>
            <tr>
              <td><strong>Flow AI</strong></td>
              <td><span className="tag tag-green">JavaScript</span> <span className="tag tag-purple">Chrome API</span></td>
              <td>Privacy-first Chrome extension using on-device Gemini Nano
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>Built for Chrome Built-In AI Hackathon</li>
                  <li>All inference runs locally — no data leaves your browser</li>
                </ul>
              </td>
              <td><a href="https://github.com/danleeaj/flow-ai" target="_blank" rel="noopener">Github</a></td>
            </tr>
            <tr>
              <td><strong>CopyRepo</strong></td>
              <td><span className="tag tag-blue">Python</span> <span className="tag tag-purple">PyPI</span></td>
              <td>CLI tool to copy repo contents to clipboard — published on PyPI</td>
              <td><a href="https://pypi.org/project/copyrepo/" target="_blank" rel="noopener">PyPI</a></td>
            </tr>
            <tr>
              <td><strong>d_wordle.py</strong></td>
              <td><span className="tag tag-blue">Python</span></td>
              <td>Terminal-based Wordle clone
                <ul className="bullet-list" style={{ marginTop: "0.4rem" }}>
                  <li>Save/resume progress</li>
                  <li>Three difficulty levels via CLI args</li>
                  <li>Dictionary validation</li>
                  <li>Scoreboard on exit</li>
                </ul>
              </td>
              <td><a href="https://github.com/danleeaj/d_wordle.py" target="_blank" rel="noopener">Github</a></td>
            </tr>
            <tr>
              <td><strong>this site</strong></td>
              <td><span className="tag tag-green">HTML/CSS</span></td>
              <td>The page you're looking at right now.</td>
              <td><a href="https://github.com/danleeaj/danleeaj.github.io" target="_blank" rel="noopener">Github</a></td>
            </tr>
          </tbody>
        </table>
      </div>
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
        <div className="toggle-list">
          <Toggle title="坐车去海边" tag="suzhou" subtitle="a song about traveling the world">
            <iframe style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/track/31UWx5Z5b6inZCL0EJ6ucy?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </Toggle>
          <Toggle title="一世纪相爱" tag="for the centuries" subtitle="first single off my upcoming album">
            <iframe style={{ borderRadius: 12 }} src="https://open.spotify.com/embed/track/2KdBl3cDs1zK0agPLXM9xu?utm_source=generator" width="100%" height="152" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" />
          </Toggle>
          <Toggle title="有一个地方" tag="there was a place" subtitle="my first ever album">
            <iframe style={{ border: 0, width: "100%", height: 439 }} src="https://bandcamp.com/EmbeddedPlayer/album=3545554598/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/" seamless />
          </Toggle>
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
        <p className="section-heading">Work Experience</p>
        <table className="db-table">
          <thead><tr><th>Date</th><th>Role</th><th>Details</th></tr></thead>
          <tbody>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>Sep 2023 - May 2025</td>
              <td><strong>Salk Institute</strong><br /><span className="tag tag-purple">Allen Lab</span></td>
              <td>
                <ul className="bullet-list">
                  <li>Developed macros and scripts to fully automate image data processing in Python and ImageJ Macro Language</li>
                  <li>Optimized CellProfiler pipelines for enhanced image analysis and data extraction</li>
                  <li>Performed sample preparation — immunostaining, brain slicing, slide mounting with cryostats</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>Mar 2023 - Jun 2023</td>
              <td><strong>UC San Diego</strong><br /><span className="tag tag-blue">Jung Lab</span></td>
              <td>
                <ul className="bullet-list">
                  <li>Piloted experimental methods for a novel study on music-based Alzheimer's prevention</li>
                  <li>Developed fully automated behavioral experiments using PsychoPy</li>
                  <li>Analyzed and visualized EEG data using EEGLAB on MATLAB</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>Jun 2023 - Aug 2023</td>
              <td><strong>National University of Singapore</strong><br /><span className="tag tag-green">Feng Lab</span></td>
              <td>
                <ul className="bullet-list">
                  <li>Processed and analyzed large population datasets using SPSS</li>
                  <li>Aided in writing multiple journal manuscripts on healthy ageing</li>
                </ul>
              </td>
            </tr>
            <tr>
              <td style={{ whiteSpace: "nowrap" }}>Apr 2022 – Mar 2023</td>
              <td><strong>UC San Diego</strong><br /><span className="tag tag-orange">Teaching</span></td>
              <td>
                <ul className="bullet-list">
                  <li>Held office hours and discussion sections for biology courses</li>
                  <li>Graded exams and homework, held extra sessions for struggling students</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
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
    <div className="page landing">
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
.app-root { font-family:var(--font-sans); color:var(--text); background:var(--bg); line-height:1.5; -webkit-font-smoothing:antialiased; min-height:100vh; }
a { color:var(--text); text-decoration:underline; text-decoration-color:var(--border); text-underline-offset:2px; transition:text-decoration-color .15s ease; }
a:hover { text-decoration-color:var(--text); }
::selection { background:rgba(35,131,226,.15); }
.page { max-width:var(--page-width); margin:0 auto; padding:0 1.5rem; }
.landing { min-height:100vh; display:flex; align-items:center; }
.landing-content { padding:4rem 0; width:100%; }
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

@media(max-width:640px) {
  .landing-title { font-size:2rem; }
  .subpage-title { font-size:1.75rem; }
  .db-table { font-size:.8rem; }
  .db-table th,.db-table td { padding:.5rem; }
  .back-arrow { left:.5rem; font-size:1.5rem; width:2rem; height:2rem; }
}
`;