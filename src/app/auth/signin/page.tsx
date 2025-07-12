"use client";
import { signIn, useSession, SessionProvider } from "next-auth/react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function SignInForm() {
  const params = useSearchParams();
  const isSignUpParam = params.get("signup") === "true";
  const [isSignUp, setIsSignUp] = useState(isSignUpParam);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const error = params.get("error");
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    setIsSignUp(isSignUpParam);
  }, [isSignUpParam]);

  useEffect(() => {
    console.log("Session:", session);
    console.log("Status:", status);
    if (status === "loading") return;
    if (session) router.replace("/dashboard");
  }, [session, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn("credentials", {
      email: form.email,
      password: form.password,
      name: isSignUp ? form.name : undefined,
      isSignUp: isSignUp ? "true" : "false",
      callbackUrl: "/dashboard",
    });
    setLoading(false);
  };

  if (status === "authenticated") {
    return <div>Redirecting...</div>;
  }

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#18191A] text-white px-4">
      <div className="w-full max-w-md bg-[#23272F] rounded-xl shadow-lg p-8 flex flex-col gap-6">
        <h1 className="text-3xl font-bold text-center mb-2">
          {isSignUp
            ? "Sign up for " + process.env.NEXT_PUBLIC_APP_NAME
            : "Sign in to " + process.env.NEXT_PUBLIC_APP_NAME}
        </h1>
        <button
          className="w-full flex items-center justify-center gap-2 bg-white text-black rounded-md py-2 font-semibold hover:bg-gray-200 transition mb-4"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        >
          <svg width="20" height="20" viewBox="0 0 48 48">
            <g>
              <path
                fill="#4285F4"
                d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.1-.3-3z"
              />
              <path
                fill="#34A853"
                d="M6.3 14.7l7 5.1C15.5 17.1 19.4 14 24 14c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 15.7 3 8.3 8.2 6.3 14.7z"
              />
              <path
                fill="#FBBC05"
                d="M24 44c5.8 0 10.7-2.1 14.3-5.7l-6.6-5.4C29.7 34.9 27 36 24 36c-5.7 0-10.6-2.9-13.7-7.2l-7 5.4C8.3 39.8 15.7 44 24 44z"
              />
              <path
                fill="#EA4335"
                d="M44.5 20H24v8.5h11.7c-1.6 4.1-6.1 7.5-11.7 7.5-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.5l6.4-6.4C33.5 5.1 28.1 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-8.1 20-21 0-1.3-.1-2.1-.3-3z"
              />
            </g>
          </svg>
          Continue with Google
        </button>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="rounded-md px-3 py-2 text-black"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="rounded-md px-3 py-2 text-black"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="rounded-md px-3 py-2 text-black"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#6C63FF] hover:bg-[#5548c8] text-white font-semibold py-2 rounded-md transition"
            disabled={loading}
          >
            {loading
              ? isSignUp
                ? "Signing up..."
                : "Signing in..."
              : isSignUp
                ? "Sign up"
                : "Sign in"}
          </button>
        </form>
        <button
          className="text-sm text-[#6C63FF] hover:underline mt-2"
          onClick={() => setIsSignUp((v) => !v)}
        >
          {isSignUp
            ? "Already have an account? Sign in"
            : "Don't have an account? Sign up"}
        </button>
        {error && (
          <div className="text-red-400 text-center mt-2">
            {decodeURIComponent(error)}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <SessionProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <SignInForm />
      </Suspense>
    </SessionProvider>
  );
}
