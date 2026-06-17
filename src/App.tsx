import type { NextAction } from "./types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTasks } from "./hooks/useTasks";
import { useNightLogs } from "./hooks/useNightLogs";
import { useProjectLinks } from "./hooks/useProjectLinks";
import { usePrompts } from "./hooks/usePrompts";
import { useAutomationQueue } from "./hooks/useAutomationQueue";
import { demoEmployees } from "./data/demoEmployees";
import { nowISO } from "./lib/dates";

import { AppShell } from "./components/AppShell";
import { NextActionCard } from "./components/NextActionCard";
import { TodayTasks } from "./components/TodayTasks";
import { EmployeeBoard } from "./components/EmployeeBoard";
import { NightLogForm } from "./components/NightLogForm";
import { NightLogList } from "./components/NightLogList";
import { ProjectLinks } from "./components/ProjectLinks";
import { PromptVault } from "./components/PromptVault";
import { AutomationQueue } from "./components/AutomationQueue";

export default function App() {
  const tasksApi = useTasks();
  const logsApi = useNightLogs();
  const linksApi = useProjectLinks();
  const promptsApi = usePrompts();
  const autoApi = useAutomationQueue();
  const [nextAction, setNextAction] = useLocalStorage<NextAction>(
    "shizuku-office.nextaction.v1",
    { value: "", updatedAt: nowISO() },
  );

  const todayCount = tasksApi.tasks.filter((t) => t.status === "today").length;
  const doneCount = tasksApi.tasks.filter((t) => t.status === "done").length;
  const summary = `今日 ${todayCount}件 ・ 完了 ${doneCount}件`;

  return (
    <AppShell todaySummary={summary}>
      {/* 上部：次の一手（圧倒されないアンカー） */}
      <div className="mb-4">
        <NextActionCard
          value={nextAction.value}
          onChange={(value) => setNextAction({ value, updatedAt: nowISO() })}
        />
      </div>

      {/* 本体グリッド。スマホは1カラム（次の一手→タスク→夜ログ→その他） */}
      <div className="grid lg:grid-cols-2 gap-4 items-start">
        <TodayTasks
          tasks={tasksApi.tasks}
          onAdd={tasksApi.add}
          onStatus={tasksApi.setStatus}
          onRemove={tasksApi.remove}
        />

        <EmployeeBoard employees={demoEmployees} tasks={tasksApi.tasks} />

        <section className="card">
          <h2 className="section-title">🌙 夜タスクログ（3行）</h2>
          <p className="section-sub">
            22:50に手を止めて、23:00から3行だけ。やった・学び・次やる。
          </p>
          <NightLogForm onAdd={logsApi.add} />
          <NightLogList logs={logsApi.logs} onRemove={logsApi.remove} />
        </section>

        <ProjectLinks
          links={linksApi.links}
          onAdd={linksApi.add}
          onRemove={linksApi.remove}
        />

        <PromptVault
          prompts={promptsApi.prompts}
          onAdd={promptsApi.add}
          onMarkUsed={promptsApi.markUsed}
          onRemove={promptsApi.remove}
        />

        <AutomationQueue
          items={autoApi.items}
          onAdd={autoApi.add}
          onRemove={autoApi.remove}
        />
      </div>
    </AppShell>
  );
}
