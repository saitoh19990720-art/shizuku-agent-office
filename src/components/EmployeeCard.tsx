import type { Employee } from "../types";
import { RISK_LABEL, ROLE_LABEL } from "../types";

type Props = {
  employee: Employee;
  currentTask?: string;
};

const RISK_DOT = {
  low: "bg-mint",
  medium: "bg-lavender",
  high: "bg-rose",
} as const;

export function EmployeeCard({ employee, currentTask }: Props) {
  return (
    <li className="card p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-ui font-bold text-sm">{ROLE_LABEL[employee.role]}</h3>
        <span className="chip">{employee.tool}</span>
      </div>
      <p className="text-xs text-muted mt-2">{employee.duty}</p>

      <div className="mt-3 text-xs">
        <span className="text-muted">いまの担当：</span>
        <span className="text-ink">{currentTask || "—（手が空いています）"}</span>
      </div>

      <div className="flex items-center gap-3 mt-3 text-[11px] text-muted">
        <span className="inline-flex items-center gap-1">
          <span aria-hidden="true" className={`w-2 h-2 rounded-full ${RISK_DOT[employee.riskLevel]}`} />
          危険度 {RISK_LABEL[employee.riskLevel]}
        </span>
        <span>
          {employee.requiresApproval ? "🔒 承認が必要" : "承認なしでOK"}
        </span>
      </div>
    </li>
  );
}
