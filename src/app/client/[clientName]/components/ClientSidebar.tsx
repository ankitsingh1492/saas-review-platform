"use client";

interface TabItem {
  id: string;
  label: string;
  icon: string;
  count?: number;
}

interface ClientSidebarProps {
  clientName: string;
  clientDomain: string;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  tabs: TabItem[];
}

export default function ClientSidebar({
  clientName,
  clientDomain,
  activeTab,
  onTabChange,
  tabs,
}: ClientSidebarProps) {
  return (
    <aside className="w-80 bg-[#181A20] border-r border-[#23262F] flex flex-col h-full">
      {/* Client Info Header */}
      <div className="p-6 lg:p-8 border-b border-[#23262F]">
        <div className="flex items-center gap-4 mb-4 lg:mb-6">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold">{clientName}</h2>
            <p className="text-secondary text-sm">{clientDomain}</p>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 p-3 lg:p-4">
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`w-full flex items-center justify-between p-2.5 lg:p-3 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-[#23262F] text-white hover:bg-[#2D3748]"
              }`}
              type="button"
            >
              <div className="flex items-center gap-2 lg:gap-3">
                <span className="text-base lg:text-lg">{tab.icon}</span>
                <span className="font-medium text-sm lg:text-base">
                  {tab.label}
                </span>
              </div>
              {tab.count !== undefined && (
                <span className="bg-[#2D3748] text-xs lg:text-sm px-1.5 lg:px-2 py-0.5 lg:py-1 rounded">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
