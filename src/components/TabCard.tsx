"use client";

import { SingleTab } from "@/lib/types";

function getFaviconUrl(url: string): string {
  try {
    const hostname = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
  } catch {
    return "";
  }
}

export default function TabCard({
  tab,
  onEdit,
  onDelete,
}: {
  tab: SingleTab;
  onEdit: (tab: SingleTab) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="group relative flex flex-col items-center w-28 shrink-0">
      {/* Context menu on hover */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 flex gap-0.5 transition-opacity z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onEdit(tab);
          }}
          className="text-[var(--muted)] hover:text-[var(--foreground)] bg-[var(--card)] rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
          title="Edit"
        >
          ...
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(tab.id);
          }}
          className="text-[var(--muted)] hover:text-[var(--danger)] bg-[var(--card)] rounded-full w-6 h-6 flex items-center justify-center text-xs shadow"
          title="Delete"
        >
          x
        </button>
      </div>

      {/* Icon circle with favicon */}
      <a
        href={tab.url}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2"
        style={{ backgroundColor: "var(--card)" }}
      >
        <img
          src={getFaviconUrl(tab.url)}
          alt=""
          width={28}
          height={28}
          className="rounded-sm"
        />
      </a>

      {/* Label */}
      <span className="text-xs text-[var(--muted)] text-center truncate w-full">
        {tab.name}
      </span>
    </div>
  );
}
