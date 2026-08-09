import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatBubble() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="fixed bottom-5 left-5 z-50">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 16, filter: "blur(6px)" }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className="glass-panel absolute bottom-14 left-0 w-[288px] rounded-3xl border border-border p-4 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)]"
          >
            <p className="pr-6 text-[15px] font-semibold leading-snug text-foreground">
              Let&rsquo;s build something — tell us about your project.
            </p>

            <button
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute right-3 top-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-4" />
            </button>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setValue("");
              }}
              className="mt-4 flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"
            >
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Say hi..."
                className="min-w-0 flex-1 bg-transparent text-[12.5px] text-foreground outline-none placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                aria-label="Send"
                className="grid size-7 place-items-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <Send className="size-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open chat"
        className="grid size-11 place-items-center rounded-full bg-foreground text-background shadow-[0_10px_30px_-12px_rgba(0,0,0,0.9)]"
      >
        <MessageCircle className="size-5" />
      </motion.button>
    </div>
  );
}
