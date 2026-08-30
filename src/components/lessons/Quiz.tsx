import { useState } from "react";
import type { Question } from "../../lessons/types";
export function Quiz({
  questions,
  onComplete,
}: {
  questions: Question[];
  onComplete: () => void;
}) {
  const [index, setIndex] = useState(0),
    [answer, setAnswer] = useState<number | null>(null),
    [score, setScore] = useState(0);
  const question = questions[index];
  function choose(i: number) {
    if (answer !== null) return;
    setAnswer(i);
    if (question.choices[i].correct) setScore((value) => value + 1);
  }
  function next() {
    if (index === questions.length - 1) onComplete();
    else {
      setIndex((value) => value + 1);
      setAnswer(null);
    }
  }
  return (
    <div className="activity">
      <div className="activity-label">
        Quick check · {index + 1}/{questions.length}
      </div>
      <h3>{question.prompt}</h3>
      <div className="choices">
        {question.choices.map((choice, i) => (
          <button
            key={choice.label}
            onClick={() => choose(i)}
            className={
              answer === i ? (choice.correct ? "correct" : "incorrect") : ""
            }
          >
            {choice.label}
          </button>
        ))}
      </div>
      {answer !== null && (
        <div
          className={
            question.choices[answer].correct ? "feedback yes" : "feedback no"
          }
        >
          {question.choices[answer].correct
            ? question.choices[answer].feedback || "Correct. Keep going."
            : "Not quite — try the next item, then revisit this language."}
          <button onClick={next}>
            {index === questions.length - 1 ? "See result" : "Continue"} →
          </button>
        </div>
      )}
      <p className="score">
        {score} / {questions.length} correct
      </p>
    </div>
  );
}
