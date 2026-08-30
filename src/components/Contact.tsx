import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { profile } from "../data/profile";
import DownloadCvButton from "./DownloadCvButton";

export default function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-20">
      <div className="container-editorial">
        <div className="border border-line bg-paper px-7 py-14 sm:px-14 sm:py-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-2xl text-center"
          >
            <p className="eyebrow mb-5">Get in touch</p>
            <h2 className="font-display text-[2rem] leading-[1.15] tracking-tight sm:text-[2.6rem]">
              Looking for an English teacher who takes the classroom seriously?
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-ink/65">
              I am currently open to teaching opportunities in Vietnam.
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <DownloadCvButton variant="primary" />
              <a
                href={`mailto:${profile.contact.email}`}
                className="inline-flex items-center gap-2.5 rounded-full border border-ink/20 px-6 py-3 text-sm font-medium text-ink transition-all duration-300 ease-editorial hover:-translate-y-0.5 hover:border-ink"
              >
                <Mail className="h-4 w-4" />
                Get in touch
              </a>
            </div>

            <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-5 border-t border-line pt-9 text-left sm:grid-cols-3 sm:text-center">
              <a
                href={`mailto:${profile.contact.email}`}
                className="group flex items-center gap-2.5 transition-opacity hover:opacity-70 sm:flex-col sm:gap-1.5"
              >
                <Mail
                  className="h-4 w-4 shrink-0 text-navy/50 sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                />
                <span className="text-[13.5px] text-ink/70">
                  {profile.contact.email}
                </span>
              </a>

              <a
                href={`tel:${profile.contact.phone}`}
                className="group flex items-center gap-2.5 transition-opacity hover:opacity-70 sm:flex-col sm:gap-1.5"
              >
                <Phone
                  className="h-4 w-4 shrink-0 text-navy/50 sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                />
                <span className="text-[13.5px] text-ink/70">
                  {profile.contact.phone}
                </span>
              </a>

              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  profile.location,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2.5 transition-opacity hover:opacity-70 sm:flex-col sm:gap-1.5"
              >
                <MapPin
                  className="h-4 w-4 shrink-0 text-navy/50 sm:h-5 sm:w-5"
                  strokeWidth={1.5}
                />
                <span className="text-[13.5px] text-ink/70">
                  {profile.location}
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
