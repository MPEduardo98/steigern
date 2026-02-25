"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative w-full py-28 bg-zinc-950 overflow-hidden"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-[1440px] mx-auto px-8 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="w-6 h-px bg-[#E02020]" />
              <span className="text-[#E02020] text-xs font-bold tracking-[0.25em] uppercase">
                Let's Build Together
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-white font-black text-[clamp(2.2rem,4vw,4.5rem)] leading-[1.0] tracking-[-0.03em] uppercase mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Start Your
              <br />
              <span className="text-[#E02020]">Project</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-zinc-400 text-base leading-relaxed mb-12"
            >
              Tell us about your manufacturing challenge. Our engineers will assess your requirements and deliver a proposal within 5 business days.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="space-y-4"
            >
              {[
                { label: "Headquarters", val: "Steigern GmbH, Parkring 10, 85748 Munich, Germany" },
                { label: "Engineering Sales", val: "+49 89 123 4567" },
                { label: "Email", val: "engineering@steigern.com" },
              ].map(({ label, val }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-[10px] text-zinc-600 tracking-[0.2em] uppercase mb-0.5">{label}</span>
                  <span className="text-zinc-300 text-sm">{val}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 border border-zinc-800">
                <div className="w-12 h-12 border-2 border-[#E02020] flex items-center justify-center mb-6">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M3 10L8 15L17 5" stroke="#E02020" strokeWidth="2" />
                  </svg>
                </div>
                <div className="text-white font-bold text-xl mb-2">Message Received</div>
                <div className="text-zinc-400 text-sm">An engineer will be in touch within 5 business days.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">First Name</label>
                    <input required className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Hans" />
                  </div>
                  <div>
                    <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">Last Name</label>
                    <input required className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Müller" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">Company</label>
                  <input required className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="Acme Manufacturing GmbH" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">Email</label>
                  <input type="email" required className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors" placeholder="hans@acme.de" />
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">Industry</label>
                  <select className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors">
                    <option>Automotive</option>
                    <option>Aerospace</option>
                    <option>Pharma & Food</option>
                    <option>Energy & Heavy</option>
                    <option>Electronics</option>
                    <option>Intralogistics</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-zinc-500 tracking-[0.15em] uppercase block mb-1.5">Project Brief</label>
                  <textarea required rows={4} className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm px-4 py-3 focus:outline-none focus:border-[#E02020] transition-colors resize-none" placeholder="Describe your production challenge, volume, constraints..." />
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#E02020] text-white text-xs font-bold tracking-[0.15em] uppercase py-4 hover:bg-[#c41a1a] transition-colors duration-200 mt-2"
                >
                  Submit Enquiry
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}