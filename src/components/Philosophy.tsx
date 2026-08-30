import { motion } from "framer-motion";
import { MessagesSquare, Target, Sparkles } from "lucide-react";
import { principles } from "../data/profile";

const ICONS = [MessagesSquare, Target, Sparkles];

export default function Philosophy() {
  return (
    <section className="bg-navy-dark py-24 text-ivory sm:py-32">
      <div className="container-editorial">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl"
        >
          <p className="eyebrow mb-5 text-ivory/45">Teaching philosophy</p>
          <h2 className="font-display text-[2.25rem] leading-[1.15] tracking-tight sm:text-[2.75rem]">
            Language is a tool.
          </h2>
          <p className="mt-6 text-[17px] leading-relaxed text-ivory/60">
            Effective language learning happens when students actively use the language — to
            communicate, solve problems, express ideas, and interact with other people.
          </p>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-sm bg-ivory/10 sm:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="bg-navy-dark px-7 py-10"
              >
                <Icon className="h-6 w-6 text-ivory/70" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-lg tracking-tight text-ivory">{p.title}</h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ivory/55">
                  {p.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
