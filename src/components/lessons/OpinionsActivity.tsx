import { useState } from "react";
export function OpinionsActivity({ onContinue }: { onContinue: () => void }) {
  const [position, setPosition] = useState<number | null>(null),
    [phrase, setPhrase] = useState<string | null>(null),
    [parts, setParts] = useState<string[]>([]),
    [notes, setNotes] = useState("");
  const library = [
    "I think…",
    "In my view…",
    "The main reason is…",
    "I see your point, but…",
  ];
  return (
    <div className="stage-grid">
      <div>
        <p className="section-num">01 / ENGAGE</p>
        <h2>Where do you stand?</h2>
        <p className="statement">
          Students should not have homework at weekends.
        </p>
        <div className="spectrum">
          {[
            "Strongly disagree",
            "Disagree",
            "Not sure",
            "Agree",
            "Strongly agree",
          ].map((label, index) => (
            <button
              className={position === index ? "selected" : ""}
              onClick={() => setPosition(index)}
              key={label}
            >
              <span />
              {label}
            </button>
          ))}
        </div>
        {position !== null && (
          <p className="reveal">
            Your view is valid. Now give one reason:{" "}
            <b>In my opinion, because…</b>
          </p>
        )}
        <h3 className="subhead">Build your argument</h3>
        <div className="phrase-library">
          {library.map((item) => (
            <button
              className={phrase === item ? "selected" : ""}
              onClick={() => setPhrase(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        {phrase && (
          <p className="reveal">
            <b>{phrase}</b> helps make your response clear and respectful.
          </p>
        )}
      </div>
      <div className="side-note">
        <span>Guided production</span>
        <h3>Make your case</h3>
        <p>Online classes are better than traditional classes.</p>
        <div className="chips">
          {[
            "I think online classes are useful",
            "because they are flexible",
            "For example, students can learn at home",
            "Therefore, they can save time",
          ].map((item) => (
            <button onClick={() => setParts([...parts, item])} key={item}>
              {item}
            </button>
          ))}
        </div>
        {parts.length > 0 && <p className="argument">{parts.join(". ")}.</p>}
        <button className="text-btn" onClick={() => setParts([])}>
          Reset argument
        </button>
        <hr />
        <span>Mini debate preparation</span>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          aria-label="Write your debate notes"
          placeholder={"My position…\nReason 1…\nExample…"}
        />
        <p className="small">
          Self-check: clear position · reason · example · respectful response
        </p>
      </div>
      <button className="primary stage-next" onClick={onContinue}>
        Continue to response check →
      </button>
    </div>
  );
}
