"use client";

import { TabGroup } from "@/lib/types";

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

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

  const displayTabs = group.tabs.slice(0, 5);

  // Positions for each layout (percentage offsets from center of the 80px circle)
  // Each position is [x, y] where 0,0 is center
  const layouts: Record<number, [number, number][]> = {
    1: [[0, 0]],
    2: [[-12, 0], [12, 0]],
    3: [[0, -10], [-12, 10], [12, 10]],
    4: [[-12, -12], [12, -12], [-12, 12], [12, 12]],
    5: [[0, -14], [-14, -2], [14, -2], [-9, 14], [9, 14]],
  };

  const count = displayTabs.length;
  const positions = layouts[count] || layouts[1];

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

      {/* Favicon cluster */}
      <button
        onClick={launchTabs}
        className="w-20 h-20 rounded-full relative cursor-pointer transition-transform hover:scale-110 mb-2"
        style={{ backgroundColor: "var(--card)" }}
      >
        {displayTabs.map((tab, i) => {
          const [x, y] = positions[i] || [0, 0];
          return (
            <div
              key={tab.id}
              className="w-7 h-7 rounded-full flex items-center justify-center absolute border border-[var(--card)]"
              style={{
                backgroundColor: "var(--background)",
                left: `calc(50% + ${x}px - 14px)`,
                top: `calc(50% + ${y}px - 14px)`,
              }}
            >
              <img
                src={getFaviconUrl(tab.url)}
                alt=""
                width={14}
                height={14}
                className="rounded-sm"
              />
            </div>
          );
        })}
        {count === 0 && (
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center absolute text-sm text-[var(--muted)]"
            style={{
              backgroundColor: "var(--background)",
              left: "calc(50% - 14px)",
              top: "calc(50% - 14px)",
            }}
          >
            ?
          </div>
        )}
      </button>

      {/* Label */}
      <span className="text-sm text-[var(--muted)] text-center truncate w-full">
        {group.name}
      </span>
    </div>
  );
}
