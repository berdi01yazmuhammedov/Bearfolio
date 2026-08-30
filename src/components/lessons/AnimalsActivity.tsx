import { useState } from "react";
import { animalWords } from "../../lessons/animals";
export function AnimalsActivity({ onContinue }: { onContinue: () => void }) {
  const [open, setOpen] = useState<string | null>(null),
    [words, setWords] = useState<string[]>([]),
    [clue, setClue] = useState(0),
    [guess, setGuess] = useState<string | null>(null);
  return (
    <div className="stage-grid">
      <div>
        <p className="section-num">02 / DISCOVER</p>
        <h2>Meet the animals</h2>
        <p>Tap a card to reveal a model sentence and pronunciation cue.</p>
        <div className="vocab-grid">
          {animalWords.map((animal) => (
            <button
              className={"vocab " + (open === animal.word ? "open" : "")}
              onClick={() => setOpen(open === animal.word ? null : animal.word)}
              key={animal.word}
            >
              <b>{animal.icon}</b>
              <span>{animal.word}</span>
              {open === animal.word && <small>🔊 {animal.sentence}</small>}
            </button>
          ))}
        </div>
      </div>
      <div className="side-note">
        <span>Guided speaking</span>
        <h3>Build a sentence</h3>
        <p className="sentence">It’s a {words.join(" ") || "_____"}.</p>
        <div className="chips">
          {["lion", "big", "fast", "cute"].map((word) => (
            <button onClick={() => setWords([...words, word])} key={word}>
              {word}
            </button>
          ))}
        </div>
        <button className="text-btn" onClick={() => setWords([])}>
          Reset sentence
        </button>
        <hr />
        <span>Communicative game</span>
        <h3>Guess my animal</h3>
        <p>{["It is big.", "It is wild.", "It has four legs."][clue]}</p>
        {clue < 2 ? (
          <button className="secondary" onClick={() => setClue(clue + 1)}>
            Reveal next clue
          </button>
        ) : (
          <div className="chips">
            {["Lion", "Elephant", "Rabbit"].map((option) => (
              <button
                className={
                  guess === option
                    ? option === "Lion"
                      ? "selected"
                      : "wrong"
                    : ""
                }
                onClick={() => setGuess(option)}
                key={option}
              >
                {option}
              </button>
            ))}
          </div>
        )}
        {guess && (
          <p className="feedback yes">
            {guess === "Lion"
              ? "Great work. You used clues in context."
              : "Not quite — look at the clues once more."}
          </p>
        )}
      </div>
      <button className="primary stage-next" onClick={onContinue}>
        Continue to vocabulary check →
      </button>
    </div>
  );
}
