import { useState, useRef, useEffect } from "react";
import { projects } from "./JiraBoard";

export default function Shell() {
  const [lines, setLines] = useState([{ type: "system", text: "dan-portfolio v2.0.26 — type 'help' for commands" }, { type: "prompt", text: "" }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  const allProjects = [...projects.ideating, ...projects.inProgress, ...projects.completed];
  const commands = {
    help: () => ["Available commands:", "  whoami        — about me", "  ls            — list all projects", "  cat <project> — view project details", "  skills        — technical skills", "  contact       — reach me", "  clear         — clear terminal", "  neofetch      — system info"],
    whoami: () => ["Daniel Lee (李安杰)", "M.S. Computer & Information Technology @ UPenn (4.0 GPA)", "Previously: Neuroscience researcher @ Salk Institute, UCSD", "Singaporean · Builder · Shipping code since the Salk days"],
    ls: () => { const f = (l, it) => [`  ${l}/`, ...it.map(p => `    ${p.name.toLowerCase().replace(/\s+/g, "-")}`)]; return ["projects/", ...f("ideating", projects.ideating), ...f("in-progress", projects.inProgress), ...f("completed", projects.completed)]; },
    skills: () => ["Languages:   Python · JavaScript/TypeScript · Java · C/C++ · SQL", "Frontend:    React · Next.js · Tailwind · Tauri", "Backend:     FastAPI · Node.js · Supabase · PostgreSQL", "AI/ML:       Ollama · Whisper · Gemini Nano · Grok Vision", "Tools:       Git · Docker · Linux · WebSocket · REST"],
    contact: () => ["GitHub:   github.com/danleeaj", "Site:     danleeaj.github.io"],
    neofetch: () => ["  ╔══════════════════╗", "  ║   DAN@PORTFOLIO  ║    OS: Human v28", "  ╚══════════════════╝    Host: UPenn MCIT", "                         Kernel: Neuroscience → SWE", "    ██████  ██████       Shell: zsh 5.9", "    ██████  ██████       Projects: " + allProjects.length, "    ██████  ██████       Uptime: since 1998", "                         Languages: EN, 中文", "    ██████  ██████       Theme: dark-mode-forever", "    ██████  ██████       Disk: 6 repos in progress", "    ██████  ██████       Memory: 4.0 GPA (no swap needed)"],
    clear: () => "CLEAR",
  };
  const handleCat = (arg) => { if (!arg) return ["usage: cat <project-name>", "example: cat musicboxd"]; const m = allProjects.find(p => p.name.toLowerCase().replace(/\s+/g, "-") === arg.toLowerCase() || p.name.toLowerCase() === arg.toLowerCase()); if (!m) return [`cat: ${arg}: No such project`, "try 'ls' to see available projects"]; return [`── ${m.name} ──────────────────`, `ID:    ${m.id}`, `Desc:  ${m.desc}`, `Stack: ${m.tech}`]; };
  const exec = (cmd) => { const t = cmd.trim(); if (!t) return; const [b, ...a] = t.split(/\s+/); const arg = a.join(" "); let o; if (b === "cat") o = handleCat(arg); else if (b === "clear") { setLines([{ type: "system", text: "Terminal cleared." }, { type: "prompt" }]); return; } else if (commands[b]) o = commands[b](); else o = [`zsh: command not found: ${b}`, "type 'help' for available commands"]; setLines(p => [...p.slice(0, -1), { type: "input", text: t }, ...o.map(x => ({ type: "output", text: x })), { type: "prompt" }]); setHistory(p => [t, ...p]); setHistIdx(-1); };
  const handleKey = (e) => { if (e.key === "Enter") { exec(input); setInput(""); } else if (e.key === "ArrowUp") { e.preventDefault(); if (history.length > 0) { const n = Math.min(histIdx + 1, history.length - 1); setHistIdx(n); setInput(history[n]); } } else if (e.key === "ArrowDown") { e.preventDefault(); if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); } else { setHistIdx(-1); setInput(""); } } else if (e.key === "Tab") { e.preventDefault(); const all = [...Object.keys(commands), "cat"]; const m = all.find(c => c.startsWith(input)); if (m) setInput(m); } };
  return (
    <div onClick={() => inputRef.current?.focus()} style={{ height: "100%", display: "flex", flexDirection: "column", background: "#0d1117", fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace", cursor: "text" }}>
      <div style={{ background: "#161b22", padding: "6px 12px", display: "flex", gap: 6, alignItems: "center", borderBottom: "1px solid #30363d", flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ color: "#8b949e", fontSize: 12, marginLeft: 12 }}>dan — zsh — 80×24</span>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: "8px 14px", fontSize: 13, lineHeight: 1.7 }}>
        {lines.map((line, i) => {
          if (line.type === "system") return <div key={i} style={{ color: "#8b949e", fontStyle: "italic" }}>{line.text}</div>;
          if (line.type === "input") return <div key={i}><span style={{ color: "#7ee787" }}>dan@portfolio</span><span style={{ color: "#79c0ff" }}>:~$ </span><span style={{ color: "#e6edf3" }}>{line.text}</span></div>;
          if (line.type === "output") return <div key={i} style={{ color: "#c9d1d9", whiteSpace: "pre" }}>{line.text}</div>;
          if (line.type === "prompt") return (<div key={i} style={{ display: "flex" }}><span style={{ color: "#7ee787" }}>dan@portfolio</span><span style={{ color: "#79c0ff" }}>:~$ </span><input ref={inputRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} autoFocus spellCheck={false} style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#e6edf3", fontFamily: "inherit", fontSize: "inherit", padding: 0, caretColor: "#7ee787" }} /></div>);
          return null;
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}