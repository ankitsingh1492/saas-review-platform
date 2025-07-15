"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { TestimonialCard } from "@/components/TestimonialCard";
import type { Testimonial } from "@/types";

export default function LandingPage() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  const testimonials: Testimonial[] = [
    {
      initial: "S",
      name: "Sarah Chen",
      title: "CEO",
      company: "TechFlow Solutions",
      content: `Since implementing ${process.env.NEXT_PUBLIC_APP_NAME}, our conversion rate increased by 45%. The authentic testimonials have completely transformed how prospects view our brand.`,
      avatarGradient: "from-violet-500 to-purple-500",
      borderHoverColor: "violet-500",
      shadowHoverColor: "violet-500",
    },
    {
      initial: "M",
      name: "Marcus Rodriguez",
      title: "Founder",
      company: "GrowthLab",
      content:
        "The automation features are incredible. We collect 3x more testimonials with half the effort. Our customers love how easy it is to leave feedback.",
      avatarGradient: "from-cyan-500 to-blue-500",
      borderHoverColor: "cyan-500",
      shadowHoverColor: "cyan-500",
    },
    {
      initial: "E",
      name: "Emily Johnson",
      title: "VP Marketing",
      company: "InnovateCorp",
      content:
        "ROI was immediate. Within the first month, we saw a 60% increase in qualified leads. The testimonial widgets look amazing on our site.",
      avatarGradient: "from-purple-500 to-pink-500",
      borderHoverColor: "purple-500",
      shadowHoverColor: "purple-500",
    },
    {
      initial: "D",
      name: "David Kim",
      title: "Director",
      company: "E-commerce Plus",
      content:
        "Customer trust increased significantly after implementing the review system. Our checkout completion rate improved by 35% in just 2 months.",
      avatarGradient: "from-emerald-500 to-teal-500",
      borderHoverColor: "emerald-500",
      shadowHoverColor: "emerald-500",
    },
    {
      initial: "L",
      name: "Lisa Thompson",
      title: "CMO",
      company: "ScaleUp Ventures",
      content:
        "The analytics dashboard gives us insights we never had before. We can track which testimonials drive the most conversions. Game-changer!",
      avatarGradient: "from-orange-500 to-red-500",
      borderHoverColor: "orange-500",
      shadowHoverColor: "orange-500",
    },
    {
      initial: "J",
      name: "James Wilson",
      title: "CEO",
      company: "Digital Dynamics",
      content:
        "Setup was incredibly simple. Within minutes, we had beautiful testimonial widgets running on our site. The support team is fantastic too.",
      avatarGradient: "from-indigo-500 to-purple-500",
      borderHoverColor: "indigo-500",
      shadowHoverColor: "indigo-500",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <header
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/90 backdrop-blur-md border-b border-slate-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="text-white sm:w-6 sm:h-6"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9L17 14.74L18.18 22L12 18.27L5.82 22L7 14.74L2 9L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-400 rounded-full animate-ping"></div>
            </div>
            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>
          </div>

          <nav className="hidden lg:flex gap-6 xl:gap-8 text-sm font-medium">
            {["Features", "Customers", "Integrations", "Pricing"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="text-slate-300 hover:text-white transition-colors duration-200 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              )
            )}
          </nav>

          <div className="flex gap-2 sm:gap-3">
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg border border-slate-600 text-slate-300 font-medium hover:border-violet-500 hover:text-white transition-all duration-200 backdrop-blur-sm"
              onClick={() => router.push("/auth/signin")}
            >
              Sign in
            </button>
            <button
              className="px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
              onClick={() => router.push("/auth/signin?signup=true")}
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4 sm:px-6 pt-20 sm:pt-24">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 backdrop-blur-sm mb-6 sm:mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            <span className="text-xs sm:text-sm text-slate-300 font-medium">
              Trusted by businesses worldwide
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-transparent">
              Transform customer
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              feedback into growth
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-slate-400 max-w-3xl mx-auto mb-8 sm:mb-12 leading-relaxed px-4">
            Stop losing potential customers to poor reviews.{" "}
            <span className="text-white font-semibold">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </span>{" "}
            helps you collect, manage, and showcase authentic customer
            testimonials that convert visitors into buyers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4">
            <button
              className="group px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-semibold text-base sm:text-lg hover:from-violet-500 hover:to-purple-500 transition-all duration-300 shadow-2xl hover:shadow-violet-500/30 transform hover:-translate-y-1 w-full sm:w-auto flex justify-center"
              onClick={() => router.push("/auth/signin?signup=true")}
            >
              <span className="flex items-center gap-2 justify-center w-full text-center">
                Get Started Free
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
            <button
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-slate-600 text-slate-300 font-semibold text-base sm:text-lg hover:border-violet-500 hover:text-white hover:bg-slate-800/50 transition-all duration-300 backdrop-blur-sm w-full sm:w-auto"
              onClick={() => router.push("/auth/signin")}
            >
              Sign in
            </button>
          </div>

          {/* Testimonials Section */}
          <div className="w-full max-w-7xl mx-auto mb-12 sm:mb-16">
            <div className="text-center mb-8 sm:mb-12 px-4">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Loved by businesses worldwide
              </h2>
              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
                See how companies are transforming their customer feedback into
                powerful testimonials
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-6">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} {...testimonial} />
              ))}
            </div>

            {/* Call-to-action below testimonials */}
            <div className="text-center mt-8 sm:mt-12 px-4">
              <p className="text-slate-400 mb-4 sm:mb-6 text-sm sm:text-base">
                Join thousands of businesses building trust with authentic
                testimonials
              </p>
              <button
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/30 text-violet-300 font-medium hover:from-violet-600/30 hover:to-purple-600/30 hover:text-white transition-all duration-200 backdrop-blur-sm"
                onClick={() => router.push("/auth/signin?signup=true")}
              >
                Start collecting testimonials
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Floating cards animation */}
        <div className="absolute top-1/4 left-4 xl:left-10 w-48 sm:w-64 h-24 sm:h-32 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl backdrop-blur-sm border border-slate-600/30 p-3 sm:p-4 transform rotate-6 hover:rotate-3 transition-transform duration-300 hidden lg:block">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
            <div className="w-16 sm:w-20 h-2 bg-slate-600 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-2 bg-slate-600 rounded"></div>
            <div className="w-3/4 h-2 bg-slate-600 rounded"></div>
          </div>
        </div>

        <div className="absolute top-1/3 right-4 xl:right-10 w-48 sm:w-64 h-24 sm:h-32 bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl backdrop-blur-sm border border-slate-600/30 p-3 sm:p-4 transform -rotate-6 hover:-rotate-3 transition-transform duration-300 hidden lg:block">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
            <div className="w-16 sm:w-20 h-2 bg-slate-600 rounded"></div>
          </div>
          <div className="space-y-1">
            <div className="w-full h-2 bg-slate-600 rounded"></div>
            <div className="w-2/3 h-2 bg-slate-600 rounded"></div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-purple-500 rounded-lg flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
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
              <span className="font-bold text-slate-300">
                {process.env.NEXT_PUBLIC_APP_NAME}
              </span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm text-center md:text-left">
              © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_APP_NAME}.
              All rights reserved.
            </p>
            <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm">
              <a
                href="#"
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-slate-300 transition-colors"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
