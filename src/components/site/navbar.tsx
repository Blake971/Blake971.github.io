import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Sun, ArrowUpRight, Shield, Menu, X, Command } from "lucide-react";
import { ScrambleText } from "./scramble-text";
import { VisezWorksIcon } from "./logo";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Works", href: "#work" },
];

export function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Section scrollSpy for active highlighting
      const sections = ["home", "about", "work", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Smooth scroll helper
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    setActiveSection(targetId);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", href);
    }
  };

  const openAdmin = () => {
    window.location.hash = "#admin";
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-5 ${
          scrolled
            ? "glass-panel border border-border shadow-[0_10px_40px_-24px_rgba(0,0,0,0.5)] bg-background/80 backdrop-blur-xl"
            : "border border-transparent bg-background/40 backdrop-blur-md"
        }`}
      >
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group" aria-label="VisezWorks home">
          <VisezWorksIcon className="size-9 text-foreground transition-transform duration-300 group-hover:scale-110" />
          <span className="hidden font-display text-base uppercase tracking-[0.12em] text-foreground sm:block transition-colors group-hover:text-primary">
            Visez<span className="text-primary">Works</span>
          </span>
        </Link>

        {/* Desktop Navigation Links with Smooth Hover & Scramble Effect */}
        <ul className="hidden items-center gap-1.5 md:flex rounded-full bg-secondary/40 p-1 border border-border/50">
          {NAV.map((item, i) => {
            const isActive = activeSection === item.href.replace("#", "");
            const isHovered = hovered === item.label;

            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setHovered(item.label)}
                  onMouseLeave={() => setHovered(null)}
                  className={`group relative flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-all duration-200 select-none ${
                    isActive
                      ? "bg-card text-primary shadow-xs ring-1 ring-border"
                      : "text-foreground/80 hover:text-foreground hover:bg-secondary/60"
                  }`}
                >
                  <ScrambleText text={item.label} active={isHovered} />
                  <sup
                    className={`font-mono text-[9px] transition-colors ${
                      isActive ? "text-primary font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </sup>
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            aria-label="Toggle theme"
            className="grid size-9 place-items-center rounded-full text-foreground/70 transition-all duration-300 hover:bg-secondary hover:text-foreground hover:scale-105 active:scale-95 border border-transparent hover:border-border"
          >
            {dark ? <Sun className="size-4 text-amber-400" /> : <Moon className="size-4" />}
          </button>

          {/* Connect / CTA Link */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-card px-4 py-2 text-[13px] font-semibold text-foreground shadow-[0_6px_20px_-10px_rgba(0,0,0,0.6)] ring-1 ring-border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-primary/20"
          >
            <span className="absolute inset-0 -translate-y-full bg-primary transition-transform duration-300 group-hover:translate-y-0" />
            <span className="relative transition-colors group-hover:text-primary-foreground">
              Connect
            </span>
            <ArrowUpRight className="relative size-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary-foreground" />
          </a>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle mobile menu"
            className="grid size-9 place-items-center rounded-full text-foreground/80 md:hidden border border-border bg-card/80 hover:bg-secondary"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mt-2 rounded-2xl border border-border bg-card/95 backdrop-blur-xl p-5 shadow-2xl md:hidden space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <ul className="space-y-1">
            {NAV.map((item, i) => {
              const isActive = activeSection === item.href.replace("#", "");
              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 font-display text-base uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-primary text-primary-foreground font-bold"
                        : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="font-mono text-xs opacity-70">0{i + 1}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
