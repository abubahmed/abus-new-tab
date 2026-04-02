"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useState, useEffect } from "react";
import { TabGroup, SingleTab } from "@/lib/types";
import TabGroupCard from "@/components/TabGroupCard";
import GroupModal from "@/components/GroupModal";
import TabCard from "@/components/TabCard";
import TabModal from "@/components/TabModal";
import { USE_MOCK_DATA, MOCK_GROUPS, MOCK_TABS } from "@/lib/mock";
import { useCachedFetch } from "@/hooks/useCachedFetch";
import DateTime from "@/components/DateTime";

export default function Home() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: groups, setData: setGroups, refresh: refreshGroups } = useCachedFetch<TabGroup>("cached_groups", "/api/groups", "groups");
  const { data: tabs, setData: setTabs, refresh: refreshTabs } = useCachedFetch<SingleTab>("cached_tabs", "/api/tabs", "tabs");
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showTabModal, setShowTabModal] = useState(false);
  const [editingGroup, setEditingGroup] = useState<TabGroup | null>(null);
  const [editingTab, setEditingTab] = useState<SingleTab | null>(null);

  const fetchData = async () => {
    if (USE_MOCK_DATA) {
      setGroups(MOCK_GROUPS);
      setTabs(MOCK_TABS);
      return;
    }
    await Promise.all([refreshGroups(), refreshTabs()]);
  };

  useEffect(() => {
    if (isLoaded && user) fetchData();
  }, [isLoaded, user]);

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

  function clearCache() {
    localStorage.removeItem("cached_groups");
    localStorage.removeItem("cached_tabs");
  }

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-[var(--muted)]">Loading...</p>
      </div>
    );
  }

  if (isLoaded && !user) {
    clearCache();
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
                  onClick={() => { clearCache(); signOut(); }}
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
      <div className="flex flex-col items-center pt-2 pb-12">
        <DateTime />

        {/* Two-column layout */}
        <div className="w-full max-w-7xl px-4 flex flex-col md:flex-row gap-0">
          {/* Groups section */}
          <div className="flex-1 flex flex-col items-end pb-8 md:pb-0 md:pr-8">
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
                  className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2 border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]"
                >
                  <span className="text-xl text-[var(--muted)]">+</span>
                </button>
                <span className="text-sm text-[var(--muted)]">Add group</span>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-b border-[#3c4043] md:border-b-0 md:border-r md:border-[#3c4043] mx-8 md:mx-0" />

          {/* Tabs section */}
          <div className="flex-1 flex flex-col items-start pt-8 md:pt-0 md:pl-8">
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
                  className="w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-110 mb-2 border-2 border-dashed border-[var(--border)] hover:border-[var(--primary)]"
                >
                  <span className="text-xl text-[var(--muted)]">+</span>
                </button>
                <span className="text-sm text-[var(--muted)]">Add tab</span>
              </div>
            </div>
          </div>
        </div>
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
