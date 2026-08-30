// Edit this file to update the core identity, bio and contact details
// shown across the site. No other files need to change.

export const profile = {
  name: "Berdinazar Yazmuhammedov",
  firstName: "Mr. Bear",
  role: "English Teacher",
  location: "Ho Chi Minh City, Vietnam",
  eyebrow: "ENGLISH TEACHER · HO CHI MINH CITY",
  headline: "English teacher focused on communication, confidence, and real-world learning.",
  subhead:
    "Linguistics graduate and English teacher with experience working with international students. Currently based in Vietnam and looking for a long-term teaching opportunity.",
  availability: "Available for teaching opportunities in Vietnam",
  philosophy:
    "Language is meant to be used.",
  aboutHeadline: "A linguistics graduate who believes language is meant to be used.",
  aboutParagraphs: [
    "I hold a Bachelor's degree in Linguistics / Language Education and have taught both English and Russian as foreign languages, including work with international students. My approach is communicative: students spend most of a lesson producing language through speaking, pair work, games, interaction and real-world contexts.",
    "I currently teach English in Vietnam, where I plan lessons around clear objectives, adapt activities to each learner's level, and keep the classroom calm and structured without being rigid. Engagement, to me, is a design problem — the right activity, pitched at the right level, at the right point in a lesson.",
  ],
  images: {
    profile: "/images/profile.png",
  },
  video: {
    src: "/videos/introduction.MOV",
    label: "60-second introduction",
  },
  documents: {
    cv: "/documents/cv.pdf",
    tefl: "/documents/tefl.pdf",
    degree: "/documents/degree.pdf",
  },
  contact: {
    email: "slybrd01@gmail.com",
    phone: "+84968342971",
    linkedin: "https://www.linkedin.com/in/berdinazar-yazmuhammedov-7856b4234/",
    github: "https://github.com/berdi01yazmuhammedov/",
  },
};

export const credentials = [
  { label: "BACHELOR'S DEGREE", value: "Linguistics" },
  { label: "ENGLISH", value: "C2" },
  { label: "TEFL", value: "Certified" },
  { label: "BASED IN", value: "Ho Chi Minh City" },
];

export const principles = [
  {
    title: "Communicative",
    description: "Students use English rather than simply study rules.",
  },
  {
    title: "Student-centered",
    description: "Activities are adapted to students' level, needs and interests.",
  },
  {
    title: "Engaging",
    description: "Lessons combine speaking, pair work, games, interaction and real-world contexts.",
  },
];

export const qualifications = [
  {
    label: "Bachelor's Degree",
    value: "Linguistics / Language Education",
    document: "degree" as const,
  },
  {
    label: "TEFL",
    value: "TEFL Certified",
    document: "tefl" as const,
  },
  {
    label: "English Proficiency",
    value: "C2 — English",
    document: null,
  },
  {
    label: "Teaching",
    value: "English & Russian as Foreign Languages",
    document: null,
  },
];

export const techSkills = ["Web Development", "Digital Tools", "Online Learning"];
