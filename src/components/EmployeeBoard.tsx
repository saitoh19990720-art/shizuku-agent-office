import { useMemo } from "react";
import type { Employee, Task } from "../types";
import { EmployeeCard } from "./EmployeeCard";

type Props = {
  employees: Employee[];
  tasks: Task[];
};

export function EmployeeBoard({ employees, tasks }: Props) {
  // 各社員の「いまの担当」＝その社員に割り当てた未完タスクの最新1件
  const currentByRole = useMemo(() => {
    const map: Record<string, string> = {};
    for (const t of tasks) {
      if (t.status === "done") continue;
      if (!map[t.assignedTo]) map[t.assignedTo] = t.title;
    }
    return map;
  }, [tasks]);

  return (
    <section className="card">
      <h2 className="section-title">👥 AI社員ボード</h2>
      <p className="section-sub">
        それぞれに机と仕事と境界線がある。提案・下書き・実装まではAI、最後は監督が決める。
      </p>
      <ul className="grid sm:grid-cols-2 gap-3">
        {employees.map((e) => (
          <EmployeeCard
            key={e.role}
            employee={e}
            currentTask={currentByRole[e.role]}
          />
        ))}
      </ul>
    </section>
  );
}
