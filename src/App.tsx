import { motion } from "motion/react";
import {
  Activity,
  Dna,
  Zap,
  ArrowRight,
  Shield,
  Menu,
  X,
  Fingerprint,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [pulse, setPulse] = useState(82);
  const [email, setEmail] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, zipCode }),
      });
      if (res.ok) {
        setSubmitted(true);
        setEmail("");
        setZipCode("");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      title: "Cellular Longevity",
      id: "PROT-NAD-01",
      description: "Nucleotide sequence optimization and cellular ATP restoration.",
      icon: <Dna className="w-5 h-5 text-royal-amethyst" />,
      metric: "99.8% Bioavailability",
    },
    {
      title: "Neural Overclock",
      id: "NEUR-ENH-04",
      description: "Synaptic clarity via mitochondrial-targeted nutritional delivery.",
      icon: <Zap className="w-5 h-5 text-electric-cyan" />,
      metric: "40ms Response Drop",
    },
    {
      title: "Immune Protocol",
      id: "IMM-SHLD-09",
      description: "Level 4 defense reinforcement through systemic detoxification.",
      icon: <Shield className="w-5 h-5 text-electric-cyan" />,
      metric: "L4 Defense Grade",
    },
  ];

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  };

  return (
    <div className="min-h-screen bg-noir-bg font-sans text-paper-white selection:bg-electric-cyan/20 selection:text-electric-cyan overflow-x-hidden">

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-10 flex justify-between items-center pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-electric-cyan/30 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-electric-cyan/10 animate-pulse rounded-full" />
            <Fingerprint className="w-4 h-4 text-electric-cyan" />
          </div>
          <span className="font-sans text-xs tracking-[0.5em] uppercase font-light">
            Aion <span className="text-electric-cyan font-medium">Reserve</span>
          </span>
        </div>

        <div className="hidden md:flex gap-12 pointer-events-auto items-center">
          {["Protocols", "Analysis", "Membership"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[10px] uppercase tracking-[0.3em] text-white/40 hover:text-electric-cyan transition-all duration-300"
            >
              [ {item} ]
            </a>
          ))}
          <button className="bg-electric-cyan text-noir-bg px-8 py-2.5 text-[9px] uppercase tracking-[0.3em] font-semibold hover:glow-cyan transition-all duration-500">
            Access Portal
          </button>
        </div>

        <button
          className="md:hidden pointer-events-auto text-electric-cyan"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-noir-bg flex flex-col items-center justify-center gap-10">
          {["Protocols", "Analysis", "Membership"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setIsMenuOpen(false)}
              className="text-sm uppercase tracking-[0.4em] text-white/60 hover:text-electric-cyan transition-colors"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-8 md:px-20 overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-noir-bg via-noir-bg/80 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full z-0 opacity-30">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal-amethyst/20 blur-[120px] rounded-full animate-pulse" />
        </div>

        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1579154235602-3c2cbbac75c7?q=80&w=1920&auto=format&fit=crop"
            alt="Premium IV Therapy"
            className="w-full h-full object-cover grayscale brightness-[0.4]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="relative z-20 max-w-4xl">
          <motion.div {...fadeUp} className="flex items-center gap-4 mb-8">
            <div className="h-[1px] w-12 bg-electric-cyan/50" />
            <p className="text-electric-cyan font-mono text-[10px] uppercase tracking-[0.5em] font-medium text-glow-cyan">
              Status: Optimized • v2.04
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-sans text-5xl md:text-8xl font-thin mb-10 leading-[1.1] tracking-[-0.02em] uppercase"
          >
            Biological <br />
            <span className="text-electric-cyan font-light italic tracking-tight lowercase">
              Architecture.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-paper-white max-w-lg mb-12 text-sm md:text-base font-light leading-loose tracking-widest uppercase"
          >
            The future of your body is not predetermined. It is designed.
            Private IV therapy delivered to you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-8 items-start"
          >
            <a href="#waitlist" className="group relative">
              <div className="absolute inset-0 bg-electric-cyan blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative bg-electric-cyan text-noir-bg px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center gap-3">
                Begin Analysis <ArrowRight className="w-4 h-4" />
              </div>
            </a>

            <div className="flex flex-col gap-1">
              <span className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
                System Health
              </span>
              <span className="text-xl font-mono text-royal-amethyst font-light tracking-tighter">
                {pulse} <span className="text-[10px] text-white/20">BPM</span>
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute top-10 right-10 bottom-10 left-10 border border-white/5 pointer-events-none z-30" />
      </section>

      {/* Metrics Section */}
      <section id="analysis" className="py-40 px-8 bg-noir-bg border-y border-white/5 relative">
        <div className="absolute inset-0 z-0 overflow-hidden opacity-5">
          <div className="grid grid-cols-12 h-full w-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="border-r border-white/20 h-full" />
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-24 items-center relative z-10">
          <div className="space-y-16">
            <div>
              <p className="text-royal-amethyst font-mono text-[9px] uppercase tracking-[0.6em] mb-6 font-semibold">
                Diagnostic Interface
              </p>
              <h2 className="font-sans text-4xl md:text-6xl font-extralight tracking-[0.05em] uppercase leading-tight mb-8">
                Quantified <br />
                <span className="font-semibold text-royal-amethyst">
                  Bio-Intelligence.
                </span>
              </h2>
              <p className="text-white/40 text-sm font-light leading-relaxed tracking-wider uppercase max-w-md">
                Every infusion is calibrated against your unique metabolic data
                blueprint. We don't just treat; we engineer resilience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {[
                { label: "Data Integrity", val: "100%", sub: "Medical Grade" },
                { label: "Processing Speed", val: "SUB-SEC", sub: "Cloud Syncing" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="space-y-4 border-l border-electric-cyan/20 pl-6"
                >
                  <p className="text-[9px] uppercase tracking-[0.4em] text-white/30">
                    {item.label}
                  </p>
                  <p className="font-mono text-2xl text-electric-cyan font-light">
                    {item.val}
                  </p>
                  <p className="text-[10px] text-white/20 tracking-widest">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 p-2 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-electric-cyan/50 uppercase tracking-widest">
              Live Feed // 0xAF32-9
            </div>
            <img
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?q=80&w=1200&auto=format&fit=crop"
              alt="Lab Interface"
              className="w-full grayscale opacity-50 contrast-125 group-hover:opacity-70 transition-opacity duration-700"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-noir-bg via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 flex items-center gap-4">
              <Activity className="w-5 h-5 text-electric-cyan animate-pulse" />
              <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  className="h-full bg-electric-cyan"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Protocol Selection */}
      <section id="protocols" className="py-40 px-8 relative">
        <div className="max-w-7xl mx-auto text-center mb-32">
          <p className="text-electric-cyan font-mono text-[9px] uppercase tracking-[0.6em] mb-6">
            Available Modules
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-light uppercase tracking-[0.2em]">
            The Active Stack
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 border border-white/5">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group p-16 bg-noir-bg hover:bg-white/[0.02] transition-all duration-700 relative cursor-pointer"
            >
              <div className="mb-10 flex justify-between items-start">
                <div className="p-3 border border-white/10 group-hover:border-electric-cyan/40 transition-colors uppercase font-mono text-[8px] text-white/30 group-hover:text-electric-cyan">
                  {service.id}
                </div>
                {service.icon}
              </div>
              <h3 className="font-sans text-xl mb-6 font-light uppercase tracking-[0.3em] group-hover:text-electric-cyan transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 font-light leading-relaxed mb-10 text-xs tracking-wider uppercase">
                {service.description}
              </p>
              <div className="flex justify-between items-center pt-8 border-t border-white/10">
                <span className="font-mono text-[10px] text-royal-amethyst/70">
                  {service.metric}
                </span>
                <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-electric-cyan group-hover:translate-x-2 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className="py-40 px-8 bg-noir-bg border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-electric-cyan font-mono text-[9px] uppercase tracking-[0.6em] mb-6">
            Early Access
          </p>
          <h2 className="font-sans text-4xl md:text-5xl font-light uppercase tracking-[0.1em] mb-6">
            Reserve Your Protocol
          </h2>
          <p className="text-white/40 text-sm uppercase tracking-widest mb-16 leading-relaxed">
            Get $50 off your first treatment + priority access when we launch in your area.
          </p>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border border-white/10 focus:border-electric-cyan/50 outline-none px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-paper-white placeholder:text-white/20 transition-colors"
              />
              <input
                type="text"
                placeholder="ZIP CODE"
                value={zipCode}
                onChange={(e) =>
                  setZipCode(e.target.value.replace(/\D/g, "").slice(0, 5))
                }
                required
                className="bg-white/5 border border-white/10 focus:border-electric-cyan/50 outline-none px-6 py-4 text-[11px] uppercase tracking-[0.3em] text-paper-white placeholder:text-white/20 transition-colors"
              />
              <button
                type="submit"
                disabled={loading}
                className="group relative mt-4"
              >
                <div className="absolute inset-0 bg-electric-cyan blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <div className="relative bg-electric-cyan text-noir-bg py-5 text-[10px] uppercase tracking-[0.4em] font-bold flex items-center justify-center gap-3 disabled:opacity-50">
                  {loading ? "Processing..." : <>Secure Your Spot <ArrowRight className="w-4 h-4" /></>}
                </div>
              </button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-electric-cyan/20 p-12 space-y-4"
            >
              <p className="text-electric-cyan font-mono text-[9px] uppercase tracking-[0.6em]">
                Access Granted
              </p>
              <p className="text-2xl font-light uppercase tracking-widest">You're on the list.</p>
              <p className="text-white/40 text-xs uppercase tracking-widest leading-relaxed">
                We'll notify you when we launch in your area.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-8 bg-noir-bg border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="col-span-1 md:col-span-2">
            <span className="font-sans text-xs tracking-[0.5em] uppercase font-light block mb-10">
              Aion <span className="text-electric-cyan">Reserve</span>
            </span>
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em] leading-relaxed max-w-sm">
              Biological systems are vulnerable to time. We provide the
              optimization. Private, medical-grade IV therapy concierge.
            </p>
          </div>

          <div className="space-y-10">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-electric-cyan font-bold">
              Directories
            </h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <li className="hover:text-electric-cyan cursor-pointer transition-colors">
                Lab Locations
              </li>
              <li className="hover:text-electric-cyan cursor-pointer transition-colors">
                Mobile Extraction
              </li>
              <li className="hover:text-electric-cyan cursor-pointer transition-colors">
                IV Protocol v2
              </li>
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-electric-cyan font-bold">
              Secure Link
            </h4>
            <ul className="space-y-4 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <li>hello@aionreserve.com</li>
              <li>
                <a
                  href="https://instagram.com/AION_Reserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-electric-cyan transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@AION_Reserve"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-electric-cyan transition-colors"
                >
                  TikTok
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-10">
          <p className="font-mono text-[8px] text-white/10 uppercase tracking-[0.4em]">
            Auth: 0922-XFB-CORE // © 2026 Aion by Pipe Labs LLC
          </p>
          <div className="flex gap-12">
            {["Terms", "Privacy", "HIPAA"].map((link) => (
              <span
                key={link}
                className="font-mono text-[8px] text-white/10 uppercase tracking-[0.4em] hover:text-royal-amethyst cursor-pointer transition-colors"
              >
                {link}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
