import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faCertificate, 
  faPlay,
  faCloud,
  faCircleNodes
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin, faAws, faGoogle } from "@fortawesome/free-brands-svg-icons";

export const Sidebar: React.FC = () => {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 animate-fade-in-up">
      {/* Main Profile Info Card */}
      <div className="glass-panel rounded-3xl p-4 flex flex-col shrink-0">
        
        {/* Mobile Horizontal / Desktop Vertical Profile Header */}
        <div className="flex flex-row lg:flex-col items-center lg:text-center gap-4">
          {/* Profile Image with Glow Ring */}
          <div className="relative w-20 h-20 lg:w-32 lg:h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-emerald-300 shadow-xl overflow-hidden shrink-0 group">
            <img 
              src="profile.jpeg" 
              alt="Jack Jefferies" 
              className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          <div className="flex-1 text-left lg:text-center">
            <h1 className="text-xl lg:text-3xl font-extrabold tracking-tight">Ethereal Technologies</h1>
            <p className="text-emerald-500 font-semibold text-sm lg:text-lg mt-0.5 lg:mt-1">Software Consultancy & Engineering</p>
            <p className="hidden lg:block text-sm font-medium tracking-wide text-[var(--text-muted)] mt-2">
              Experts in software, consultants you can rely on.
            </p>
          </div>
        </div>

        {/* Mobile Expand Toggle Button */}
        <button 
          className="lg:hidden w-full mt-4 py-2 rounded-xl bg-[var(--glass-border)] text-sm font-semibold hover:bg-emerald-500 hover:text-white transition-colors"
          onClick={() => setMobileExpanded(!mobileExpanded)}
        >
          {mobileExpanded ? "Hide Contact & Details" : "View Contact & Details"}
        </button>

        {/* Collapsible profile info (always shown on lg) */}
        <div className={`${mobileExpanded ? 'block' : 'hidden'} lg:block`}>
          {/* Quick Details Divider */}
          <hr className="w-full border-[var(--glass-border)] my-4 lg:my-6" />

        {/* Detailed Contact List */}
        <div className="w-full flex flex-col gap-4 text-left text-sm text-[var(--text-muted)]">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEnvelope} className="text-emerald-500 w-4 h-4" />
            <a href="mailto:jack@etherealtechnologies.co.uk" className="hover:text-emerald-500 transition-colors">
              jack@etherealtechnologies.co.uk
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faPhone} className="text-emerald-500 w-4 h-4" />
            <a href="tel:07506479737" className="hover:text-emerald-500 transition-colors">
              07506479737
            </a>
          </div>
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-emerald-500 w-4 h-4" />
            <span>Software Consultancy based in Bristol, UK</span>
          </div>
        </div>

        {/* Social Links Row */}
        <div className="flex gap-4 mt-6">
          <a 
            href="https://github.com/Dajaffaman" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-border)] hover:bg-emerald-500 hover:text-white transition-all duration-300"
            aria-label="GitHub Profile"
          >
            <FontAwesomeIcon icon={faGithub} className="text-lg" />
          </a>
          <a 
            href="https://www.linkedin.com/in/jack-jefferies" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[var(--glass-border)] hover:bg-emerald-500 hover:text-white transition-all duration-300"
            aria-label="LinkedIn Profile"
          >
            <FontAwesomeIcon icon={faLinkedin} className="text-lg" />
          </a>
        </div>
        </div>
      </div>

      {/* Secondary Cards wrapped in Mobile Accordion state */}
      <div className={`flex-col gap-4 ${mobileExpanded ? 'flex' : 'hidden'} lg:flex`}>
        {/* Released Google Play App Card */}
        <div className="glass-panel rounded-3xl p-4 glow-effect overflow-hidden shrink-0">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md overflow-hidden bg-[var(--glass-bg)] border border-[var(--glass-border)] shrink-0">
              <img 
                src="agora_icon.png" 
                alt="Agora Mobile App" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold">Featured Production Release</h3>
              <p className="text-sm font-semibold text-emerald-500 mt-0.5">Agora Mobile Platform</p>
              <p className="text-xs text-[var(--text-muted)] mt-2">
                A secure booking marketplace connecting users with professional services. Engineered with clean Flutter frontend, secure Stripe payments, and scalable serverless backend logic.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <a 
                  href="https://agora.cleaning" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-[var(--glass-border)] hover:bg-emerald-500 hover:text-white transition-all"
                >
                  App Site
                </a>
                <a 
                  href="https://play.google.com/store/apps/details?id=cleaning.agora&hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition-all flex items-center gap-1.5"
                >
                  <FontAwesomeIcon icon={faPlay} className="text-[10px]" /> Google Play
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Card */}
        <div className="glass-panel rounded-3xl p-4 shrink-0">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <FontAwesomeIcon icon={faCertificate} className="text-emerald-500" />
            Certifications
          </h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#FF9900]/10 text-[#FF9900] shrink-0 border border-[#FF9900]/20 shadow-sm">
                <FontAwesomeIcon icon={faAws} className="text-[14px]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">AWS Solutions Architect Associate</h4>
                <p className="text-xs text-[var(--text-muted)]">July 2020</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#4285F4]/10 text-[#4285F4] shrink-0 border border-[#4285F4]/20 shadow-sm">
                <FontAwesomeIcon icon={faGoogle} className="text-[12px]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Google Cloud Certified Developer</h4>
                <p className="text-xs text-[var(--text-muted)]">2023</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[#018bff]/10 text-[#018bff] shrink-0 border border-[#018bff]/20 shadow-sm">
                <FontAwesomeIcon icon={faCircleNodes} className="text-[12px]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold">Graph Data Modelling Fundamentals</h4>
                <p className="text-xs text-[var(--text-muted)]">September 2023</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
