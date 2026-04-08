function Section({ title, children }) {
  return (<div style={{ marginTop: 22 }}><div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, borderBottom: "1.5px solid #1a1a1a", paddingBottom: 3, marginBottom: 10 }}>{title}</div>{children}</div>);
}
function Entry({ title, meta, desc, bullets }) {
  return (<div style={{ marginBottom: 10 }}><div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>{meta && <div style={{ fontSize: 11, color: "#666", marginTop: 1 }}>{meta}</div>}{desc && <div style={{ fontSize: 12, color: "#333", marginTop: 3, lineHeight: 1.6 }}>{desc}</div>}{bullets && <ul style={{ margin: "3px 0 0 0", paddingLeft: 16, fontSize: 12, color: "#333", lineHeight: 1.6 }}>{bullets.map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}</ul>}</div>);
}

export default function CV() {
  return (
    <div style={{ background: "#ffffff", fontFamily: "'Charter', Georgia, serif", padding: "32px 40px", color: "#1a1a1a" }}>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: -0.5 }}>An Jie (Daniel) Lee</div>
        <div style={{ fontSize: 12, color: "#555", marginTop: 4, lineHeight: 1.6 }}>
          <a href="mailto:[email]" style={{ color: "#555" }}>[email]</a> · [phone]
        </div>

        <Section title="Education">
          <Entry title="University of Pennsylvania, Philadelphia, PA" meta="Master of Computer and Information Technology (GPA: 4.0/4.0) · Expected May 2027" desc="Coursework: Data Structures & Algorithms, Computer Systems Programming (C/C++), Software Development (Java), Discrete Mathematics & Probability" />
          <Entry title="University of California, San Diego, La Jolla, CA" meta="M.S., Biology (GPA: 3.7/4.0) · May 2025" desc={'Thesis: "Examining the Efficacy of Chrdl1 Overexpression on Alzheimer\'s Pathology in Tau Mice" · Advisor: Dr. Nicola Allen'} />
          <Entry title="" meta="B.S., Neurobiology, Minor in Accounting · June 2024" />
        </Section>

        <Section title="Skills">
          <div style={{ fontSize: 12, lineHeight: 1.8 }}>
            <div style={{ marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Programming Languages:</span> Python, Java, C, C++, JavaScript, TypeScript, SQL, HTML/CSS</div>
            <div style={{ marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Frameworks & Libraries:</span> React, Next.js, Node.js, FastAPI, LangChain, LangGraph, LangSmith, Pydantic</div>
            <div style={{ marginBottom: 4 }}><span style={{ fontWeight: 600 }}>Infrastructure & Tools:</span> RAG, PostgreSQL, Supabase, REST APIs, AWS, Docker, WebSockets, Claude/OpenAI APIs</div>
            <div><span style={{ fontWeight: 600 }}>Scientific Tools:</span> scikit-learn, CellProfiler, ImageJ, PsychoPy, EEGLAB (MATLAB), SPSS</div>
          </div>
        </Section>

        <Section title="Research Experience">
          <Entry title="Salk Institute for Biological Sciences, La Jolla, CA" meta="Molecular Neurobiology Laboratory — Graduate Research Assistant · Advisor: Dr. Nicola Allen · Sep 2023 – May 2025" bullets={[
            "Investigated whether astrocyte-specific overexpression of Chrdl1 can prevent tau pathology in the Tau P301S mouse model of Alzheimer's disease. Demonstrated sustained transgene overexpression in hippocampal astrocytes using AAV-PHP.eB under ALDH1l1 promoter, finding significant reduction in neurofibrillary tangle accumulation without inducing astrocyte reactivity.",
            "Built automated cell counting pipeline with image segmentation, domain knowledge-based feature engineering, and Random Forest Classifier, achieving 90% accuracy across 3,600+ images, increasing throughput 20x over manual counting (Python, scikit-learn).",
            "Developed colocalization analysis pipeline with multi-channel fluorescence feature extraction and k-means clustering across 1,000+ images, expanding coverage 30x (~100 to ~4,000 cells per sample).",
            "Optimized CellProfiler pipelines for enhanced image analysis and feature extraction.",
            "Developed macros and scripts to automate image data processing in Python and ImageJ Macro Language.",
            "Performed immunostaining, brain slicing, and slide mounting with cryostats."
          ]} />
          <Entry title="University of California, San Diego, La Jolla, CA" meta="Swartz Center for Computational Neuroscience — Undergraduate Researcher · Advisor: Dr. Tzyy-Ping Jung · Mar 2023 – Jun 2023" bullets={[
            "Piloted experimental methods for a novel study on how music superimposed with sound frequencies can contribute to Alzheimer's prevention.",
            "Developed and deployed fully automated human behavioral experiment using PsychoPy in Python.",
            "Analyzed and visualized EEG data using EEGLAB on MATLAB."
          ]} />
        </Section>

        <Section title="Teaching Experience">
          <Entry title="University of California, San Diego, La Jolla, CA" meta="" bullets={[
            "Graduate Teaching Assistant — Neurobiology Laboratory, Dr. Ashley Juavinett, Winter 2025",
            "Undergraduate Instructional Assistant — Dementia, Science and Society, Dr. Eduardo Macagno, Winter 2023",
            "Undergraduate Instructional Assistant — Multicellular Life, Dr. Melinda Owens, Spring 2022 & Fall 2022",
            "Mentored 120+ students with 95% satisfaction rating; taught data analysis in Python and led discussion sections.",
            "Conducted office hours and held extra sessions for students needing additional support.",
            "Graded exams and homework across multiple course offerings."
          ]} />
        </Section>

        <Section title="Projects">
          <Entry title="Feynman — Real-time Multimodal AI Learning" meta="HackPrinceton 2025, Team of 2 · Nov 2025 · github.com/danleeaj/feynman" bullets={[
            "Architected real-time WebSocket pipeline: canvas snapshot triggered by idle detection, sent to FastAPI server and Grok Vision for interpretation, returning structured output as markdown, mermaid diagrams, or text descriptions (React, Next.js, FastAPI).",
            "Designed MCP adapter layer to decouple vision and voice models: exposed server-side canvas state as REST /GET endpoint wrapped as an MCP tool, enabling ElevenLabs voice agent to query canvas content on demand.",
            "Optimized image resolution to minimize token cost while maintaining interpretation accuracy, achieving sub-500ms end-to-end latency from canvas update to voice response."
          ]} />
          <Entry title="Subs — Video Transcription/Translation App" meta="Feb 2026" bullets={[
            "Designed multi-stage processing pipeline with independent stages enabling error recovery without reprocessing completed stages (Electron, React).",
            "Achieved 5.5x throughput improvement through intelligent audio chunking (pydub silence detection with sliding window) and parallel Whisper API calls via concurrent.futures: 21-minute video processed in 16s vs. 88s sequential.",
            "Built job management system on SQLite supporting pause/resume, crash recovery, and automatic incomplete job detection on startup."
          ]} />
          <Entry title="Summate AI — Multi-Agent Autograder" meta="Dec 2024 – Apr 2025 · github.com/danleeaj/summate-ai" bullets={[
            "Designed multi-agent debate system: two agents seeded with opposing positions generate independent reasoning, an evaluator resolves disagreements with automatic re-debate rounds, raising inter-grader reliability from 64% to 90%.",
            "Deployed models locally via Ollama to protect student data privacy, avoiding third-party API calls.",
            "Validated LLM output structure with Pydantic for reliable JSON writes to PostgreSQL. Built 200+ edge case test scenarios to quantify model consistency under noisy input."
          ]} />
          <Entry title="Musicboxd — Letterboxd-style Music Review Platform" meta="Jan 2026" bullets={[
            "Designed full relational database schema (artists, albums, tracks, reviews) on Supabase with RLS policies and foreign key joins for nested data retrieval.",
            "Built Python import pipeline from MusicBrainz API, handling rate limiting, pagination, and track-level data extraction for thousands of records.",
            "Implemented album search, track listings, per-track and per-album ratings, and user review system with Supabase authentication."
          ]} />
          <Entry title="CopyRepo (cprp) — Open-source CLI Tool" meta="Feb 2025 · pypi.org/project/cprp/" desc="Published on PyPI. Formats codebases to text for LLM context with .gitignore filtering and one-command clipboard export." />
        </Section>

        <Section title="Publications">
          <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>
            Lee, A.J. (2025). "Examining the Efficacy of Chrdl1 Overexpression on Alzheimer's Pathology in Tau Mice." Master's Thesis, University of California, San Diego.
          </div>
        </Section>

        <Section title="Presentations">
          <div style={{ fontSize: 12, color: "#333", lineHeight: 1.6 }}>
            Lee, A.J. (2023). "Music for the Brain: Incorporation of Auditory Gamma Stimulation in Music Production to Improve Cognitive Function." BUMMP Annual Student Symposium, UC San Diego, La Jolla, CA, April 2023.
          </div>
        </Section>
      </div>
    </div>
  );
}