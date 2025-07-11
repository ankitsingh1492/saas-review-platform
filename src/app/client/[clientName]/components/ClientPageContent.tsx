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
        <div className="flex h-[calc(100vh-5rem)]">
          <ClientSidebar
            clientName={client.name}
            clientDomain={client.domain}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabs={tabs}
          />

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
