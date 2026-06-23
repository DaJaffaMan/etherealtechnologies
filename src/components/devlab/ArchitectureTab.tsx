import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileScreen, faServer, faDatabase, faCloud, faLock, faShieldHalved, faBuilding, faLocationDot } from "@fortawesome/free-solid-svg-icons";

export const ArchitectureTab: React.FC = () => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleHover = (id: string | null) => {
    setActiveTooltip(id);
  };

  return (
    <div className="flex flex-col gap-6 animate-fade-in-up">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
          <FontAwesomeIcon icon={faCloud} className="text-blue-500" />
          Cloud Architecture Simulator
        </h3>
        <p className="text-sm text-[var(--text-muted)]">
          An interactive topological map of the Agora Mobile Platform. Hover over the nodes to inspect the engineering decisions and scalability strategies for each layer.
        </p>
      </div>

      <div className="relative p-6 md:p-10 rounded-2xl bg-[var(--bg-overlay)] border border-[var(--timeline-line)] flex flex-col gap-12 overflow-hidden shadow-inner isolate">
        
        {/* Connection Lines (SVGs drawn in background) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none -z-10 opacity-30" style={{ strokeDasharray: "4, 4" }}>
          {/* Mobile -> Gateway */}
          <line x1="50%" y1="15%" x2="50%" y2="40%" stroke="var(--text-muted)" strokeWidth="2" />
          {/* Gateway -> API */}
          <line x1="50%" y1="40%" x2="50%" y2="65%" stroke="var(--text-muted)" strokeWidth="2" />
          
          {/* API -> DBs (Branching) */}
          <line x1="50%" y1="65%" x2="20%" y2="85%" stroke="var(--text-muted)" strokeWidth="2" />
          <line x1="50%" y1="65%" x2="50%" y2="85%" stroke="var(--text-muted)" strokeWidth="2" />
          <line x1="50%" y1="65%" x2="80%" y2="85%" stroke="var(--text-muted)" strokeWidth="2" />
        </svg>

        {/* Level 1: Client */}
        <div className="flex justify-center relative z-10">
          <div 
            className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 shadow-lg text-white cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => handleHover('client')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faMobileScreen} className="text-3xl mb-2" />
            <span className="font-bold text-sm">Flutter App</span>
            {activeTooltip === 'client' && (
              <div className="absolute top-full mt-3 w-48 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs text-[var(--text-main)] backdrop-blur-md z-20">
                <strong>Frontend Client</strong><br/>
                Cross-platform mobile application utilizing Flutter for state management. Optimized for 60fps animations.
              </div>
            )}
          </div>
        </div>

        {/* Level 2: API Gateway */}
        <div className="flex justify-center relative z-10">
          <div 
            className="group relative flex flex-col items-center justify-center px-8 py-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--timeline-line)] shadow-md cursor-pointer hover:border-blue-500 hover:shadow-blue-500/20 transition-all"
            onMouseEnter={() => handleHover('gateway')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faServer} className="text-2xl text-[var(--text-muted)] mb-1" />
            <span className="font-bold text-sm text-center">Agora API (Port 3000)<br/><span className="text-xs font-normal">NestJS + Apollo GraphQL + Fastify</span></span>
            {activeTooltip === 'gateway' && (
              <div className="absolute left-full ml-3 w-48 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs backdrop-blur-md z-20">
                <strong>Core API Layer</strong><br/>
                Serves the complete GraphQL API surface. Handles business logic for Users, Bookings, Availability, and Search modules.
              </div>
            )}
          </div>
        </div>

        {/* Level 3: Auth Layer */}
        <div className="flex justify-center relative z-10">
          <div 
            className="group relative flex flex-col items-center justify-center w-full max-w-sm py-4 rounded-xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 shadow-md cursor-pointer hover:bg-orange-500/30 transition-colors"
            onMouseEnter={() => handleHover('api')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faShieldHalved} className="text-2xl text-orange-500 mb-1" />
            <span className="font-bold text-sm text-orange-500">Firebase Auth Guard (JWT)</span>
            {activeTooltip === 'api' && (
              <div className="absolute right-full mr-3 w-48 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs backdrop-blur-md z-20">
                <strong>Authentication Layer</strong><br/>
                Validates JWT tokens, manages token refresh, handles Role-Based Access Control, and injects user context.
              </div>
            )}
          </div>
        </div>

        {/* Level 4: External Services & DB */}
        <div className="flex justify-between items-center px-[5%] md:px-[10%] relative z-10">
          {/* Companies House */}
          <div 
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--glass-bg)] border border-yellow-500/30 cursor-pointer hover:border-yellow-500 transition-all text-center w-28"
            onMouseEnter={() => handleHover('companies')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faBuilding} className="text-xl text-yellow-500 mb-1" />
            <span className="font-bold text-[10px] leading-tight">Companies<br/>House API</span>
            {activeTooltip === 'companies' && (
              <div className="absolute bottom-full mb-3 w-48 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs backdrop-blur-md z-20">
                <strong>Business Verification</strong><br/>
                External API to verify company details, SIC codes, and business registration profiles.
              </div>
            )}
          </div>

          {/* Graph DB */}
          <div 
            className="group relative flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg text-white cursor-pointer hover:scale-105 transition-transform"
            onMouseEnter={() => handleHover('db')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faDatabase} className="text-2xl mb-1" />
            <span className="font-bold text-sm">Neo4j Graph DB</span>
            {activeTooltip === 'db' && (
              <div className="absolute bottom-full mb-3 w-64 p-4 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs text-[var(--text-main)] backdrop-blur-md z-20 text-left">
                <strong>Graph Relationships:</strong><br/>
                <ul className="mt-2 pl-4 list-disc space-y-1 text-[11px] leading-tight">
                  <li><strong>User</strong> → [HAS_ADDRESS] → <strong>Address</strong></li>
                  <li><strong>User</strong> → [OFFERS_SERVICE] → <strong>Service</strong></li>
                  <li><strong>User</strong> → [PROVIDES_SERVICE] → <strong>Booking</strong></li>
                  <li><strong>Review</strong> → [RATED_SKILL] → <strong>Skill</strong></li>
                </ul>
              </div>
            )}
          </div>

          {/* Google Maps */}
          <div 
            className="group relative flex flex-col items-center justify-center p-3 rounded-xl bg-[var(--glass-bg)] border border-purple-500/30 cursor-pointer hover:border-purple-500 transition-all text-center w-28"
            onMouseEnter={() => handleHover('maps')}
            onMouseLeave={() => handleHover(null)}
          >
            <FontAwesomeIcon icon={faLocationDot} className="text-xl text-purple-500 mb-1" />
            <span className="font-bold text-[10px] leading-tight">Google Maps<br/>Distance API</span>
            {activeTooltip === 'maps' && (
              <div className="absolute bottom-full mb-3 w-48 p-3 rounded-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] shadow-xl text-xs backdrop-blur-md z-20 text-left">
                <strong>Routing Module</strong><br/>
                Calculates travel times, distances, and buffer zones between sequential service bookings.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
