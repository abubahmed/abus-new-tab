"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect, useCallback } from "react";
import { TabGroup, SingleTab } from "@/lib/types";
import TabGroupCard from "@/components/TabGroupCard";
import GroupModal from "@/components/GroupModal";
import TabCard from "@/components/TabCard";
import TabModal from "@/components/TabModal";
import { USE_MOCK_DATA, MOCK_GROUPS, MOCK_TABS } from "@/lib/mock";
import DateTimeWeather from "@/components/DateTimeWeather";

export default function Home() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [groups, setGroups] = useState<TabGroup[]>([]);
  const [tabs, setTabs] = useState<SingleTab[]>([]);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showTabModal, setShowTabModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<TabGroup | null>(null);
  const [editingTab, setEditingTab] = useState<SingleTab | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    if (USE_MOCK_DATA) {
      setGroups(MOCK_GROUPS);
      setTabs(MOCK_TABS);
      setLoading(false);
      return;
    }
    try {
      const [groupsRes, tabsRes] = await Promise.all([
        fetch("/api/groups"),
        fetch("/api/tabs"),
      ]);
      if (groupsRes.ok) {
        const data = await groupsRes.json();
        setGroups(data.groups);
      }
      if (tabsRes.ok) {
        const data = await tabsRes.json();
        setTabs(data.tabs);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && user) fetchData();
  }, [isLoaded, user, fetchData]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!search.trim()) return;
    window.open(
      `https://www.google.com/search?q=${encodeURIComponent(search.trim())}`,
      "_blank"
    );
    setSearch("");
  }

  // Group handlers
  async function handleSaveGroup(group: TabGroup) {
    const isEdit = editingGroup !== null;
    const endpoint = isEdit ? `/api/groups/${group.id}` : "/api/groups";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(group),
    });

    if (res.ok) await fetchData();
    setShowGroupModal(false);
    setEditingGroup(null);
  }

  async function handleDeleteGroup(id: string) {
    if (!confirm("Delete this group?")) return;
    const res = await fetch(`/api/groups/${id}`, { method: "DELETE" });
    if (res.ok) setGroups(groups.filter((g) => g.id !== id));
  }

  function handleEditGroup(group: TabGroup) {
    setEditingGroup(group);
    setShowGroupModal(true);
  }

  // Tab handlers
  async function handleSaveTab(tab: SingleTab) {
    const isEdit = editingTab !== null;
    const endpoint = isEdit ? `/api/tabs/${tab.id}` : "/api/tabs";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tab),
    });

    if (res.ok) await fetchData();
    setShowTabModal(false);
    setEditingTab(null);
  }

  async function handleDeleteTab(id: string) {
    if (!confirm("Delete this tab?")) return;
    const res = await fetch(`/api/tabs/${id}`, { method: "DELETE" });
    if (res.ok) setTabs(tabs.filter((t) => t.id !== id));
  }

  function handleEditTab(tab: SingleTab) {
    setEditingTab(tab);
    setShowTabModal(true);
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-end gap-3 px-6 py-4">
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-9 h-9 rounded-full bg-[#8ab4f8] text-[#202124] text-sm font-semibold flex items-center justify-center hover:bg-[#aecbfa] transition-colors"
          >
            {(user?.firstName?.[0] || "")}{(user?.lastName?.[0] || "")}
          </button>
          {showUserMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
              <div className="absolute right-0 mt-2 w-40 rounded-xl shadow-2xl shadow-black/50 py-1.5 z-50" style={{ backgroundColor: "#2d2e30" }}>
                <button
                  onClick={() => signOut()}
                  className="w-full text-left px-4 py-2.5 text-sm text-[#e8eaed] hover:bg-[#3c4043] transition-colors"
                >
                  Log out
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Center content */}
      <div className="flex flex-col items-center pt-6 pb-12">
        <DateTimeWeather />

        {/* Search bar */}
        <form onSubmit={handleSearch} className="w-full max-w-xl mb-12 px-4">
          <div className="flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#e8eaed] hover:bg-[#dfe1e5] transition-colors shadow-sm">
            <svg
              className="w-5 h-5 text-[#9aa0a6] shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Google or type a URL"
              className="flex-1 bg-transparent outline-none text-[#202124] placeholder:text-[#9aa0a6] text-base"
            />
          </div>
        </form>

        {/* Two-column layout */}
        {loading ? (
          <p className="text-[var(--muted)]">Loading...</p>
        ) : (
          <div className="w-full max-w-7xl px-4 flex flex-col md:flex-row gap-0">
            {/* Groups section */}
            <div className="flex-1 flex flex-col items-center pb-8 md:pb-0 md:pr-8">
              <h2 className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider mb-5">
                Groups
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                {groups.map((group) => (
                  <TabGroupCard
                    key={group.id}
                    group={group}
                    onEdit={handleEditGroup}
                    onDelete={handleDeleteGroup}
                  />
                ))}
                <div className="flex flex-col items-center w-28 shrink-0">
                  <button
                    onClick={() => {
                      setEditingGroup(null);
                      setShowGroupModal(true);
                    }}
                    className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2 border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]"
                  >
                    <span className="text-xl text-[var(--muted)]">+</span>
                  </button>
                  <span className="text-xs text-[var(--muted)]">Add group</span>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-[#3c4043] md:border-b-0 md:border-r md:border-[#3c4043] mx-4 md:mx-0" />

            {/* Tabs section */}
            <div className="flex-1 flex flex-col items-center pt-8 md:pt-0 md:pl-8">
              <h2 className="text-sm font-medium text-[#9aa0a6] uppercase tracking-wider mb-5">
                Tabs
              </h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center">
                {tabs.map((tab) => (
                  <TabCard
                    key={tab.id}
                    tab={tab}
                    onEdit={handleEditTab}
                    onDelete={handleDeleteTab}
                  />
                ))}
                <div className="flex flex-col items-center w-28 shrink-0">
                  <button
                    onClick={() => {
                      setEditingTab(null);
                      setShowTabModal(true);
                    }}
                    className="w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2 border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]"
                  >
                    <span className="text-xl text-[var(--muted)]">+</span>
                  </button>
                  <span className="text-xs text-[var(--muted)]">Add tab</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showGroupModal && (
        <GroupModal
          group={editingGroup}
          onSave={handleSaveGroup}
          onClose={() => {
            setShowGroupModal(false);
            setEditingGroup(null);
          }}
        />
      )}

      {showTabModal && (
        <TabModal
          tab={editingTab}
          onSave={handleSaveTab}
          onClose={() => {
            setShowTabModal(false);
            setEditingTab(null);
          }}
        />
      )}
    </div>
  );
}
