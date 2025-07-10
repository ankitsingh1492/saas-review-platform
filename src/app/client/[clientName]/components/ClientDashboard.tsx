"use client";

import { useState } from "react";
import type { Review, Client } from "@/types";
import ReviewsTab from "./ReviewsTab";
import ClientTabs from "./ClientTabs";

interface ClientDashboardProps {
  client: Client;
  reviews: Review[];
}

type TabType = "reviews";

const tabs = [{ id: "reviews" as TabType, label: "Reviews", icon: "💬" }];

export default function ClientDashboard({
  client,
  reviews,
}: ClientDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>("reviews");

  function renderTabContent() {
    if (activeTab === "reviews") {
      return <ReviewsTab reviews={reviews} />;
    }
    return null;
  }

  return (
    <>
      <aside className="w-80 bg-[#181A20] border-r border-[#23262F] flex flex-col h-full">
        <div className="p-8 border-b border-[#23262F]">
          <div className="flex items-center gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
              <p className="text-secondary text-sm">{client.domain}</p>
            </div>
          </div>
        </div>

        <ClientTabs
          reviewsCount={reviews?.length}
          tabs={tabs}
          setActiveTab={setActiveTab}
          activeTab={activeTab}
        />
      </aside>
      <main className="flex-1 h-full overflow-y-auto">
        {renderTabContent()}
      </main>
    </>
  );
}
