import { useState, useEffect } from "react";

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < breakpoint);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export const projects = {
  ideating: [
    { id: "DAN-12", name: "Polyglot", desc: "Multi-language interactive notebook", tech: "WebAssembly" },
    { id: "DAN-13", name: "Audio Visualizer", desc: "Real-time audio reactive visuals", tech: "Web Audio API" },
  ],
  inProgress: [
    { id: "DAN-08", name: "QR Ordering", desc: "Restaurant collaborative ordering with real-time sync", tech: "Next.js · Supabase · Toast API", priority: "high" },
    { id: "DAN-05", name: "Musicboxd", desc: "Letterboxd for music — review, rate, discover albums", tech: "Next.js · Supabase · MusicBrainz", priority: "high" },
    { id: "DAN-09", name: "Subs", desc: "Video transcription & translation with parallel chunking", tech: "Tauri · React · Whisper API", priority: "med" },
  ],
  completed: [
    { id: "DAN-01", name: "Summate AI", desc: "Multi-agent debate grading, 64% → 90% accuracy", tech: "Ollama · Local inference" },
    { id: "DAN-03", name: "Feynman", desc: "Multimodal AI tutor — HackPrinceton 2025, 48hrs", tech: "FastAPI · Grok Vision · ElevenLabs" },
    { id: "DAN-04", name: "Flow AI", desc: "Privacy-first Chrome extension, on-device Gemini Nano", tech: "Chrome Built-in AI" },
    { id: "DAN-10", name: "CopyRepo", desc: "CLI tool for formatting codebases for LLM context", tech: "Python · PyPI" },
  ],
};

function Card({ item, color, selected, onSelect }) {
  return (
    <div
      onClick={() => onSelect(selected?.id === item.id ? null : item)}
      style={{
        background: "white", borderRadius: 4, padding: "10px 10px 8px",
        cursor: "pointer", boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
        borderLeft: `3px solid ${color}`,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 500, color: "#172b4d", marginBottom: 4 }}>{item.name}</div>
      {selected?.id === item.id && (
        <div style={{ fontSize: 11, color: "#5e6c84", marginBottom: 6, lineHeight: 1.5 }}>{item.desc}</div>
      )}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, color: "#8993a4" }}>{item.id}</span>
        <span style={{ fontSize: 10, color: "#8993a4", background: "#f4f5f7", padding: "1px 6px", borderRadius: 3 }}>
          {item.tech?.split("·")[0]?.trim()}
        </span>
      </div>
      {item.priority && (
        <div style={{ marginTop: 4 }}>
          <span style={{
            fontSize: 9, fontWeight: 600, textTransform: "uppercase",
            color: item.priority === "high" ? "#de350b" : "#ff8b00",
            background: item.priority === "high" ? "#ffebe6" : "#fff3e0",
            padding: "1px 5px", borderRadius: 2,
          }}>{item.priority}</span>
        </div>
      )}
    </div>
  );
}

function ColumnHeader({ col, count }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8, padding: "0 4px" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
      <span style={{ fontSize: 12, fontWeight: 600, color: "#5e6c84", textTransform: "uppercase", letterSpacing: 0.5 }}>
        {col.label}
      </span>
      <span style={{ fontSize: 11, color: "#8993a4", marginLeft: "auto" }}>{count}</span>
    </div>
  );
}

export default function JiraBoard() {
  const [selected, setSelected] = useState(null);
  const isMobile = useIsMobile();

  const cols = [
    { key: "ideating", label: "Ideating", color: "#85B7EB", items: projects.ideating },
    { key: "inProgress", label: "In progress", color: "#EF9F27", items: projects.inProgress },
    { key: "completed", label: "Done", color: "#5DCAA5", items: projects.completed },
  ];

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", background: "#f4f5f7", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{
        background: "#0052CC", padding: isMobile ? "8px 12px" : "8px 16px",
        display: "flex", alignItems: "center", gap: isMobile ? 8 : 12, flexShrink: 0,
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}>
        <span style={{ color: "white", fontWeight: 600, fontSize: 14 }}>DANBOARD</span>
        <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>Q2 2026</span>
        {!isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 3 }}>Filter</span>
            <span style={{ background: "rgba(255,255,255,0.15)", color: "white", fontSize: 11, padding: "3px 10px", borderRadius: 3 }}>Group by: None</span>
          </div>
        )}
      </div>

      {/* Columns */}
      {isMobile ? (
        <div style={{ flex: 1, overflow: "auto", padding: 8, display: "flex", flexDirection: "column", gap: 8 }}>
          {cols.map(col => (
            <div key={col.key} style={{ background: "#ebecf0", borderRadius: 6, padding: 8 }}>
              <ColumnHeader col={col} count={col.items.length} />
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {col.items.map(item => (
                  <Card key={item.id} item={item} color={col.color} selected={selected} onSelect={setSelected} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, padding: 12, overflow: "hidden" }}>
          {cols.map(col => (
            <div key={col.key} style={{ background: "#ebecf0", borderRadius: 6, padding: 8, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <ColumnHeader col={col} count={col.items.length} />
              <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 6 }}>
                {col.items.map(item => (
                  <Card key={item.id} item={item} color={col.color} selected={selected} onSelect={setSelected} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}