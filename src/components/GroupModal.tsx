"use client";

import { useState, useEffect } from "react";
import { TabGroup, Tab } from "@/lib/types";

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

export default function GroupModal({
  group,
  onSave,
  onClose,
}: {
  group: TabGroup | null;
  onSave: (group: TabGroup) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [tabs, setTabs] = useState<Tab[]>([{ id: generateId(), url: "", name: "" }]);

  useEffect(() => {
    if (group) {
      setName(group.name);
      setTabs(group.tabs.length > 0 ? group.tabs : [{ id: generateId(), url: "", name: "" }]);
    }
  }, [group]);

  function addTab() {
    setTabs([...tabs, { id: generateId(), url: "", name: "" }]);
  }

  function removeTab(id: string) {
    if (tabs.length <= 1) return;
    setTabs(tabs.filter((t) => t.id !== id));
  }

  function updateTab(id: string, field: "url" | "name", value: string) {
    setTabs(tabs.map((t) => (t.id === id ? { ...t, [field]: value } : t)));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validTabs = tabs.filter((t) => t.url.trim() !== "");
    if (!name.trim() || validTabs.length === 0) return;

    const processedTabs = validTabs.map((t) => ({
      ...t,
      url: t.url.match(/^https?:\/\//) ? t.url : `https://${t.url}`,
      name: t.name || tryHostname(t.url),
    }));

    onSave({
      id: group?.id || generateId(),
      name: name.trim(),
      tabs: processedTabs,
      createdAt: group?.createdAt || new Date().toISOString(),
    });
  }

  function tryHostname(url: string): string {
    try {
      const full = url.match(/^https?:\/\//) ? url : `https://${url}`;
      return new URL(full).hostname;
    } catch {
      return url;
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        className="w-full max-w-lg rounded-2xl p-8 max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
        style={{ backgroundColor: "#2d2e30" }}
      >
        <h2 className="text-xl font-semibold mb-6 text-[#e8eaed]">
          {group ? "Edit Group" : "New Tab Group"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-[#9aa0a6] mb-2">
              Group Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='e.g. "CS 101" or "Work"'
              className="w-full px-4 py-2.5 rounded-lg bg-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6] focus:outline-none focus:ring-2 focus:ring-[#8ab4f8]/50"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm text-[#9aa0a6] mb-2">
              Tabs
            </label>
            <div className="space-y-2.5">
              {tabs.map((tab) => (
                <div key={tab.id} className="flex gap-2">
                  <input
                    type="text"
                    value={tab.name}
                    onChange={(e) => updateTab(tab.id, "name", e.target.value)}
                    placeholder="Label (optional)"
                    className="w-1/3 px-3 py-2.5 rounded-lg bg-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6] text-sm focus:outline-none focus:ring-2 focus:ring-[#8ab4f8]/50"
                  />
                  <input
                    type="text"
                    value={tab.url}
                    onChange={(e) => updateTab(tab.id, "url", e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1 px-3 py-2.5 rounded-lg bg-[#3c4043] text-[#e8eaed] placeholder:text-[#9aa0a6] text-sm focus:outline-none focus:ring-2 focus:ring-[#8ab4f8]/50"
                  />
                  <button
                    type="button"
                    onClick={() => removeTab(tab.id)}
                    className="text-[#9aa0a6] hover:text-[#f28b82] px-2 transition-colors"
                    disabled={tabs.length <= 1}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addTab}
              className="mt-3 px-4 py-2 rounded-lg bg-[#3c4043] hover:bg-[#4a4c4f] text-sm text-[#8ab4f8] inline-flex items-center gap-1.5 transition-colors"
            >
              New tab
            </button>
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
              {group ? "Save Changes" : "Create Group"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
