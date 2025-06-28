import { DashboardHeaderProps } from "@/types";

export default function DashboardHeader({
  userEmail,
  children,
}: DashboardHeaderProps) {
  return (
    <header className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                className="text-white"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            ReviewCraft
          </span>
        </div>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-slate-300 text-sm hidden md:inline">
              Signed in as{" "}
              <span className="font-mono text-violet-400">{userEmail}</span>
            </span>
          )}
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
              formAction="/api/auth/signout?callbackUrl=/"
            >
              Logout
            </button>
          </form>
        </div>
        {children}
      </div>
    </header>
  );
}
