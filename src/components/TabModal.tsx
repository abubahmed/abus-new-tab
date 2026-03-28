"use client";

import { useState, useEffect } from "react";
import { SingleTab } from "@/lib/types";

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export default function TabModal({
  tab,
  onSave,
  onClose,
}: {
  tab: SingleTab | null;
  onSave: (tab: SingleTab) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (tab) {
      setName(tab.name);
      setUrl(tab.url);
    }
  }, [tab]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;

    const processedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
    const derivedName = name.trim() || tryHostname(processedUrl);

    onSave({
      id: tab?.id || generateId(),
      name: derivedName,
      url: processedUrl,
      color: "blue",
      createdAt: tab?.createdAt || new Date().toISOString(),
    });
  }

  function tryHostname(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="w-full max-w-md rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
        style={{ backgroundColor: "#2d2e30" }}
      >
        <h2 className="text-xl font-semibold mb-6 text-[#e8eaed]">
          {tab ? "Edit Tab" : "New Tab"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#9aa0a6] mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Auto-detected from URL"
              className="w-full px-4 py-2.5 rounded-lg bg-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8]/50"
            />
          </div>

          <div>
            <label className="block text-sm text-[#9aa0a6] mb-2">URL</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full px-4 py-2.5 rounded-lg bg-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8]/50"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm text-[#8ab4f8] hover:bg-[#8ab4f8]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full text-sm bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124] font-medium transition-colors"
            >
              {tab ? "Save Changes" : "Create Tab"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
