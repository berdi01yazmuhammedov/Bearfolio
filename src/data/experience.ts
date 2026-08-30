// Edit this file to update the experience timeline.
// `current: true` highlights an entry as the present role.

export type ExperienceItem = {
  role: string;
  organization: string;
  location: string;
  date: string;
  description: string;
  current?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    role: "English Teacher",
    organization: "Public School",
    location: "Vietnam",
    date: "08/2026 — Present",
    description:
      "Teaching English within the Vietnamese public school system, planning lessons aligned with curriculum requirements, managing whole classes, and adapting activities to a range of learner levels.",
    current: true,
  },
  {
    role: "University Preparatory Course Teacher",
    organization: "Peter the Great St. Petersburg Polytechnic University",
    location: "Saint Petersburg, Russia",
    date: "09/2025 — 06/2026",
    description:
      "Designed and delivered differentiated lessons for a university preparatory program, teaching Russian as a Foreign Language and English to international students. Customised materials to students' needs and built hands-on experience in lesson planning, classroom management and teaching methodology.",
  },
  {
    role: "English Language Tutor (Private Lessons)",
    organization: "Self-employed",
    location: "Saint Petersburg, Russia",
    date: "10/2022 — 05/2026",
    description:
      "Delivered one-to-one English lessons for teenagers and adults, applying communicative and interactive techniques across speaking, grammar, vocabulary and pronunciation. Designed personalised lesson plans based on each student's goals and level, adjusting methods as students progressed.",
  },
  {
    role: "English Teacher (Part-time)",
    organization: "Zlatoust Language School",
    location: "Saint Petersburg, Russia",
    date: "06/2023 — 08/2025",
    description:
      "Planned and delivered lessons focused on speaking skills, vocabulary and practical communication for individuals and groups at varying proficiency levels, using interactive and communicative teaching methods.",
  },
  {
    role: "English Teacher",
    organization: "Gujurly Nesil — Language Center",
    location: "Ashgabat",
    date: "10/2021 — 05/2022",
    description:
      "Taught English to students of different levels with a focus on speaking, pronunciation, vocabulary and practical communication, using communicative activities, games, visuals, and pair/group work.",
  },
];
