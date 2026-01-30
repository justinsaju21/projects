import { getAllProjects, Project } from "@/lib/sanity";
import ProjectsGrid from "@/components/ProjectsGrid";

// Fallback projects if Sanity has no data yet
const fallbackProjects: Project[] = [
  {
    _id: "1",
    title: "Hybrid Approximate Multiplier",
    slug: "hybrid-approximate-multiplier",
    description: "Verilog implementation of hybrid approximate multiplier for low-power computing applications.",
    category: "vlsi",
    tags: ["Verilog", "VLSI", "Low Power", "Research"],
    github: "https://github.com/justinsaju21/Hybrid_Approximate_Multiplier",
  },
  {
    _id: "2",
    title: "Stick Diagram Painter",
    slug: "stick-diagram-painter",
    description: "Tool for creating VLSI stick diagrams for circuit layout visualization.",
    category: "vlsi",
    tags: ["Python", "VLSI", "Physical Design"],
    github: "https://github.com/justinsaju21/stick-diagram-painter",
    streamlit: "https://justinsaju21-stick-diagram-painter-1--home-uunyi2.streamlit.app/",
  },
  {
    _id: "3",
    title: "CMOS Switch & Duality Visualizer",
    slug: "cmos-switch-duality",
    description: "Interactive visualization into Static CMOS Logic and CMOS Duality.",
    category: "vlsi",
    tags: ["Python", "Streamlit", "VLSI", "Education"],
    github: "https://github.com/justinsaju21/CMOS-Switch-Translator-Duality-Conduction-Visualizer",
    streamlit: "https://justinsaju21-cmos-switch-translator-duality-conducti-app-akx8f0.streamlit.app/",
  },
  {
    _id: "4",
    title: "LiFi Technology",
    slug: "lifi-technology",
    description: "Award-winning project demonstrating Visible Light Communication (VLC). 1st Place at TECHKNOW 2023-24.",
    category: "embedded",
    tags: ["LiFi", "VLC", "Research", "Hardware"],
    external: "https://www.canva.com/design/DAGz9JnPRWQ/uUnP_neB6SjSLBD8HjPErg/edit",
  },
  {
    _id: "5",
    title: "5x5x5 LED Matrix Display",
    slug: "led-matrix-5x5x5",
    description: "3D LED cube display with custom animations and patterns.",
    category: "embedded",
    tags: ["C++", "Arduino", "LED Matrix"],
    github: "https://github.com/justinsaju21/5x5x5_Led_Matrix_Display",
  },
  {
    _id: "6",
    title: "MQ3 Alcohol Sensor Monitor",
    slug: "mq3-alcohol-sensor",
    description: "Alcohol detection system with real-time monitoring via Blynk cloud platform.",
    category: "embedded",
    tags: ["C++", "Sensors", "IoT"],
    github: "https://github.com/justinsaju21/MQ3_Alcohol_Sensor",
  },
  {
    _id: "7",
    title: "Mechanical Moving Chessboard",
    slug: "mechanical-chessboard",
    description: "Real-time remote play chessboard with moving mechanical parts.",
    category: "embedded",
    tags: ["AutoCAD", "IoT", "Mechanical"],
  },
  {
    _id: "8",
    title: "MQ2 Gas Sensor",
    slug: "mq2-gas-sensor",
    description: "Gas leak detection system with alert functionality.",
    category: "embedded",
    tags: ["C++", "Sensors", "Safety"],
    github: "https://github.com/justinsaju21/MQ2_Gas_Sensor",
  },
  {
    _id: "9",
    title: "Music Player Buzzer",
    slug: "music-player-buzzer",
    description: "Embedded music player using buzzer with Blynk IoT integration.",
    category: "embedded",
    tags: ["C++", "Arduino", "IoT"],
    github: "https://github.com/justinsaju21/Music_Player_Buzzer",
  },
  {
    _id: "10",
    title: "DHT11 Environment Monitor",
    slug: "dht11-monitor",
    description: "Environmental monitoring system displaying temperature and humidity data.",
    category: "embedded",
    tags: ["C++", "DHT11", "IoT"],
    github: "https://github.com/justinsaju21/DHT11_TempHumid_Monitor",
  },
  {
    _id: "11",
    title: "LogicMap Pro",
    slug: "logicmap-pro",
    description: "Professional Karnaugh Map solver and visualizer built with Streamlit.",
    category: "virtual-labs",
    tags: ["Python", "Streamlit", "Digital Logic"],
    github: "https://github.com/justinsaju21/logicmap-pro",
    streamlit: "https://justinsaju21-logicmap-pro-app-kvmnf2.streamlit.app/",
  },
  {
    _id: "12",
    title: "Op-Amp Deep Dive Lab",
    slug: "opamp-lab",
    description: "Interactive virtual lab for understanding operational amplifier circuits.",
    category: "virtual-labs",
    tags: ["Python", "Electronics", "Simulation"],
    github: "https://github.com/justinsaju21/opamp-deep-dive-lab",
    streamlit: "https://justinsaju21-opamp-deep-dive-lab-app-hqjbjr.streamlit.app/",
  },
  {
    _id: "13",
    title: "Interactive CPU Lab",
    slug: "interactive-cpu-lab",
    description: "Hands-on CPU architecture simulation for Computer Organization studies.",
    category: "virtual-labs",
    tags: ["Python", "CPU", "Architecture"],
    github: "https://github.com/justinsaju21/interactive-cpu-lab",
    streamlit: "https://justinsaju21-interactive-cpu-lab-home-hqfnek.streamlit.app/",
  },
  {
    _id: "14",
    title: "Photobooth Mailer",
    slug: "photobooth-mailer",
    description: "Vintage-style web photobooth that captures photos and emails them.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "Email"],
    github: "https://github.com/justinsaju21/photobooth-mailer",
    streamlit: "https://justinsaju21-photobooth-mailer-main-l2yfdj.streamlit.app/",
  },
  {
    _id: "15",
    title: "Card Game / Card Selector Pro",
    slug: "card-game",
    description: "Interactive card-based game with professional selection features.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "Games"],
    github: "https://github.com/justinsaju21/card_game",
    streamlit: "https://cardgame-gn3aenokejqqn9wsd7odfn.streamlit.app/",
  },
  {
    _id: "16",
    title: "Cake App",
    slug: "cake-app",
    description: "Online cake ordering platform with custom cake builder.",
    category: "web-apps",
    tags: ["Python", "Streamlit", "E-commerce"],
    github: "https://github.com/justinsaju21/cake_app",
    streamlit: "https://cakeapp-rgfejhbe4wunz58scnz3fp.streamlit.app/",
  },
  {
    _id: "17",
    title: "4x4x4 LED Matrix Display",
    slug: "led-matrix-4x4x4",
    description: "3D LED cube display simulation with Arduino controlling 64 LEDs.",
    category: "circuits",
    tags: ["TinkerCAD", "Arduino", "LED Matrix"],
    tinkercad: "https://www.tinkercad.com/things/lQ8bzgYgQfN-4x4x4-led-matrix-display",
  },
  {
    _id: "18",
    title: "4-Bit Adder",
    slug: "4-bit-adder",
    description: "Full adder circuit implementation for 4-bit binary addition.",
    category: "circuits",
    tags: ["TinkerCAD", "Digital Logic", "Gates"],
    tinkercad: "https://www.tinkercad.com/things/aSvIQRK2Oic-4-bit-adder",
  },
];

export default async function Home() {
  // Try to fetch from Sanity, use fallback if empty
  let projects: Project[] = [];

  try {
    projects = await getAllProjects();
  } catch (error) {
    console.error("Failed to fetch from Sanity:", error);
  }

  // Use fallback if Sanity returns no projects
  if (!projects || projects.length === 0) {
    projects = fallbackProjects;
  }

  return <ProjectsGrid projects={projects} />;
}
