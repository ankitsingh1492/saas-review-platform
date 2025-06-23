import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/signin");
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18191A] text-white px-4">
      <div className="w-full max-w-md bg-[#23272F] rounded-xl shadow-lg p-8 flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="mb-4">
          Signed in as{" "}
          <span className="font-mono text-violet-400">
            {session.user?.email}
          </span>
        </p>
        <form action="/api/auth/signout" method="POST">
          <button
            type="submit"
            className="w-full bg-[#6C63FF] hover:bg-[#5548c8] text-white font-semibold py-2 rounded-md transition"
            formAction="/api/auth/signout?callbackUrl=/"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
