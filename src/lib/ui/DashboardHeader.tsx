import { DashboardHeaderProps } from "@/types";

export default function DashboardHeader({
  userEmail,
  children,
}: DashboardHeaderProps) {
  return (
    <header className="fixed w-full z-50 header-primary">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-xl flex items-center justify-center shadow-lg">
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
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-primary rounded-full animate-ping-slow"></div>
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </span>
        </div>
        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="text-text-secondary text-sm hidden md:inline">
              Signed in as{" "}
              <span className="font-mono text-text-primary">{userEmail}</span>
            </span>
          )}
          <form action="/api/auth/signout" method="POST">
            <button
              type="submit"
              className="btn-primary px-4 py-2 rounded-lg font-medium"
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
