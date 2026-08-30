import { Github } from "lucide-react";
import { profile } from "../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line py-12">
      <div className="container-editorial flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-lg text-ink">{profile.name}</p>
          <p className="mt-1 text-[13px] text-stone">
            {profile.role} · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3 text-[13px]">
          <DownloadCvButtonLink />
          <a
            href={profile.contact.linkedin}
            className="text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.contact.email}`}
            className="text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Email
          </a>
          <a
            href={profile.contact.github}
            className="text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
          >Github</a>
        </nav>
      </div>

      <div className="container-editorial mt-10 border-t border-line pt-6">
        <p className="text-[12.5px] text-stone">
          © {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}

// Kept as a small inline link (rather than the pill button) to match the
// quieter visual weight of a footer.
function DownloadCvButtonLink() {
  return (
    <a
      href={"/documents/cv.pdf"}
      download
      className="text-ink/70 underline-offset-4 transition-colors hover:text-ink hover:underline"
    >
      CV
    </a>
  );
}
