import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import Hero from "./components/Hero";
import CredentialStrip from "./components/CredentialStrip";
import About from "./components/About";
import Experience from "./components/Experience";
import Philosophy from "./components/Philosophy";
import Teaching from "./components/Teaching";
import IntroductionVideo from "./components/IntroductionVideo";
import Qualifications from "./components/Qualifications";
import TechSkills from "./components/TechSkills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { LessonRoutes } from "./components/lessons/LessonRoutes.tsx";
export default function App() {
  const lessonPage = <LessonRoutes />;

  if (lessonPage) {
    return lessonPage;
  }

  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <CredentialStrip />
        <About />
        <Experience />
        <Philosophy />
        <Teaching />
        <IntroductionVideo />
        <Qualifications />
        <TechSkills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
