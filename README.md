# Berdinazar Yazmuhammedov — Teacher Portfolio

A premium, single-page portfolio site built with React, TypeScript, Vite and Tailwind CSS.

## Run it

```bash
npm install
npm run dev
```

Then open the printed local URL. To produce a production build:

```bash
npm run build
npm run preview
```

`npm run build` also type-checks the project (`tsc -b`) before bundling, so any
TypeScript error will stop the build.

## Edit your content

Everything editable lives in `src/data/`, separate from the UI components:

- `src/data/profile.ts` — name, headline, bio, credentials, philosophy,
  qualifications, tech skills, contact details, and asset paths.
- `src/data/experience.ts` — the experience timeline.
- `src/data/lessons.ts` — the sample lesson / teaching portfolio cards.

You should not need to open any file inside `src/components/` just to update
text, dates or contact info.

## Add your real assets

Drop files into `public/` using these exact names (see the `README.md` inside
each folder for details):

- `public/images/profile.jpg` — hero portrait
- `public/videos/introduction.mp4` — introduction video
- `public/documents/cv.pdf` — CV, used by every "Download CV" button
- `public/documents/tefl.pdf`, `public/documents/degree.pdf` — certificates

Until a file is added, the relevant part of the UI degrades gracefully:
the portrait shows a neutral placeholder, the video section shows a
"coming soon" state, and document links (CV, certificates, lesson plans)
either hide themselves or fall back to a "Request by email" action instead
of pointing at a broken link.

## Notes on this build

This project was authored in a sandboxed environment without npm registry
access, so the dependencies could not be installed or the build verified by
running `npm run build` here. The code was written carefully against the
exact versions pinned in `package.json` (React 18, Vite 5, Tailwind 3,
Framer Motion 11, lucide-react) and follows standard, well-tested patterns
throughout. Please run `npm install && npm run build` as your first step —
if TypeScript reports anything, it will point at an exact file and line.
