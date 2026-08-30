import { motion } from "framer-motion";
import { techSkills } from "../data/profile";

export default function TechSkills() {
  return (
    <section className="border-y border-line bg-paper/60 py-14">
      <div className="container-editorial flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <h3 className="font-display text-lg text-ink">Comfortable with technology.</h3>
          <p className="mt-1.5 text-[14px] leading-relaxed text-ink/60">
            With a background in software development, I am comfortable working with digital
            tools, online learning platforms and technology-enhanced teaching environments.
          </p>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2"
        >
          {techSkills.map((skill) => (
            <li
              key={skill}
              className="rounded-full border border-line px-3.5 py-1.5 text-[12.5px] font-medium text-ink/70"
            >
              {skill}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
