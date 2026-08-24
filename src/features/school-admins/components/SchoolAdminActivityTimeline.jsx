import { format } from "date-fns";
import { Card } from "../../../components/ui/cards/Card";
import Icon from "../../../components/icons/Icon.jsx";
import Badge from "../../../components/ui/Badge";
import {
  ACTIVITY_EVENT_CATALOG,
  ACTIVITY_RESULT,
} from "../data/schoolAdminActivity";

const RESULT_BADGE = {
  [ACTIVITY_RESULT.SUCCESS]: { label: "Successful", tone: "success" },
  [ACTIVITY_RESULT.FAILED]: { label: "Failed", tone: "danger" },
};

const SchoolAdminActivityTimeline = ({ entries }) => (
  <Card>
    <ul className="divide-y divide-border">
      {entries.map((entry) => {
        const meta = ACTIVITY_EVENT_CATALOG[entry.type];
        const resultBadge = RESULT_BADGE[entry.result];

        return (
          <li key={entry.id} className="flex items-start gap-3 px-5 py-4">
            <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-muted text-text-muted">
              <Icon name={meta?.icon} className="h-4 w-4" />
            </span>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-semibold text-text">
                  {meta?.label ?? entry.type}
                </p>
                {resultBadge && (
                  <Badge tone={resultBadge.tone}>{resultBadge.label}</Badge>
                )}
              </div>

              <p className="mt-0.5 text-sm text-text-muted">
                {entry.description}
              </p>

              <p className="mt-1.5 text-11 text-text-subtle">
                By: {entry.actor} &middot;{" "}
                {format(new Date(entry.timestamp), "d MMM yyyy, h:mm a")}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  </Card>
);

export default SchoolAdminActivityTimeline;
