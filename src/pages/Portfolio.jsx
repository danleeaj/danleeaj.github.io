import { useState } from "react";

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

import CV from "../components/CV";
import JiraBoard from "../components/JiraBoard";
import Shell from "../components/Shell";
import Explorer from "../components/Explorer";
import Fairytale from "../components/Fairytale";
import AvatarPin from "../components/AvatarPin";

const MODES = [
  { id: "jira", label: "Board" },
  { id: "shell", label: "Shell" },
  { id: "fairytale", label: "Tale" },
  { id: "explorer", label: "Explorer" },
  { id: "cv", label: "CV" },
];

export default function Portfolio() {
  const [mode, setMode] = useState("jira");
  return (
    <div style={{ height: "100vh", minWidth: 0, display: "flex", flexDirection: "column", background: "#fafaf8", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <div style={{ padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e8e6e1", flexShrink: 0, overflow: "visible" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, overflow: "visible" }}>
          <AvatarPin />
          <div>
            <div style={{ fontSize: 20, fontWeight: 600, color: "#1a1a1a", letterSpacing: -0.5 }}>Daniel Lee</div>
            <div style={{ fontSize: 12, color: "#999", marginTop: 2 }}>李安杰 · builder of things</div>
            <div style={{ fontSize: 12, marginTop: 4, display: "flex", gap: 4, alignItems: "center" }}>
              <SocialLink href="https://github.com/danleeaj">GitHub</SocialLink>
              <span style={{ color: "#ccc" }}>·</span>
              <SocialLink href="https://linkedin.com/in/anjie-lee">LinkedIn</SocialLink>
            </div>
          </div>
        </div>
        <select
          value={mode}
          onChange={e => setMode(e.target.value)}
          aria-label="View mode"
          style={{
            padding: "6px 28px 6px 12px", fontSize: 13, fontWeight: 500,
            color: "#1a1a1a", background: "white", border: "1px solid #e0ddd7",
            borderRadius: 8, cursor: "pointer", fontFamily: "inherit",
            appearance: "none", WebkitAppearance: "none",
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23888' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center",
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
          }}
        >
          {MODES.map(m => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>
      <div style={{ flex: 1, margin: "16px 24px 24px", borderRadius: 12, border: "1px solid #e0ddd7", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.02)", background: "white" }}>
        {mode === "jira" && <JiraBoard />}
        {mode === "shell" && <Shell />}
        {mode === "fairytale" && <Fairytale />}
        {mode === "explorer" && <Explorer />}
        {mode === "cv" && <CV />}
      </div>
    </div>
  );
}
