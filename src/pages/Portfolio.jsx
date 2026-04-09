import { useState, useEffect } from "react";

function SocialLink({ href, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        color: hovered ? "#2563eb" : "#4a90d9",
        textDecoration: "none",
        display: "inline-block",
        position: "relative",
        transition: "transform 0.3s ease, color 0.3s ease",
        transform: hovered ? "scale(1.03)" : "translateY(0) scale(1)",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          left: 0,
          bottom: -1,
          height: 1.5,
          background: "#2563eb",
          borderRadius: 1,
          transition: "width 0.3s ease",
          width: hovered ? "100%" : "0%",
        }}
      />
    </a>
  );
}

function Tinkering() {
  const frames = [1, 2, 3, 3, 3, 3];
  const [frame, setFrame] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setFrame(f => (f + 1) % frames.length), 400);
    return () => clearInterval(id);
  }, []);
  const dots = frames[frame];
  return (
    <div style={{ fontSize: 12, color: "#999", marginTop: 0, fontFamily: "'JetBrains Mono', monospace", letterSpacing: 0.1 }}>
      Tinkering{".".repeat(dots)}
    </div>
  );
}

import CV from "../components/CV";
import JiraBoard from "../components/JiraBoard";
import Shell from "../components/Shell";
import Explorer from "../components/Explorer";
// import Fairytale from "../components/Fairytale";
import Homepage from "../components/Homepage";
import Recursion from "../components/Recursion";
import AvatarPin from "../components/AvatarPin";

const MODES = [
  { id: "home", label: "Notion" },
  { id: "jira", label: "Jira Board" },
  { id: "shell", label: "Shell" },
  // { id: "fairytale", label: "Tale" },
  { id: "explorer", label: "HTML" },
  { id: "cv", label: "CV" },
  { id: "recursion", label: "Recurse?" },
];

export default function Portfolio() {
  const initialMode = window.location.hash === "#recursion" ? "recursion" : "home";
  const [mode, setMode] = useState(initialMode);
  const [pinExploded, setPinExploded] = useState(false);
  return (
    <div style={{ height: "100vh", minWidth: 0, display: "flex", flexDirection: "column", background: "#fafaf8", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <style>{`
        @keyframes gap-bounce {
          0%   { gap: 12px; }
          80%  { gap: 24px; }
          100% { gap: 22px; }
        }
        .view-tab {
          padding: 5px 12px;
          font-size: 12.5px;
          font-weight: 500;
          color: #8a8884;
          background: none;
          border: 1px solid transparent;
          border-radius: 6px;
          cursor: pointer;
          font-family: inherit;
          transition: color 0.15s ease, background 0.15s ease, border-color 0.15s ease;
          white-space: nowrap;
        }
        .view-tab:hover {
          color: #1a1a1a;
          background: #f5f4f0;
        }
        .view-tab.active {
          color: #1a1a1a;
          background: white;
          border-color: #e0ddd7;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06);
        }
        .view-tabs-row {
          display: flex;
          align-items: center;
          gap: 2px;
          flex-wrap: nowrap;
          padding-left: 12px;
        }
        .view-as-label {
          font-size: 11.5px;
          font-weight: 500;
          color: #b4b1ab;
          letter-spacing: 0.03em;
          margin-right: 6px;
          white-space: nowrap;
          text-transform: lowercase;
        }
        .portfolio-header {
          padding: 12px 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e8e6e1;
          flex-shrink: 0;
          overflow: visible;
        }
        @media (max-width: 800px) {
          .portfolio-header {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
            padding: 12px 16px;
          }
          .view-tabs-row {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
            padding-bottom: 2px;
          }
          .view-tabs-row::-webkit-scrollbar { display: none; }
          .view-tab { padding: 4px 10px; font-size: 11.5px; flex-shrink: 0; }
          .view-as-label { font-size: 10.5px; margin-right: 4px; flex-shrink: 0; }
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Jacquard+24&display=swap" rel="stylesheet" />
      <div className="portfolio-header">
        <div style={{ display: "flex", alignItems: "center", gap: pinExploded ? 20 : 12, overflow: "visible", animation: pinExploded ? "gap-bounce 0.5s ease forwards" : "none" }}>
          <AvatarPin onExplode={() => setPinExploded(true)} />
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#1a1a1a", letterSpacing: -0.5 }}>An Jie (Daniel) Lee</div>
            <Tinkering />
            <div style={{ fontSize: 12, marginTop: 6, display: "flex", gap: 4, alignItems: "center" }}>
              <SocialLink href="https://github.com/danleeaj">GitHub</SocialLink>
              <span style={{ color: "#ccc" }}>·</span>
              <SocialLink href="https://linkedin.com/in/anjie-lee">LinkedIn</SocialLink>
            </div>
          </div>
        </div>
        <nav className="view-tabs-row" aria-label="View mode">
          <span className="view-as-label">view as</span>
          {MODES.map(m => (
            <button
              key={m.id}
              className={`view-tab${mode === m.id ? " active" : ""}`}
              onClick={() => setMode(m.id)}
              aria-pressed={mode === m.id}
            >
              {m.label}
            </button>
          ))}
        </nav>
      </div>
      <div style={{ flex: 1, margin: "16px 24px 24px", borderRadius: 2, border: "1px solid #e0ddd7", overflow: "auto", boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)", background: "white" }}>
        {mode === "home" && <Homepage />}
        {mode === "jira" && <JiraBoard />}
        {mode === "shell" && <Shell />}
        {/* {mode === "fairytale" && <Fairytale />} */}
        {mode === "explorer" && <Explorer />}
        {mode === "cv" && <CV />}
        {mode === "recursion" && <Recursion />}
      </div>
    </div>
  );
}
