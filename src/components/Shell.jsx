import { useState, useRef, useEffect, useCallback } from "react";

/* ── virtual filesystem ─────────────────────────────────────────── */
const projects = {
  ideating: [
    { name: "Polyglot", id: "POLY-1", desc: "Multi-language interactive coding notebook", tech: "React · Monaco · Docker" },
  ],
  inProgress: [
    { name: "Musicboxd", id: "MBX-12", desc: "Letterboxd-style music review platform", tech: "Next.js · Supabase · PostgreSQL · Clerk · MusicBrainz" },
    { name: "QR Orders", id: "QRO-8", desc: "QR code restaurant collaborative ordering", tech: "Next.js · Supabase Realtime · Toast API" },
    { name: "Subs", id: "SUB-5", desc: "Desktop video transcription & translation tool", tech: "Tauri · React · FastAPI · Whisper API · SQLite" },
  ],
  completed: [
    { name: "Summate AI", id: "SUM-20", desc: "Multi-agent debate grading system (64% → 90% accuracy)", tech: "Python · Ollama · Local LLM inference" },
    { name: "Flow AI", id: "FLO-15", desc: "Privacy-first Chrome extension using on-device Gemini Nano", tech: "Chrome Built-in AI · JavaScript" },
    { name: "Feynman", id: "FEY-10", desc: "Multimodal AI tutoring platform (HackPrinceton 48hr)", tech: "FastAPI · WebSocket · Grok Vision · ElevenLabs" },
    { name: "CopyRepo", id: "CPR-3", desc: "CLI tool for formatting codebases for LLM context", tech: "Python · PyPI" },
  ],
};

function slug(name) { return name.toLowerCase().replace(/\s+/g, "-"); }

function buildFS() {
  const fs = {
    "~": { type: "dir", children: ["projects", "experience", "education", "resume.txt", ".env"] },
    "~/projects": { type: "dir", children: ["ideating", "in-progress", "completed"] },
    "~/projects/ideating": { type: "dir", children: projects.ideating.map(p => slug(p.name)) },
    "~/projects/in-progress": { type: "dir", children: projects.inProgress.map(p => slug(p.name)) },
    "~/projects/completed": { type: "dir", children: projects.completed.map(p => slug(p.name)) },
    "~/experience": { type: "dir", children: ["salk-institute.md", "upenn-ta.md"] },
    "~/education": { type: "dir", children: ["upenn-mcit.md", "ucsd-neuro.md", "ucsd-bio.md"] },
    "~/resume.txt": { type: "file", content: [
      "An Jie (Daniel) Lee", "═══════════════════", "",
      "Master's of Applied Science in Computer Science @ University of Pennslyvania",
      "Master's of Science in Biology @ UC San Diego",
      "Bachelor's of Science in Neurobiology @ UC San Diego", "",
      "Currently based in Philadelphia, PA", "",
      "linked.com/in/anjie-lee · github.com/danleeaj · danleeaj.github.io",
    ]},

    "~/.env": { type: "file", content: [
      "# .env — DO NOT COMMIT",
      "",
      "ANTHROPIC_API_KEY=sk-ant-nice-try-lol-this-is-a-portfolio-not-a-repo",
    ]},
    "~/experience/salk-institute.md": { type: "file", content: [
      "# Salk Institute for Biological Studies", "## Graduate Research Assistant — Allen Lab", "",
      "Built automated cell identification pipelines.",
      "Investigated impact of astrocyte-secreted factor on Alzheimer's in mice.", "",
    ]},
    "~/experience/upenn-ta.md": { type: "file", content: [
      "# Teaching Assistant — UC San Diego", "",
      "TA for 120+ students across multiple courses.",
      "Ran labs, graded, held office hours.",
    ]},
    "~/education/upenn-mcit.md": { type: "file", content: [
      "# University of Pennsylvania", "## M.A.S. Computer Science", "",
      "Courses: Algorithms, Systems Programming, Data Structures,",
      "Discrete Math, Software Design", "",
    ]},
    "~/education/ucsd-neuro.md": { type: "file", content: [
      "# UC San Diego & Salk Institute", "## M.S. Biology", "",
      "Courses: NeuroAI, Bioinformatics, Biostatistics, Computational Models in Neuro",
      "Thesis: Effect of astrocyte-secreted factor on Tau pathology in Alzheimer's",
    ]},
    "~/education/ucsd-bio.md": { type: "file", content: [
      "# UC San Diego", "## B.S. Neurobiology", "",
      "Minor: Accounting (why?)",
    ]},
  };
  const allProjects = [
    ...projects.ideating.map(p => ({ ...p, status: "ideating" })),
    ...projects.inProgress.map(p => ({ ...p, status: "in-progress" })),
    ...projects.completed.map(p => ({ ...p, status: "completed" })),
  ];
  for (const p of allProjects) {
    const s = slug(p.name);
    const base = `~/projects/${p.status}/${s}`;
    fs[`~/projects/${p.status}`].children = fs[`~/projects/${p.status}`].children || [];
    fs[base] = { type: "dir", children: ["README.md", "package.json"] };
    fs[`${base}/README.md`] = { type: "file", content: [
      `# ${p.name}`, `> ${p.desc}`, "", `**ID:** ${p.id}`, `**Stack:** ${p.tech}`, `**Status:** ${p.status}`,
    ]};
    fs[`${base}/package.json`] = { type: "file", content: [
      "{", `  "name": "${s}",`, `  "version": "0.${p.id.split("-")[1]}.0",`,
      `  "description": "${p.desc}",`,
      `  "keywords": [${p.tech.split(" · ").map(t => `"${t.toLowerCase()}"`).join(", ")}],`,
      `  "author": "Daniel Lee <dan@portfolio>"`, "}",
    ]};
  }
  return fs;
}

const FS = buildFS();

function resolve(cwd, path) {
  if (!path) return cwd;
  let parts;
  if (path === "~" || path.startsWith("~/")) {
    parts = path === "~" ? ["~"] : ["~", ...path.slice(2).split("/").filter(Boolean)];
  } else if (path === "/") {
    return "~";
  } else if (path.startsWith("/")) {
    parts = ["~", ...path.slice(1).split("/").filter(Boolean)];
  } else {
    parts = [...cwd.split("/"), ...path.split("/").filter(Boolean)];
  }
  const stack = [];
  for (const p of parts) {
    if (p === "..") { if (stack.length > 1) stack.pop(); }
    else if (p !== ".") stack.push(p);
  }
  return stack.join("/") || "~";
}

function displayPath(p) { return p === "~" ? "~" : "~/" + p.slice(2); }

/* ── cowsay ──────────────────────────────────────────────────────── */
function cowsay(msg) {
  const w = Math.min(msg.length, 40);
  const words = msg.split(" ");
  const lines = [];
  let cur = "";
  for (const word of words) {
    if (cur && (cur + " " + word).length > w) { lines.push(cur); cur = word; }
    else cur = cur ? cur + " " + word : word;
  }
  if (cur) lines.push(cur);
  const maxLen = Math.max(...lines.map(l => l.length));
  const top = " " + "_".repeat(maxLen + 2);
  const bot = " " + "-".repeat(maxLen + 2);
  const body = lines.length === 1
    ? [`< ${lines[0].padEnd(maxLen)} >`]
    : lines.map((l, i) => {
        const pad = l.padEnd(maxLen);
        if (i === 0) return `/ ${pad} \\`;
        if (i === lines.length - 1) return `\\ ${pad} /`;
        return `| ${pad} |`;
      });
  return [
    top, ...body, bot,
    "        \\   ^__^",
    "         \\  (oo)\\_______",
    "            (__)\\       )\\/\\",
    "                ||----w |",
    "                ||     ||",
  ];
}

/* ── tree ────────────────────────────────────────────────────────── */
function tree(path, depth = 0, prefix = "", maxDepth = 3) {
  const node = FS[path];
  if (!node || node.type !== "dir" || depth >= maxDepth) return [];
  const lines = [];
  const children = node.children || [];
  children.forEach((child, i) => {
    const isLast = i === children.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const childPath = path + "/" + child;
    const childNode = FS[childPath];
    const isDir = childNode && childNode.type === "dir";
    lines.push(prefix + connector + child + (isDir ? "/" : ""));
    if (isDir) {
      const nextPrefix = prefix + (isLast ? "    " : "│   ");
      lines.push(...tree(childPath, depth + 1, nextPrefix, maxDepth));
    }
  });
  return lines;
}

/* ── animated dots ────────────────────────────────────────────── */
function AnimatedDots() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const id = setInterval(() => setCount(c => (c % 3) + 1), 400);
    return () => clearInterval(id);
  }, []);
  return <span>{".".repeat(count)}</span>;
}

/* ── component ───────────────────────────────────────────────────── */
export default function Shell() {
  const [lines, setLines] = useState([
    { type: "prompt" },
  ]);
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState("~");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [crt, setCrt] = useState(true);
  const [mode, setMode] = useState("shell"); // "shell" | "claude-boot" | "claude"
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const allProjects = [...projects.ideating, ...projects.inProgress, ...projects.completed];

  const knownFuture = [
    "grep", "find", "head", "tail", "wc", "pip", "npm", "brew",
    "docker", "git", "man", "top", "htop", "ping", "ssh", "curl",
    "vim", "nano", "wget", "apt", "chmod", "chown", "ps", "kill",
    "echo", "whoami", "hostname", "df", "du", "tar", "zip", "unzip",
    "python", "python3", "node", "java", "gcc", "make", "cargo",
    "sl", "cmatrix", "skills", "contact", "help",
  ];

  const exec = useCallback((cmd) => {
    const t = cmd.trim();
    if (!t) return;
    const [base, ...args] = t.split(/\s+/);
    const arg = args.join(" ");
    let out = [];

    const pushResult = (output) => {
      setLines(prev => [
        ...prev.slice(0, -1),
        { type: "input", text: t, cwd },
        ...output.map(x => ({ type: "output", text: x })),
        { type: "prompt" },
      ]);
    };

    switch (base) {
      case "ls": {
        const target = resolve(cwd, arg || ".");
        const node = FS[target];
        if (!node || node.type !== "dir") {
          out = [`ls: cannot access '${arg}': No such file or directory`];
        } else {
          out = (node.children || []).map(c => {
            const cp = target + "/" + c;
            const cn = FS[cp];
            return cn && cn.type === "dir" ? `\x1b[34m${c}/\x1b[0m` : c;
          });
          if (out.length === 0) out = ["(empty)"];
        }
        break;
      }
      case "cd": {
        if (!arg || arg === "~") { setCwd("~"); out = []; break; }
        const target = resolve(cwd, arg);
        const node = FS[target];
        if (!node) { out = [`cd: no such file or directory: ${arg}`]; }
        else if (node.type !== "dir") { out = [`cd: not a directory: ${arg}`]; }
        else { setCwd(target); out = []; }
        break;
      }
      case "cat": {
        if (!arg) { out = ["usage: cat <file>", "try: cat README.md, cat resume.txt"]; break; }
        const target = resolve(cwd, arg);
        const node = FS[target];
        if (!node) { out = [`cat: ${arg}: No such file or directory`]; }
        else if (node.type === "dir") { out = [`cat: ${arg}: Is a directory`]; }
        else { out = node.content; }
        break;
      }
      case "pwd": {
        out = [displayPath(cwd)];
        break;
      }
      case "tree": {
        const target = resolve(cwd, arg || ".");
        const node = FS[target];
        if (!node || node.type !== "dir") {
          out = [`tree: '${arg || "."}': No such directory`];
        } else {
          const name = arg || displayPath(cwd);
          out = [name + "/", ...tree(target)];
        }
        break;
      }
      case "cowsay": {
        const msg = arg || "moo. hire dan.";
        out = cowsay(msg);
        break;
      }
      case "rm": {
        out = [
          "",
          "  error: you do not have admin privileges.",
          "",
        ];
        break;
      }
      case "sudo": {
        if (arg.startsWith("rm")) {
          out = [
            "",
            "  rm: it is dangerous to operate recursively on '/'",
            "  rm: and I'm not about to let you nuke my portfolio.",
            "",
            "  nice try though.",
            "",
          ];
        } else {
          out = [`sudo: ${arg}: you're not in the sudoers file. You are therefore not allowed to sudo.`];
        }
        break;
      }
      case "crt": {
        setCrt(p => !p);
        out = [`CRT filter ${!crt ? "enabled" : "disabled"}.`];
        break;
      }
      case "clear": {
        setLines([{ type: "prompt" }]);
        setHistory(p => [t, ...p]);
        setHistIdx(-1);
        return;
      }
      case "claude": {
        const bootLines = [
          "",
          "\x1b[33m  ╭─────────────────────────────────────╮\x1b[0m",
          "\x1b[33m  │\x1b[0m  \x1b[1m✻ Claude Code\x1b[0m            v1.0.26  \x1b[33m│\x1b[0m",
          "\x1b[33m  │\x1b[0m  by Anthropic                       \x1b[33m│\x1b[0m",
          "\x1b[33m  ╰─────────────────────────────────────╯\x1b[0m",
          "",
          "  \x1b[32m✓\x1b[0m Loaded project: dan-portfolio",
          "  \x1b[32m✓\x1b[0m Model: claude-sonnet-4-20250514",
          "  \x1b[32m✓\x1b[0m Context: 128k tokens available",
          "",
          "  Type a prompt to get started. /exit to quit.",
          "",
        ];
        setLines(prev => [
          ...prev.slice(0, -1),
          { type: "input", text: t, cwd },
          ...bootLines.map(x => ({ type: "output", text: x })),
          { type: "claude-prompt" },
        ]);
        setMode("claude");
        setHistory(prev => [t, ...prev]);
        setHistIdx(-1);
        return;
      }
      default: {
        if (knownFuture.includes(base)) {
          out = [
            `zsh: command recognized but not yet installed: ${base}`,
            // "",
            // "  this command is on the roadmap but i don't have",
            // "  the capacity to implement it at the moment.",
            // "",
            // "  try: ls, cd, cat, tree, pwd, cowsay, neofetch, crt",
          ];
        } else {
          out = [
            `zsh: command not found: ${base}`,
            // "",
            // "  try: ls, cd, cat, tree, pwd, cowsay, neofetch, crt",
          ];
        }
      }
    }

    pushResult(out);
    setHistory(prev => [t, ...prev]);
    setHistIdx(-1);
  }, [cwd, crt, allProjects.length]);

  const handleClaudeInput = useCallback((text) => {
    if (!text.trim()) return;
    if (text.trim() === "/exit") {
      setLines(prev => [
        ...prev.slice(0, -1),
        { type: "claude-input", text },
        { type: "output", text: "  \x1b[33mExiting Claude Code.\x1b[0m" },
        { type: "output", text: "" },
        { type: "prompt" },
      ]);
      setMode("shell");
      return;
    }
    // phase 1: show their input, then "thinking" with delay, then rejection
    setLines(prev => [
      ...prev.slice(0, -1),
      { type: "claude-input", text },
      { type: "output", text: "" },
      { type: "thinking" },
    ]);
    setMode("claude-boot");
    setTimeout(() => {
      setLines(prev => [
        ...prev,
        { type: "output", text: "" },
        { type: "output", text: "  lol no i can't do this" },
        { type: "output", text: "  i'm a fake terminal on a portfolio site" },
        { type: "output", text: "  what did you expect" },
        { type: "output", text: "" },
        { type: "output", text: "  \x1b[33m✻ Claude Code exited.\x1b[0m" },
        { type: "output", text: "" },
        { type: "prompt" },
      ]);
      setMode("shell");
    }, 1500);
  }, []);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      if (mode === "claude") { handleClaudeInput(input); setInput(""); return; }
      if (mode === "claude-boot") return;
      exec(input); setInput("");
    }
    else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const n = Math.min(histIdx + 1, history.length - 1);
        setHistIdx(n); setInput(history[n]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx > 0) { setHistIdx(histIdx - 1); setInput(history[histIdx - 1]); }
      else { setHistIdx(-1); setInput(""); }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmds = ["ls", "cd", "cat", "tree", "pwd", "cowsay", "neofetch", "sudo", "crt", "clear"];
      // also autocomplete file/dir names if after a space
      const parts = input.split(/\s+/);
      if (parts.length <= 1) {
        const m = cmds.find(c => c.startsWith(input));
        if (m) setInput(m);
      } else {
        // tab-complete paths
        const partial = parts[parts.length - 1];
        const dirPath = partial.includes("/")
          ? resolve(cwd, partial.substring(0, partial.lastIndexOf("/")))
          : cwd;
        const fragment = partial.includes("/") ? partial.substring(partial.lastIndexOf("/") + 1) : partial;
        const node = FS[dirPath];
        if (node && node.type === "dir") {
          const match = node.children.find(c => c.startsWith(fragment));
          if (match) {
            parts[parts.length - 1] = partial.includes("/")
              ? partial.substring(0, partial.lastIndexOf("/") + 1) + match
              : match;
            setInput(parts.join(" "));
          }
        }
      }
    }
  };

  /* ── ANSI-lite renderer ── */
  const renderText = (text) => {
    const colorMap = {
      "\x1b[30m": "#484f58", "\x1b[31m": "#ff7b72", "\x1b[32m": "#7ee787",
      "\x1b[33m": "#d29922", "\x1b[34m": "#79c0ff", "\x1b[35m": "#d2a8ff",
      "\x1b[36m": "#a5d6ff", "\x1b[1m": null,
    };
    const parts = text.split(/(\x1b\[[0-9;]*m)/);
    let currentColor = null;
    let bold = false;
    return parts.map((part, i) => {
      if (part === "\x1b[0m") { currentColor = null; bold = false; return null; }
      if (part === "\x1b[1m") { bold = true; return null; }
      if (colorMap[part] !== undefined) { currentColor = colorMap[part]; return null; }
      if (part.startsWith("\x1b[")) return null;
      if (!part) return null;
      return (
        <span key={i} style={{
          color: currentColor || undefined,
          fontWeight: bold ? 700 : undefined,
        }}>{part}</span>
      );
    });
  };

  const promptPath = cwd === "~" ? "~" : "~/" + cwd.slice(2);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      style={{
        height: "100%", display: "flex", flexDirection: "column",
        background: "#0d1117",
        fontFamily: "'SF Mono', 'Fira Code', 'Cascadia Code', monospace",
        cursor: "text", position: "relative", overflow: "hidden",
      }}
    >
      {/* CRT overlay */}
      {crt && (
        <>
          <div style={{
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px, transparent 1px, transparent 3px)",
            mixBlendMode: "multiply",
          }} />
          <div style={{
            position: "absolute", inset: 0, zIndex: 11, pointerEvents: "none",
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)",
          }} />
        </>
      )}

      {/* title bar */}
      <div style={{
        background: "#161b22", padding: "6px 12px",
        display: "flex", gap: 6, alignItems: "center",
        borderBottom: "1px solid #30363d", flexShrink: 0, zIndex: 20,
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
        <span style={{ color: "#8b949e", fontSize: 12, marginLeft: 12 }}>
          dan — zsh — 80×24 {crt && "· CRT"}
        </span>
      </div>

      {/* terminal body */}
      <div style={{
        flex: 1, overflow: "auto", padding: "8px 14px",
        fontSize: 13, lineHeight: 1.7, zIndex: 5,
      }}>
        <style>{`
          @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
          .term-body::-webkit-scrollbar { width: 6px; }
          .term-body::-webkit-scrollbar-track { background: transparent; }
          .term-body::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
        `}</style>
        {lines.map((line, i) => {
          if (line.type === "system") {
            return <div key={i} style={{ color: "#8b949e", fontStyle: "italic" }}>{line.text}</div>;
          }
          if (line.type === "input") {
            const p = line.cwd === "~" ? "~" : "~/" + line.cwd.slice(2);
            return (
              <div key={i}>
                <span style={{ color: "#7ee787" }}>dan@portfolio</span>
                <span style={{ color: "#79c0ff" }}>:{p}$ </span>
                <span style={{ color: "#e6edf3" }}>{line.text}</span>
              </div>
            );
          }
          if (line.type === "output") {
            return (
              <div key={i} style={{ color: "#c9d1d9", whiteSpace: "pre" }}>
                {renderText(line.text)}
              </div>
            );
          }
          if (line.type === "thinking") {
            return (
              <div key={i} style={{ color: "#d2a8ff", whiteSpace: "pre" }}>
                {"  ⧗ Thinking"}<AnimatedDots />
              </div>
            );
          }
          if (line.type === "prompt") {
            return (
              <div key={i} style={{ display: "flex" }}>
                <span style={{ color: "#7ee787" }}>dan@portfolio</span>
                <span style={{ color: "#79c0ff" }}>:{promptPath}$&nbsp;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  autoFocus
                  spellCheck={false}
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "#e6edf3", fontFamily: "inherit", fontSize: "inherit",
                    padding: 0, caretColor: "#7ee787",
                  }}
                />
              </div>
            );
          }
          if (line.type === "claude-prompt") {
            return (
              <div key={i} style={{ display: "flex" }}>
                <span style={{ color: "#d2a8ff" }}>✻ </span>
                <span style={{ color: "#d2a8ff", opacity: 0.7 }}>&gt;&nbsp;</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  autoFocus
                  spellCheck={false}
                  placeholder="ask claude anything..."
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "#e6edf3", fontFamily: "inherit", fontSize: "inherit",
                    padding: 0, caretColor: "#d2a8ff",
                  }}
                />
              </div>
            );
          }
          if (line.type === "claude-input") {
            return (
              <div key={i}>
                <span style={{ color: "#d2a8ff" }}>✻ </span>
                <span style={{ color: "#d2a8ff", opacity: 0.7 }}>&gt; </span>
                <span style={{ color: "#e6edf3" }}>{line.text}</span>
              </div>
            );
          }
          return null;
        })}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}