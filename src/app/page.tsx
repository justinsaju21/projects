"use client";

import { useState } from "react";
import { Github, ExternalLink, Play, ChevronDown, ChevronUp } from "lucide-react";

type Category = "all" | "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";

interface Project {
  id: string;
  title: string;
  description: string;
  category: "vlsi" | "embedded" | "virtual-labs" | "web-apps" | "circuits";
  tags: string[];
  github?: string;
  streamlit?: string;
  tinkercad?: string;
  external?: string;
}

const projects: Project[] = [
  // VLSI
  {
    id: "1",
    title: "Hybrid Approximate Multiplier",
    description: "Verilog implementation of hybrid approximate multiplier for low-power computing applications. Optimized for area and power efficiency.",
    category: "vlsi",
    tags: ["Verilog", "VLSI", "Low Power", "Research"],
    github: "https://github.com/justinsaju21/Hybrid_Approximate_Multiplier",
  },
  {
    id: "2",
    title: "Stick Diagram Painter",
    description: "Tool for creating VLSI stick diagrams for circuit layout visualization. Assists in understanding physical design rules.",
    category: "vlsi",
    tags: ["Python", "VLSI", "Physical Design", "Visualization"],
    github: "https://github.com/justinsaju21/stick-diagram-painter",
    streamlit: "https://justinsaju21-stick-diagram-painter-1--home-uunyi2.streamlit.app/",
  },
  {
    id: "3",
    title: "CMOS Switch & Duality Visualizer",
    description: "Interactive web application for deep-dive visualization into Static CMOS Logic and CMOS Duality. Essential lab tool for ECE students.",
    category: "vlsi",
    tags: ["Python", "Streamlit", "VLSI", "Education"],
    github: "https://github.com/justinsaju21/CMOS-Switch-Translator-Duality-Conduction-Visualizer",
    streamlit: "https://justinsaju21-cmos-switch-translator-duality-conducti-app-akx8f0.streamlit.app/",
  },
  // Embedded
  {
    id: "4",
    title: "LiFi Technology",
    description: "Award-winning project demonstrating Visible Light Communication (VLC). 1st Place at TECHKNOW 2023-24.",
    category: "embedded",
    tags: ["LiFi", "VLC", "Research", "Hardware"],
    external: "https://www.canva.com/design/DAGz9JnPRWQ/uUnP_neB6SjSLBD8HjPErg/edit",
  },
  {
    id: "5",
    title: "5x5x5 LED Matrix Display",
    description: "3D LED cube display with custom animations and patterns. Hardware project using Arduino/ESP.",
    category: "embedded",
    tags: ["C++", "Arduino", "LED Matrix", "Hardware"],
    github: "https://github.com/justinsaju21/5x5x5_Led_Matrix_Display",
  },
  {
    id: "6",
    title: "MQ3 Alcohol Sensor Monitor",
    description: "Alcohol detection system with real-time monitoring via Blynk cloud platform.",
    category: "embedded",
    tags: ["C++", "Sensors", "IoT", "Safety"],
    github: "https://github.com/justinsaju21/MQ3_Alcohol_Sensor",
  },
  {
    id: "7",
    title: "Mechanical Moving Chessboard",
    description: "Real-time remote play chessboard with moving mechanical parts. Designed in AutoCAD for cross-country gameplay.",
    category: "embedded",
    tags: ["AutoCAD", "IoT", "Mechanical", "Hardware"],
  },
  {
    id: "8",
    title: "MQ2 Gas Sensor",
    description: "Gas leak detection system with alert functionality for safety applications.",
    category: "embedded",
    tags: ["C++", "Sensors", "Safety", "IoT"],
    github: "https://github.com/justinsaju21/MQ2_Gas_Sensor",
  },
  {
    id: "9",
    title: "Music Player Buzzer",
    description: "Embedded music player using buzzer for melody playback with Blynk IoT integration.",
    category: "embedded",
    tags: ["C++", "Arduino", "IoT", "Blynk"],
    github: "https://github.com/justinsaju21/Music_Player_Buzzer",
  },
  {
    id: "10",
    title: "DHT11 Environment Monitor",
    description: "Environmental monitoring system displaying temperature and humidity data in real-time.",
    category: "embedded",
    tags: ["C++", "DHT11", "IoT", "Monitoring"],
    github: "https://github.com/justinsaju21/DHT11_TempHumid_Monitor",
  },
  // Virtual Labs
  {
    id: "11",
    title: "LogicMap Pro",
    description: "Professional Karnaugh Map solver and visualizer built with Streamlit. Simplifies Boolean algebra minimization for students.",
    category: "virtual-labs",
    tags: ["Python", "Streamlit", "Digital Logic"],
    github: "https://github.com/justinsaju21/logicmap-pro",
    streamlit: "https://justinsaju21-logicmap-pro-app-kvmnf2.streamlit.app/",
  },
  {
    id: "12",
    title: "Op-Amp Deep Dive Lab",
    description: "Interactive virtual lab for understanding operational amplifier circuits and their applications.",
    category: "virtual-labs",
    tags: ["Python", "Electronics", "Simulation"],
    github: "https://github.com/justinsaju21/opamp-deep-dive-lab",
    streamlit: "https://justinsaju21-opamp-deep-dive-lab-app-hqjbjr.streamlit.app/",
  },
  {
    id: "13",
    title: "Interactive CPU Lab",
    description: "Hands-on CPU architecture simulation for Computer Organization and Architecture studies.",
    category: "virtual-labs",
    tags: ["Python", "CPU", "Architecture"],
    github: "https://github.com/justinsaju21/interactive-cpu-lab",
    streamlit: "https://justinsaju21-interactive-cpu-lab-home-hqfnek.streamlit.app/",
  },
  // Web Apps
  {
    id: "14",
    title: "Photobooth Mailer",
    description: "Vintage-style web photobooth that captures photos and emails them directly to users.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "Email", "Camera"],
    github: "https://github.com/justinsaju21/photobooth-mailer",
    streamlit: "https://justinsaju21-photobooth-mailer-main-l2yfdj.streamlit.app/",
  },
  {
    id: "15",
    title: "Card Game / Card Selector Pro",
    description: "Interactive card-based game with professional selection process features.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "Games"],
    github: "https://github.com/justinsaju21/card_game",
    streamlit: "https://cardgame-gn3aenokejqqn9wsd7odfn.streamlit.app/",
  },
  {
    id: "16",
    title: "Cake App",
    description: "Online cake ordering platform with custom cake builder and order management.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "E-commerce"],
    github: "https://github.com/justinsaju21/cake_app",
    streamlit: "https://cakeapp-rgfejhbe4wunz58scnz3fp.streamlit.app/",
  },
  // Circuits
  {
    id: "17",
    title: "4x4x4 LED Matrix Display",
    description: "3D LED cube display simulation with Arduino controlling 64 LEDs in a matrix configuration.",
    category: "circuits",
    tags: ["TinkerCAD", "Arduino", "LED Matrix", "Simulation"],
    tinkercad: "https://www.tinkercad.com/things/lQ8bzgYgQfN-4x4x4-led-matrix-display",
  },
  {
    id: "18",
    title: "4-Bit Adder",
    description: "Full adder circuit implementation for 4-bit binary addition using logic gates.",
    category: "circuits",
    tags: ["TinkerCAD", "Digital Logic", "Adder", "Gates"],
    tinkercad: "https://www.tinkercad.com/things/aSvIQRK2Oic-4-bit-adder",
  },
];

const categories: { id: Category; label: string; color: string }[] = [
  { id: "all", label: "All Projects", color: "#a78bfa" },
  { id: "vlsi", label: "VLSI / Hybrid", color: "#ec4899" },
  { id: "embedded", label: "Embedded", color: "#22c55e" },
  { id: "virtual-labs", label: "Virtual Labs", color: "#06b6d4" },
  { id: "web-apps", label: "Web Apps", color: "#8b5cf6" },
  { id: "circuits", label: "Digital Circuits", color: "#f59e0b" },
];

const getCategoryColor = (category: string) => {
  const cat = categories.find((c) => c.id === category);
  return cat?.color || "#a78bfa";
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, 9);
  const hasMore = filteredProjects.length > 9;

  return (
    <main className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="heading-xl mb-4">
            <span style={{ color: "var(--foreground)" }}>Projects </span>
            <span className="text-gradient">Hub</span>
          </h1>
          <p className="body-lg" style={{ color: "var(--foreground-dim)", maxWidth: "600px", margin: "0 auto" }}>
            A curated collection of {projects.length} experiments, demos, and live projects spanning VLSI, Embedded Systems, Virtual Labs, and Web Applications.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => {
            const count = category.id === "all"
              ? projects.length
              : projects.filter((p) => p.category === category.id).length;

            return (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setShowAll(false);
                }}
                className="px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                style={{
                  background: activeCategory === category.id
                    ? `linear-gradient(135deg, ${category.color}, ${category.color}cc)`
                    : "rgba(30, 27, 75, 0.6)",
                  color: activeCategory === category.id ? "#030014" : "var(--foreground-muted)",
                  border: activeCategory === category.id
                    ? "none"
                    : "1px solid var(--glass-border)",
                }}
              >
                {category.label}
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: activeCategory === category.id ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.3)",
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card rounded-2xl p-6 group"
            >
              {/* Category Badge */}
              <div className="flex items-start justify-between mb-4">
                <span
                  className="px-3 py-1 text-xs rounded-full border"
                  style={{
                    backgroundColor: `${getCategoryColor(project.category)}20`,
                    color: getCategoryColor(project.category),
                    borderColor: `${getCategoryColor(project.category)}40`,
                  }}
                >
                  {project.category.replace("-", " ").toUpperCase()}
                </span>
              </div>

              {/* Content */}
              <h3
                className="text-xl font-bold mb-3 group-hover:text-[var(--accent-cyan)] transition-colors"
                style={{ color: "var(--foreground)" }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm mb-4 line-clamp-3"
                style={{ color: "var(--foreground-muted)" }}
              >
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      color: "var(--foreground-dim)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--glass-border)",
                      color: "var(--foreground-muted)",
                    }}
                    title="View on GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {project.streamlit && (
                  <a
                    href={project.streamlit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--glass-border)",
                      color: "#ef4444",
                    }}
                    title="View Live Demo"
                  >
                    <Play className="w-5 h-5" />
                  </a>
                )}
                {project.tinkercad && (
                  <a
                    href={project.tinkercad}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--glass-border)",
                      color: "#f97316",
                    }}
                    title="View on TinkerCAD"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
                {project.external && (
                  <a
                    href={project.external}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg transition-all hover:scale-110"
                    style={{
                      background: "rgba(0,0,0,0.3)",
                      border: "1px solid var(--glass-border)",
                      color: "#8b5cf6",
                    }}
                    title="View Documentation"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all hover:scale-105"
              style={{
                border: "1px solid var(--glass-border)",
                color: "var(--foreground-muted)",
                background: "transparent",
              }}
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>Show All {filteredProjects.length} Projects <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="text-center mt-20 pt-10" style={{ borderTop: "1px solid var(--glass-border)" }}>
          <p style={{ color: "var(--foreground-dim)" }}>
            Part of the{" "}
            <a
              href="https://justinsaju.me"
              className="hover:underline"
              style={{ color: "var(--accent-cyan)" }}
            >
              Justin Saju Ecosystem
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}
