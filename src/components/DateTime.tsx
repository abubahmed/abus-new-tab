"use client";

import { useState, useEffect } from "react";

function formatTime(date: Date): string {
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

function formatDate(date: Date): string {
  return date.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function DateTime() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="text-6xl font-light text-[#e8eaed] tracking-tight">
        {formatTime(now)}
      </div>
      <div className="text-lg text-[#9aa0a6] mt-1">
        {formatDate(now)}
      </div>
    </div>
  );
}
