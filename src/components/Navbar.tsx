import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { profile } from "../data/profile";
import DownloadCvButton from "./DownloadCvButton";
import { cn } from "../lib/utils";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#teaching", label: "Teaching" },
  { href: "#qualifications", label: "Qualifications" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-editorial",
        scrolled
          ? "border-b border-line/80 bg-ivory/90 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <nav
        className={cn(
          "container-editorial flex items-center justify-between transition-all duration-500 ease-editorial",
          scrolled ? "py-3.5" : "py-6"
        )}
        aria-label="Primary"
      >
        <a
          href="#top"
          className="font-display text-lg tracking-tight text-ink"
          onClick={() => setOpen(false)}
        >
          {profile.firstName}
        </a>

        <ul className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative text-[13px] font-medium text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-ink transition-all duration-300 ease-editorial group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <DownloadCvButton variant="compact" />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-ivory md:hidden"
          >
            <ul className="container-editorial flex flex-col gap-1 py-4">
              {LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-2xl text-ink"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
              <li className="pt-3">
                <DownloadCvButton className="w-full justify-center" />
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
