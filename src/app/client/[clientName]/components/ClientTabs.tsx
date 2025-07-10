"use client";

type tabsType = {
  id: string;
  label: string;
  icon: string;
};

interface ClientTabsProps {
  reviewsCount: number;
  tabs: tabsType[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
}

export default function ClientTabs({
  reviewsCount,
  tabs,
  setActiveTab,
  activeTab,
}: ClientTabsProps) {
  return (
    <nav className="flex flex-col px-6 py-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex items-center gap-3 px-4 py-3 text-left font-medium transition-colors rounded-lg mb-2 ${
            activeTab === tab.id
              ? "bg-primary text-white"
              : "text-secondary hover:bg-[#23262F] hover:text-white"
          }`}
          aria-current={activeTab === tab.id ? "page" : undefined}
          type="button"
        >
          <span className="text-lg">{tab.icon}</span>
          <span>{tab.label}</span>
          {tab.id === "reviews" && (
            <span className="ml-auto bg-[#23262F] text-xs px-2 py-1 rounded-full">
              {reviewsCount > 0 ? reviewsCount : "0"}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
