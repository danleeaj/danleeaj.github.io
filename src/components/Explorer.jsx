import { useState } from "react";

export default function Explorer() {
  const [page, setPage] = useState("home");
  const [counter] = useState(Math.floor(Math.random() * 900) + 100);
  const pageUrls = { home: "index.html", about: "about.html", projects: "projects.html", links: "links.html", guestbook: "guestbook.html" };
  const navLink = (label, target) => (<div><span onClick={() => setPage(target)} style={{ color: page === target ? "#800000" : "blue", textDecoration: "underline", cursor: "pointer", fontWeight: page === target ? "bold" : "normal" }}>{label}</span></div>);

  const renderPage = () => {
    if (page === "about") return (<><div style={{ fontSize: 16, fontWeight: "bold", color: "#800000" }}>About the Webmaster</div><hr style={{ border: "1px inset #c0c0c0" }} /><table border="0" cellPadding="4"><tbody><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>Name:</td><td style={{ fontSize: 12 }}>Daniel Lee (李安杰)</td></tr><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>From:</td><td style={{ fontSize: 12 }}>Singapore (the Lion City!)</td></tr><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>School:</td><td style={{ fontSize: 12 }}>UPenn MCIT (GPA: 4.0!!!)</td></tr><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>Previous:</td><td style={{ fontSize: 12 }}>Salk Institute, UCSD (neuroscience)</td></tr><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>Skills:</td><td style={{ fontSize: 12 }}>Python, JS/TS, Java, C/C++, React, Next.js</td></tr><tr><td style={{ fontSize: 12, color: "#800000", fontWeight: "bold" }}>Hobbies:</td><td style={{ fontSize: 12 }}>Music, gaming, building things</td></tr></tbody></table><div style={{ marginTop: 8, fontSize: 12, border: "1px dashed #999", padding: 6, background: "#f0f0f0" }}><b>Fun fact:</b> At the Salk Institute, I taught computers to identify brain cells 20x faster than humans could! Pretty cool right??</div></>);
    if (page === "projects") return (<><div style={{ fontSize: 16, fontWeight: "bold", color: "#800000" }}>My Projects</div><hr style={{ border: "1px inset #c0c0c0" }} /><div style={{ fontSize: 13, lineHeight: 1.8 }}>{[{ name: "QR Ordering App", desc: "Order food with your friends in real-time! Uses Next.js and Supabase. Very cool!!", tags: ["NEW!", "★HOT★"], tagColors: ["red", "#FF6600"] }, { name: "Musicboxd", desc: "Like Letterboxd but for MUSIC! Rate and review albums :)" }, { name: "Subs", desc: "Transcribe & translate videos. 5x faster with parallel chunking!!!" }, { name: "Summate AI", desc: "AI agents debate to grade stuff. 64% → 90% accuracy!" }, { name: "Feynman", desc: "AI tutor that can SEE and TALK. Built in 48 hours!!", extra: " (HackPrinceton)" }, { name: "Flow AI", desc: "Chrome extension — AI ON YOUR DEVICE. No data leaves your browser!" }].map((p, i) => (<div key={i} style={{ marginTop: i > 0 ? 6 : 0 }}><span style={{ fontSize: 16 }}>&#9658;</span>{" "}<span style={{ color: "blue", textDecoration: "underline", fontWeight: "bold" }}>{p.name}</span>{p.extra && <span style={{ fontSize: 10, color: "green" }}>{p.extra}</span>}{p.tags?.map((t, j) => <span key={j} style={{ color: p.tagColors[j], fontWeight: "bold", fontSize: 10 }}> {t}</span>)}<br /><span style={{ fontSize: 12, marginLeft: 20, display: "block" }}>{p.desc}</span></div>))}</div></>);
    if (page === "links") return (<><div style={{ fontSize: 16, fontWeight: "bold", color: "#800000" }}>Cool Links</div><hr style={{ border: "1px inset #c0c0c0" }} /><div style={{ fontSize: 12, lineHeight: 2.2 }}><div>&#127760; <span style={{ color: "blue", textDecoration: "underline" }}>My GitHub</span> - all my code lives here</div><div>&#127760; <span style={{ color: "blue", textDecoration: "underline" }}>danleeaj.github.io</span> - my fancy portfolio</div><div>&#127760; <span style={{ color: "blue", textDecoration: "underline" }}>University of Pennsylvania</span></div><div>&#127760; <span style={{ color: "blue", textDecoration: "underline" }}>Salk Institute</span></div><hr style={{ border: "1px inset #c0c0c0" }} /><div style={{ fontWeight: "bold", color: "#800000" }}>Friends' Pages:</div><div>&#128279; <span style={{ color: "blue", textDecoration: "underline" }}>xX_h4ck3r_Xx's Homepage</span></div><div>&#128279; <span style={{ color: "blue", textDecoration: "underline" }}>jenny98's Anime Page</span></div><div>&#128279; <span style={{ color: "blue", textDecoration: "underline" }}>CodeMaster2000's Java Tutorials</span></div><div style={{ fontSize: 10, color: "gray", marginTop: 4 }}>Want to trade links? Email me!!</div></div></>);
    if (page === "guestbook") return (<><div style={{ fontSize: 16, fontWeight: "bold", color: "#800000" }}>Guestbook</div><hr style={{ border: "1px inset #c0c0c0" }} /><div style={{ border: "2px inset #c0c0c0", padding: 8, background: "#ffffcc", marginBottom: 8 }}>{[{ name: "xX_h4ck3r_Xx", date: "03/15/2026", msg: "Cool page dude!! Love the projects" }, { name: "jenny98", date: "02/28/2026", msg: "nice projects dan! keep it up :D" }, { name: "webmaster_sg", date: "02/14/2026", msg: "Fellow Singaporean! Added you to my webring" }, { name: "java_joe", date: "01/30/2026", msg: "That Feynman project is insane. 48hrs???" }, { name: "anonymous", date: "01/15/2026", msg: "first!!1!" }].map((g, i) => (<div key={i} style={{ fontSize: 11, marginTop: i > 0 ? 6 : 0, paddingBottom: 6, borderBottom: i < 4 ? "1px dashed #ccc" : "none" }}><b style={{ color: "#000080" }}>{g.name}</b> <span style={{ color: "gray" }}>({g.date})</span><div style={{ fontStyle: "italic", marginTop: 2 }}>"{g.msg}"</div></div>))}</div><div style={{ fontSize: 12, fontWeight: "bold", color: "#800000", marginBottom: 4 }}>Sign my Guestbook!</div><div><input type="text" placeholder="Your name" style={{ border: "2px inset #c0c0c0", padding: 2, fontSize: 11, width: 100, marginRight: 4 }} /><input type="text" placeholder="Leave a message!" style={{ border: "2px inset #c0c0c0", padding: 2, fontSize: 11, width: 180, marginRight: 4 }} /><button style={{ border: "2px outset #c0c0c0", background: "#c0c0c0", fontSize: 11, padding: "2px 8px", cursor: "pointer" }}>Sign!</button></div></>);
    return (<><div style={{ fontSize: 16, fontWeight: "bold", color: "#800000" }}>Welcome!!!</div><hr style={{ border: "1px inset #c0c0c0" }} /><div style={{ fontSize: 13, lineHeight: 1.8 }}><p>Hello and welcome to my homepage!! My name is <b>Dan</b> (李安杰) and I am from <span style={{ color: "red" }}>Singapore</span>.</p><p>I am currently studying Computer Science at the University of Pennsylvania. Before that I did brain research at the Salk Institute in San Diego!!</p><p>I like building cool software projects, listening to music, and playing video games. Feel free to look around!!</p><p style={{ fontSize: 11, color: "green" }}>TIP: Click the links on the left to navigate my site :-)</p></div></>);
  };

  return (
    <div style={{ height: "100%", overflow: "auto", background: "#c0c0c0", fontFamily: "'Times New Roman', serif", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 900 }}>
      <div style={{ background: "#000080", color: "white", padding: "2px 8px", fontSize: 12, fontFamily: "'MS Sans Serif', Tahoma, sans-serif", display: "flex", alignItems: "center", gap: 8 }}>
        <span>Dan's Cool Home Page - Netscape Navigator 4.0</span>
        <span style={{ marginLeft: "auto", fontSize: 10, opacity: 0.7 }}>File  Edit  View  Go  Bookmarks</span>
      </div>
      <div style={{ background: "#e8e8e8", padding: "2px 8px", fontSize: 11, fontFamily: "Tahoma, sans-serif", borderBottom: "2px groove #c0c0c0", display: "flex", alignItems: "center", gap: 4 }}>
        <span>Location: </span>
        <span style={{ background: "white", border: "2px inset #c0c0c0", padding: "1px 6px", flex: 1, fontSize: 11 }}>http://www.geocities.com/~danleeaj/{pageUrls[page]}</span>
      </div>
      <div style={{ background: "white", padding: 16, margin: 4, border: "2px inset #c0c0c0" }}>
        <center>
          <div style={{ background: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)", height: 4, marginBottom: 8 }} />
          <div style={{ fontSize: 28, fontFamily: "'Comic Sans MS', cursive", color: "#FF00FF", fontWeight: "bold" }}>~*~ Dan's Project Page ~*~</div>
          <div style={{ fontSize: 13, color: "#000080", fontStyle: "italic" }}>Welcome to my corner of the World Wide Web!!!</div>
          <div style={{ fontSize: 10, color: "gray", marginTop: 4 }}>Last updated: April 7, 2026 · Best viewed in 800x600 · IE 5.0+</div>
          <div style={{ background: "linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)", height: 4, margin: "8px 0" }} />
        </center>
        <table border="0" cellPadding="4" width="100%"><tbody><tr>
          <td valign="top" width="140" style={{ borderRight: "1px dashed #999", paddingRight: 12, fontSize: 12 }}>
            <div style={{ fontWeight: "bold", color: "#800000", marginBottom: 4, fontSize: 14 }}>Navigation</div>
            {navLink("Home", "home")}{navLink("About Me", "about")}{navLink("Projects", "projects")}{navLink("Links", "links")}{navLink("Guestbook", "guestbook")}
            <hr style={{ border: "1px inset #c0c0c0" }} />
            <div style={{ fontSize: 10 }}><div style={{ fontWeight: "bold" }}>Webring:</div><div style={{ marginTop: 2 }}>{"<< "}<span style={{ color: "blue", textDecoration: "underline" }}>Prev</span>{" | "}<span style={{ color: "blue", textDecoration: "underline" }}>Next</span>{" >>"}</div><div style={{ fontSize: 9, color: "gray", marginTop: 2 }}>SG Coders Ring</div></div>
          </td>
          <td valign="top" style={{ paddingLeft: 12 }}>{renderPage()}</td>
        </tr></tbody></table>
        <center>
          <hr style={{ border: "1px inset #c0c0c0" }} />
          <div style={{ display: "inline-flex", gap: 8, marginTop: 4, alignItems: "center" }}>
            <div style={{ border: "1px solid gray", padding: "2px 10px", background: "#ffffcc", fontSize: 11, fontFamily: "monospace" }}>Visitors: {String(counter).padStart(6, "0")}</div>
            <div style={{ border: "2px outset #c0c0c0", padding: "2px 6px", fontSize: 10, background: "#c0c0c0" }}>Made with Notepad</div>
          </div>
          <div style={{ fontSize: 9, color: "gray", marginTop: 6 }}>© 2026 Dan Lee · This page is Netscape Now! compatible</div>
          <div style={{ fontSize: 9, color: "gray" }}>This site is a proud member of the GeoCities Singapore neighborhood</div>
        </center>
      </div>
      </div>
    </div>
  );
}