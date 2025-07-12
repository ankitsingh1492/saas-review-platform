"use client";

import type { Review, Client } from "@/types";
import ReviewsTab from "./ReviewsTab";

interface ClientDashboardProps {
  client: Client;
  reviews: Review[];
  activeTab: string;
}

export default function ClientDashboard({
  reviews,
  activeTab,
}: ClientDashboardProps) {
  function renderTabContent() {
    switch (activeTab) {
      case "reviews":
        return <ReviewsTab reviews={reviews} />;
      case "analytics":
        return (
          <div className="p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">Analytics</h3>
            <p className="text-secondary">Analytics dashboard coming soon...</p>
          </div>
        );
      case "settings":
        return (
          <div className="p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">Settings</h3>
            <p className="text-secondary">
              Client settings panel coming soon...
            </p>
          </div>
        );
      case "widget":
        return (
          <div className="p-4 lg:p-8">
            <h3 className="text-xl lg:text-2xl font-bold mb-4">
              Widget Configuration
            </h3>
            <p className="text-secondary">
              Widget setup and customization coming soon...
            </p>
          </div>
        );
      default:
        return <ReviewsTab reviews={reviews} />;
    }
  }

  return <div className="h-full">{renderTabContent()}</div>;
}
