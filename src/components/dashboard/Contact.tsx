import React, { useState } from "react";

export const Contact: React.FC = () => {
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");
  const [contactStatus, setContactStatus] = useState("");

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      setContactStatus("Please fill in all fields.");
      return;
    }
    
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

  return (
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
  );
};
