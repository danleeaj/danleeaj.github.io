export type BadgeTone = "neutral" | "blue" | "green" | "orange" | "purple";

export type RoleLink = {
  emoji: string;
  href: string;
  label: string;
  roleLabel: string;
};

export type Project = {
  bullets?: string[];
  description: string;
  linkHref: string;
  linkLabel: string;
  name: string;
  stack: Array<{ label: string; tone: BadgeTone }>;
};

export type WorkExperience = {
  bullets: string[];
  date: string;
  organization: string;
  tag: { label: string; tone: BadgeTone };
};

export type MusicRelease = {
  embedHeight: number;
  embedTitle: string;
  embedUrl: string;
  id: string;
  subtitle: string;
  tag: string;
  title: string;
};

export const roleLinks: RoleLink[] = [
  {
    emoji: "💻",
    href: "/developer",
    label: "developer",
    roleLabel: "developer",
  },
  {
    emoji: "🎵",
    href: "/music",
    label: "singer-songwriter & producer",
    roleLabel: "singer-songwriter & producer",
  },
  {
    emoji: "🧬",
    href: "/neuroscience",
    label: "neuroscience researcher",
    roleLabel: "neuroscience researcher",
  },
];

export const developerProjects: Project[] = [
  {
    name: "Musicboxd",
    stack: [
      { label: "Next.js", tone: "green" },
      { label: "Supabase", tone: "purple" },
      { label: "PostgreSQL", tone: "blue" },
    ],
    description: "Letterboxd, but for music — log, rate, and review albums",
    bullets: [
      "MusicBrainz import pipeline with cover art handling",
      "Clerk + Supabase JWT auth integration",
      "Star rating system, album/track/review UI",
      "Row-level security policies for user data",
    ],
    linkHref: "https://github.com/danleeaj/musicboxd",
    linkLabel: "Github",
  },
  {
    name: "Subs",
    stack: [
      { label: "React", tone: "green" },
      { label: "Tauri", tone: "blue" },
      { label: "FastAPI", tone: "purple" },
    ],
    description: "Desktop app for video transcription and subtitle translation",
    bullets: [
      "Parallel Whisper API processing — ~5× speedup",
      "Silence-based audio chunking for accuracy",
      "GPT translation with sliding context windows",
      "SRT subtitle burning via ffmpeg",
    ],
    linkHref: "https://github.com/danleeaj/subs",
    linkLabel: "Github",
  },
  {
    name: "Summate AI",
    stack: [
      { label: "Python", tone: "blue" },
      { label: "AWS", tone: "purple" },
    ],
    description: "Multi-agent debate framework for grading — boosted accuracy from 64% to 90%",
    bullets: [
      "REST API via API Gateway for querying and feedback",
      "Serverless functions with AWS Lambda",
      "Concurrent processing — 25% faster processing time",
      "Streamlit UI for visual demos",
    ],
    linkHref: "https://summate-ai.streamlit.app/",
    linkLabel: "Demo",
  },
  {
    name: "Feynman",
    stack: [
      { label: "Python", tone: "blue" },
      { label: "FastAPI", tone: "green" },
      { label: "WebSocket", tone: "purple" },
    ],
    description: "Multimodal AI tutoring platform — built at HackPrinceton 2025",
    bullets: [
      "Real-time interaction via WebSocket + FastAPI",
      "Grok Vision for visual understanding",
      "ElevenLabs voice synthesis for spoken explanations",
    ],
    linkHref: "https://github.com/danleeaj/feynman",
    linkLabel: "Github",
  },
  {
    name: "Flow AI",
    stack: [
      { label: "JavaScript", tone: "green" },
      { label: "Chrome API", tone: "purple" },
    ],
    description: "Privacy-first Chrome extension using on-device Gemini Nano",
    bullets: [
      "Built for Chrome Built-In AI Hackathon",
      "All inference runs locally — no data leaves your browser",
    ],
    linkHref: "https://github.com/danleeaj/flow-ai",
    linkLabel: "Github",
  },
  {
    name: "CopyRepo",
    stack: [
      { label: "Python", tone: "blue" },
      { label: "PyPI", tone: "purple" },
    ],
    description: "CLI tool to copy repo contents to clipboard — published on PyPI",
    linkHref: "https://pypi.org/project/copyrepo/",
    linkLabel: "PyPI",
  },
  {
    name: "d_wordle.py",
    stack: [{ label: "Python", tone: "blue" }],
    description: "Terminal-based Wordle clone",
    bullets: ["Save/resume progress", "Three difficulty levels via CLI args", "Dictionary validation", "Scoreboard on exit"],
    linkHref: "https://github.com/danleeaj/d_wordle.py",
    linkLabel: "Github",
  },
  {
    name: "this site",
    stack: [{ label: "HTML/CSS", tone: "green" }],
    description: "The page you're looking at right now.",
    linkHref: "https://github.com/danleeaj/danleeaj.github.io",
    linkLabel: "Github",
  },
];

export const workExperiences: WorkExperience[] = [
  {
    date: "Sep 2023 - May 2025",
    organization: "Salk Institute",
    tag: { label: "Allen Lab", tone: "purple" },
    bullets: [
      "Developed macros and scripts to fully automate image data processing in Python and ImageJ Macro Language",
      "Optimized CellProfiler pipelines for enhanced image analysis and data extraction",
      "Performed sample preparation — immunostaining, brain slicing, slide mounting with cryostats",
    ],
  },
  {
    date: "Mar 2023 - Jun 2023",
    organization: "UC San Diego",
    tag: { label: "Jung Lab", tone: "blue" },
    bullets: [
      "Piloted experimental methods for a novel study on music-based Alzheimer's prevention",
      "Developed fully automated behavioral experiments using PsychoPy",
      "Analyzed and visualized EEG data using EEGLAB on MATLAB",
    ],
  },
  {
    date: "Jun 2023 - Aug 2023",
    organization: "National University of Singapore",
    tag: { label: "Feng Lab", tone: "green" },
    bullets: [
      "Processed and analyzed large population datasets using SPSS",
      "Aided in writing multiple journal manuscripts on healthy ageing",
    ],
  },
  {
    date: "Apr 2022 – Mar 2023",
    organization: "UC San Diego",
    tag: { label: "Teaching", tone: "orange" },
    bullets: [
      "Held office hours and discussion sections for biology courses",
      "Graded exams and homework, held extra sessions for struggling students",
    ],
  },
];

export const musicReleases: MusicRelease[] = [
  {
    id: "ride-to-the-sea",
    title: "坐车去海边",
    tag: "suzhou",
    subtitle: "a song about traveling the world",
    embedUrl: "https://open.spotify.com/embed/track/31UWx5Z5b6inZCL0EJ6ucy?utm_source=generator",
    embedHeight: 152,
    embedTitle: "坐车去海边 Spotify embed",
  },
  {
    id: "for-the-centuries",
    title: "一世纪相爱",
    tag: "for the centuries",
    subtitle: "first single off my upcoming album",
    embedUrl: "https://open.spotify.com/embed/track/2KdBl3cDs1zK0agPLXM9xu?utm_source=generator",
    embedHeight: 152,
    embedTitle: "一世纪相爱 Spotify embed",
  },
  {
    id: "there-was-a-place",
    title: "有一个地方",
    tag: "there was a place",
    subtitle: "my first ever album",
    embedUrl:
      "https://bandcamp.com/EmbeddedPlayer/album=3545554598/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/",
    embedHeight: 439,
    embedTitle: "有一个地方 Bandcamp embed",
  },
];
