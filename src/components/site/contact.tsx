import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Mail, CheckCircle2, X, Send } from "lucide-react";
import { VisezWorksIcon } from "./logo";
import { useAdminData } from "@/lib/admin-store";

export function Contact() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState<
    "Web Development" | "Video Editing" | "Both" | "General Inquiry"
  >("Web Development");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { addInquiry, settings } = useAdminData();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    addInquiry({
      name,
      email,
      service,
      message,
    });

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsFormOpen(false);
      setName("");
      setEmail("");
      setMessage("");
    }, 2500);
  };

  return (
    <section id="contact" className="pt-24 pb-12">
      <div className="mx-auto max-w-5xl px-5 text-center sm:px-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="eyebrow"
        >
          Start a project
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 font-display text-[13vw] uppercase leading-[0.88] tracking-[-0.04em] text-foreground sm:text-[5.5rem]"
        >
          Let&rsquo;s build
          <span className="block">
            something<span className="text-primary">.</span>
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mx-auto mt-6 max-w-md text-[14.5px] leading-relaxed text-muted-foreground"
        >
          Have a website, brand, or video project in mind? Let&rsquo;s talk.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.6 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => setIsFormOpen(true)}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-[13px] font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--primary)_80%,transparent)]"
          >
            Start a Project
            <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          <a
            href={`mailto:${settings.contactEmail}`}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-[13px] font-medium text-foreground transition-all duration-300 hover:bg-secondary hover:scale-105"
          >
            <Mail className="size-3.5" /> {settings.contactEmail}
          </a>
        </motion.div>
      </div>

      {/* Inquiry Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl relative"
          >
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute right-4 top-4 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              <X className="size-5" />
            </button>

            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="size-12 text-primary mx-auto animate-bounce" />
                <h3 className="font-display text-2xl uppercase text-foreground">Inquiry Sent!</h3>
                <p className="text-xs text-muted-foreground max-w-xs mx-auto">
                  Thank you for reaching out to VisezWorks. We will review your project details and
                  get back to you shortly.
                </p>
              </div>
            ) : (
              <div>
                <p className="eyebrow">Project Inquiry</p>
                <h3 className="font-display text-2xl uppercase text-foreground">
                  Tell Us About Your Vision
                </h3>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-left">
                  <div>
                    <label className="block font-bebas text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bebas text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block font-bebas text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Primary Service Needed
                    </label>
                    <select
                      value={service}
                      onChange={(e) =>
                        setService(
                          e.target.value as
                            "Web Development" | "Video Editing" | "Both" | "General Inquiry",
                        )
                      }
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Video Editing">Video Editing</option>
                      <option value="Both">Both (Full Service)</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bebas text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      Project Details
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us about your project goals, timeline, or links to references..."
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-lg bg-primary py-3 font-bebas text-sm sm:text-base uppercase text-primary-foreground hover:opacity-90 transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-md tracking-wider"
                  >
                    <Send className="size-3.5" /> Submit Inquiry
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </section>
  );
}

export function Footer() {
  return (
    <footer className="pb-8">
      <div className="mx-auto max-w-6xl px-5 sm:px-10">
        <div className="grid gap-10 border-t border-border py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <VisezWorksIcon className="size-10 text-foreground" />
              <p className="font-display text-2xl uppercase tracking-[-0.01em] text-foreground">
                Visez<span className="text-primary">Works</span>
              </p>
            </div>
            <p className="mt-4 font-mono text-[10.5px] uppercase tracking-[0.24em] text-muted-foreground">
              Vision <span className="text-primary">•</span> Innovate{" "}
              <span className="text-primary">•</span> Create
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Services
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px]">
              <li>
                <a href="#work" className="text-foreground transition-colors hover:text-primary">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#work" className="text-foreground transition-colors hover:text-primary">
                  Video Editing
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-4 space-y-2 text-[13.5px]">
              <li>
                <a href="#contact" className="text-foreground transition-colors hover:text-primary">
                  Start a Project
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@visezworks.com"
                  className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="size-3.5" /> hello@visezworks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-border pt-5 text-[11px] text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} VisezWorks. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono uppercase tracking-[0.18em]">
            <span>Creative Digital Agency</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
