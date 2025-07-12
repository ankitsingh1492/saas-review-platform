"use client";

import { useState } from "react";
import type { Review, Client } from "@/types";
import ClientDashboard from "./ClientDashboard";
import ClientSidebar from "./ClientSidebar";

interface ClientPageContentProps {
  client: Client;
  reviews: Review[];
}

export default function ClientPageContent({
  client,
  reviews,
}: ClientPageContentProps) {
  const [activeTab, setActiveTab] = useState("reviews");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "reviews",
      label: "Reviews",
      icon: "💬",
      count: reviews?.length || 0,
    },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "settings", label: "Settings", icon: "⚙️" },
    { id: "widget", label: "Widget", icon: "🔧" },
  ];

  return (
    <div className="min-h-screen bg-dashboard text-white pt-20">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header with Menu Toggle */}
        <div className="lg:hidden px-4 py-3 border-b border-[#23262F]">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">{client.name}</h2>
              <p className="text-secondary text-sm">{client.domain}</p>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg bg-[#23262F] hover:bg-[#2D3748] transition-colors"
              type="button"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        {isMobileMenuOpen && (
          <div className="lg:hidden px-4 py-2 border-b border-[#23262F] bg-[#181A20]">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "bg-[#23262F] text-white hover:bg-[#2D3748]"
                  }`}
                  type="button"
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="text-sm font-medium">{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className="bg-[#2D3748] text-xs px-1.5 py-0.5 rounded">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop and Mobile Layout */}
        <div className="flex flex-col lg:flex-row h-[calc(100vh-5rem)]">
          {/* Desktop Sidebar */}
          <div className="hidden lg:block">
            <ClientSidebar
              clientName={client.name}
              clientDomain={client.domain}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              tabs={tabs}
            />
          </div>

          {/* Main content area */}
          <main className="flex-1 h-full overflow-y-auto">
            <ClientDashboard
              client={client}
              reviews={reviews}
              activeTab={activeTab}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
