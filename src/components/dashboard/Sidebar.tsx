import React from "react";
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
  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-8 flex flex-col gap-4 animate-fade-in-up">
      {/* Main Profile Info Card */}
      <div className="glass-panel rounded-3xl p-4 flex flex-col items-center text-center shrink-0">
        {/* Profile Image with Glow Ring */}
        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-emerald-500 to-emerald-300 shadow-xl overflow-hidden mb-4 group">
          <img 
            src="profile.jpeg" 
            alt="Jack Jefferies" 
            className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
          />
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight">Jack Jefferies</h1>
        <p className="text-emerald-500 font-semibold text-lg mt-1">Fullstack Engineer & Cloud Architect</p>
        <p className="text-sm font-medium tracking-wide uppercase text-[var(--text-muted)] mt-2">
          Ethereal Technologies Ltd
        </p>

        {/* Quick Details Divider */}
        <hr className="w-full border-[var(--glass-border)] my-6" />

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
            <span>Bristol, UK (BS10 6SW)</span>
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
    </aside>
  );
};
