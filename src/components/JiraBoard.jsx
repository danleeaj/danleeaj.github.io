import { useState, useEffect, useRef } from "react";

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
    {
      id: "DAN-12", name: "Polyglot", desc: "Multi-language interactive notebook", tech: "WebAssembly",
      details: "An interactive notebook environment that lets you write and execute code in multiple languages within a single document. Powered by WebAssembly, each language runs in a sandboxed runtime directly in the browser — no server needed. Think Jupyter, but polyglot by default. The goal is seamless interop between Python, Rust, Go, and JS cells, with shared state across language boundaries.",
      screenshots: [],
    },
    {
      id: "DAN-13", name: "Audio Visualizer", desc: "Real-time audio reactive visuals", tech: "Web Audio API",
      details: "A browser-based audio visualizer that generates reactive, GPU-accelerated visuals from any audio input (mic, file, or system audio). Uses the Web Audio API's AnalyserNode for FFT data and pipes frequency/waveform data into WebGL shaders. Planned features include beat detection, customizable visual presets, and MIDI controller mapping for live performance.",
      screenshots: [],
    },
  ],
  inProgress: [
    {
      id: "DAN-08", name: "QR Ordering", desc: "Restaurant collaborative ordering with real-time sync", tech: "Next.js · Supabase · Toast API", priority: "high",
      details: "A full-stack restaurant ordering system where diners scan a QR code at their table and collaboratively build an order in real time. Built with Next.js and Supabase Realtime for instant sync across devices at the same table. Integrates with Toast POS API for menu ingestion and order submission. Features include split-bill calculations, dietary filters, and a kitchen dashboard with live order tracking.",
      screenshots: [],
    },
    {
      id: "DAN-05", name: "Musicboxd", desc: "Letterboxd for music — review, rate, discover albums", tech: "Next.js · Supabase · MusicBrainz", priority: "high",
      details: "A social platform for music lovers to log, rate, and review albums — inspired by Letterboxd's approach to film. Album metadata is sourced from MusicBrainz and enriched with cover art from the Cover Art Archive. Users can build a listening diary, create ranked lists, follow friends, and discover albums through community reviews. The feed algorithm surfaces albums trending among people you follow.",
      screenshots: [],
    },
    {
      id: "DAN-09", name: "Subs", desc: "Video transcription & translation with parallel chunking", tech: "Tauri · React · Whisper API", priority: "med",
      details: "A native desktop app (via Tauri) for transcribing and translating video files. Videos are split into parallel chunks and sent to OpenAI's Whisper API concurrently for fast transcription. The React frontend provides a timeline editor for correcting transcripts and syncing subtitles. Supports SRT/VTT export and batch processing of multiple files. Translation is handled via a secondary LLM pass with context-aware sentence merging.",
      screenshots: [],
    },
  ],
  completed: [
    {
      id: "DAN-01", name: "Summate AI", desc: "Multi-agent debate grading, 64% → 90% accuracy", tech: "Ollama · Local inference",
      details: "An AI-powered debate grading system that uses multiple local LLM agents to evaluate argumentative essays. Each agent scores independently on criteria like evidence quality, logical structure, and rebuttal strength, then a meta-agent aggregates scores with weighted consensus. Running entirely on Ollama for privacy and cost, the system improved grading accuracy from 64% to 90% against human evaluator benchmarks. Built as a research project exploring multi-agent agreement protocols.",
      screenshots: [],
    },
    {
      id: "DAN-03", name: "Feynman", desc: "Multimodal AI tutor — HackPrinceton 2025, 48hrs", tech: "FastAPI · Grok Vision · ElevenLabs",
      details: "A multimodal AI tutoring system built in 48 hours at HackPrinceton 2025. Students can photograph a problem (handwritten or printed), and Grok Vision extracts and interprets the content. The FastAPI backend orchestrates a Socratic teaching flow — rather than giving answers directly, it asks guiding questions. ElevenLabs provides natural voice explanations, making it feel like a real tutor. Supports math, physics, and chemistry problem types.",
      screenshots: [],
    },
    {
      id: "DAN-04", name: "Flow AI", desc: "Privacy-first Chrome extension, on-device Gemini Nano", tech: "Chrome Built-in AI",
      details: "A Chrome extension that brings AI assistance directly into the browser without sending data to external servers. Powered by Chrome's built-in Gemini Nano model, all inference runs on-device. Features include page summarization, writing assistance, and contextual Q&A about the current page. The extension uses Chrome's Prompt API and Summarization API, with a clean popup UI that feels native to the browser.",
      screenshots: [],
    },
    {
      id: "DAN-10", name: "CopyRepo", desc: "CLI tool for formatting codebases for LLM context", tech: "Python · PyPI",
      details: "A Python CLI tool (published on PyPI) that intelligently formats an entire codebase into a single document optimized for LLM context windows. It respects .gitignore, supports custom include/exclude patterns, and generates a file tree header followed by concatenated file contents with clear delimiters. Useful for pasting project context into ChatGPT, Claude, or similar tools. Includes token counting and automatic truncation to fit model limits.",
      screenshots: [],
    },
  ],
};

function ProjectSidebar({ project, onClose }) {
  const sidebarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) onClose();
    }
    function handleEsc(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <>
      <div style={{
        position: "absolute", inset: 0, background: "rgba(27,31,36,0.5)",
        zIndex: 10, transition: "opacity 0.2s",
      }} />
      <div
        ref={sidebarRef}
        role="dialog"
        aria-label={`${project.name} details`}
        style={{
          position: "absolute", top: 0, right: 0, bottom: 0,
          width: "min(420px, 85%)", background: "#ffffff", zIndex: 20,
          boxShadow: "-1px 0 0 rgba(27,31,36,0.15), -4px 0 16px rgba(27,31,36,0.1)",
          display: "flex", flexDirection: "column",
          animation: "ghSlideIn 0.15s ease-out",
          borderLeft: "1px solid #d0d7de",
        }}
      >
        <div style={{
          padding: "16px 16px 12px", borderBottom: "1px solid #d0d7de",
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
        }}>
          <div>
            <div style={{ fontSize: 11, color: "#656d76", fontFamily: "ui-monospace, SFMono-Regular, 'SF Mono', Menlo, monospace", marginBottom: 4 }}>{project.id}</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: "#1f2328" }}>{project.name}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close sidebar"
            style={{
              background: "none", border: "1px solid transparent", cursor: "pointer",
              fontSize: 16, color: "#656d76", padding: "4px 8px",
              lineHeight: 1, borderRadius: 6,
            }}
            onMouseEnter={e => { e.target.style.background = "#f6f8fa"; e.target.style.borderColor = "#d0d7de"; }}
            onMouseLeave={e => { e.target.style.background = "none"; e.target.style.borderColor = "transparent"; }}
          >
            ✕
          </button>
        </div>

        <div style={{ flex: 1, overflow: "auto", padding: 16 }}>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#656d76", marginBottom: 8 }}>Labels</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.tech?.split("·").map((t, i) => (
                <span key={i} style={{
                  fontSize: 12, color: "#1f2328", background: "#ddf4ff",
                  padding: "2px 8px", borderRadius: 16, fontWeight: 500,
                  border: "1px solid rgba(84,174,255,0.4)",
                }}>
                  {t.trim()}
                </span>
              ))}
            </div>
          </div>

          {project.priority && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#656d76", marginBottom: 8 }}>Priority</div>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: project.priority === "high" ? "#82071e" : "#7d4e00",
                background: project.priority === "high" ? "#ffebe9" : "#fff8c5",
                padding: "2px 8px", borderRadius: 16,
                border: `1px solid ${project.priority === "high" ? "rgba(255,129,130,0.4)" : "rgba(212,167,44,0.4)"}`,
              }}>
                {project.priority}
              </span>
            </div>
          )}

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#656d76", marginBottom: 8 }}>Description</div>
            <p style={{ fontSize: 14, color: "#1f2328", lineHeight: 1.6, margin: 0 }}>
              {project.details || project.desc}
            </p>
          </div>

          {project.screenshots && project.screenshots.length > 0 && (
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#656d76", marginBottom: 8 }}>Screenshots</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {project.screenshots.map((src, i) => (
                  <img key={i} src={src} alt={`${project.name} screenshot ${i + 1}`}
                    style={{ width: "100%", borderRadius: 6, border: "1px solid #d0d7de" }} />
                ))}
              </div>
            </div>
          )}

          {(!project.screenshots || project.screenshots.length === 0) && (
            <div style={{
              border: "1px dashed #d0d7de", borderRadius: 6, padding: "24px 16px",
              textAlign: "center", color: "#656d76",
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>📸</div>
              <div style={{ fontSize: 12 }}>Screenshots coming soon</div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes ghSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}

function Card({ item, color, selected, onSelect, onSeeMore }) {
  const [hovered, setHovered] = useState(false);
  const isExpanded = selected?.id === item.id;
  return (
    <div
      onClick={() => onSelect(isExpanded ? null : item)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "#ffffff",
        borderRadius: 6,
        padding: "12px 12px 10px",
        cursor: "pointer",
        border: `1px solid ${isExpanded ? "#0969da" : hovered ? "#bbb" : "#d0d7de"}`,
        transition: "border-color 0.15s",
      }}
    >
      <div style={{ fontSize: 14, fontWeight: 600, color: "#1f2328", marginBottom: 4 }}>{item.name}</div>
      <div style={{ fontSize: 12, color: "#656d76", lineHeight: 1.5, marginBottom: 8 }}>{item.desc}</div>
      {isExpanded && (
        <div style={{ marginBottom: 8 }}>
          <button
            onClick={(e) => { e.stopPropagation(); onSeeMore(item); }}
            style={{
              background: "#f6f8fa", color: "#1f2328", border: "1px solid #d0d7de",
              fontSize: 12, fontWeight: 500, padding: "4px 12px",
              borderRadius: 6, cursor: "pointer",
              transition: "background 0.15s, border-color 0.15s",
            }}
            onMouseEnter={(e) => { e.target.style.background = "#eef1f4"; e.target.style.borderColor = "#bbb"; }}
            onMouseLeave={(e) => { e.target.style.background = "#f6f8fa"; e.target.style.borderColor = "#d0d7de"; }}
          >
            View details →
          </button>
        </div>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <span style={{
          fontSize: 12, color: "#1f2328", background: "#ddf4ff",
          padding: "1px 8px", borderRadius: 16, fontWeight: 500,
          border: "1px solid rgba(84,174,255,0.4)",
        }}>
          {item.tech?.split("·")[0]?.trim()}
        </span>
        {item.priority && (
          <span style={{
            fontSize: 12, fontWeight: 600,
            color: item.priority === "high" ? "#82071e" : "#7d4e00",
            background: item.priority === "high" ? "#ffebe9" : "#fff8c5",
            padding: "1px 8px", borderRadius: 16,
            border: `1px solid ${item.priority === "high" ? "rgba(255,129,130,0.4)" : "rgba(212,167,44,0.4)"}`,
          }}>
            {item.priority}
          </span>
        )}
      </div>
    </div>
  );
}

function ColumnHeader({ col, count }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 8,
      marginBottom: 8, padding: "0 2px",
    }}>
      <span style={{
        width: 14, height: 14, borderRadius: "50%",
        border: `2px solid ${col.color}`, display: "inline-block", flexShrink: 0,
      }} />
      <span style={{ fontSize: 14, fontWeight: 600, color: "#1f2328" }}>
        {col.label}
      </span>
      <span style={{
        fontSize: 12, color: "#656d76", background: "#eff1f3",
        padding: "0 8px", borderRadius: 16, fontWeight: 500, lineHeight: "20px",
      }}>
        {count}
      </span>
    </div>
  );
}

export default function JiraBoard() {
  const [selected, setSelected] = useState(null);
  const [sidebarProject, setSidebarProject] = useState(null);
  const isMobile = useIsMobile();

  const cols = [
    { key: "ideating", label: "Ideating", color: "#bf8700", items: projects.ideating },
    { key: "inProgress", label: "In Progress", color: "#0969da", items: projects.inProgress },
    { key: "completed", label: "Done", color: "#1a7f37", items: projects.completed },
  ];

  return (
    <div style={{
      height: "100%", display: "flex", flexDirection: "column",
      background: "#ffffff",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* Header bar */}
      <div style={{
        padding: isMobile ? "10px 12px" : "10px 16px",
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
        borderBottom: "1px solid #d0d7de",
        background: "#f6f8fa",
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="#656d76" style={{ flexShrink: 0 }}>
          <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0114.25 16H1.75A1.75 1.75 0 010 14.25V1.75zM6.5 6.5v8h7.75a.25.25 0 00.25-.25V6.5h-8zM6.5 5H15V1.75a.25.25 0 00-.25-.25H6.5V5zM5 1.5H1.75a.25.25 0 00-.25.25V5H5V1.5zM1.5 6.5v7.75c0 .138.112.25.25.25H5v-8H1.5z"/>
        </svg>
        <span style={{ fontWeight: 600, fontSize: 14, color: "#1f2328" }}>danboard</span>
        <span style={{
          fontSize: 12, color: "#656d76", background: "#eff1f3",
          padding: "0 8px", borderRadius: 16, fontWeight: 500, lineHeight: "20px",
        }}>
          Q2 2026
        </span>
        {!isMobile && (
          <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
            <button style={{
              background: "#f6f8fa", color: "#1f2328", border: "1px solid #d0d7de",
              fontSize: 12, fontWeight: 500, padding: "3px 12px",
              borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#656d76"><path d="M.75 3h14.5a.75.75 0 010 1.5H.75a.75.75 0 010-1.5zm3 4h8.5a.75.75 0 010 1.5h-8.5a.75.75 0 010-1.5zm3 4h2.5a.75.75 0 010 1.5h-2.5a.75.75 0 010-1.5z"/></svg>
              Filter
            </button>
            <button style={{
              background: "#f6f8fa", color: "#1f2328", border: "1px solid #d0d7de",
              fontSize: 12, fontWeight: 500, padding: "3px 12px",
              borderRadius: 6, cursor: "pointer", display: "flex", alignItems: "center", gap: 4,
            }}>
              <svg width="12" height="12" viewBox="0 0 16 16" fill="#656d76"><path d="M1.5 14.25c0 .138.112.25.25.25H4v-1.5H2.5v-1.5H1.5v2.75zm0-5.75h1V6h1.5V4.5H1.75a.25.25 0 00-.25.25V8.5zm12.5 2.5H12.5v1.5H14v-1.5h.25a.25.25 0 00.25-.25V8.5h-1v2.5h.5zM14 6V4.75a.25.25 0 00-.25-.25H12.5V6H14zM1.75 3A1.75 1.75 0 000 4.75v6.5C0 12.216.784 13 1.75 13h.5V11.5h-.5a.25.25 0 01-.25-.25v-6.5A.25.25 0 011.75 4.5h.5V3h-.5zM6 4.5h4V3H6v1.5zM6 14.5h4V13H6v1.5z"/></svg>
              Group by: Status
            </button>
          </div>
        )}
      </div>

      {/* Columns */}
      {isMobile ? (
        <div style={{ flex: 1, overflow: "auto", padding: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          {cols.map(col => (
            <div key={col.key}>
              <ColumnHeader col={col} count={col.items.length} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {col.items.map(item => (
                  <Card key={item.id} item={item} color={col.color} selected={selected} onSelect={setSelected} onSeeMore={setSidebarProject} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
          gap: 0, overflow: "hidden",
        }}>
          {cols.map((col, i) => (
            <div key={col.key} style={{
              padding: "12px 16px",
              display: "flex", flexDirection: "column", overflow: "hidden",
              borderRight: i < cols.length - 1 ? "1px solid #d0d7de" : "none",
              background: "#ffffff",
            }}>
              <ColumnHeader col={col} count={col.items.length} />
              <div style={{ flex: 1, overflow: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
                {col.items.map(item => (
                  <Card key={item.id} item={item} color={col.color} selected={selected} onSelect={setSelected} onSeeMore={setSidebarProject} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ProjectSidebar project={sidebarProject} onClose={() => setSidebarProject(null)} />
    </div>
  );
}
