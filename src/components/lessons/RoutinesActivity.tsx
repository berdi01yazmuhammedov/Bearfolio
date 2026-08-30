import { useState } from "react";
import { routineOrder } from "../../lessons/routines";
export function RoutinesActivity({ onContinue }: { onContinue: () => void }) {
  const [showRule, setShowRule] = useState(false),
    [order, setOrder] = useState<string[]>([]),
    [person, setPerson] = useState<"Anna" | "Minh" | null>(null);
  const correct = order.every((item, index) => item === routineOrder[index]);
  return (
    <div className="stage-grid">
      <div>
        <p className="section-num">02 / NOTICE</p>
        <h2>A day in someone’s life</h2>
        <div className="timeline">
          {[
            ["07:00", "wake up"],
            ["07:30", "have breakfast"],
            ["08:00", "go to school"],
            ["16:00", "do homework"],
            ["22:30", "go to bed"],
          ].map(([time, activity]) => (
            <button key={time}>
              <b>{time}</b>
              {activity}
            </button>
          ))}
        </div>
        <div className="rule">
          <p>
            I <mark>wake</mark> up at 7.
            <br />
            She <mark>wakes</mark> up at 7.
          </p>
          <button className="text-btn" onClick={() => setShowRule(!showRule)}>
            Why does the verb change? +
          </button>
          {showRule && (
            <p>
              With <b>he / she / it</b>, most present-simple verbs take{" "}
              <b>-s</b>.
            </p>
          )}
        </div>
      </div>
      <div className="side-note">
        <span>Click-to-order alternative</span>
        <h3>Build the routine</h3>
        <p>Select the next event in a typical day.</p>
        <div className="chips">
          {routineOrder.map((item) => (
            <button
              disabled={order.includes(item)}
              className={order.includes(item) ? "selected" : ""}
              onClick={() => setOrder([...order, item])}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
        <ol className="ordered">
          {order.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
        {order.length === 5 && (
          <p className={"feedback " + (correct ? "yes" : "no")}>
            {correct ? "Well sequenced." : "Almost — try a new order."}
          </p>
        )}
        <hr />
        <span>Information gap</span>
        <h3>Compare routines</h3>
        <div className="chips">
          <button onClick={() => setPerson("Anna")}>
            What time does Anna get up?
          </button>
          <button onClick={() => setPerson("Minh")}>
            When does Minh do homework?
          </button>
        </div>
        {person && (
          <p className="reveal">
            {person === "Anna"
              ? "Anna gets up at 6:45."
              : "Minh does homework at 5:00."}
          </p>
        )}
      </div>
      <button className="primary stage-next" onClick={onContinue}>
        Continue to language check →
      </button>
    </div>
  );
}
