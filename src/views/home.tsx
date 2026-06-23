import React, { useState, useEffect } from "react";
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faCertificate,
  faSearch,
  faTimes,
  faSun,
  faMoon,
  faLaptop,
  faTerminal,
  faDatabase,
  faLock,
  faArrowRight,
  faCheckCircle,
  faExclamationTriangle,
  faPlay,
  faSpinner
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faAndroid } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { experiences } from "../data/experiences";
import { mySkills } from "../data/skills";
import "./home.css";

const HomePage: React.FC = () => {
  // Theme State: 'light' | 'dark' | 'system'
  const [theme, setTheme] = useState<string>(() => {
    return localStorage.getItem("theme") || "system";
  });

  // Filters State
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [skillsSearch, setSkillsSearch] = useState<string>("");
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>("All");

  // Scroll Progress State
  const [scrollPercent, setScrollPercent] = useState<number>(0);

  // Dev Lab Accordion State
  const [labOpen, setLabOpen] = useState<boolean>(false);
  const [activeLabTab, setActiveLabTab] = useState<string>("crypto");

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  // Lab Tab 1: Crypto States
  const [cryptoText, setCryptoText] = useState("Hello Ethereal Technologies!");
  const [textHash, setTextHash] = useState("");
  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [hashA, setHashA] = useState("");
  const [hashB, setHashB] = useState("");
  const [hashComparison, setHashComparison] = useState<"match" | "mismatch" | "empty">("empty");

  // Lab Tab 2: Star Schema DB States
  const [dbRunning, setDbRunning] = useState(false);
  const [dbStep, setDbStep] = useState(0);
  const [oltpTime, setOltpTime] = useState(0);
  const [olapTime, setOlapTime] = useState(0);

  // Lab Tab 3: Motorway sign bitwise protocol states
  const [signSpeed, setSignSpeed] = useState<number>(50); // Speed limit code
  const [signLane, setSignLane] = useState<string>("closed"); // open, closed, warning
  const [signText, setSignText] = useState("LANE CLOSED AHEAD");
  const [vmsBufferHex, setVmsBufferHex] = useState("");
  const [vmsQueueState, setVmsQueueState] = useState<"idle" | "producing" | "queued" | "consuming" | "rendered">("idle");
  const [vmsLogs, setVmsLogs] = useState<string[]>([]);

  // ----------------------------------------------------
  // Scroll Listener for top progress bar
  // ----------------------------------------------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollPercent((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ----------------------------------------------------
  // Theme Switching Logic
  // ----------------------------------------------------
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem("theme", theme);

    const applyTheme = (isDark: boolean) => {
      if (isDark) {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    };

    if (theme === "system" && typeof window !== "undefined" && window.matchMedia) {
      const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (systemPrefersDark) {
        applyTheme(systemPrefersDark.matches);

        const listener = (e: MediaQueryListEvent) => {
          applyTheme(e.matches);
        };
        systemPrefersDark.addEventListener("change", listener);
        return () => systemPrefersDark.removeEventListener("change", listener);
      }
    } else {
      applyTheme(theme === "dark");
    }
  }, [theme]);

  // ----------------------------------------------------
  // Hashing Utilities (using Web Crypto Subtle API)
  // ----------------------------------------------------
  const computeSHA256 = async (data: string | ArrayBuffer): Promise<string> => {
    let buffer: ArrayBuffer;
    if (typeof data === "string") {
      buffer = new TextEncoder().encode(data);
    } else {
      buffer = data;
    }
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  };

  // Real-time text hashing
  useEffect(() => {
    if (!cryptoText) {
      setTextHash("");
      return;
    }
    computeSHA256(cryptoText).then(hash => setTextHash(hash));
  }, [cryptoText]);

  // File hashing effect
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, target: "A" | "B") => {
    const file = e.target.files?.[0] || null;
    if (target === "A") setFileA(file);
    else setFileB(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = async (evt) => {
        const arrayBuffer = evt.target?.result as ArrayBuffer;
        if (arrayBuffer) {
          const hash = await computeSHA256(arrayBuffer);
          if (target === "A") setHashA(hash);
          else setHashB(hash);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      if (target === "A") { setHashA(""); }
      else { setHashB(""); }
    }
  };

  useEffect(() => {
    if (hashA && hashB) {
      setHashComparison(hashA === hashB ? "match" : "mismatch");
    } else {
      setHashComparison("empty");
    }
  }, [hashA, hashB]);

  // ----------------------------------------------------
  // DB Simulation Logic
  // ----------------------------------------------------
  const runDBSimulation = () => {
    if (dbRunning) return;
    setDbRunning(true);
    setDbStep(1);
    setOltpTime(0);
    setOlapTime(0);

    // OLTP simulation steps (takes longer, joins multiple tables)
    setTimeout(() => {
      setDbStep(2);
      setTimeout(() => {
        setDbStep(3);
        setTimeout(() => {
          setDbStep(4);
          setOltpTime(1420); // ms simulated
          // OLAP simulation starts (quick, direct star schema read)
          setTimeout(() => {
            setDbStep(5);
            setTimeout(() => {
              setDbStep(6);
              setOlapTime(12); // ms simulated
              setDbRunning(false);
            }, 600);
          }, 1000);
        }, 800);
      }, 800);
    }, 800);
  };

  // ----------------------------------------------------
  // Bitwise Sign Serializer Logic
  // ----------------------------------------------------
  useEffect(() => {
    // We simulate serializing fields into a binary byte buffer
    // Byte 0: [Speed Limit (4 bits)][Lane Status (2 bits)][Unused (2 bits)]
    // Byte 1: Text Length
    // Bytes 2+: Text ASCII bytes
    const speedCodeMap: Record<number, number> = {
      0: 0,   // None
      20: 2,
      30: 3,
      40: 4,
      50: 5,
      60: 6,
      70: 7
    };
    const laneCodeMap: Record<string, number> = {
      open: 1,
      closed: 2,
      warning: 3
    };

    const sCode = speedCodeMap[signSpeed] || 0;
    const lCode = laneCodeMap[signLane] || 0;
    
    // Combine byte 0: speed limit shifted by 4, OR lane status shifted by 2
    const byte0 = (sCode << 4) | (lCode << 2);
    
    const textBytes = new TextEncoder().encode(signText.slice(0, 20)); // Limit to 20 chars
    const buffer = new Uint8Array(2 + textBytes.length);
    buffer[0] = byte0;
    buffer[1] = textBytes.length;
    for (let i = 0; i < textBytes.length; i++) {
      buffer[2 + i] = textBytes[i];
    }

    // Convert to hex string
    const hex = Array.from(buffer).map(b => "0x" + b.toString(16).toUpperCase().padStart(2, "0")).join(", ");
    setVmsBufferHex(hex);
  }, [signSpeed, signLane, signText]);

  const triggerVmsTransmission = () => {
    if (vmsQueueState !== "idle" && vmsQueueState !== "rendered") return;
    
    setVmsQueueState("producing");
    setVmsLogs(["[Producer] Packaging motorway sign variables...", `[Producer] Byte Buffer created: [${vmsBufferHex.slice(0, 30)}...]`]);

    setTimeout(() => {
      setVmsQueueState("queued");
      setVmsLogs(prev => [...prev, "[Queue] Routing packet into High-throughput Kafka message stream...", "[Queue] Message acknowledged at broker."]);

      setTimeout(() => {
        setVmsQueueState("consuming");
        setVmsLogs(prev => [...prev, "[Consumer] Roadside C Server received packet.", `[Consumer] Decoding Byte 0: Speed Code = ${signSpeed} MPH, Lane Status = ${signLane.toUpperCase()}`, "[Consumer] Parsing ASCII text payload..."]);

        setTimeout(() => {
          setVmsQueueState("rendered");
          setVmsLogs(prev => [...prev, `[LED Sign] Sign state successfully updated to Speed: ${signSpeed} / Text: "${signText}"`, "[LED Sign] Local LED matrices rendering outputs..."]);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  // ----------------------------------------------------
  // Skills Filtering & Searching
  // ----------------------------------------------------
  const toggleSkillFilter = (skillName: string) => {
    if (selectedSkills.includes(skillName)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skillName));
    } else {
      setSelectedSkills([...selectedSkills, skillName]);
    }
  };

  const clearAllFilters = () => {
    setSelectedSkills([]);
    setSkillsSearch("");
  };

  const getSkillsByCategory = () => {
    const categories: Record<string, string[]> = {
      "Programming & APIs": ["JavaScript/NodeJS", "TypeScript", "Java", "Python", "SQL", "REST", "GraphQL"],
      "Cloud, DevOps & Systems": ["AWS", "GCP", "Terraform", "Pulumi", "Docker", "Kubernetes", "Gitlab", "GitHub Actions", "Kafka", "RabbitMQ"],
      "Web & Mobile": ["React", "NextJS", "Angular", "ExpressJS", "Fastify", "Spring Boot", "Spring Data", "Tailwind", "React Native", "Ionic", "Vercel (CI/CD)"],
      "Testing & Other": ["JUnit", "Jest", "Cypress", "OLAP Systems", "OLTP Databases", "Figma", "JSON", "YAML", "OpenAI"]
    };

    if (activeSkillCategory === "All") {
      return mySkills.filter(skill => 
        skill.name.toLowerCase().includes(skillsSearch.toLowerCase())
      );
    }

    const categorySkills = categories[activeSkillCategory] || [];
    return mySkills.filter(skill => 
      categorySkills.some(cs => skill.name.toLowerCase() === cs.toLowerCase() || skill.name.toLowerCase().includes(cs.toLowerCase())) &&
      skill.name.toLowerCase().includes(skillsSearch.toLowerCase())
    );
  };

  // ----------------------------------------------------
  // Contact Form Submission (Mailto compile)
  // ----------------------------------------------------
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      setContactStatus("Please fill in all fields.");
      return;
    }
    
    // Compile mailto link
    const subject = encodeURIComponent(`Consultancy Inquiry from ${contactName}`);
    const body = encodeURIComponent(`Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMsg}`);
    const mailtoUrl = `mailto:jack@etherealtechnologies.co.uk?subject=${subject}&body=${body}`;
    
    window.location.href = mailtoUrl;
    setContactStatus("Opening your email client...");
    setTimeout(() => {
      setContactStatus("Message draft compiled! Please complete sending via your email app.");
    }, 1500);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("jack@etherealtechnologies.co.uk");
    setContactStatus("Email copied to clipboard!");
    setTimeout(() => setContactStatus(""), 3000);
  };

  // Check if a job matches selected filters
  const doesJobMatchFilters = (jobSkills: string[]) => {
    if (selectedSkills.length === 0) return true;
    return selectedSkills.some(skill => 
      jobSkills.some(js => js.toLowerCase() === skill.toLowerCase() || js.toLowerCase().includes(skill.toLowerCase()))
    );
  };

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollPercent}%` }}></div>

      <div 
        className="min-h-screen w-full relative flex flex-col items-center bg-cover bg-no-repeat bg-center bg-fixed"
        style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/background.jpg)` }}
      >
        {/* Soft Background Layer */}
        <div className="absolute inset-0 z-[-1] bg-[var(--bg-overlay)] transition-colors duration-500"></div>

        {/* Global Wrapper Grid */}
        <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================================= */}
          {/* SIDEBAR: Personal Profile & Fast Facts (Cols 1-4)                         */}
          {/* ========================================================================= */}
          <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-6 animate-fade-in-up">
            
            {/* Main Profile Info Card */}
            <div className="glass-panel rounded-3xl p-6 flex flex-col items-center text-center">
              
              {/* Profile Image with Glow Ring */}
              <div className="relative w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-orange-500 to-amber-400 shadow-xl overflow-hidden mb-6 group">
                <img 
                  src="profile.jpeg" 
                  alt="Jack Jefferies" 
                  className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight">Jack Jefferies</h1>
              <p className="text-orange-500 font-semibold text-lg mt-1">Lead Full Stack & Cloud Architect</p>
              <p className="text-sm font-medium tracking-wide uppercase text-[var(--text-muted)] mt-2">
                Ethereal Technologies Ltd
              </p>

              {/* Quick Details Divider */}
              <hr className="w-full border-[var(--glass-border)] my-6" />

              {/* Detailed Contact List */}
              <div className="w-full flex flex-col gap-4 text-left text-sm text-[var(--text-muted)]">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faEnvelope} className="text-orange-500 w-4 h-4" />
                  <a href="mailto:jack@etherealtechnologies.co.uk" className="hover:text-orange-500 transition-colors">
                    jack@etherealtechnologies.co.uk
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faPhone} className="text-orange-500 w-4 h-4" />
                  <a href="tel:07506479737" className="hover:text-orange-500 transition-colors">
                    07506479737
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="text-orange-500 w-4 h-4" />
                  <span>Bristol, UK (BS10 6SW)</span>
                </div>
              </div>

              {/* Social Links Row */}
              <div className="flex gap-4 mt-6">
                <a 
                  href="https://github.com/Dajaffaman" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-border)] hover:bg-orange-500 hover:text-white transition-all duration-300"
                  aria-label="GitHub Profile"
                >
                  <FontAwesomeIcon icon={faGithub} className="text-lg" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/jack-jefferies" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-border)] hover:bg-orange-500 hover:text-white transition-all duration-300"
                  aria-label="LinkedIn Profile"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
                </a>
              </div>
            </div>

            {/* Released Google Play App Card */}
            <div className="glass-panel rounded-3xl p-6 glow-effect overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-tr from-green-500 to-emerald-400 text-white shadow-md">
                  <FontAwesomeIcon icon={faAndroid} className="text-2xl" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold">Featured Production Release</h3>
                  <p className="text-sm font-semibold text-orange-500 mt-0.5">Agora Mobile Platform</p>
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    A secure booking marketplace connecting users with professional services. Engineered with clean Flutter frontend, secure Stripe payments, and scalable serverless backend logic.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <a 
                      href="https://agora.cleaning" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--glass-border)] hover:bg-orange-500 hover:text-white transition-all"
                    >
                      App Site
                    </a>
                    <a 
                      href="https://play.google.com/store/apps/details?id=com.agora.cleaning" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all flex items-center gap-1.5"
                    >
                      <FontAwesomeIcon icon={faPlay} className="text-[10px]" /> Google Play
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications Card */}
            <div className="glass-panel rounded-3xl p-6">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faCertificate} className="text-orange-500" />
                Certifications
              </h3>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 shrink-0">
                    <FontAwesomeIcon icon={faCertificate} className="text-xs" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">AWS Solutions Architect Associate</h4>
                    <p className="text-xs text-[var(--text-muted)]">July 2020</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 shrink-0">
                    <FontAwesomeIcon icon={faCertificate} className="text-xs" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Google Cloud Certified Developer</h4>
                    <p className="text-xs text-[var(--text-muted)]">2023</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 shrink-0">
                    <FontAwesomeIcon icon={faCertificate} className="text-xs" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">Graph Data Modelling Fundamentals</h4>
                    <p className="text-xs text-[var(--text-muted)]">September 2023</p>
                  </div>
                </div>
              </div>
            </div>

          </aside>

          {/* ========================================================================= */}
          {/* MAIN WORKSPACE: Dashboard, Skills, Timeline, & Lab (Cols 5-12)             */}
          {/* ========================================================================= */}
          <main className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Header Toolbar */}
            <header className="glass-panel rounded-3xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-black text-xl tracking-wider">
                  ET
                </div>
                <div>
                  <h2 className="text-lg font-black tracking-tight leading-none">ETHEREAL</h2>
                  <p className="text-xs font-semibold text-orange-500 uppercase tracking-widest mt-0.5">Technologies</p>
                </div>
              </div>

              {/* Theme Selector */}
              <div className="flex p-1 bg-[var(--glass-border)] rounded-full text-xs font-medium">
                <button 
                  onClick={() => setTheme("system")} 
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "system" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
                >
                  <FontAwesomeIcon icon={faLaptop} /> System
                </button>
                <button 
                  onClick={() => setTheme("light")} 
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "light" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
                >
                  <FontAwesomeIcon icon={faSun} /> Light
                </button>
                <button 
                  onClick={() => setTheme("dark")} 
                  className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${theme === "dark" ? "bg-orange-500 text-white shadow-sm" : "hover:text-orange-500"}`}
                >
                  <FontAwesomeIcon icon={faMoon} /> Dark
                </button>
              </div>
            </header>

            {/* Objective Profile Introduction */}
            <section className="glass-panel rounded-3xl p-6 md:p-8 animate-fade-in-up">
              <h2 className="text-2xl font-bold mb-4 tracking-tight">Professional Objective</h2>
              <p className="text-base md:text-lg leading-relaxed text-[var(--text-muted)] font-normal">
                A highly skilled polyglot engineer with a decade of experience working with object-oriented languages like TypeScript/JavaScript, Java, and various web technologies. Expert in delivering edge compute expertise using REST and Graph APIs in event architectures, with a proven track record of building quality interfaces for both mobile and web applications using Flutter or React. Competent in scaling from start-up to production confidently using the latest DevOps tools such as Terraform, Pulumi, and CDK, whilst maintaining general best practices for cloud-based system architecture. Regularly adept at managing large, complex data structures stored across varying databases, including standard RDBMS, noSQL/Document, Graph, and Time-based systems.
              </p>
            </section>

            {/* Interactive Skills Dashboard */}
            <section className="glass-panel rounded-3xl p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Capabilities Dashboard</h2>
                  <p className="text-xs text-[var(--text-muted)] mt-1">Select tags below to highlight matching experiences in the timeline.</p>
                </div>

                {/* Filter Status Badge */}
                {selectedSkills.length > 0 && (
                  <button 
                    onClick={clearAllFilters}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white transition-all flex items-center gap-2"
                  >
                    Active: {selectedSkills.length} filters <FontAwesomeIcon icon={faTimes} />
                  </button>
                )}
              </div>

              {/* Search and Category Selectors */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    placeholder="Search engineering skill..."
                    className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] focus:outline-none focus:border-orange-500 text-sm placeholder-[var(--text-muted)]"
                    value={skillsSearch}
                    onChange={(e) => setSkillsSearch(e.target.value)}
                  />
                  <FontAwesomeIcon icon={faSearch} className="absolute left-3.5 top-3.5 text-xs text-[var(--text-muted)]" />
                </div>

                <select 
                  className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500 text-[var(--text-muted)]"
                  value={activeSkillCategory}
                  onChange={(e) => setActiveSkillCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  <option value="Programming & APIs">Languages & APIs</option>
                  <option value="Cloud, DevOps & Systems">Cloud & DevOps</option>
                  <option value="Web & Mobile">Web & Mobile Frameworks</option>
                  <option value="Testing & Other">Quality & Databases</option>
                </select>
              </div>

              {/* Skills Tags Grid */}
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {getSkillsByCategory().map((skill, idx) => {
                  const isSelected = selectedSkills.includes(skill.name);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleSkillFilter(skill.name)}
                      className={`text-xs font-semibold px-3 py-2 rounded-xl transition-all duration-300 ${
                        isSelected 
                          ? "bg-orange-500 text-white shadow-md scale-105" 
                          : "bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 hover:bg-orange-500/10 hover:text-orange-500 hover:border-orange-500/30"
                      }`}
                    >
                      {skill.name}
                      <span className="ml-1.5 opacity-60 font-medium text-[10px]">
                        ({skill.experience})
                      </span>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* ========================================================================= */}
            {/* INTERACTIVE DEVELOPER LAB: Collapsible Demos Section                      */}
            {/* ========================================================================= */}
            <section className="glass-panel rounded-3xl overflow-hidden border border-orange-500/20">
              
              {/* Accordion Trigger Header */}
              <button 
                onClick={() => setLabOpen(!labOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left bg-gradient-to-r from-orange-500/5 to-amber-500/5 hover:from-orange-500/10 hover:to-amber-500/10 transition-all border-b border-[var(--glass-border)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center shadow-md pulse-glowing">
                    <FontAwesomeIcon icon={faTerminal} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">🔬 Developer Lab & Playground</h3>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">Explore real-time client-side demonstrations of core architectural concepts.</p>
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[var(--glass-border)] hover:bg-orange-500 hover:text-white transition-all">
                  {labOpen ? "Close Lab" : "Open Lab"}
                </span>
              </button>

              {/* Accordion Body */}
              {labOpen && (
                <div className="p-6 flex flex-col gap-6">
                  
                  {/* Lab Navigation Tabs */}
                  <div className="flex flex-wrap gap-2 border-b border-[var(--glass-border)] pb-3 text-sm">
                    <button 
                      onClick={() => setActiveLabTab("crypto")}
                      className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "crypto" ? "border-orange-500 text-orange-500" : "border-transparent text-[var(--text-muted)] hover:text-orange-500"}`}
                    >
                      <FontAwesomeIcon icon={faLock} /> Cryptography & Hashing
                    </button>
                    <button 
                      onClick={() => setActiveLabTab("db")}
                      className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "db" ? "border-orange-500 text-orange-500" : "border-transparent text-[var(--text-muted)] hover:text-orange-500"}`}
                    >
                      <FontAwesomeIcon icon={faDatabase} /> OLAP vs OLTP Database
                    </button>
                    <button 
                      onClick={() => setActiveLabTab("vms")}
                      className={`pb-2 px-3 border-b-2 font-bold transition-all flex items-center gap-2 ${activeLabTab === "vms" ? "border-orange-500 text-orange-500" : "border-transparent text-[var(--text-muted)] hover:text-orange-500"}`}
                    >
                      <FontAwesomeIcon icon={faTerminal} /> Bitwise Roadside Protocols
                    </button>
                  </div>

                  {/* ---------------------------------------------------- */}
                  {/* TAB 1: CRYPTO/HASHING DEMO                           */}
                  {/* ---------------------------------------------------- */}
                  {activeLabTab === "crypto" && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-lg font-bold">SHA-256 File Integrity Verification</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Demonstrates client-side cryptography utilizing the native browser Web Crypto API (`crypto.subtle`). Upload two files or input text to verify if any modifications have occurred.
                        </p>
                      </div>

                      {/* Manual Text Hashing Input */}
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                        <div className="md:col-span-4 flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[var(--text-muted)]">Input text to hash:</label>
                          <input 
                            type="text"
                            value={cryptoText}
                            onChange={(e) => setCryptoText(e.target.value)}
                            className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
                          />
                        </div>
                        <div className="md:col-span-8 flex flex-col gap-1.5">
                          <label className="text-xs font-semibold text-[var(--text-muted)]">Resulting SHA-256 Hash:</label>
                          <div className="flex gap-2">
                            <code className="flex-1 select-all px-3 py-2 text-xs font-mono rounded-xl bg-slate-900 text-green-400 border border-slate-800 overflow-x-auto break-all whitespace-pre">
                              {textHash || "Waiting for input..."}
                            </code>
                          </div>
                        </div>
                      </div>

                      {/* File Verification comparison uploader */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        {/* File A */}
                        <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold">Source File (File A)</span>
                            {hashA && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
                          </div>
                          <input 
                            type="file" 
                            onChange={(e) => handleFileChange(e, "A")}
                            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
                          />
                          {fileA && (
                            <div className="flex flex-col gap-1 mt-1">
                              <span className="text-xs font-medium text-[var(--text-muted)]">Size: {fileA.size} bytes</span>
                              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">
                                {hashA}
                              </code>
                            </div>
                          )}
                        </div>

                        {/* File B */}
                        <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)] flex flex-col gap-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-bold">Comparison File (File B)</span>
                            {hashB && <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />}
                          </div>
                          <input 
                            type="file" 
                            onChange={(e) => handleFileChange(e, "B")}
                            className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 file:cursor-pointer"
                          />
                          {fileB && (
                            <div className="flex flex-col gap-1 mt-1">
                              <span className="text-xs font-medium text-[var(--text-muted)]">Size: {fileB.size} bytes</span>
                              <code className="text-[10px] font-mono select-all bg-slate-900 text-orange-400 p-1.5 rounded overflow-x-auto break-all">
                                {hashB}
                              </code>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Integrity Verification Comparison Output */}
                      {hashComparison !== "empty" && (
                        <div className={`p-4 rounded-2xl flex items-center gap-3 transition-colors ${hashComparison === "match" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}>
                          <FontAwesomeIcon icon={hashComparison === "match" ? faCheckCircle : faExclamationTriangle} className="text-lg" />
                          <div>
                            <p className="font-bold text-sm">
                              {hashComparison === "match" ? "INTEGRITY SECURED: Files are identical." : "INTEGRITY BREACHED: Files are modified / mismatch."}
                            </p>
                            <p className="text-xs mt-0.5">
                              {hashComparison === "match" ? "The computed cryptographic checksums match perfectly. Original content unmodified." : "The SHA-256 byte sums do not match. The file data has been altered."}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* TAB 2: DATABASE OPTIMIZER (OLAP VS OLTP)             */}
                  {/* ---------------------------------------------------- */}
                  {activeLabTab === "db" && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-lg font-bold">IoT Data Analytics Query Simulator</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Simulates the OLTP-to-OLAP database architectural migration Jack designed at Homelink. Compare traditional relational normalization join overhead to denormalized analytical modeling.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                        {/* Simulation Visual Tracker */}
                        <div className="flex flex-col gap-4">
                          <button 
                            onClick={runDBSimulation} 
                            disabled={dbRunning}
                            className={`w-full py-3 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all ${dbRunning ? "bg-orange-500/20 text-orange-500 cursor-not-allowed" : "bg-orange-500 text-white hover:bg-orange-600 shadow-md"}`}
                          >
                            {dbRunning ? (
                              <>
                                <FontAwesomeIcon icon={faSpinner} className="animate-spin" /> Query Running...
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faPlay} /> Run Query Test
                              </>
                            )}
                          </button>

                          {/* OLTP execution sequence flow */}
                          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
                            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">Model A: Relational OLTP (Normalized)</span>
                            <div className="flex flex-col gap-2.5 mt-3 text-xs">
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 1 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                                <span>1. Scan 1,000,000 measurements</span>
                                <span>{dbStep >= 1 ? "Done" : "Pending"}</span>
                              </div>
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 2 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                                <span>2. Join Device table on ID</span>
                                <span>{dbStep >= 2 ? "Done" : "Pending"}</span>
                              </div>
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 3 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                                <span>3. Join Location & Tenant tables</span>
                                <span>{dbStep >= 3 ? "Done" : "Pending"}</span>
                              </div>
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 4 ? "bg-red-500/10 text-red-500 font-semibold" : "opacity-40"}`}>
                                <span>4. Sort & Group by Month</span>
                                <span>{dbStep >= 4 ? "Finished" : "Pending"}</span>
                              </div>
                            </div>
                          </div>

                          {/* OLAP execution sequence flow */}
                          <div className="p-4 rounded-2xl bg-[var(--glass-border)] border border-[var(--glass-border)]">
                            <span className="text-xs font-bold text-green-500 uppercase tracking-widest">Model B: Analytical OLAP (Star Schema)</span>
                            <div className="flex flex-col gap-2.5 mt-3 text-xs">
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 5 ? "bg-green-500/10 text-green-500 font-semibold" : "opacity-40"}`}>
                                <span>1. Scan denormalized Fact Table</span>
                                <span>{dbStep >= 5 ? "Done" : "Pending"}</span>
                              </div>
                              <div className={`flex items-center justify-between p-2 rounded-lg ${dbStep >= 6 ? "bg-green-500/10 text-green-500 font-semibold" : "opacity-40"}`}>
                                <span>2. Group by Month Pre-indexed Dim</span>
                                <span>{dbStep >= 6 ? "Finished" : "Pending"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Chart Comparison Results */}
                        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-white flex flex-col justify-between min-h-[300px]">
                          <div>
                            <span className="text-xs font-bold text-orange-500 uppercase tracking-widest">Simulation Audit Metrics</span>
                            <p className="text-xs text-slate-400 mt-1">Calculates computational query time comparison (shorter is better).</p>
                          </div>

                          {/* Chart Bars */}
                          <div className="flex flex-col gap-6 my-6">
                            {/* OLTP Bar */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between text-xs font-mono">
                                <span>OLTP (Normalized relational joins)</span>
                                <span className="font-bold text-red-400">{oltpTime ? `${oltpTime} ms` : "0 ms"}</span>
                              </div>
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-red-500 transition-all duration-1000"
                                  style={{ width: oltpTime ? "100%" : "0%" }}
                                ></div>
                              </div>
                            </div>

                            {/* OLAP Bar */}
                            <div className="flex flex-col gap-1.5">
                              <div className="flex justify-between text-xs font-mono">
                                <span>OLAP (Denormalized star schema)</span>
                                <span className="font-bold text-green-400">{olapTime ? `${olapTime} ms` : "0 ms"}</span>
                              </div>
                              <div className="h-4 bg-slate-800 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 transition-all duration-1000"
                                  style={{ width: olapTime ? `${(olapTime / oltpTime) * 100}%` : "0%" }}
                                ></div>
                              </div>
                            </div>
                          </div>

                          {/* Summary text */}
                          {olapTime > 0 && (
                            <div className="text-xs p-3 rounded-lg bg-green-500/10 text-green-400 border border-green-500/20 leading-relaxed font-mono">
                              OLAP Query completes 118x faster. Decoupled fact-dimensional schema eliminates heavy multi-table join computational lockup.
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ---------------------------------------------------- */}
                  {/* TAB 3: BITWISE TRANSMISSION SIMULATION               */}
                  {/* ---------------------------------------------------- */}
                  {activeLabTab === "vms" && (
                    <div className="flex flex-col gap-6">
                      <div>
                        <h4 className="text-lg font-bold">Bitwise Byte Protocol & Event Queue Simulator</h4>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Simulates reverse-engineered VMS sign protocols and high-throughput routing pipelines designed for Costain Group PLC. Change variables to pack bits and watch them route through the system.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        
                        {/* Variables controller inputs */}
                        <div className="md:col-span-5 flex flex-col gap-4">
                          {/* Speed Limit */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[var(--text-muted)]">Speed Limit Variable:</label>
                            <select 
                              value={signSpeed} 
                              onChange={(e) => setSignSpeed(parseInt(e.target.value))}
                              className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none"
                            >
                              <option value={0}>No Speed Limit</option>
                              <option value={20}>20 MPH</option>
                              <option value={30}>30 MPH</option>
                              <option value={40}>40 MPH</option>
                              <option value={50}>50 MPH</option>
                              <option value={60}>60 MPH</option>
                              <option value={70}>70 MPH</option>
                            </select>
                          </div>

                          {/* Lane Status */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[var(--text-muted)]">Lane Status Code:</label>
                            <div className="flex gap-2">
                              {["open", "closed", "warning"].map((opt) => (
                                <button
                                  key={opt}
                                  onClick={() => setSignLane(opt)}
                                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg capitalize border ${signLane === opt ? "bg-orange-500 text-white border-orange-500" : "bg-[var(--glass-bg)] border-[var(--glass-border)] text-[var(--text-muted)]"}`}
                                >
                                  {opt}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Message Text */}
                          <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-[var(--text-muted)]">Display Text (Max 20 chars):</label>
                            <input 
                              type="text" 
                              maxLength={20}
                              value={signText}
                              onChange={(e) => setSignText(e.target.value.toUpperCase())}
                              className="px-3 py-2 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
                            />
                          </div>

                          <button 
                            onClick={triggerVmsTransmission}
                            disabled={vmsQueueState !== "idle" && vmsQueueState !== "rendered"}
                            className="w-full py-3 mt-2 rounded-xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
                          >
                            <FontAwesomeIcon icon={faArrowRight} /> Dispatch Event
                          </button>
                        </div>

                        {/* Byte buffer display and visual sign */}
                        <div className="md:col-span-7 flex flex-col gap-4">
                          
                          {/* Packed byte buffer view */}
                          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-white flex flex-col gap-2">
                            <span className="text-[10px] font-bold text-orange-500 uppercase tracking-widest font-mono">Serialized Binary Packet (Byte Buffer Array)</span>
                            <code className="text-xs font-mono text-green-400 select-all p-2 rounded bg-slate-950 break-all overflow-x-auto whitespace-pre">
                              [{vmsBufferHex}]
                            </code>
                            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-400 mt-1">
                              <div>
                                <p className="text-orange-400 font-bold">Byte 0: Protocol Header</p>
                                <p>Bits 0-3: Speed Limit Code</p>
                                <p>Bits 4-5: Lane Code</p>
                              </div>
                              <div>
                                <p className="text-orange-400 font-bold">Byte 1: Text Length</p>
                                <p>Bytes 2+: ASCII ASCII bytes</p>
                              </div>
                            </div>
                          </div>

                          {/* Motorway Sign Visual Output */}
                          <div className="p-4 rounded-xl bg-black border-2 border-slate-700 flex flex-col items-center justify-center min-h-[140px] shadow-inner text-yellow-500 font-mono">
                            <div className="flex items-center gap-6">
                              {/* Virtual LED Sign Display */}
                              <div className="flex flex-col items-center">
                                {signSpeed > 0 && (
                                  <div className="w-14 h-14 rounded-full border-4 border-red-600 flex items-center justify-center bg-black text-white font-black text-2xl animate-pulse">
                                    {signSpeed}
                                  </div>
                                )}
                                {signLane === "closed" && signSpeed === 0 && (
                                  <div className="text-red-500 font-extrabold text-2xl border border-red-500/30 p-1 rounded animate-pulse">
                                    ❌ CLOSED
                                  </div>
                                )}
                              </div>

                              {/* Matrix Text */}
                              <div className="text-center font-bold tracking-widest text-sm bg-yellow-950/20 text-yellow-500 px-3 py-2 border border-yellow-500/20 rounded max-w-[200px] break-all leading-relaxed">
                                {signText || "VMS BLANK"}
                              </div>
                            </div>
                          </div>

                          {/* Queue Pipeline Visualizer Logs */}
                          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 text-xs font-mono min-h-[90px] max-h-[120px] overflow-y-auto custom-scrollbar">
                            {vmsLogs.map((log, lIdx) => (
                              <div key={lIdx} className="py-0.5">
                                {log}
                              </div>
                            ))}
                          </div>

                        </div>

                      </div>
                    </div>
                  )}

                </div>
              )}
            </section>

            {/* ========================================================================= */}
            {/* TIMELINE: Reverse Chronological Job Experience                          */}
            {/* ========================================================================= */}
            <section className="flex flex-col gap-6">
              <h2 className="text-2xl font-bold tracking-tight px-1">Professional Experience</h2>

              {/* Vertical Timeline container */}
              <div className="relative pl-6 md:pl-8 border-l-2 border-[var(--timeline-line)] flex flex-col gap-8 transition-colors duration-500">
                
                {experiences.map((exp, idx) => {
                  const isMatching = doesJobMatchFilters(exp.skills);
                  const hasActiveFilters = selectedSkills.length > 0;
                  
                  return (
                    <div 
                      key={idx} 
                      className={`relative transition-all duration-500 ${
                        hasActiveFilters 
                          ? isMatching 
                            ? "opacity-100 scale-100" 
                            : "opacity-35 scale-95 blur-[0.4px]" 
                          : "opacity-100"
                      }`}
                    >
                      {/* Timeline Node Dot */}
                      <span className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 bg-[var(--bg-overlay)] transition-all ${
                        hasActiveFilters && isMatching 
                          ? "border-orange-500 bg-orange-500 scale-125 shadow-lg" 
                          : "border-[var(--timeline-line)]"
                      }`}></span>

                      {/* Job card */}
                      <div className={`glass-card rounded-3xl p-6 flex flex-col gap-3 ${
                        hasActiveFilters && isMatching ? "border-orange-500/40 ring-1 ring-orange-500/10" : ""
                      }`}>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                          <h3 className="text-xl font-bold tracking-tight">{exp.title}</h3>
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[var(--glass-border)] text-[var(--text-muted)] self-start sm:self-auto">
                            {exp.duration}
                          </span>
                        </div>
                        
                        <h4 className="text-orange-500 font-bold text-sm tracking-wide uppercase leading-none">
                          {exp.company}
                        </h4>

                        <p className="text-sm leading-relaxed text-[var(--text-muted)] mt-1">
                          {exp.description}
                        </p>

                        {/* Experience Tech Tags */}
                        <div className="flex flex-wrap gap-1.5 mt-2 pt-2 border-t border-[var(--glass-border)]">
                          {exp.skills.map((skill, sIdx) => {
                            const isFilterActive = selectedSkills.includes(skill);
                            return (
                              <button
                                key={sIdx}
                                onClick={() => toggleSkillFilter(skill)}
                                className={`text-[10px] font-bold px-2 py-1 rounded-lg transition-all ${
                                  isFilterActive 
                                    ? "bg-orange-500 text-white" 
                                    : "bg-[var(--glass-border)] text-[var(--text-muted)] hover:text-orange-500"
                                }`}
                              >
                                {skill}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </section>

            {/* ========================================================================= */}
            {/* CONTACT: Glassmorphic Email Formulation portal                            */}
            {/* ========================================================================= */}
            <section id="contact" className="glass-panel rounded-3xl p-6 md:p-8">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Get in Touch</h2>
              <p className="text-xs text-[var(--text-muted)] mb-6">Send an inquiry via your email client or copy my direct contact address below.</p>

              <form onSubmit={handleContactSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[var(--text-muted)]">Your Name:</label>
                    <input 
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Enter your name"
                      className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-[var(--text-muted)]">Your Email:</label>
                    <input 
                      type="email" 
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-[var(--text-muted)]">Your Message:</label>
                  <textarea 
                    rows={4}
                    required
                    value={contactMsg}
                    onChange={(e) => setContactMsg(e.target.value)}
                    placeholder="Describe your consultancy needs..."
                    className="px-4 py-2.5 rounded-2xl bg-[var(--glass-bg)] border border-[var(--glass-border)] text-sm focus:outline-none focus:border-orange-500 resize-none"
                  ></textarea>
                </div>

                {contactStatus && (
                  <p className="text-xs font-semibold text-orange-500 animate-pulse">
                    {contactStatus}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button 
                    type="submit"
                    className="flex-1 py-3 px-6 rounded-2xl font-bold bg-orange-500 text-white hover:bg-orange-600 transition-all shadow-md text-sm text-center"
                  >
                    Open Email Client
                  </button>
                  <button 
                    type="button"
                    onClick={copyEmailToClipboard}
                    className="py-3 px-6 rounded-2xl font-bold bg-[var(--glass-border)] text-[var(--text-muted)] hover:bg-orange-500 hover:text-white transition-all text-sm text-center"
                  >
                    Copy Email Address
                  </button>
                </div>
              </form>
            </section>

          </main>

        </div>
      </div>
    </>
  );
};

export default HomePage;
