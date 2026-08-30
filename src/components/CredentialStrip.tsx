import { motion } from "framer-motion";
import { credentials } from "../data/profile";

export default function CredentialStrip() {
  return (
    <section aria-label="Credentials at a glance" className="border-y border-line">
      <div className="container-editorial grid grid-cols-2 gap-y-6 py-8 sm:grid-cols-4 sm:gap-y-0">
        {credentials.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-4 sm:border-l sm:border-line sm:first:border-l-0 sm:first:pl-0"
          >
            <p className="text-[10.5px] font-semibold uppercase tracking-widest2 text-stone">
              {item.label}
            </p>
            <p className="mt-1.5 font-display text-lg text-ink">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
