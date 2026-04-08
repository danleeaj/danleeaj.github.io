import { useState, useEffect, useRef } from "react";

const JOURNAL = [
  { date: "Apr 7, 2026", text: "just found out about this thing called 'supabase'... its like firebase but BETTER?? been messing with it all day. also had amazing char kway teow from that hawker stall near orchard. 10/10 no notes" },
  { date: "Apr 3, 2026", text: "red-black trees are SO COOL. like why didnt anyone tell me trees could be this interesting?? spent 4 hours on one homework problem tho lol. listening to radiohead while coding hits different at 2am" },
  { date: "Mar 28, 2026", text: "SINGAPORE WEATHER UPDATE: hot. humid. shocking absolutely no one. miss the san diego weather ngl... at least the food here is god tier" },
  { date: "Mar 20, 2026", text: "hackathon this weekend!! 48 hours no sleep lets gooooo. stocked up on red bull and instant noodles. my teammates think im crazy for wanting to add voice synthesis. they r right but we're doing it anyway" },
  { date: "Mar 12, 2026", text: "TA'd 120 students at ucsd and STILL nothing prepared me for debugging someone elses CSS. why is the div THERE. WHO PUT IT THERE" },
];

const SURVEY = {
  name: "An Jie Lee (李安杰)",
  alias: "danleeaj",
  age: "less than or equal to 25",
  location: "Suzhou → Singapore → San Diego → Philly",
  favoriteColor: "hontesly dont know",
  favoriteGame: "whatever im playing now",
  favoriteFood: "anything that makes my mouth feel good",
  currentlyListening: "跟悲伤结了账, im not sad i just love their dynamic",
  motto: "(smile)",
};

const GUESTBOOK = [
  { name: "danleeaj", date: "04/08/26", msg: "aaahjksdhaflshdjlf test test test", mood: "" },
];

const WHATS_NEW = [
  { date: "Apr 8", text: "Added MIDI player!! Now u can listen to music while browsing :)" },
  { date: "Apr 2", text: "New journal entry about red-black trees" },
  { date: "Mar 30", text: "Added 3 new badges to the collection!!" },
  { date: "Mar 25", text: "Joined TWO new webrings (SG Coders + Penn CS)" },
  { date: "Mar 15", text: "Guestbook entries are rolling in! sign it plz!!" },
  { date: "Mar 1", text: "SITE LAUNCH!!!!! finally got my geocities page up" },
];

function MarqueeText() {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => o - 1), 30);
    return () => clearInterval(id);
  }, []);
  const text = "~~~ WELCOME TO MY HOMEPAGE ~~~ UPDATED APR 7 2026 ~~~ HELLLLOOOOOOOOOO ";
  const repeated = text.repeat(4);
  return (
    <div style={{ overflow: "hidden", background: "#000", color: "#000", fontFamily: "'Comic Sans MS', cursive", fontSize: 13, padding: "4px 0", fontWeight: "bold", letterSpacing: 1 }}>
      <div style={{ whiteSpace: "nowrap", transform: `translateX(${offset % (text.length * 8)}px)`, color: "#fff" }}>{repeated}</div>
    </div>
  );
}

function CursorTrail() {
  const [particles, setParticles] = useState([]);
  const idRef = useRef(0);
  useEffect(() => {
    const handler = (e) => {
      const id = idRef.current++;
      setParticles(p => [...p.slice(-12), { id, x: e.clientX / 1.25, y: e.clientY / 1.25, born: Date.now() }]);
    };
    window.addEventListener("mousemove", handler);
    const cleanup = setInterval(() => {
      setParticles(p => p.filter(pt => Date.now() - pt.born < 600));
    }, 50);
    return () => { window.removeEventListener("mousemove", handler); clearInterval(cleanup); };
  }, []);
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9999 }}>
      {particles.map(p => {
        const age = (Date.now() - p.born) / 600;
        return <div key={p.id} style={{ position: "absolute", left: p.x - 6, top: p.y - 6, fontSize: 12 + (1 - age) * 6, opacity: 1 - age, transform: `scale(${1 - age * 0.5}) rotate(${age * 180}deg)`, color: `hsl(${(p.id * 40) % 360}, 100%, 70%)` }}>✦</div>;
      })}
    </div>
  );
}

function MidiPlayer() {
  const [playing, setPlaying] = useState(false);
  const [track] = useState(2);
  const tracks = ["Crazy Frog - Axel F", "Eiffel 65 - Blue (Da Ba Dee)", "Darude - Sandstorm", "Green Day - Basket Case"];
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(id);
  }, [playing]);
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return (
    <div style={{ border: "2px inset #c0c0c0", background: "#000", padding: 6, fontFamily: "monospace", fontSize: 10 }}>
      <div style={{ color: "#0f0", marginBottom: 4, textAlign: "center" }}>♫ MIDI Jukebox ♫</div>
      <div style={{ background: "#001a00", border: "1px inset #333", padding: "3px 6px", color: "#0f0", marginBottom: 4, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
        {playing ? `▶ ${tracks[track]}` : "■ Stopped"} {playing && <span style={{ float: "right" }}>{fmt(elapsed)}</span>}
      </div>
      <div style={{ display: "flex", gap: 2, justifyContent: "center" }}>
        {["⏮", playing ? "⏸" : "▶", "⏹", "⏭"].map((btn, i) => (
          <button key={i} onClick={() => { if (i === 1) setPlaying(!playing); if (i === 2) { setPlaying(false); setElapsed(0); } }}
            style={{ border: "2px outset #666", background: "#444", color: "#0f0", fontSize: 11, padding: "1px 8px", cursor: "pointer", fontFamily: "monospace" }}>{btn}</button>
        ))}
      </div>
      <div style={{ color: "#0a0", fontSize: 8, textAlign: "center", marginTop: 3 }}>Volume: ████████░░ 80%</div>
    </div>
  );
}



function ConstructionGif() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 400);
    return () => clearInterval(id);
  }, []);
  const workers = ["🚧", "⚠️", "🔨", "👷"];
  return <span>{workers[frame]}</span>;
}

function SpinningEnvelope() {
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setAngle(a => a + 15), 80);
    return () => clearInterval(id);
  }, []);
  return <span style={{ display: "inline-block", transform: `rotateY(${angle}deg)`, fontSize: 18 }}>✉️</span>;
}

function RotatingGlobe() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 300);
    return () => clearInterval(id);
  }, []);
  const globes = ["🌍", "🌎", "🌏", "🌎"];
  return <span style={{ fontSize: 20 }}>{globes[frame]}</span>;
}

function BlinkText({ children, style }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const id = setInterval(() => setVisible(v => !v), 500);
    return () => clearInterval(id);
  }, []);
  return <span style={{ ...style, visibility: visible ? "visible" : "hidden" }}>{children}</span>;
}

function RainbowText({ children, size = 24, className }) {
  const text = typeof children === "string" ? children : "";
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setOffset(o => o + 1), 100);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={className} style={{ fontSize: size, fontFamily: "'Comic Sans MS', cursive", fontWeight: "bold" }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{ color: `hsl(${((i + offset) * 30) % 360}, 100%, 50%)` }}>{ch}</span>
      ))}
    </span>
  );
}

function StarfieldBg() {
  const [stars] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      x: Math.random() * 100, y: Math.random() * 100,
      size: Math.random() * 2 + 1, delay: Math.random() * 2,
      duration: Math.random() * 1.5 + 0.5,
    }))
  );
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
      {stars.map((s, i) => (
        <div key={i} style={{
          position: "absolute", left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size, borderRadius: "50%",
          background: `hsl(${Math.random() * 360}, 80%, 80%)`,
          animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}



function WebringWidget({ name, color }) {
  return (
    <div style={{ border: "1px solid #999", padding: 4, fontSize: 9, textAlign: "center", background: "#f8f8f8", marginBottom: 4 }}>
      <div style={{ fontWeight: "bold", color }}>{name}</div>
      <div style={{ marginTop: 2 }}>
        {"<< "}<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Prev</span>
        {" | "}<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Random</span>
        {" | "}<span style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Next</span>{" >>"}
      </div>
    </div>
  );
}

function DancingBaby() {
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % 4), 300);
    return () => clearInterval(id);
  }, []);
  const poses = ["🕺", "💃", "🕺", "🧍"];
  return <span style={{ fontSize: 20, display: "inline-block", transform: frame % 2 === 0 ? "scaleX(-1)" : "scaleX(1)" }}>{poses[frame]}</span>;
}



export default function GeocitiesHomepage() {
  const [page, setPage] = useState("home");
  const [counter] = useState(Math.floor(Math.random() * 900) + 100);
  const [gbName, setGbName] = useState("");
  const [gbMsg, setGbMsg] = useState("");
  const [gbEntries, setGbEntries] = useState(GUESTBOOK);

  const pageUrls = {
    home: "index.html", about: "about.html", journal: "journal.html",
    links: "links.html", guestbook: "guestbook.html", whatsnew: "whatsnew.html"
  };

  const navLink = (emoji, label, target) => (
    <div style={{ marginBottom: 2 }}>
      <span>{emoji} </span>
      <span onClick={() => setPage(target)} style={{
        color: page === target ? "#000" : "#333", textDecoration: "underline",
        cursor: "pointer", fontWeight: page === target ? "bold" : "normal",
        textShadow: "none",
      }}>{label}</span>
    </div>
  );

  const sectionHeader = (text) => (
    <div style={{ fontSize: 18, fontWeight: "bold", color: "#000", fontFamily: "'Comic Sans MS', cursive", marginBottom: 8 }}>{text}</div>
  );

  const renderPage = () => {
    if (page === "about") return (
      <div>
        {sectionHeader("About mee")}
        <div className="geocities-about-flex">
          <div className="geocities-about-photo" style={{ border: "3px ridge #ccc", padding: 6, background: "#f0f0f0" }}>
            <div style={{ width: 90, height: 90, background: "#e0e0e0", border: "2px inset #ccc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#666" }}>[photo]</div>
            <div style={{ textAlign: "center", fontSize: 9, color: "#666", marginTop: 4 }}>thats me!!</div>
          </div>
          <div style={{ fontSize: 12, lineHeight: 2 }}>
            {Object.entries(SURVEY).map(([key, val]) => (
              <div key={key}>
                <span style={{ color: "#000", fontWeight: "bold" }}>{key.replace(/([A-Z])/g, " $1").replace(/^./, s => s.toUpperCase())}: </span>
                <span style={{ color: "#333" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    );

    if (page === "journal") return (
      <div>
        {sectionHeader("Dan's Online Journal")}
        <div style={{ fontSize: 10, color: "#666", marginBottom: 8, fontStyle: "italic" }}>dear diary... jk this is public lol. my thoughts & stuff!!</div>
        {JOURNAL.map((entry, i) => (
          <div key={i} style={{ marginBottom: 10, borderLeft: "3px solid #000", paddingLeft: 10 }}>
            <div style={{ color: "#000", fontWeight: "bold", fontSize: 12 }}>{entry.date}</div>
            <div style={{ color: "#333", fontSize: 12, lineHeight: 1.6, marginTop: 2 }}>{entry.text}</div>
          </div>
        ))}
        <div style={{ color: "#999", fontSize: 10, fontStyle: "italic", marginTop: 8 }}>older entries in the archives... (jk there are no archives this site is new lol)</div>
      </div>
    );

    if (page === "links") return (
      <div>
        {sectionHeader("Cool Links")}
        <div style={{ fontSize: 12, lineHeight: 2.4 }}>
          <div style={{ fontWeight: "bold", color: "#000", fontSize: 13 }}>My Stuff:</div>
          <div><RotatingGlobe /> <span style={{ color: "#333", textDecoration: "underline", cursor: "pointer" }}>GitHub</span> - github.com/danleeaj</div>
          <div><RotatingGlobe /> <span style={{ color: "#333", textDecoration: "underline", cursor: "pointer" }}>Homepage</span> - danleeaj.github.io</div>
          <div style={{ fontWeight: "bold", color: "#000", fontSize: 13, marginTop: 8 }}>Cool Sites:</div>
          <div><RotatingGlobe /> <span style={{ color: "#333", textDecoration: "underline", cursor: "pointer" }}>emoo's homepage</span> - emoowang.com</div>
        </div>
      </div>
    );

    if (page === "guestbook") return (
      <div>
        {sectionHeader("Guestbook")}
        <BlinkText style={{ color: "#000", fontSize: 14, fontWeight: "bold", fontFamily: "'Comic Sans MS', cursive" }}>SIGN MY GUESTBOOK!!</BlinkText>
        <div style={{ fontSize: 9, color: "#666", fontStyle: "italic", marginTop: 2 }}>this is a static webpage so what you say wont be saved im sorry</div>
        <div style={{ marginTop: 8, marginBottom: 12, border: "2px ridge #ccc", padding: 8, background: "#f8f8f8" }}>
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#000", fontSize: 11 }}>Name: </span>
            <input value={gbName} onChange={e => setGbName(e.target.value)} style={{ border: "2px inset #ccc", background: "#fff", padding: 2, fontSize: 11, width: 120 }} />
          </div>
          <div style={{ marginBottom: 4 }}>
            <span style={{ color: "#000", fontSize: 11 }}>Message: </span>
            <input className="geocities-gb-msg-input" value={gbMsg} onChange={e => setGbMsg(e.target.value)} style={{ border: "2px inset #ccc", background: "#fff", padding: 2, fontSize: 11 }} />
          </div>
          <button onClick={() => {
            if (gbName && gbMsg) {
              setGbEntries([{ name: gbName, date: "04/08/26", msg: gbMsg, mood: "" }, ...gbEntries]);
              setGbName(""); setGbMsg("");
            }
          }} style={{ border: "2px outset #ccc", background: "#e0e0e0", fontSize: 11, padding: "3px 16px", cursor: "pointer", fontWeight: "bold" }}>Sign It!!</button>
        </div>
        <div style={{ border: "2px inset #ccc", background: "#f8f8f8", padding: 8 }}>
          {gbEntries.map((g, i) => (
            <div key={i} style={{ fontSize: 11, marginTop: i > 0 ? 8 : 0, paddingBottom: 8, borderBottom: i < gbEntries.length - 1 ? "1px dashed #ccc" : "none" }}>
              <span style={{ color: "#000", fontWeight: "bold" }}>{g.mood} {g.name}</span>
              <span style={{ color: "#666" }}> ({g.date})</span>
              <div style={{ color: "#333", fontStyle: "italic", marginTop: 2, marginLeft: 16 }}>"{g.msg}"</div>
            </div>
          ))}
        </div>
      </div>
    );

    if (page === "whatsnew") return (
      <div>
        {sectionHeader("What's New!!")}
        <div style={{ fontSize: 12 }}>
          {WHATS_NEW.map((item, i) => (
            <div key={i} style={{ marginBottom: 6, display: "flex", gap: 8 }}>
              <span style={{ color: "#000", fontWeight: "bold", flexShrink: 0, width: 50 }}>{item.date}</span>
              <span style={{ color: "#333" }}>— {item.text}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, fontSize: 10, color: "#999" }}>More updates coming soon...</div>
      </div>
    );

    // HOME
    return (
      <div>
        {sectionHeader("Welcome to My Homepage!!!")}
        <div style={{ fontSize: 13, lineHeight: 1.8, color: "#000" }}>
          <p>hello and welcome to my homepage, decorated with classics such as cursor sparkles, misaligned text, a big lack of color for some reason, and of course, times new roman and our favorite font <span style={{ fontFamily: "'Comic Sans MS', cursive" }}>comic sans</span>.</p>
          <p>i refuse to discuss anything academic here so lets just stay and have some <RainbowText size={14}>FUUUUUNNNNNN</RainbowText></p>
        </div>

        <div style={{ border: "2px ridge #ccc", padding: 8, background: "#f8f8f8", marginTop: 8 }}>
          <BlinkText style={{ color: "#ff0", fontWeight: "bold", fontSize: 14, fontFamily: "'Comic Sans MS', cursive" }}>
            NEW!!
          </BlinkText>
          <span style={{ color: "#333", fontSize: 12 }}> Guestbook is up!! Come say hi!!</span>
        </div>



        <div style={{ marginTop: 12, border: "1px dashed #ccc", padding: 8 }}>
          <div style={{ color: "#000", fontSize: 12, fontWeight: "bold", marginBottom: 4 }}>Contact Me</div>
          <div style={{ fontSize: 12, color: "#333" }}>
            <SpinningEnvelope /> Email: anjie.wav@gmail.com<br />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="geocities-root" style={{ height: "100%", overflow: "auto", background: "#fff", fontFamily: "'Times New Roman', serif", position: "relative" }}>
      <style>{`
        @keyframes twinkle { from { opacity: 0.3; } to { opacity: 1; } }
        @keyframes rainbow { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        * { scrollbar-width: thin; scrollbar-color: #ccc #fff; }
        .geocities-root { zoom: 1.25; }
        .geocities-main-layout { display: flex; gap: 12px; }
        .geocities-sidebar { width: 160px; flex-shrink: 0; font-size: 12px; }
        .geocities-content { flex: 1; border: 2px ridge #ccc; padding: 12px; background: #fff; min-height: 400px; }
        .geocities-about-flex { display: flex; gap: 12px; margin-top: 8px; }
        .geocities-about-photo { flex: 0 0 auto; }
        .geocities-gb-msg-input { width: 250px; }
        .geocities-title-text { font-size: 28px; }
        .geocities-body { padding: 16px; }
        @media (max-width: 600px) {
          .geocities-root { zoom: 1; }
          .geocities-main-layout { flex-direction: column; gap: 8px; }
          .geocities-sidebar { width: 100%; }
          .geocities-sidebar > div { display: flex; flex-wrap: wrap; gap: 4px; justify-content: center; align-items: center; }
          .geocities-sidebar > div > div:first-child { width: 100%; }
          .geocities-content { min-height: unset; padding: 10px; }
          .geocities-about-flex { flex-direction: column; }
          .geocities-about-photo { align-self: center; }
          .geocities-gb-msg-input { width: 100%; box-sizing: border-box; }
          .geocities-title-text { font-size: 20px; }
          .geocities-body { padding: 8px; }
        }
      `}</style>
      <CursorTrail />
      <StarfieldBg />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 880, margin: "0 auto" }}>
        <MarqueeText />

        <div className="geocities-body" style={{ background: "#fff", minHeight: 600 }}>
          {/* Title area */}
          <div style={{ textAlign: "center", marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <RainbowText size={28} className="geocities-title-text">~*~ Daniel's Homepage ~*~</RainbowText>
            </div>
            <div style={{ fontSize: 12, color: "#333", fontStyle: "italic", fontFamily: "'Comic Sans MS', cursive" }}>
              How did you even find this page!?!?
            </div>
            <div style={{ background: "linear-gradient(90deg, transparent, #000, #666, #000, transparent)", height: 2, margin: "8px auto", maxWidth: 500 }} />
          </div>

          {/* Main layout table */}
          <div className="geocities-main-layout">
            {/* Sidebar */}
            <div className="geocities-sidebar">
              <div style={{ border: "2px ridge #ccc", padding: 8, background: "#f8f8f8", marginBottom: 8 }}>
                <div style={{ fontWeight: "bold", color: "#000", marginBottom: 6, fontSize: 13, textAlign: "center", fontFamily: "'Comic Sans MS', cursive" }}>Navigation</div>
                {navLink("", "Home", "home")}
                {navLink("", "About Me", "about")}
                {navLink("", "Links", "links")}
                {navLink("", "Guestbook", "guestbook")}
              </div>



            </div>

            {/* Main content */}
            <div className="geocities-content">
              {renderPage()}
            </div>
          </div>

          {/* Footer */}
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <div style={{ background: "linear-gradient(90deg, transparent, #ff0, #0ff, #f0f, #ff0, transparent)", height: 2, margin: "0 auto 8px", maxWidth: 500 }} />
            <div style={{ display: "inline-flex", gap: 12, alignItems: "center" }}>
              <SpinningEnvelope />
              <span style={{ color: "#0ff", fontSize: 11, textDecoration: "underline", cursor: "pointer" }}>Email me!!</span>
            </div>
            <div style={{ fontSize: 9, color: "#fff", marginTop: 6 }}>
              © 2026 (?) An Jie Lee
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}