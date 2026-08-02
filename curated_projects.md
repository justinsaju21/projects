# Curated GitHub Projects

Here are your detailed, AI-curated project write-ups ready for your portfolio.

## ESP32 Volumetric 5x5x5 LED Cube
**Category:** Hardware
**Tags:** C++, ESP32, Embedded Systems, Hardware Engineering, Web Development, IoT, Multiplexing, Arduino
**GitHub URL:** https://github.com/justinsaju21/5x5x5_Led_Matrix_Display

### Description
A fully wireless, 3D volumetric LED display controlled by an ESP32, featuring a custom web-based interface for real-time animations and text messaging.

### Detailed Write-up (Markdown)
```markdown
## Project Overview
This project implements a 5x5x5 volumetric LED cube—a captivating 3D display comprising 125 LEDs. By leveraging an ESP32 microcontroller, the cube transitions from a static sculpture to a dynamic, internet-connected device. Users can interact with the cube via a custom, TailwindCSS-powered web interface, triggering complex 3D animations or broadcasting scrolling text messages directly from their smartphone or computer browser.

## Core Features
- **Wireless Interaction**: Hosts an onboard local web server, eliminating the need for hardwired controls or dedicated apps.
- **Dynamic Visual Effects**: Pre-programmed patterns, including Rain, Spirals, Fireworks, and 3D Wipes, utilize high-speed refreshing to create the illusion of fluid 3D movement.
- **Interactive Text**: Supports custom string input (up to 20 characters), rendered as a 3D marquee display.
- **Responsive UI**: A lightweight, mobile-friendly control panel served directly from the ESP32 SPIFFS memory.

## Technical Implementation
### Hardware Architecture
The cube utilizes **multiplexing** to manage 125 LEDs with a limited number of GPIO pins. 
- **Column Control**: Driven by four daisy-chained 74HC595 shift registers, which reduce the requirement for individual pin connections by serializing the data input.
- **Layer Switching**: Uses five NPN transistors (e.g., 2N2222) acting as high-speed switches for the common cathodes, allowing the ESP32 to strobe layers rapidly to exploit persistence of vision (POV).

### Communication & Software
- **Firmware**: Written in C++ using the Arduino framework, optimized for asynchronous web server handling.
- **Integration**: The system uses SPI communication to feed data to the shift registers, ensuring high-speed updates for fluid animation frames.
- **Workflow**: 
  1. Define WiFi credentials in the firmware.
  2. Upload code via Arduino IDE.
  3. Identify the ESP32's local IP address via the Serial Monitor.
  4. Navigate to the IP in any web browser to control the display.

## Development Insights
This project provides an excellent case study in managing hardware constraints through software engineering. By mastering shift register daisy-chaining and transistor-based layer switching, one can scale simple LED projects into complex volumetric displays. The inclusion of a web-based UI demonstrates the power of the ESP32 as an all-in-one controller for IoT and interactive visual media.
```

---

## AI Fitness Trainer
**Category:** AI
**Tags:** TypeScript, Next.js, React, MediaPipe, Computer Vision, Tailwind CSS
**GitHub URL:** https://github.com/justinsaju21/AI-Fitness-Trainer

### Description
A privacy-focused, real-time exercise coach that utilizes computer vision to analyze form and track repetition counts directly in the browser.

### Detailed Write-up (Markdown)
```markdown
# AI Fitness Trainer

The AI Fitness Trainer is a high-performance web application designed to act as a personal coach by providing real-time biomechanical feedback. By leveraging browser-based computer vision through MediaPipe, the application tracks body landmarks to ensure users perform exercises with proper form and a full range of motion.

## Core Functionality

*   **Real-time Pose Estimation**: Uses advanced skeletal tracking to map human movement in 3D space.
*   **Intelligent Rep Counting**: Implements state machine logic that validates the start and end positions of each exercise to ensure only complete, high-quality repetitions are logged.
*   **Form Correction**: The system monitors for common errors—such as torso swinging or improper alignment—and provides visual cues to correct posture instantly.
*   **Privacy-First Architecture**: Unlike many cloud-based fitness solutions, this application processes all video data locally within the user's browser, ensuring that sensitive biometric data never leaves the device.

## Supported Exercises

The trainer currently supports a variety of popular movements, including:
- Bicep Curls
- Squats
- Shoulder Press
- Lateral Raises
- Lunges

## Technical Architecture

The project is built with a modern stack prioritizing speed and developer experience:
- **Frontend**: Next.js 14 with React providing a highly responsive UI.
- **Computer Vision**: Google's MediaPipe Pose library for low-latency landmark detection.
- **Styling**: Tailwind CSS for a clean, accessible, and responsive dashboard.
- **Logic Layer**: A centralized configuration system in `workouts.ts` that allows for easy extension and addition of new exercise definitions, including unique thresholds and landmark constraints.

## Getting Started

1. **Clone the repository**:
   `git clone <repository-url>`

2. **Navigate to the web application**:
   `cd web-app`

3. **Install dependencies**:
   `npm install`

4. **Launch the development server**:
   `npm run dev`

Access the application at `http://localhost:3000` and grant camera permissions to begin your session.
```

---

## AI-Enabled Virtual IoT Laboratory
**Category:** Engineering
**Tags:** TypeScript, React, Node.js, Express, WebSockets, Tailwind CSS, Digital Twin, IoT, Recharts
**GitHub URL:** https://github.com/justinsaju21/AI-Virtual-Sensor-Lab-w-RT-IoT-Data

### Description
An enterprise-grade Digital Twin platform that simulates real-time IoT sensor environments, providing interactive diagnostics, automated AI tutoring, and advanced signal processing for STEM education.

### Detailed Write-up (Markdown)
```markdown
## Overview
The AI-Enabled Virtual IoT Laboratory is a comprehensive, production-ready Digital Twin ecosystem designed to bridge the gap between physical sensor hardware and remote educational accessibility. By simulating 17 distinct IoT sensor types, the platform provides an immersive laboratory experience without the need for physical equipment.

## Key Features

### Intelligent Learning Assistant
- **Context-Aware Tutoring:** A built-in AI chat widget that understands the specific sensor being viewed, providing technical explanations, syntax-highlighted code blocks, and educational feedback.
- **Adaptive Assessment:** Features a dynamic AI quiz generator and a mistake-detection system that identifies anomalous data patterns, guiding students through common troubleshooting scenarios.

### Advanced Visualization & Diagnostics
- **Real-Time Data Pipeline:** Utilizes a robust WebSocket architecture to deliver high-frequency (10Hz) sensor updates with zero data loss.
- **Signal Processing Suite:** Includes integrated tools for noise gating, moving averages, and a unique **Fault Injection System**. This system allows students to simulate real-world hardware failures—such as stuck-at-zero, noise bursts, or signal drift—to practice diagnostic skills.

### Professional Tooling
- **Production-Grade Dashboard:** Built with Tailwind CSS and Recharts, the UI provides dual-layer visualization (raw vs. processed data), historical trend analysis, and automated PDF report generation.
- **Deployment Ready:** Designed with a modular architecture that supports local development, containerized testing, and seamless cloud deployment via Vercel and Render.

## Technical Architecture
- **Frontend:** Built with React and TypeScript, leveraging Tailwind CSS for a responsive, dark-mode-optimized user interface.
- **Backend:** A high-performance Express server handling WebSocket connections and serving RESTful API endpoints for system status and configuration.
- **Integration:** Includes comprehensive Arduino code templates and wiring diagrams, making the transition from virtual simulation to physical implementation seamless for students and engineers alike.
```

---

## Personal Portfolio & Blog Engine
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Vercel, Frontend
**GitHub URL:** https://github.com/justinsaju21/blog

### Description
A high-performance personal blog platform built with Next.js, featuring automatic font optimization and seamless deployment workflows.

### Detailed Write-up (Markdown)
```markdown
## Overview
This project serves as a robust, modern foundation for a personal blog or content-driven web application. Built using the latest Next.js framework, it leverages server-side rendering and static site generation capabilities to ensure optimal performance and SEO.

## Key Features
- **Modern Tech Stack**: Developed using TypeScript for type safety and maintainability.
- **Performance Optimized**: Integrates `next/font` for automatic optimization of custom fonts, specifically utilizing the Geist font family for a clean, modern aesthetic.
- **Rapid Iteration**: Built with the Next.js App Router, enabling hot-reloading and intuitive file-based routing.
- **Cloud-Ready**: Pre-configured for seamless deployment to the Vercel ecosystem, allowing for instantaneous global distribution and CI/CD pipelines.

## Technical Implementation
The architecture follows a modular approach, separating concerns into clear directories within the `app/` folder. This structure facilitates easy scaling as the blog grows from simple static pages to a feature-rich CMS-integrated platform.

## Getting Started
To set up this environment locally:

1. Clone the repository.
2. Install dependencies via your preferred package manager (npm, yarn, pnpm, or bun).
3. Run the development environment: `npm run dev`.
4. Access the application at `http://localhost:3000` to begin development.
```

---

## Glaze & Grace Cake Ordering Portal
**Category:** Web Development
**Tags:** Python, Streamlit, Google Sheets API, Automation, Web Development, SMTP
**GitHub URL:** https://github.com/justinsaju21/cake_app

### Description
A comprehensive, automated cake ordering web application that simplifies custom cake design, real-time pricing, and order management for local bakeries.

### Detailed Write-up (Markdown)
```markdown
## Overview
Glaze & Grace is a professional-grade web application designed to digitize the cake ordering workflow. By leveraging Streamlit for the interface and Google Sheets as a lightweight, flexible database, the application bridges the gap between customer customization and bakery operations.

## Core Features

### 🎨 Interactive Cake Designer
Customers can build their dream cake through an intuitive interface. Options include selecting flavor profiles, structural shapes, and adding custom toppings. The app even supports uploading reference photos to ensure the baker perfectly executes the client's vision.

### 💰 Dynamic Pricing Engine
Transparency is key in retail. The application calculates costs in real-time as users modify their order parameters, providing an instant quote before they commit to the purchase.

### 📦 Administrative Command Center
Behind the scenes, the application features a secure, password-protected Admin Dashboard. This allows shop owners to:
- Track incoming orders in real-time.
- Update order status (e.g., 'In Progress', 'Baked', 'Out for Delivery').
- Manage customer data efficiently via integration with Google Sheets.
- Export order records for accounting.

### 📧 Automated Notifications & Payments
Manual order confirmation is a thing of the past. The app utilizes SMTP integration to automatically dispatch confirmation emails to both the customer and the shop owner. Additionally, it integrates UPI payment flows, streamlining the financial side of the transaction.

## Technical Architecture
- **Frontend:** Streamlit, providing a rapid, responsive, and data-focused user interface.
- **Data Persistence:** Google Sheets API, allowing for easy data accessibility without the overhead of a traditional SQL database.
- **Communication:** Python-based SMTP handling for automated email workflows.

## Potential Use Cases
While built for cake ordering, the underlying architecture is highly modular and could be easily adapted for any small business requiring custom product configurations, such as custom floral arrangements, gift hampers, or localized catering services.
```

---

## Card Selector Pro
**Category:** Web Development
**Tags:** Python, Streamlit, CSS3, UI/UX, Web Development
**GitHub URL:** https://github.com/justinsaju21/card_game

### Description
A premium, interactive deck management tool featuring 3D animations and immersive UI design for a high-end tabletop experience.

### Detailed Write-up (Markdown)
```markdown
## Overview
Card Selector Pro is a sophisticated web application designed for gamers and hobbyists who need a reliable, high-performance tool for managing card decks. Built from the ground up to provide a tactile experience, the app replaces traditional analog shuffling with smooth CSS 3D transforms, intuitive state management, and an engaging user interface.

## Key Features

### 🎯 Precision Interaction
Experience a state-of-the-art 3D card flip animation that brings digital deck management to life. The interface provides immediate visual feedback, ensuring every draw feels deliberate and satisfying.

### 📦 Flexible Deck Management
- **Manual Entry:** Rapidly input your card list directly via the sidebar.
- **File Integration:** Seamless support for `.txt` and `.csv` uploads for quick batch importing.
- **Quick Start:** Includes pre-loaded sample decks to demonstrate core functionality instantly.

### 🔄 Intelligent Logic
- **Automated Discard Tracking:** Every card drawn is tracked in a reverse-chronological history, keeping your game state organized.
- **Seamless Reset:** A one-click shuffle feature that returns all discarded cards to the active deck with a celebratory visual flourish.
- **Multi-Sensory Feedback:** Includes strategic audio cues for interactions, providing a polished, premium feel to the application.

## Technical Implementation
The application is engineered using **Python** for core logic and **Streamlit** to handle the rapid development of the frontend. To push beyond standard Streamlit aesthetics, the project incorporates **custom CSS 3D transforms and keyframe animations**, resulting in a responsive, mobile-first design that works seamlessly across desktop and handheld devices.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/justinsaju21/card_game.git
   cd card_game
   ```

2. **Setup Environment:**
   ```bash
   python -m venv venv
source venv/bin/activate  # Or .\venv\Scripts\activate on Windows
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Launch:**
   ```bash
   streamlit run app.py
   ```
```

---

## CMOS Duality Explorer
**Category:** VLSI
**Tags:** Python, Streamlit, VLSI, CMOS Logic, Boolean Algebra, Circuit Simulation, Education Technology
**GitHub URL:** https://github.com/justinsaju21/CMOS-Switch-Translator-Duality-Conduction-Visualizer

### Description
An interactive, educational web platform that visualizes CMOS logic duality, enabling students to explore transistor-level circuits through real-time conductivity simulation.

### Detailed Write-up (Markdown)
```markdown
## Overview

CMOS Duality Explorer is an interactive visualization tool designed to bridge the gap between abstract Boolean algebra and physical transistor-level implementation. By leveraging the principles of Static CMOS logic, this application provides an immersive environment where students can observe how NMOS and PMOS networks function as complementary pairs to realize digital logic.

## Why It Matters

In VLSI design, understanding the relationship between the Pull-Up Network (PUN) and the Pull-Down Network (PDN) is critical. Students often struggle to visualize the dual nature of CMOS gates. This tool demystifies the process by rendering live schematics that react to input changes, providing immediate feedback on current flow and logic states.

## Key Features

- **Dynamic Switch-Level Schematics**: Interactive visualization showing real-time conductivity through NMOS and PMOS networks.
- **Custom Boolean Parser**: A custom-built recursive descent parser that converts user-provided logic expressions into functional dual CMOS topologies.
- **Conductivity Highlighting**: Features a 'Neon Green' trace visualization, allowing users to trace the path of current from $V_{DD}$ or $GND$ to the output node.
- **Automatic Inversion Logic**: Intelligent detection of non-inverting expressions, automatically triggering the visualization of secondary output inverter stages.
- **Educational Integration**: A dedicated theory module that explains the 'Zero Static Power' characteristics and the physical reality of duality in integrated circuits.

## Technical Architecture

- **Frontend**: Built on [Streamlit](https://streamlit.io) for a responsive, browser-based interaction model.
- **Logic Engine**: Employs a custom recursive descent parser (`logic_parser.py`) to decompose Boolean expressions into network trees.
- **Duality Logic**: Implements the logic for automatic PDN-to-PUN mapping, ensuring accurate schematic generation.
- **SVG Rendering**: A specialized animation engine that translates circuit states into dynamic SVG schematics.

## Getting Started

To run the explorer locally, ensure you have Python installed, then follow these steps:

```bash
git clone https://github.com/your-username/cmos-duality-explorer.git
cd cmos-duality-explorer
pip install -r requirements.txt
streamlit run app.py
```

Once running, navigate to the **Playground** tab to begin exploring standard gates like NAND, NOR, or input your own custom Boolean logic to witness the dual network generation in action.
```

---

## Modern Student Portfolio Template
**Category:** Web Development
**Tags:** Next.js, TypeScript, Tailwind CSS, Framer Motion, Web Development, Portfolio
**GitHub URL:** https://github.com/justinsaju21/Demo_Portfolio

### Description
A sleek, animated portfolio template built with Next.js and Tailwind CSS that allows students to launch a professional site in under 10 minutes using AI-assisted configuration.

### Detailed Write-up (Markdown)
```markdown
### Overview
Establishing a strong digital presence is essential for modern engineering students, but building a personal website from scratch can be time-consuming. The **Modern Student Portfolio Template** is designed to bridge this gap, providing a high-performance, aesthetically pleasing foundation built on the latest web technologies.

### Why This Template?
This project prioritizes developer experience and speed. By utilizing **Next.js 16** and **Tailwind CSS 4**, it ensures lightning-fast load times and a modern design system that is fully responsive. The inclusion of **Framer Motion** adds professional-grade animations that help your projects stand out to recruiters.

### The AI Advantage
Unlike traditional templates, this repository includes a specialized workflow for AI-assisted setup:
1. **Data-Driven Configuration**: Simply fill out a single `my_details.txt` file with your credentials and project history.
2. **AI Integration**: Use tools like Cursor or Antigravity AI to automatically map your data to the site’s components, eliminating the need to manually hunt through dozens of files.

### Technical Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (Theme-ready)
- **Animation**: Framer Motion
- **Deployment**: Optimized for Vercel

### Deployment Guide
1. **Clone & Personalize**: Populate your data via the `my_details.txt` workflow or manual component editing.
2. **Version Control**: Push your changes to a public GitHub repository.
3. **Deploy**: Connect your repository to [Vercel](https://vercel.com). The project is pre-configured for zero-config deployment, allowing you to go live in under a minute after pushing your code.

### Customization
The project structure follows a modular component-based architecture. All core sections (Hero, Projects, Experience, Contact) are encapsulated in `src/components/sections/`, making it simple to rearrange or extend the site as your career grows.
```

---

## ESP32 Environmental Monitor
**Category:** IoT
**Tags:** C++, ESP32, IoT, Embedded Systems, Web Development, DHT11, HTML/CSS/JS
**GitHub URL:** https://github.com/justinsaju21/DHT11_TempHumid_Monitor

### Description
A high-performance IoT environmental monitoring system that streams real-time temperature and humidity data to a sleek, responsive web dashboard hosted directly on an ESP32.

### Detailed Write-up (Markdown)
```markdown
## Overview
This project transforms the popular ESP32 microcontroller into a self-contained environmental monitoring node. By leveraging the DHT11 sensor and the ESP32's integrated WiFi capabilities, this system serves a fully functional, mobile-responsive web interface without the need for an external server or cloud backend.

## Key Features
- **Edge Computing**: All logic and the web server are hosted locally on the microcontroller, ensuring privacy and reliability.
- **Dynamic UI**: Features a modern, user-friendly dashboard with support for both Light and Dark modes.
- **Interactive Controls**: Users can toggle temperature units between Celsius and Fahrenheit on the fly and utilize a soft power switch feature to simulate device management.
- **Visual Analytics**: Implements dynamic color scaling to provide instant visual feedback on environmental comfort levels.

## Technical Implementation
The architecture utilizes the `ESP32WebServer` library to handle HTTP requests while concurrently processing sensor data via the Adafruit DHT library. 

- **Networking**: Configured via mDNS, allowing users to access the dashboard through a local hostname rather than just an IP address.
- **State Management**: Uses `ArduinoJson` to efficiently serialize sensor data for the frontend, ensuring the dashboard remains lightweight and responsive.

## Getting Started
### Wiring Guide
To deploy the system, connect your DHT11 sensor to the ESP32 as follows:
- **DHT11 Signal Pin**: GPIO 26
- **VCC**: 3.3V or 5V
- **GND**: GND

### Configuration
Security is prioritized by isolating sensitive network information. Users must create a `secrets.h` file in the project directory:
```cpp
#ifndef SECRETS_H
#define SECRETS_H
const char* WIFI_SSID = "YOUR_SSID";
const char* WIFI_PASSWORD = "YOUR_PASSWORD";
#endif
```

### Deployment
1. Ensure the required libraries (`DHT sensor library`, `ArduinoJson`) are installed via the Arduino Library Manager.
2. Upload the firmware to your ESP32 board.
3. Open the Serial Monitor to identify the assigned IP address, then navigate to that address in any modern web browser to view your live data.
```

---

## Digital Logic FSM Lab
**Category:** Engineering
**Tags:** Python, Streamlit, Digital Logic, Verilog, EDA Tools, Graphviz
**GitHub URL:** https://github.com/justinsaju21/digital-logic-fsm-lab

### Description
An interactive web-based laboratory for designing, simulating, and synthesizing Finite State Machines (FSMs) with automatic Verilog generation.

### Detailed Write-up (Markdown)
```markdown
# Digital Logic FSM Lab

Digital Logic FSM Lab is an interactive virtual environment designed to streamline the study and design of Finite State Machines (FSMs). Built for ECE students and digital logic enthusiasts, this tool bridges the gap between theoretical state diagrams and synthesizable hardware implementation.

## Core Capabilities

### General FSM Visualizer
- **Declarative Design**: Use simple RTL-inspired syntax to define state transitions, enabling rapid prototyping of complex logic.
- **Real-time Simulation**: Interactive controls allow users to step through state transitions, perform resets, and observe logic changes on the fly.
- **Automated HDL Generation**: Export designs directly to Verilog modules and testbenches, making it ready for implementation on FPGAs or simulation in tools like ModelSim or Vivado.

### Automatic Sequence Detector Generator
This module automates the tedious parts of digital circuit design. Users simply input a target binary sequence (e.g., `1011`), and the engine handles:
- **Machine Type Selection**: Support for both Moore and Mealy architectures.
- **Detection Configuration**: Toggle between overlapping and non-overlapping detection logic.
- **Logic Synthesis**: The app automatically derives the State Table, performs State Encoding, and calculates the necessary flip-flop excitation ($D_n$) and output boolean equations.

## Why This Project?
Designing FSMs manually often involves error-prone K-map simplifications and state table calculations. By automating these processes, this tool allows engineers to focus on high-level architecture and logic flow. It serves as both a powerful learning aid and a rapid-prototyping utility for hardware designers.

## Technical Implementation
- **Frontend**: Built using [Streamlit](https://streamlit.io/) for a reactive, browser-based UI.
- **Visualization**: Utilizes [Graphviz](https://graphviz.org/) to render complex state transition diagrams programmatically.
- **Architecture**: Modular codebase separating parser logic, sequence generation algorithms, and visualization rendering, allowing for easy expansion and custom module development.
```

---

## Virtual Digital Logic Design Lab
**Category:** Engineering
**Tags:** Python, Streamlit, Digital Logic, Educational Tech, Circuit Simulation, Graphviz, NumPy
**GitHub URL:** https://github.com/justinsaju21/Digital_Logic_Design_Lab

### Description
An interactive, web-based laboratory platform designed to guide ECE students through digital logic design, featuring an intelligent tutoring system and real-time circuit visualization.

### Detailed Write-up (Markdown)
```markdown
# Virtual Digital Logic Design Lab

The **Virtual Digital Logic Design Lab** is a specialized pedagogical platform developed to streamline the learning process for B.Tech Electronics and Communication Engineering (ECE) students. By bridging the gap between theoretical Boolean algebra and physical hardware implementation, this project provides a hands-on, interactive environment for exploring digital systems.

## 🎓 Why This Project Matters
Digital Logic is the bedrock of computer architecture, yet students often struggle to visualize state changes and signal propagation. This lab mitigates these challenges through:

*   **Intelligent Tutoring**: A proprietary engine that breaks down complex topics into actionable micro-experiments, providing contextual hints and real-time validation.
*   **Predict-Test-Verify Methodology**: Encourages active learning by asking students to predict circuit outcomes before interacting with simulations.
*   **Professional Visualization**: Utilizes `schemdraw` and `graphviz` to render high-fidelity circuit schematics and state machine diagrams dynamically.

## 📚 Core Curriculum
Our lab environment spans 12 structured modules, covering the full spectrum of digital electronics:

1.  **Foundations**: Logic Gates and K-Map Simplification.
2.  **Combinational Logic**: Adders, Subtractors, Multiplexers, and 7-Segment displays.
3.  **Sequential Logic**: Flip-flops, Shift registers, and Counters.
4.  **Advanced Systems**: FSM-based sequence detectors and Vending Machine controllers.
5.  **Programmable Logic**: PLA designers and FPGA LUT configurations.

## 🏗️ Technical Architecture
Built with **Streamlit**, the application follows a modular structure to ensure maintainability and scalability:

*   `tutor.py`: The logic engine that monitors progress and provides personalized guidance.
*   `circuits.py`: Handles the generation of visual representations for hardware logic.
*   `units/`: Contains the specific curriculum logic, separated into pedagogical units.

## 🎨 Design Philosophy
To minimize cognitive load and eye strain during extended study sessions, the application implements:
*   **Engineering-Centric UI**: A dark-themed, glassmorphic design focused on clarity.
*   **Color-Coded Signal Flow**: A consistent visual language where inputs, processing states, and outputs are distinguished by high-contrast color palettes.
*   **Dual-Pane Workspace**: A responsive interface that balances technical content with the interactive tutor panel.

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- `pip` package manager

### Quick Start
```bash
git clone https://github.com/YOUR_USERNAME/Digital_Logic_Design_Lab.git
cd Digital_Logic_Design_Lab
pip install -r requirements.txt
streamlit run main.py
```
Navigate to `http://localhost:8501` to begin your lab session.
```

---

## ECE Portal Web Platform
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Frontend
**GitHub URL:** https://github.com/justinsaju21/ece.web

### Description
A robust, high-performance web application tailored for Electrical and Computer Engineering students and professionals to manage academic and technical resources.

### Detailed Write-up (Markdown)
```markdown
## Project Overview
The ECE Portal is a modern, responsive web application designed to serve as a centralized hub for Electrical and Computer Engineering resources. Built with the latest iteration of Next.js and TypeScript, this platform prioritizes scalability, type safety, and optimized performance.

## Core Technologies
- **Next.js:** Leveraging the App Router for efficient server-side rendering and static site generation.
- **TypeScript:** Ensuring robust code quality and maintainability through static typing.
- **Geist Font:** Implementing Vercel’s design-first typography system for a clean, professional aesthetic.

## Key Features
- **Optimized Performance:** Built-in font optimization and efficient image handling provided by the Next.js framework.
- **Developer-Friendly:** Designed with a modular architecture that supports rapid iteration and hot-module replacement (HMR).
- **Responsive Design:** A mobile-first approach ensuring accessibility across all devices.

## Getting Started
To set up the development environment, ensure you have Node.js installed, then run the following commands in your terminal:

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Start the development server
npm run dev
```

Visit `http://localhost:3000` in your browser to view the application. The project is pre-configured to auto-update as you modify files in the `app/` directory.
```

---

## Nexus Recruit
**Category:** Web Development
**Tags:** TypeScript, Next.js, Tailwind CSS, Framer Motion, Zod, Google Sheets API
**GitHub URL:** https://github.com/justinsaju21/echo

### Description
A high-performance, responsive recruitment platform featuring seamless Google Sheets integration and a sleek, modern UI for efficient application management.

### Detailed Write-up (Markdown)
```markdown
## Overview
Nexus Recruit is a professional-grade recruitment landing page and application portal designed for student organizations and startups. By leveraging the power of Next.js and Tailwind CSS, the platform delivers a polished, responsive user experience that streamlines the collection and management of applicant data.

## Key Features
- **Modern Aesthetic**: Built with a dark-mode-first design, utilizing Framer Motion for sophisticated animations that improve user engagement.
- **Robust Validation**: Implements Zod schema validation to ensure data integrity before submission, significantly reducing manual cleanup tasks.
- **Serverless Backend**: Utilizes Google Sheets as a lightweight, accessible database, allowing recruiters to manage applicants using a familiar interface without the need for complex database infrastructure.
- **Fully Responsive**: Optimized for both mobile and desktop users, ensuring a frictionless application process regardless of the device.

## Technical Architecture
- **Frontend**: Next.js (App Router) provides server-side rendering benefits, while Tailwind CSS handles the layout and aesthetic.
- **API Layer**: Custom API routes facilitate secure communication between the frontend and Google’s infrastructure.
- **Data Management**: Integration with the Google Sheets API enables real-time data persistence, perfect for smaller teams requiring a zero-cost backend solution.

## Use Cases
- **Club Recruitment**: Simplify the intake process for university organizations.
- **Event Registration**: Capture attendee details for hackathons or meetups.
- **Lead Generation**: A quick-to-deploy contact or intake form for small-scale projects.

## Deployment
Designed for rapid iteration, the project is optimized for deployment on platforms like Vercel. With environment variables configured, the application can be live in minutes, connecting directly to your Google Workspace seamlessly.
```

---

## EchoSnap
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Frontend
**GitHub URL:** https://github.com/justinsaju21/echosnap

### Description
EchoSnap is a high-performance web application built with Next.js, designed to provide a seamless and modern user experience with optimized performance.

### Detailed Write-up (Markdown)
```markdown
## Overview
EchoSnap is a robust web application engineered using the Next.js framework. It leverages modern web development practices to deliver a responsive, fast, and scalable user interface. By utilizing the power of React and TypeScript, the application ensures type safety and maintainable code architecture.

## Key Features
- **Next.js App Router**: Utilizes the latest Next.js architecture for improved routing and server-side rendering capabilities.
- **Optimized Performance**: Integrated with `next/font` for automatic font optimization using the Geist font family.
- **Type-Safe Development**: Built with TypeScript to ensure high code quality and minimize runtime errors.
- **Deployability**: Designed for seamless deployment on the Vercel platform, leveraging serverless functions and global edge network optimization.

## Getting Started
To set up the development environment, ensure you have Node.js installed, then run the following commands:

1. Clone the repository:
   `git clone <repository-url>`
2. Install dependencies:
   `npm install`
3. Start the development server:
   `npm run dev`

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application in real-time. The project supports hot-reloading, meaning changes to `app/page.tsx` will reflect instantly.
```

---

## Future Founder Twin
**Category:** AI
**Tags:** TypeScript, Python, Next.js, FastAPI, Google ADK, Gemini API, Agentic AI, SSE
**GitHub URL:** https://github.com/justinsaju21/future-founder-twin-adk

### Description
An agentic AI co-founder designed to ruthlessly evaluate startup ideas through market research, risk analysis, and quantitative founder-fit scoring before a single line of code is written.

### Detailed Write-up (Markdown)
```markdown
# Future Founder Twin

**Future Founder Twin** is an agentic AI co-founder designed to ruthlessly evaluate your startup ideas *before* you invest time and capital. Built for the **Kaggle × Google "Agents for Business" Capstone**, this project serves as an analytical, adversarial partner rather than a cheerleader, helping founders identify market risks and validate their "Founder-Idea Fit" quantitatively.

## 🏗️ Architecture

The system leverages the **Google Agent Development Kit (ADK)** to manage a sophisticated 4-agent orchestration pipeline. A critical design feature is the inclusion of a **Human-in-the-Loop (HITL)** pause, which forces the founder to defend their idea against a critical analysis before the system proceeds to generate a final investment brief.

### The 4-Agent Pipeline

1. **Founder Profiler:** Extracts technical capabilities, runway, and constraints via an interactive interview.
2. **Market Discovery:** Performs live Google searches to gather real-time competitor data and market sizing.
3. **Planning & Critique:** Acts as a dual-persona agent that generates an MVP plan and then shifts to an adversarial role to uncover execution flaws.
4. **Evaluation & Simulation:** Synthesizes the founder's defense and research data to provide a 0–100 "Founder Fit" score and a final **PURSUE / PIVOT / PAUSE** verdict.

## ✨ Key Features

*   **Human-in-the-Loop Defense Gate:** A mandatory interactive pause ensures the founder acknowledges and addresses risks before the simulation phase.
*   **Real-Time Grounding:** Automated market discovery using live search tools to ensure evaluations are based on current market conditions rather than stale training data.
*   **Quantitative Scoring Matrix:** Uses structured tool calls to enforce objective measurement across four distinct success dimensions.
*   **3-Timeline Simulation:** Provides prognostications for optimistic, realistic, and conservative future outcomes.
*   **Robust Backend:** Built on FastAPI with built-in API key rotation and model fallback logic to handle rate limiting gracefully.

## 🚀 Technical Stack

*   **Frontend:** Next.js for a responsive, real-time visualization of the agent pipeline using Server-Sent Events (SSE).
*   **Backend:** FastAPI powered by the Google Agent Development Kit for state management and agent orchestration.
*   **Intelligence:** Orchestrates Gemini models via Google ADK to facilitate autonomous decision-making and tool usage.

This project demonstrates a high-level implementation of agentic workflows in a B2B SaaS context, emphasizing accountability, real-time data integration, and human-AI collaboration.
```

---

## Futuristic Glitch Interface Component
**Category:** Web Development
**Tags:** JavaScript, CSS3, HTML5, Vite, UI/UX, Frontend
**GitHub URL:** https://github.com/justinsaju21/Futuristic_Glitch_Effect-

### Description
A high-performance, immersive UI card component featuring dynamic text-glitch animations, interactive cursor-tracking gradients, and an infinite grid aesthetic.

### Detailed Write-up (Markdown)
```markdown
## Overview
The Futuristic Glitch Interface Component is a high-fidelity UI element designed to provide a modern, cyberpunk-inspired aesthetic to web applications. By blending Vanilla JavaScript for logic and CSS3 for visual rendering, this project delivers a smooth, performant user experience that responds dynamically to user input.

### Key Features
- **Dynamic Text Glitch**: Implements an alphanumeric randomization engine that activates on mouse interaction, simulating a high-tech data-decoding effect.
- **Interactive Gradient Mask**: Features a sophisticated radial gradient that follows the user's cursor, masking text with a vibrant sea-blue to aqua-green transition.
- **Infinite Grid System**: Utilizes clever CSS positioning to create an expansive, border-focused layout that feels larger than the viewport.
- **Performance Optimized**: Built with `requestAnimationFrame` to ensure animations remain buttery smooth without impacting browser paint performance.

### Technical Implementation
The project leverages **Vite** as a lightning-fast build tool to manage assets and serve the development environment. The architecture is modular, separating the logic for text randomization in `main.js` from the visual styling in `style.css`. 

### Customization
Developers can easily integrate this component into existing projects by adjusting the CSS variables defined in the root stylesheet. The glitch speed and character set can be further configured in `main.js`, allowing for variations in intensity—ranging from subtle flickering to rapid, intense data-scrambling effects.

### Usage
1. **Clone the repository**: `git clone https://github.com/justinsaju21/Futuristic_Glitch_Effect-.git`
2. **Install**: Run `npm install` to set up the build environment.
3. **Develop**: Execute `npm run dev` to launch the live preview server.

This project is perfect for developers looking to add a layer of 'wow' factor to their landing pages, gaming dashboards, or portfolio sites.
```

---

## Gateway Architecture Framework
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Node.js
**GitHub URL:** https://github.com/justinsaju21/Gateway

### Description
A high-performance web foundation built on Next.js 14, designed for scalable application routing and seamless UI integration.

### Detailed Write-up (Markdown)
```markdown
### Overview
Gateway is a robust, production-ready web application scaffold built with the latest Next.js 14 paradigm. It serves as the foundational architecture for high-traffic web interfaces, leveraging the power of TypeScript to ensure type safety and maintainable codebases.

### Core Features
- **Modern Rendering:** Utilizes the App Router for optimized server-side rendering and client-side interactivity.
- **Performance First:** Integrated with `next/font` for automatic font optimization using the Geist typeface family, ensuring minimal layout shifts and fast visual readiness.
- **Developer Experience:** Configured for immediate development workflows with support for modern package managers including `npm`, `yarn`, `pnpm`, and `bun`.
- **Seamless Scalability:** Optimized for deployment on the Vercel edge network, allowing for instant global availability and automatic CI/CD pipelines.

### Getting Started
To set up this environment locally:

1. Clone the repository.
2. Install dependencies using your preferred manager:
   ```bash
   npm install
   ```
3. Launch the development server:
   ```bash
   npm run dev
   ```
4. Navigate to `http://localhost:3000` to interact with the application instance.

### Why This Architecture?
The Gateway framework focuses on reducing technical debt by adhering to modern React conventions. By utilizing Server Components by default, it shifts the heavy lifting from the client to the server, resulting in a faster and more secure end-user experience.
```

---

## Horizon Tech Consulting Platform
**Category:** Web Development
**Tags:** TypeScript, Next.js, Tailwind CSS, Framer Motion, React, Web Development
**GitHub URL:** https://github.com/justinsaju21/horizyn.tech

### Description
A high-performance, design-centric corporate website for Horizon Tech Consulting built with the latest Next.js 16 stack and advanced motion design.

### Detailed Write-up (Markdown)
```markdown
# Horizon Tech Consulting Platform

This project serves as the flagship digital presence for Horizon Tech Consulting. It is engineered for performance, maintainability, and aesthetic excellence, leveraging a modern stack to deliver a seamless user experience.

## Core Philosophy

The project follows a "Single Source of Truth" architecture. By isolating content, design rules, and logic into structured documentation and modular components, the codebase ensures rapid iteration without sacrificing visual consistency.

### Key Features
- **Modern Stack**: Built on Next.js 16 (App Router) for superior SEO and server-side performance.
- **Design-First Architecture**: Features a strict `design-rules.md` constitution that guides the implementation of Tailwind CSS v4 utility classes, ensuring a cohesive brand identity.
- **Fluid Motion**: Utilizes Framer Motion for sophisticated, physics-based page transitions and component interactions.
- **Modular Content Management**: Content is decoupled from UI components, allowing non-technical stakeholders to coordinate updates via centralized files.
- **Robust Validation**: Implements Zod schemas and React Hook Form for type-safe, secure data collection.

## Project Architecture

The repository is structured for scalability:
- `/site`: Contains the Next.js application, organized by feature-rich layouts, specialized components, and animation variants.
- `/content`: Houses static business data (services, case studies), keeping the component layer clean.
- `/lib`: Centralizes utility functions, constants, and animation logic, providing a clean API for the UI layer.

## Technical Implementation

- **Styling**: Leverages Tailwind CSS v4 for optimized, configuration-first styling.
- **Theme Engine**: Built with `next-themes` to support a persistent dark-mode-default experience with a seamless light-mode toggle.
- **Development Experience**: Includes `CLAUDE.md` and detailed roadmap tracking (`todo.md`) to streamline onboarding and maintain architectural integrity.

This platform is designed to be the foundational engine for a growing consultancy, balancing technical rigor with professional web aesthetics.
```

---

## High-Accuracy Approximate Multiplier (HAM)
**Category:** VLSI
**Tags:** Verilog, FPGA, Digital Signal Processing, VLSI, Computer Architecture, Hardware Design, Approximate Computing
**GitHub URL:** https://github.com/justinsaju21/Hybrid_Approximate_Multiplier

### Description
A high-performance Verilog implementation of an approximate multiplier using the H6L9 Mixed Piecewise Linear (PWL) algorithm, designed for low-power, error-tolerant FPGA applications.

### Detailed Write-up (Markdown)
```markdown
## Project Overview
The High-Accuracy Approximate Multiplier (HAM) is a hardware-efficient arithmetic unit implemented in Verilog. By leveraging the H6L9 Mixed Piecewise Linear (PWL) approximation method, this project significantly reduces the computational overhead typically required by standard multipliers. It is specifically engineered for error-resilient applications—such as image processing, neural network inference, or digital signal processing—where perfect precision can be traded for substantial power and area savings.

## The Core Logic
The design utilizes a sophisticated multi-stage pipeline approach to perform multiplication:
1. **Magnitude Extraction**: Decouples the signed input into magnitude and sign components.
2. **Conversion**: Maps fixed-point integers into an optimized floating-point-like representation.
3. **H6L9 Approximation**: The core `mixed_pwl_h6l9.v` module estimates mantissa products using defined linear segments, minimizing logic gate count.
4. **Reconstruction**: Handles sign restoration and final bit-width alignment to produce the approximated result.

## Key Features
- **Optimized Resource Usage**: By replacing complex multiplier arrays with H6L9-based PWL logic, the design occupies significantly less silicon area than traditional Wallace or Dadda tree multipliers.
- **Parameterized Architecture**: The design utilizes modular, parameterized helper components (adders, muxes) making it easily portable to different bit-widths or FPGA device families.
- **Signed Arithmetic Support**: Fully handles 2's complement integers, ensuring versatility for standard digital computing tasks.
- **Simulation-Ready**: Includes a comprehensive testbench that validates the multiplier against varied test vectors, covering positive, negative, and mixed-sign scenarios.

## Getting Started
### Simulation Workflow
1. Import all `.v` source files into your preferred HDL simulator (e.g., Vivado XSim, ModelSim, or QuestaSim).
2. Set `testbench.v` as the top-level entity.
3. Compile the design and run the simulation. The internal logic is purely combinational, allowing for fast observation of results in your waveform viewer.

### Synthesis
This implementation is synthesizable on Xilinx ISE and Vivado workflows. As a combinational design, it is ideal for low-latency paths; for high-frequency targets, simple register pipelining can be inserted between the conversion and reconstruction stages to meet strict timing constraints.

## Use Cases
- **AI Hardware Accelerators**: Ideal for deep learning layers where weights can tolerate minor precision degradation.
- **Low-Power Embedded Systems**: Reduces battery drain in edge-computing devices by simplifying expensive arithmetic operations.
- **Signal Processing**: Efficiently computes transformations for audio or video streams where human perception masks minor calculation variances.
```

---

## IEEE MTT-S SBC SRM Portal
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Frontend
**GitHub URL:** https://github.com/justinsaju21/IEEE_MTTS_SBC_SRM

### Description
The official web platform for the IEEE Microwave Theory and Technology Society Student Branch Chapter at SRM, designed to showcase technical events, memberships, and research initiatives.

### Detailed Write-up (Markdown)
```markdown
# IEEE MTT-S SBC SRM Portal

This project serves as the dedicated digital interface for the IEEE Microwave Theory and Technology Society (MTT-S) Student Branch Chapter at SRM Institute of Science and Technology. Built using modern web standards, the platform is engineered to foster engagement, streamline event management, and highlight the technical achievements of the student community.

## Project Overview

The portal functions as a centralized hub for:
- **Event Discovery**: Displaying upcoming technical workshops, seminars, and networking sessions.
- **Membership Management**: Providing a seamless interface for students to join and participate in chapter activities.
- **Technical Showcase**: Highlighting research papers, microwave engineering projects, and innovation milestones achieved by members.

## Technical Stack

- **Framework**: Built with [Next.js](https://nextjs.org/), leveraging server-side rendering for optimal performance and SEO.
- **Language**: Developed in **TypeScript** to ensure type safety and maintainable code architecture.
- **Design**: Utilizes the modern **Geist font family** for a clean, professional, and accessible user interface.

## Key Features

*   **Responsive UI**: Optimized for mobile and desktop viewing to ensure accessibility for all students.
*   **Performance Focused**: Integrated with Vercel's optimization tools to minimize load times and maximize user experience.
*   **Modular Architecture**: Built with a scalable component library, allowing for easy updates as the student chapter expands its offerings.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Install dependencies using your preferred package manager (npm, yarn, pnpm, or bun).
3. Run `npm run dev` to launch the development environment.
4. Access the portal at `http://localhost:3000`.

## Future Roadmap

Future iterations of this platform will include an admin dashboard for automated event registration, a blog section for technical whitepapers, and a member-exclusive portal for accessing proprietary microwave design resources.
```

---

## Interactive CPU Lab
**Category:** Engineering
**Tags:** Python, Streamlit, Computer Architecture, Data Visualization, SVG, Educational Software
**GitHub URL:** https://github.com/justinsaju21/interactive-cpu-lab

### Description
An immersive, web-based laboratory designed to demystify complex computer architecture concepts through real-time visualizations and interactive simulations.

### Detailed Write-up (Markdown)
```markdown
### Overview
Interactive CPU Lab is a powerful educational tool built with Python and Streamlit, designed to bridge the gap between theoretical computer architecture and practical hardware understanding. By replacing static textbook diagrams with interactive, animated simulations, this project makes abstract concepts like pipeline hazards, instruction sets, and bus organization accessible and engaging.

### Key Features

#### 1. Pipeline Hazards Visualization
Experience how modern processors handle instruction throughput. The tool features an interactive space-time diagram that tracks cycles, allowing users to trigger structural, data, and control hazards to see how the CPU architecture reacts with stalls and flushes in real-time.

#### 2. Control Unit Design
Explore the internal mechanics of hardware control. The laboratory provides a side-by-side comparison of Hardwired (Logic Gate-based) and Micro-programmed (ROM-based) control units, offering an interactive breakdown of control signals for a variety of instructions including arithmetic, logical, and jump operations.

#### 3. Addressing Modes & Instruction Formats
- **Animated Data Paths:** Visualize how memory is accessed across eight different modes, from Immediate to Auto-increment.
- **Format Analysis:** Compare 0, 1, 2, and 3-address instruction formats to understand how different architectures impact code density and performance.

#### 4. Bus Organization
Analyze the trade-offs between hardware cost and speed by simulating Single Bus vs. Three Bus organizational models. This module provides essential insights into how bus structures influence system bottlenecks.

### Technical Architecture
- **Core Engine:** Built on Python, utilizing efficient data structures to simulate instruction processing.
- **Frontend:** Powered by Streamlit, providing a reactive web-based UI without the overhead of traditional web frameworks.
- **Visuals:** Uses dynamic SVG generation integrated with Python to ensure that diagrams are crisp, responsive, and animated accurately based on user inputs.

### Use Cases
- **Academic Labs:** Serving as a digital workbench for students to experiment with CPU behaviors without needing physical hardware access.
- **Rapid Prototyping:** A tool for researchers and hobbyists to visualize how changes in instruction sets or bus widths affect high-level performance metrics like CPI (Cycles Per Instruction).

### Installation
To run the lab locally, ensure you have Python installed, then execute the following:

```bash
git clone https://github.com/justinsaju21/interactive-cpu-lab.git
cd interactive-cpu-lab
pip install streamlit pandas
streamlit run Home.py
```
```

---

## Portfolio and Technical Infrastructure Hub
**Category:** Engineering
**Tags:** Python, C++, React, Next.js, PyTorch, FastAPI, IoT, Embedded Systems, Data Science
**GitHub URL:** https://github.com/justinsaju21/justinsaju21

### Description
A comprehensive professional portfolio and digital infrastructure repository showcasing an intersection of electronics, AI, and full-stack development.

### Detailed Write-up (Markdown)
```markdown
## Overview
This repository serves as the central documentation and professional profile for Justin Jacob Saju, an Electronics and Communication Engineering undergraduate. It highlights a diverse technical background that bridges the gap between hardware architecture, software engineering, and artificial intelligence.

## Core Projects

### 1. Echo AI: Local Multi-Model Voice Assistant
A high-performance AI assistant built for on-device reasoning. It utilizes **FastAPI**, **PyTorch**, and **Faster-Whisper** to provide real-time voice interaction while ensuring privacy by eliminating reliance on cloud APIs.

### 2. AI Virtual Sensor Laboratory
An IoT initiative that creates digital twins by integrating real-time sensor data from Arduino and ESP8266 microcontrollers. The system visualizes live telemetry on a **Next.js** dashboard, augmented by the **Google Gemini API** for intelligent data interpretation.

### 3. 5x5x5 Wireless LED Matrix
A custom-engineered holographic display system. This project showcases proficiency in C++ multiplexing algorithms and networking, allowing for dynamic control of the matrix via an ESP32 microcontroller.

### 4. Full-Stack Portfolio Platform
A robust content-managed web platform built using React, Node.js, and Sanity CMS, demonstrating advanced web development capabilities and content management practices.

## Technical Competencies
My work leverages a versatile technology stack designed for high-performance and scalability:

- **Software & AI:** Python, PyTorch, FastAPI, React, Next.js, Node.js.
- **Embedded & Hardware:** C, C++, Arduino, ESP32, STM32, KiCad, LTspice.
- **Simulation & Data:** MATLAB, ANSYS Icepak (CFD), Power BI, MySQL.

## Professional Leadership
Beyond technical builds, I actively contribute to academic and industrial growth:
- **Founder/Director of ECHO:** Spearheading the deployment of digital infrastructure for the ECE department.
- **IEEE MTT-S Chair:** Leading initiatives in microwave theory and technical education.
- **Industrial Experience:** Applied data analytics and visualization at Mannai Corporation and performed computational fluid dynamics (CFD) for electronics thermal management at Dell/Intel.
```

---

## Personal Portfolio Website
**Category:** Web Development
**Tags:** HTML, CSS, JavaScript, GitHub Pages, Web Development
**GitHub URL:** https://github.com/justinsaju21/justinsaju21.github.io

### Description
A responsive personal portfolio website showcasing professional projects, technical skills, and academic achievements.

### Detailed Write-up (Markdown)
```markdown
## Overview
This project serves as a centralized digital hub for showcasing professional milestones, technical expertise, and personal projects. Hosted via GitHub Pages, the site is designed to provide a clean, accessible, and fast-loading interface for potential employers and collaborators to review my work.

## Key Features
* **Responsive Design:** Optimized for seamless viewing across mobile, tablet, and desktop devices.
* **Project Showcase:** A dedicated gallery highlighting key technical projects, including descriptions, technology stacks, and direct links to source code.
* **Fast Deployment:** Utilizing the GitHub Pages ecosystem ensures high availability and fast load times with zero maintenance overhead.
* **Minimalist UI:** Focuses on clean typography and intuitive navigation to prioritize content clarity.

## Technical Implementation
The site is built using standard web technologies (HTML, CSS, and JavaScript) to ensure optimal performance and SEO. The development process emphasizes accessibility standards and efficient file structure, making the codebase easy to maintain and scale as new projects are added to the portfolio.
```

---

## ESP32 Light Intensity Dashboard
**Category:** IoT
**Tags:** IoT, C++, ESP32, Embedded Systems, Web Development, REST API, Arduino
**GitHub URL:** https://github.com/justinsaju21/Light_Intensity_meter

### Description
An IoT-based real-time light monitoring system that leverages an ESP32 microcontroller to serve a responsive, web-based dashboard for tracking ambient light levels.

### Detailed Write-up (Markdown)
```markdown
### Overview
The ESP32 Light Intensity Dashboard is a comprehensive IoT solution designed to measure and visualize ambient light levels in real-time. By utilizing an LDR (Light Dependent Resistor) in a voltage divider configuration, the ESP32 captures analog data, converts it into a normalized percentage, and serves this information through a lightweight, self-hosted web server.

### Key Features
- **Responsive Web Dashboard**: A clean, mobile-friendly UI that supports both dark and light modes, allowing for seamless monitoring across devices.
- **RESTful API**: Includes JSON endpoints (`/sensorData`, `/powerToggle`) for programmatic access to device state and environmental metrics, making it easy to integrate into larger smart home ecosystems.
- **Real-Time Visualization**: Dynamic gauge components provide immediate visual feedback on current light levels (categorized as Dark, Medium, or Bright).
- **mDNS Integration**: Simplifies network discovery by allowing access via `http://esp32.local` rather than hunting for dynamic IP addresses.

### Technical Implementation
The project is built on the ESP32 framework using C++ and the Arduino IDE. It utilizes the ESP32’s onboard Wi-Fi to establish a local server, using the `ArduinoJson` library to manage high-speed data exchanges between the hardware sensor and the web client.

### Hardware Setup
The system requires minimal hardware, centered around the ESP32's internal Analog-to-Digital Converter (ADC):
- **Sensor**: LDR connected to GPIO 34.
- **Circuit**: A basic voltage divider circuit using a 10kΩ resistor is required to provide a stable analog signal to the ESP32.

### Use Cases
- **Smart Home Automation**: Use the API to trigger automated lighting routines based on ambient light data.
- **Environmental Monitoring**: Track light consistency in sensitive environments such as greenhouses or computer server rooms.
- **Educational Tool**: An excellent introductory project for understanding how hardware sensors can communicate with modern web-based frontends.
```

---

## LogicMap Pro
**Category:** Engineering
**Tags:** Python, Streamlit, Boolean Logic, Data Visualization, Engineering Tools, Algorithms
**GitHub URL:** https://github.com/justinsaju21/logicmap-pro

### Description
A professional-grade Karnaugh Map solver and visualizer that simplifies Boolean logic expressions using the Quine-McCluskey algorithm.

### Detailed Write-up (Markdown)
```markdown
# LogicMap Pro 🔬

**LogicMap Pro** is an interactive, web-based tool designed to bridge the gap between abstract Boolean algebra and visual circuit optimization. By leveraging the power of the Quine-McCluskey algorithm, this application provides students, engineers, and educators with a robust platform to visualize complex logic simplifications in real-time.

## Why LogicMap Pro?
Simplifying Boolean expressions is a fundamental task in digital design, yet manual mapping is prone to human error. LogicMap Pro automates the process of finding optimal prime implicants while providing clear, animated explanations of how these groups are formed. Whether you are working with Sum of Products (SOP) or Product of Sums (POS), this tool ensures accuracy and deepens your understanding of digital logic.

## Core Capabilities
- **Algorithm-Driven Solutions**: Uses the rigorous Quine-McCluskey algorithm to ensure optimal minimization.
- **Interactive Visualizations**: Step-by-step animations help users visualize the grouping process, making it an excellent pedagogical tool.
- **Variable Flexibility**: Supports 2, 3, and 4-variable maps, covering a broad range of standard logic problems.
- **Advanced Logic Handling**: Built-in support for "Don't Care" conditions, allowing for more efficient circuit design optimization.
- **User-Centric Experience**: Built with Streamlit, the application features a responsive, clean UI with theme toggling for enhanced readability.

## Technical Stack
- **Framework**: Streamlit for rapid web deployment.
- **Computation**: NumPy and Pandas for high-performance logic calculations.
- **Visualization**: Matplotlib to render clear, grid-based logic maps.

## Use Cases
- **Academic Assistance**: Ideal for students learning digital electronics who need to verify their manual K-Map solutions.
- **Hardware Design**: Assists engineers in quickly optimizing logic gates for FPGA or ASIC design flows.
- **Education**: Serves as a live demonstration tool for instructors to illustrate logic minimization strategies in the classroom.
```

---

## Love Calc 3000
**Category:** Web Development
**Tags:** Python, Streamlit, Web Development, CSS Animations, UI Design
**GitHub URL:** https://github.com/justinsaju21/love_calc

### Description
A nostalgic, 2000s-inspired love compatibility calculator featuring a modern glassmorphism UI and a deterministic scoring algorithm.

### Detailed Write-up (Markdown)
```markdown
## Overview
Love Calc 3000 is a whimsical web application that pays homage to the classic, cheesy love calculators of the early 2000s. While it captures the retro spirit of the internet, it is built using modern web development practices to ensure a smooth and visually appealing experience.

## Core Features
- **Deterministic Algorithm**: Unlike random generators, this app uses a specific logic-based algorithm ensuring that the same pair of names always results in the same compatibility score.
- **Modern Aesthetic**: The interface utilizes a sleek glassmorphism design, providing a polished look that contrasts perfectly with the retro theme.
- **Dynamic UI**: Features an animated gradient background and floating heart animations to enhance user engagement.
- **Personality Engine**: Includes a witty commentary module that provides humorous feedback based on the user's calculated compatibility score.

## Technical Implementation
Built with **Python** and **Streamlit**, the application demonstrates the power of rapid prototyping for web-based tools. The custom CSS animations are injected directly into the Streamlit framework to create a high-fidelity visual experience without the overhead of a full-stack JavaScript framework.

## Getting Started
To run this project locally, ensure you have Python installed, then execute the following commands:

```bash
pip install streamlit
streamlit run app.py
```

## Potential Use Cases
This project serves as a perfect example of combining creative design with simple backend logic. It is a great showcase for:
1. Learning the fundamentals of Streamlit deployment.
2. Demonstrating custom CSS injection in Python web apps.
3. Creating engaging, interactive social media tools.
```

---

## Decision Matrix: Partner Ranking App
**Category:** Data Science
**Tags:** Python, Streamlit, Data Science, TOPSIS Algorithm, Decision Support Systems, Pandas, NumPy
**GitHub URL:** https://github.com/justinsaju21/marriage-callculator

### Description
A sophisticated decision-support tool that utilizes the TOPSIS multi-criteria analysis algorithm to provide objective, weighted rankings for potential candidates.

### Detailed Write-up (Markdown)
```markdown
### Overview
Decision making is often clouded by cognitive biases. The **Decision Matrix Partner Ranking App** removes the guesswork by applying the *Technique for Order of Preference by Similarity to Ideal Solution* (TOPSIS). This application transforms subjective preferences into a mathematical framework, allowing users to rank potential candidates based on custom-weighted criteria.

### How It Works
The core of this project is the TOPSIS algorithm, a robust multi-criteria decision analysis method. By evaluating the geometric distance between candidates and an 'ideal' solution, the app calculates a preference score that reflects your specific priorities, such as financial stability, personal attributes, or lifestyle compatibility.

### Key Features
- **Mathematical Precision**: Leverages the TOPSIS algorithm to ensure rankings are based on weighted proximity to an ideal candidate profile.
- **Dynamic Weighting**: Use intuitive sliders to adjust the importance of specific attributes in real-time.
- **Interactive Interface**: Built with a sleek, glassmorphism-inspired dark UI using Streamlit and custom CSS for a premium user experience.
- **Flexible Dataset Management**: Easily modify, add, or remove candidates to refine your evaluation pool.
- **Verification Tool**: Compare your intuition against the mathematical result to identify potential cognitive biases in your decision-making process.

### Technical Architecture
The application follows a clean, modular structure to ensure maintainability:
- **`app.py`**: The main execution engine powered by Streamlit.
- **`utils/topsis.py`**: A modular implementation of the decision-making logic.
- **`style.css`**: Custom CSS injections for a modern, high-contrast dark theme.
- **`data/`**: Structured storage for candidate profiles, allowing for easy expansion and historical analysis.

### Getting Started
To explore the project locally:

1. Clone the repository:
   `git clone https://github.com/justinsaju21/marriage-callculator.git`
2. Install dependencies:
   `pip install -r requirements.txt`
3. Launch the application:
   `streamlit run app.py`
```

---

## ESP32 Gas Monitor Dashboard
**Category:** IoT
**Tags:** C++, IoT, ESP32, Embedded Systems, Web Development, Arduino, REST API
**GitHub URL:** https://github.com/justinsaju21/MQ2_Gas_Sensor

### Description
An IoT-based air quality monitoring solution utilizing an MQ2 sensor and an ESP32 to provide real-time gas level visualization via a responsive, embedded web dashboard.

### Detailed Write-up (Markdown)
```markdown
### Overview
The ESP32 Gas Monitor Dashboard is an IoT project designed to provide an accessible and efficient way to monitor environmental gas levels. By leveraging the ESP32's built-in Wi-Fi capabilities, this system hosts a lightweight web server that streams real-time sensor data directly to your browser, eliminating the need for complex cloud platforms.

### Core Features
* **Real-time Visualization**: Live gas readings are streamed via a clean, responsive web interface.
* **Integrated Web Server**: The dashboard is served directly from the ESP32 flash memory, allowing for portable deployment.
* **Smart UX**: Features color-coded status indicators (Low/Medium/High) and a user-friendly dark/light mode toggle.
* **REST API**: Built-in JSON endpoints (`/sensorData` and `/powerToggle`) allow for easy integration with home automation systems or custom monitoring applications.

### Technical Implementation
This project utilizes the ESP32's ADC (Analog-to-Digital Converter) to process readings from the MQ2 sensor. The web server is built using the standard Arduino `WebServer` library, with `ArduinoJson` handling the serialization of data for API requests. The project demonstrates efficient resource management in embedded systems by separating the data acquisition logic from the user interface rendering.

### Use Cases
* **Home Safety**: Monitor kitchen air quality or detect potential gas leaks.
* **Environmental Research**: Create low-cost, portable logging nodes for air quality experiments.
* **IoT Prototyping**: Serve as a foundational template for building more complex embedded web interfaces.

### Deployment
To deploy the system, connect the MQ2 sensor to GPIO 34 on the ESP32, update your Wi-Fi credentials within the source code, and upload the sketch via Arduino IDE. Once powered, the serial monitor will provide the device's IP address, granting you immediate access to the monitoring dashboard.
```

---

## ESP32 Alcohol Detection IoT Dashboard
**Category:** Engineering
**Tags:** C++, ESP32, IoT, Arduino, WebSockets, Hardware Interfacing, Embedded Systems
**GitHub URL:** https://github.com/justinsaju21/MQ3_Alcohol_Sensor

### Description
An IoT-enabled alcohol monitoring system that processes MQ3 sensor data and provides a real-time, web-based dashboard with dynamic alerts and theme support.

### Detailed Write-up (Markdown)
```markdown
# Overview
The ESP32 Alcohol Detection Dashboard is an IoT-powered safety monitoring solution. By combining the sensitive MQ3 gas sensor with the connectivity of an ESP32, this project provides a standalone web server that visualizes alcohol concentration in real-time without the need for external cloud services.

# Features
*   **Real-time Visualization**: Live data streaming from the MQ3 sensor presented on a responsive web interface.
*   **Visual & Audio Alarms**: Features a dynamic color-coded UI and browser-based audio alerts for readings exceeding a 5% concentration threshold.
*   **Web API**: Exposes JSON endpoints for modular integration into larger home automation or data logging ecosystems.
*   **User Customization**: Includes light/dark mode toggles and a digital "Power" control for remote device management.

# Technical Architecture
The system architecture leverages the ESP32’s dual-core processor to handle sensor sampling and web request processing concurrently. The web dashboard communicates with the microcontroller via an asynchronous HTTP request structure, ensuring the interface remains responsive even under load.

# Hardware Considerations
Integrating the MQ3 sensor requires careful attention to signal levels. Because the MQ3 operates at 5V and the ESP32 analog-to-digital converters (ADC) are restricted to 3.3V, a voltage divider circuit is strictly required. This protects the board from permanent damage and ensures the linearity of the sensor input.

# Getting Started
1. **Hardware Setup**: Connect the MQ3 analog output to GPIO 34 of the ESP32, ensuring a voltage divider is placed in line to step down the signal.
2. **Dependency Management**: Ensure `ArduinoJson` (v6/v7) is installed via the Arduino Library Manager.
3. **Network Configuration**: Update the SSID and password constants within the source code to match your local network.
4. **Calibration**: Given the variability in MQ3 hardware batches, adjust the `R0` and `RL` resistance constants in the code to calibrate your specific sensor for environment-accurate readings.

# Use Cases
*   **Industrial Safety**: Automated logging of air quality in restricted spaces.
*   **Educational Tool**: A practical demonstration of ADC conversion, web server hosting on embedded hardware, and UI/UX design for IoT.
```

---

## ESP32 WiFi Music Player
**Category:** IoT
**Tags:** C++, ESP32, IoT, Embedded Systems, Web Server, Arduino
**GitHub URL:** https://github.com/justinsaju21/Music_Player_Buzzer

### Description
A web-controlled melodic buzzer system powered by an ESP32, featuring a responsive UI for streaming pre-programmed classic themes.

### Detailed Write-up (Markdown)
```markdown
### Overview
The ESP32 WiFi Music Player is an interactive embedded project that transforms a standard piezo buzzer into a web-controllable musical instrument. By hosting a lightweight web server directly on the ESP32, users can trigger various melodies—ranging from classical compositions to pop-culture themes—via any modern web browser.

### Key Features
- **Web-Based Control**: An intuitive, responsive interface allows for seamless playback control without needing custom software or mobile apps.
- **Extensive Library**: Comes pre-loaded with iconic tracks, including the *Super Mario Bros Theme*, *Star Wars*, and *Fur Elise*.
- **Non-Blocking Architecture**: Engineered with efficient timing logic to ensure the web server remains fully responsive and interactive, even while complex melodies are playing.
- **Design & UI**: Features a sleek UI with dark/light mode support and real-time status monitoring to reflect the current playback state.

### Technical Implementation
The project leverages the ESP32's built-in WiFi capabilities and the Arduino framework. The playback engine uses pulse-width modulation (PWM) logic to generate specific frequencies for notes, effectively mimicking musical pitches on a simple buzzer. The web server utilizes an asynchronous approach to handle client requests, ensuring a low-latency experience.

### Hardware Requirements
- **ESP32 Development Board**
- **Passive Buzzer**
- **Standard USB cable**

**Wiring Setup:**
Simply connect the positive terminal of the buzzer to **GPIO 27** and the negative terminal to **GND** on the ESP32 board. If utilizing a different GPIO pin, ensure the `buzzerPin` variable in the source code is updated accordingly.

### Setup Instructions
1. **Environment**: Ensure the Arduino IDE is configured for ESP32 board support.
2. **Configuration**: Input your local WiFi SSID and password in the designated variables within `Music_Player.ino`.
3. **Deployment**: Upload the code and monitor the Serial terminal at 115200 baud to retrieve the assigned IP address.
4. **Usage**: Access the provided IP address via your browser to start your music library journey.
```

---

## PortfolioHub
**Category:** Web Development
**Tags:** Next.js, TypeScript, TailwindCSS, Framer Motion, Google Sheets API, Web Development
**GitHub URL:** https://github.com/justinsaju21/portfolio_builder

### Description
A multi-tenant portfolio platform that empowers students to create and deploy professional, responsive websites in minutes without writing a single line of code.

### Detailed Write-up (Markdown)
```markdown
## Overview
PortfolioHub is a streamlined, multi-tenant platform designed to solve the common challenge students face: building a professional online presence without the overhead of complex web development. By leveraging a familiar interface—Google Sheets—as a backend, users can maintain their portfolio data with ease, while the platform automatically generates a beautiful, responsive portfolio site at a unique subdomain.

## Key Features
- **Zero-Code Maintenance:** Manage your entire professional history, projects, and skills through a simple Google Sheet spreadsheet.
- **Lightning-Fast Deployment:** Go from zero to live in under five minutes with a unique public URL.
- **Modern Aesthetics:** Built with TailwindCSS v4 and Framer Motion, providing high-performance, glassmorphism-inspired design templates.
- **Mobile-First Design:** Ensuring your portfolio looks impeccable across smartphones, tablets, and desktops.
- **Data Sovereignty:** Built-in export functionality allows users to download their structured profile data as JSON at any time.
- **Simplified Authentication:** Secure access using a clean username and PIN system, removing the friction of email-based authentication.

## Technical Architecture
PortfolioHub is engineered using the modern web stack, ensuring scalability and ease of maintenance:
- **Framework:** Next.js 15 (App Router) for optimized server-side rendering and routing.
- **Styling:** TailwindCSS v4 combined with Framer Motion for sophisticated micro-interactions.
- **Data Layer:** Utilizes the Google Sheets API to function as a lightweight, no-cost CMS.
- **Type Safety:** Heavily utilizes TypeScript to ensure robust data handling between the spreadsheet and the front end.

## Why Use PortfolioHub?
For students and early-career professionals, maintaining a CV and a portfolio site simultaneously is often tedious. PortfolioHub bridges this gap by acting as a 'single source of truth.' Once your Google Sheet is populated, your website is updated in real-time, allowing you to focus on your work rather than maintaining website code.

## Getting Started
To deploy your own instance of PortfolioHub, follow these primary steps:
1. **Cloud Setup:** Configure a Google Cloud Project with the Google Sheets API enabled.
2. **Service Account:** Create a service account and share your target Google Sheet with its generated email address.
3. **Environment Configuration:** Securely map your sheet ID and credentials via environment variables.
4. **Launch:** Deploy on platforms like Vercel or Netlify with a single click, and your multi-tenant platform is ready to host multiple users.

Whether you are a developer looking for a side-project template or an organization looking to host student profiles, PortfolioHub offers a lightweight, extensible, and cost-effective solution.
```

---

## PrintFlow Automator
**Category:** Web Development
**Tags:** Python, Streamlit, Automation, PDF Processing, SMTP, Web Application
**GitHub URL:** https://github.com/justinsaju21/print_service

### Description
A streamlined web portal designed for print shops to automate file uploads, dynamic price estimation, and order management.

### Detailed Write-up (Markdown)
```markdown
## Overview
PrintFlow Automator is a professional web-based solution built to simplify the operations of modern print shops. By leveraging the Streamlit framework, this application provides a clean, user-friendly interface for customers to submit print jobs while reducing the administrative overhead for business owners.

## Key Features
- **Automated Price Calculation**: The application utilizes `PyPDF2` to intelligently parse uploaded documents, detecting page counts and providing real-time cost estimates to the customer.
- **Manual Flexibility**: Recognizing that not all files are standard, the tool includes a manual override feature, allowing users to adjust page counts for non-PDF files or custom printing requirements.
- **Integrated Order Workflow**: Orders are seamlessly bundled and dispatched via SMTP, ensuring that shop owners receive all necessary metadata and file attachments directly in their inbox.
- **Branded Experience**: Designed with a responsive UI, the platform provides a professional touchpoint that builds customer trust and streamlines the ordering process.

## Technical Implementation
Built with Python, this project focuses on efficiency and ease of deployment. Key technical components include:
- **Streamlit**: Powers the interactive front-end and application lifecycle.
- **PDF Processing**: Uses `PyPDF2` to perform server-side analysis of incoming documents.
- **SMTP Integration**: Handles secure email transmission for order fulfillment using `smtplib`.

## Use Cases
- **Small Business Digitization**: Perfect for local print shops looking to move away from manual email chains and manual quoting.
- **Campus Print Hubs**: Ideal for university environments where students need a quick, reliable way to submit documents for printing.
```

---

## Next.js Starter Template
**Category:** Web Development
**Tags:** TypeScript, Next.js, React, Web Development, Frontend
**GitHub URL:** https://github.com/justinsaju21/projects

### Description
A streamlined and optimized foundation for modern web applications built with Next.js and TypeScript.

### Detailed Write-up (Markdown)
```markdown
## Overview
This project serves as a highly efficient boilerplate for building production-ready web applications using the Next.js framework. By leveraging the latest features of the App Router, it provides a performant, scalable, and developer-friendly architecture.

### Key Features
- **Optimized Performance:** Built-in support for font optimization using `next/font` for superior loading speeds and aesthetic typography with the Geist font family.
- **Modern Tech Stack:** Written entirely in TypeScript to ensure type safety and improved maintainability across the codebase.
- **Developer Experience:** Integrated Fast Refresh capabilities, allowing for seamless real-time updates during the development cycle.
- **Deployment Ready:** Pre-configured for easy deployment on the Vercel platform, ensuring your application can scale effortlessly.

### Getting Started
To set up your development environment, follow these steps:

1. Clone the repository.
2. Install the necessary dependencies using your preferred package manager (npm, yarn, pnpm, or bun).
3. Run the development server:

```bash
npm run dev
```

4. Access your application at `http://localhost:3000`.

### Why Use This Template?
Starting a project with this configuration minimizes boilerplate setup time and adopts industry-standard best practices immediately. It is ideal for developers looking to build fast, SEO-friendly, and responsive web interfaces without the overhead of manual configuration.
```

---

## RF Wireless Modulation Visualizer
**Category:** Engineering
**Tags:** TypeScript, Next.js, Tailwind CSS, Digital Signal Processing, 5G Communications, Web Visualization, HTML5 Canvas
**GitHub URL:** https://github.com/justinsaju21/RF_-_Wireless_Modulation_Visualizer

### Description
An interactive web-based toolkit for visualizing RF modulation techniques and signal processing, featuring real-time constellation diagrams and SNR simulation.

### Detailed Write-up (Markdown)
```markdown
# RF & Wireless Modulation Visualizer

This project is a high-performance web application designed to bridge the gap between abstract signal processing theory and visual intuition. By leveraging native HTML5 Canvas and custom Digital Signal Processing (DSP) logic, it provides a real-time environment to explore how data is encoded into electromagnetic waves.

## Why This Project Matters

Wireless communication is the backbone of modern infrastructure, yet the underlying modulation techniques are often hidden behind complex mathematics. This visualizer makes these concepts tangible, allowing users to see how parameters like Signal-to-Noise Ratio (SNR) impact data integrity in real-time.

## Core Capabilities

- **Comprehensive Modulation Support:** Explore both digital (BPSK, QPSK, 16-QAM, 64-QAM) and analog (AM, FM) schemes.
- **Real-time Constellation Analysis:** Observe I/Q signal space transitions, critical for understanding how modern systems like 5G and WiFi manage data density.
- **Dynamic SNR Simulation:** An interactive slider simulates AWGN (Additive White Gaussian Noise) channels, allowing users to visualize the 'cloud' of noise around constellation points.
- **Performance-First Architecture:** Built using Next.js 15 and custom DSP math, ensuring low-latency rendering without the overhead of heavy third-party charting libraries.

## Technical Implementation

The visualizer is engineered for modularity and performance:

*   **DSP Engine (`src/lib/dsp.ts`):** A custom library containing the trigonometric and algebraic functions required to simulate signal modulation and demodulation.
*   **State Management:** Utilizes React state to ensure seamless synchronization between control inputs and the canvas render loop.
*   **UI/UX Design:** Implemented with a modern glassmorphism aesthetic using Tailwind CSS to provide a clean, professional workspace for educational inquiry.

## Educational Impact

Beyond just visualization, the project includes an interactive theory section and detailed documentation, making it an excellent resource for engineering students and RF enthusiasts to understand the relationship between modulation schemes, bit rates, and channel conditions.
```

---

## Sanity Content Studio
**Category:** Web Development
**Tags:** TypeScript, React, Sanity, Headless CMS, Content Management, Frontend
**GitHub URL:** https://github.com/justinsaju21/sanitystudio

### Description
A highly customizable, open-source real-time content editing environment designed to manage structured content for modern web applications.

### Detailed Write-up (Markdown)
```markdown
## Overview
Sanity Content Studio is a powerful, open-source environment designed to provide a seamless editing experience for structured content. Unlike traditional CMS platforms, Sanity treats content as data, allowing developers to define complex schemas and providing editors with a real-time, collaborative interface.

## Key Features
- **Real-Time Collaboration:** Multiple users can edit content simultaneously without overwriting changes.
- **Structured Content:** Move beyond rigid page builders. Define your content models as code to ensure consistency across all your platforms.
- **Highly Extensible:** The Studio is built with React and TypeScript, making it easy to create custom input components, dashboard widgets, and plugins to fit specific business needs.
- **Decoupled Architecture:** As a headless solution, it separates the content management from the presentation layer, enabling a "content-first" approach across Next.js, Gatsby, or custom React sites.

## Why It Matters
For developers, Sanity Content Studio minimizes the friction between content creation and development. By treating content as a queryable API, teams can scale their content strategy without technical debt, ensuring that content remains portable and future-proof.

## Getting Started
To leverage this studio, ensure you have the Sanity CLI installed. You can define your own schemas in the `schemas` directory, customize the workspace layout, and deploy your studio to the web with minimal configuration. For further integration, it pairs natively with modern frameworks like Next.js, enabling live-preview capabilities directly within the editing interface.
```

---

## SRM GPA & CGPA Calculator
**Category:** Web Development
**Tags:** Python, Streamlit, Data Analysis, Web Application, Education Technology
**GitHub URL:** https://github.com/justinsaju21/srm-cgpa-calculator

### Description
A high-precision, privacy-focused academic utility designed for SRMIST students to instantly calculate semester and cumulative grade point averages using the official university grading rubric.

### Detailed Write-up (Markdown)
```markdown
### Overview
The SRM GPA & CGPA Calculator is a streamlined, web-based tool built to simplify academic performance tracking for students at the SRM Institute of Science and Technology (SRMIST). By leveraging the official university grading scale, the application removes the manual effort and potential for error in calculating semester and cumulative performance.

### Why It Matters
Academic record-keeping can be tedious, especially when navigating complex credit-based grading systems. This project provides a robust solution that is:
* **Accurate**: Strictly adheres to the SRMIST credit and grade point conversion standards.
* **Privacy-First**: Designed as a client-side utility, ensuring that sensitive academic data remains on the user's machine.
* **User-Centric**: Features a clean, ad-free UI that provides an instant, responsive feedback loop for students.

### Key Features
* **Dynamic SGPA Calculation**: Seamlessly input credit values and letter grades for individual subjects to compute the Semester Grade Point Average.
* **Cumulative Tracking**: An integrated module that allows students to account for previous semesters to derive an accurate CGPA.
* **Optimized UI**: A clean, premium dark-mode interface that prioritizes readability and ease of data entry.
* **Zero Latency**: Built with Streamlit to ensure lightning-fast performance without the need for server-side database storage.

### Technical Implementation
The tool is architected using **Python** and **Streamlit**, chosen for their ability to deliver high-performance data processing with minimal overhead. The logic handles form-state management to allow users to scale their input based on their specific course loads for any given semester.

### Usage
1. Input the number of courses currently being taken.
2. Assign the corresponding credit weights and letter grades (O, A+, A, B+, etc.).
3. Input historical semester data into the 'Past Semesters' section for cumulative calculations.
4. View results instantly without page refreshes.
```

---

## ESP32 Ultrasonic Distance Monitor
**Category:** Engineering
**Tags:** C++, ESP32, IoT, Arduino, Web Server, HC-SR04, Embedded Systems
**GitHub URL:** https://github.com/justinsaju21/Ultrasonic_Distance_Monitoring

### Description
An IoT-enabled distance monitoring system that utilizes an ESP32 and an HC-SR04 sensor to provide real-time spatial data via a responsive, standalone web dashboard.

### Detailed Write-up (Markdown)
```markdown
## Overview
The ESP32 Ultrasonic Distance Monitor is a robust IoT project that transforms standard ultrasonic rangefinding into an interactive, browser-based experience. By leveraging the ESP32's built-in Wi-Fi capabilities, the device operates as a standalone Access Point (AP), serving a feature-rich dashboard that visualizes distance data without requiring an existing network infrastructure.

## Key Features
- **Autonomous Operation**: Functions as a Wi-Fi Hotspot, allowing for plug-and-play usage in remote environments.
- **Real-Time Data Visualization**: Features a dynamic distance indicator with an arrow UI that scales with live sensor input.
- **User-Centric UI**: Includes dark/light mode support, unit toggling (Metric/Imperial), and a soft power switch to control the sensor state directly from the browser.
- **Seamless Connectivity**: Supports mDNS, allowing users to access the interface via `http://gatekeeper.local` rather than manual IP address entry.
- **Responsive Design**: The web interface is optimized for both desktop and mobile devices, ensuring ease of use in any scenario.

## Technical Implementation
The firmware is developed in C++ using the Arduino framework, integrating the following components:
- **Server Architecture**: Utilizes an asynchronous web server to handle sensor data requests and state management without blocking the main control loop.
- **Sensor Logic**: Implements precise pulse-width calculation based on the time-of-flight principle to determine distances between 2cm and 400cm.
- **Data Handling**: Leverages `ArduinoJson` to serialize and transmit sensor readings to the frontend efficiently.

## Hardware Setup
To build this project, connect your HC-SR04 sensor to the ESP32 using the following mapping:
| HC-SR04 Pin | ESP32 Pin |
| :--- | :--- |
| **VCC** | **VIN / 5V** |
| **Trig** | **GPIO 16** |
| **Echo** | **GPIO 17** |
| **GND** | **GND** |

*Note: For long-term hardware stability, it is recommended to use a voltage divider on the Echo pin to protect the ESP32's 3.3V logic levels from the sensor's 5V output.*

## Use Cases
- **Proximity Sensing**: Monitor distance to objects for automated systems or alarms.
- **Liquid Level Measurement**: Use the device to track levels in tanks or containers.
- **Educational IoT Tool**: Serve as a foundational project for learning about embedded web servers, sensor integration, and AP-mode networking.
```

---

## Valentine Builder
**Category:** Web Development
**Tags:** TypeScript, Next.js, Tailwind CSS, Google Sheets API, Web Development, Bcrypt
**GitHub URL:** https://github.com/justinsaju21/valentines-day-fun-project

### Description
A premium, interactive SaaS-style platform that enables users to craft personalized, password-protected Valentine's Day proposals with real-time response tracking.

### Detailed Write-up (Markdown)
```markdown
## Project Overview
Valentine Builder is an elegant, full-stack application designed to take digital proposals to the next level. By leveraging modern web technologies, it allows users to create bespoke, romantic landing pages that feature interactive elements like confetti, animations, and custom themes.

## Key Capabilities
- **Personalized Experiences**: Users can generate unique proposal links with custom themes, ensuring each message feels intimate and special.
- **Real-Time Analytics**: Through a seamless Google Sheets integration, creators receive instant feedback when their proposal is opened and when a response is logged.
- **Secure Access**: Every proposal is password-protected using industry-standard bcrypt hashing, ensuring privacy for both parties.
- **Polished UX**: With a focus on visual storytelling, the application utilizes Tailwind CSS and custom animations to provide a premium feel, optimized for both mobile and desktop devices.

## Technical Implementation
Built using the Next.js 14 App Router, this project emphasizes performance and developer experience. The backend logic is decoupled from a traditional database, utilizing the Google Sheets API as a flexible, human-readable data store. This approach makes it exceptionally easy for non-developers to manage their proposals via a familiar spreadsheet interface.

## Why It Stands Out
Valentine Builder is a perfect example of a 'micro-SaaS' architecture. It addresses a specific emotional need with a high-polish user interface, demonstrating proficiency in:
- **API Integration**: Orchestrating communication between client-side interactions and server-side spreadsheet databases.
- **Environment Security**: Robust handling of sensitive service account credentials via environment variables.
- **Responsive UI/UX**: Delivering an immersive, mobile-first experience using modern CSS methodologies.
```

---

## VoxelFlow: Gesture-Controlled 3D Editor
**Category:** Web Development
**Tags:** JavaScript, Three.js, MediaPipe, Computer Vision, WebXR, 3D Rendering
**GitHub URL:** https://github.com/justinsaju21/VoxelFlow

### Description
An immersive 3D voxel modeling environment that lets you build structures in real-time using only natural hand gestures, powered by computer vision.

### Detailed Write-up (Markdown)
```markdown
## Overview
VoxelFlow is an innovative browser-based 3D editor that reimagines how we interact with digital space. By bridging the gap between computer vision and creative design, VoxelFlow allows users to manipulate a virtual voxel world using nothing but their hands and a standard webcam. 

## Core Functionality
Built on a foundation of Three.js and Google's MediaPipe, the application translates skeletal hand-tracking data into precise 3D spatial input. Whether you are building complex architectural structures or simply experimenting with digital clay, the interaction feels intuitive and fluid.

### Key Features
- **Gesture-Based Workflow**: Use a right-hand pointer for precision cursor navigation and left-hand pinch gestures for seamless block placement and deletion.
- **Smart Building Tools**: The editor includes top-stacking magnetism, making it trivial to build vertical structures without fighting with 3D coordinate alignment.
- **Dynamic Physics Engine**: Toggle gravity at any time to watch your creations react to simulated physics, causing unsupported structures to crumble realistically.
- **Real-Time Feedback**: High-performance tracking provides instantaneous visual cues regarding hand presence and gesture recognition status.

## Technical Implementation
The application architecture focuses on low-latency processing to ensure that the hand-tracking loop stays perfectly synced with the 3D rendering loop. 
- **Rendering**: Utilizes Three.js for a robust, high-performance 3D scene graph.
- **Vision**: Employs MediaPipe's HandLandmarker, providing high-fidelity coordinate extraction without the need for specialized hardware.
- **UI/UX**: Lightweight vanilla JavaScript ensures zero-dependency performance, making the app accessible instantly via any modern web browser.

## Getting Started
1. **Environment**: Ensure your computer has a functional webcam and a well-lit workspace.
2. **Run Locally**: Clone the repository and serve the static files:
   ```bash
   npx http-server . -p 8080
   ```
3. **Access**: Navigate to `http://localhost:8080/index.html` and allow webcam permissions to begin editing.
```

---

