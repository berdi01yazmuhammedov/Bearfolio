import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Video as VideoIcon } from "lucide-react";
import { profile } from "../data/profile";
import { useAssetExists } from "../hooks/useAssetExists";
import SectionHeading from "./SectionHeading";
import { cn } from "../lib/utils";

export default function IntroductionVideo() {
  const videoExists = useAssetExists(profile.video.src);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    requestAnimationFrame(() => videoRef.current?.play());
  };

  return (
    <section id="introduction" className="py-24 sm:py-20">
      <div className="container-editorial">
        <SectionHeading index="04" label="Introduction" headline="Meet the teacher." />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto mt-14 aspect-video max-w-4xl overflow-hidden border border-line bg-navy-dark"
        >
          {videoExists && playing ? (
            <video
              ref={videoRef}
              src={profile.video.src}
              controls
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <button
              type="button"
              onClick={videoExists ? handlePlay : undefined}
              disabled={!videoExists}
              className="group relative flex h-full w-full flex-col items-center justify-center gap-5 text-ivory disabled:cursor-default"
              aria-label={videoExists ? "Play introduction video" : "Introduction video coming soon"}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(247,244,236,0.08),_transparent_70%)]" />

              <span
                className={cn(
                  "relative flex h-16 w-16 items-center justify-center rounded-full border border-ivory/25 transition-transform duration-300 ease-editorial sm:h-20 sm:w-20",
                  videoExists && "group-hover:scale-105 group-hover:bg-ivory/10"
                )}
              >
                {videoExists ? (
                  <Play className="ml-1 h-6 w-6 fill-ivory text-ivory" />
                ) : (
                  <VideoIcon className="h-6 w-6 text-ivory/60" strokeWidth={1.5} />
                )}
              </span>

              <span className="relative text-sm font-medium tracking-wide text-ivory/80">
                {videoExists ? profile.video.label : "Introduction video coming soon"}
              </span>
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
