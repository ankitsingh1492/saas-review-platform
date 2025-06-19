"use client";

import { useState } from "react";

export default function Home() {
  const [healthStatus, setHealthStatus] = useState<string | null>(null);

  const checkHealth = async () => {
    try {
      const response = await fetch("/api/health");
      const data = await response.json();
      setHealthStatus(data.status);
    } catch {
      setHealthStatus("Error fetching health status");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button
          onClick={checkHealth}
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        >
          Check Health
        </button>
        {healthStatus && (
          <p className="text-sm sm:text-base mt-4">
            Health Status: {healthStatus}
          </p>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p className="text-xs sm:text-sm text-center">
          © {new Date().getFullYear()} Saas reviews. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
