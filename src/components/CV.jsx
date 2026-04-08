function Section({ title, children }) {
  return (<div style={{ marginTop: 22 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: "1.5px solid #1a1a1a", paddingBottom: 3, marginBottom: 10 }}>{title}</div>{children}</div>);
}
function Entry({ title, meta, desc }) {
  return (<div style={{ marginBottom: 10 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>{meta && <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>{meta}</div>}{desc && <div style={{ fontSize: 12, color: "#333", marginTop: 3, lineHeight: 1.6 }}>{desc}</div>}</div>);
}

export default function CV() {
  return (
    <div style={{ height: "100%", overflow: "auto", background: "#ffffff", fontFamily: "'Charter', Georgia, serif", padding: "32px 40px", color: "#1a1a1a" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>Daniel Lee <span style={{ fontWeight: 400, color: "#666", fontSize: 18 }}>(李安杰)</span></div>
        <div style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.6 }}>Singapore Citizen · Philadelphia, PA · danleeaj.github.io · github.com/danleeaj</div>
        <Section title="Education">
          <Entry title="University of Pennsylvania" meta="M.S. Computer and Information Technology · GPA: 4.0 · 2024 – 2026" desc="Algorithms, Systems Programming (C++), Data Structures, Discrete Math & Probability" />
          <Entry title="University of California, San Diego" meta="M.S. Biology · B.S. Neurobiology · 2018 – 2023" />
        </Section>
        <Section title="Experience">
          <Entry title="Computational Research Assistant — Salk Institute for Biological Studies" meta="San Diego, CA · 2020 – 2023" desc="Built automated cell identification pipelines using ML classifiers, achieving 20x throughput improvement. Developed Python tools for large-scale image analysis across neuroscience datasets." />
          <Entry title="Teaching Assistant — UC San Diego" meta="San Diego, CA · 2021 – 2023" desc="Taught 120+ students across multiple biology and neuroscience courses." />
        </Section>
        <Section title="Projects">
          {[
            { name: "QR Collaborative Ordering", tech: "Next.js · Supabase Realtime · Toast API · Stripe Terminal", desc: "Real-time restaurant ordering system with anonymous auth, RLS policies, and POS integration" },
            { name: "Musicboxd", tech: "Next.js · Supabase · PostgreSQL · Clerk · MusicBrainz", desc: "Album review platform with import pipeline, cover art integration, and track-level display" },
            { name: "Subs", tech: "Tauri · React · FastAPI · Whisper API", desc: "Desktop video transcription app with parallel chunking for 5x+ speedup and Chinese subtitle output" },
            { name: "Summate AI", tech: "Ollama · Multi-agent architecture", desc: "Debate grading system using multi-agent deliberation, improving accuracy from 64% to 90%" },
            { name: "Feynman", tech: "FastAPI · WebSocket · Grok Vision · ElevenLabs", desc: "Multimodal AI tutoring platform built in 48 hours at HackPrinceton 2025" },
            { name: "Flow AI", tech: "Chrome Extension · Gemini Nano", desc: "Privacy-first browser extension using on-device inference — Chrome Built-in AI Hackathon" },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                <span style={{ fontSize: 10, color: "#888", whiteSpace: "nowrap" }}>{p.tech}</span>
              </div>
              <div style={{ fontSize: 12, color: "#333", marginTop: 1, lineHeight: 1.5 }}>{p.desc}</div>
            </div>
          ))}
        </Section>
        <Section title="Skills">
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            {["Python", "JavaScript", "TypeScript", "Java", "C", "C++", "SQL", "React", "Next.js", "Tailwind", "Tauri", "FastAPI", "Node.js", "Supabase", "PostgreSQL", "Git", "Docker", "Linux", "WebSocket"].map(sk => (
              <span key={sk} style={{ display: "inline-block", background: "#f4f4f2", padding: "2px 10px", borderRadius: 3, fontSize: 11, marginRight: 5, marginBottom: 4, border: "1px solid #e8e6e1", color: "#333" }}>{sk}</span>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}