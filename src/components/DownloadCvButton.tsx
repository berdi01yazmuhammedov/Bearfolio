import { Download, Mail } from "lucide-react";
import { profile } from "../data/profile";
import { useAssetExists } from "../hooks/useAssetExists";
import { cn } from "../lib/utils";

type Props = {
  variant?: "primary" | "ghost" | "compact";
  className?: string;
};

/**
 * Points at /documents/cv.pdf. If the file hasn't been added yet, the
 * button degrades gracefully into a "Request CV by email" action instead
 * of linking to a 404.
 */
export default function DownloadCvButton({ variant = "primary", className }: Props) {
  const exists = useAssetExists(profile.documents.cv);

  const base =
    "group inline-flex items-center gap-2 whitespace-nowrap transition-all duration-300 ease-editorial";

  const styles = {
    primary:
      "rounded-full bg-ink px-6 py-3 text-sm font-medium text-ivory hover:bg-navy hover:-translate-y-0.5",
    ghost:
      "rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink hover:border-ink hover:-translate-y-0.5",
    compact:
      "rounded-full bg-ink px-4 py-2 text-[13px] font-medium text-ivory hover:bg-navy",
  };

  if (exists === false) {
    return (
      <a
        href={`mailto:${profile.contact.email}?subject=CV request — ${profile.name}`}
        className={cn(base, styles[variant], className)}
      >
        <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
        Request CV
      </a>
    );
  }

  return (
    <a
      href={profile.documents.cv}
      download
      className={cn(base, styles[variant], className)}
      aria-label="Download CV (PDF)"
    >
      <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
      Download CV
    </a>
  );
}
