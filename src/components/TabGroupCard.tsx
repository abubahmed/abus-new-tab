"use client";

import { TabGroup } from "@/lib/types";

const ICON_LETTERS_BG: Record<string, string> = {
  blue: "bg-blue-500/20 text-blue-400",
  green: "bg-green-500/20 text-green-400",
  purple: "bg-purple-500/20 text-purple-400",
  orange: "bg-orange-500/20 text-orange-400",
  pink: "bg-pink-500/20 text-pink-400",
  red: "bg-red-500/20 text-red-400",
  yellow: "bg-yellow-500/20 text-yellow-400",
  teal: "bg-teal-500/20 text-teal-400",
  cyan: "bg-cyan-500/20 text-cyan-400",
  indigo: "bg-indigo-500/20 text-indigo-400",
};

export default function TabGroupCard({
  group,
  onEdit,
  onDelete,
}: {
  group: TabGroup;
  onEdit: (group: TabGroup) => void;
  onDelete: (id: string) => void;
}) {
  function launchTabs() {
    const urls = group.tabs.map((t) => t.url);
    if (urls.length === 0) return;

    const newWindow = window.open(urls[0], "_blank");
    if (newWindow) {
      urls.slice(1).forEach((url) => {
        window.open(url, "_blank");
      });
    } else {
      urls.forEach((url) => {
        window.open(url, "_blank");
      });
    }
  }

  const letterBg = ICON_LETTERS_BG[group.color] || ICON_LETTERS_BG.blue;

  return (
    <div className="group relative flex flex-col items-center w-28 shrink-0">
      {/* Context menu on hover */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(group);
          }}
          className="text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card)] rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
          title="Edit"
        >
          ...
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(group.id);
          }}
          className="text-[var(--muted)] hover:text-[var(--danger)] bg-[var(--card)] rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
          title="Delete"
        >
          x
        </button>
      </div>

      {/* Icon circle */}
      <button
        onClick={launchTabs}
        className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2"
        style={{ backgroundColor: "var(--card)" }}
      >
        <span className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold ${letterBg}`}>
          {group.name.charAt(0).toUpperCase()}
        </span>
      </button>

      {/* Label */}
      <span className="text-xs text-[var(--muted)] text-center truncate w-full">
        {group.name}
      </span>

      {/* Tab count badge */}
      <span className="text-[10px] text-[var(--muted)] opacity-60">
        {group.tabs.length} tab{group.tabs.length !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
