export default function AuthErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#18191A] text-white">
      <div className="bg-[#23272F] p-8 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
        <p className="mb-4">
          Something went wrong with your sign in or sign up. Please try again.
        </p>
        <a href="/auth/signin" className="text-[#6C63FF] hover:underline">
          Back to sign in
        </a>
      </div>
    </div>
  );
}
