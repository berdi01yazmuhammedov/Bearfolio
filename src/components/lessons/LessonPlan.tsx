import type { PlanRow } from "../../lessons/types";
export function LessonPlan({ plan }: { plan: PlanRow[] }) {
  return (
    <section className="plan">
      <p className="eyebrow">Lesson plan overview</p>
      <h2>Intentional progression</h2>
      <div className="plan-table">
        <div className="table-head">
          <span>Stage</span>
          <span>Time</span>
          <span>Interaction</span>
          <span>Purpose</span>
        </div>
        {plan.map((row) => (
          <div key={row.stage}>
            <span>{row.stage}</span>
            <span>{row.time}</span>
            <span>{row.interaction}</span>
            <span>{row.purpose}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
