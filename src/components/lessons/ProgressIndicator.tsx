export function ProgressIndicator({
  stages,
  current,
}: {
  stages: string[];
  current: number;
}) {
  return (
    <div className="progress-wrap">
      <div className="step-word">
        Step {Math.min(current + 1, stages.length)} of {stages.length}
      </div>
      <div className="progress">
        {stages.map((stage, i) => (
          <div className={i <= current ? "active" : ""} key={stage}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <em>{stage}</em>
          </div>
        ))}
      </div>
    </div>
  );
}
