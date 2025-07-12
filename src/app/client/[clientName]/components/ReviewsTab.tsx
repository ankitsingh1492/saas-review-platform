"use client";

import { useState } from "react";
import type { Review } from "@/types";

interface ReviewsTabProps {
  reviews: Review[];
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = reviews.filter((review) => {
    return (
      searchQuery === "" ||
      review.content.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col h-full w-full">
      {/* Header */}
      <div className="p-4 lg:p-12 pb-4 lg:pb-6 border-b border-[#23262F]">
        <div className="flex items-center justify-between mb-4 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold">Reviews Inbox</h1>
        </div>
        {/* Search bar */}
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search by name, email, or testimonial keywords"
            className="flex-1 px-3 lg:px-4 py-2 rounded-lg bg-[#23262F] text-white placeholder:text-secondary border border-[#353945] text-sm lg:text-base"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {/* Reviews List */}
      <div className="flex-1 p-4 lg:p-12 pt-4 lg:pt-6 overflow-y-auto">
        <section className="flex flex-col gap-4 lg:gap-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center text-secondary py-8 lg:py-12">
              {searchQuery
                ? "No reviews match your search."
                : "No reviews found."}
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#23262F] rounded-xl p-4 lg:p-6 flex flex-col gap-2 shadow-card relative hover:bg-[#2A2D36] transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-[#23262F] text-primary text-xs px-2 py-1 rounded-full border border-primary">
                      {review.mediaUrls && review.mediaUrls.length > 0
                        ? "Video"
                        : "Text"}
                    </span>
                    <button className="text-red-400 hover:text-red-300 transition-colors">
                      ♥
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg lg:text-xl ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="mb-4 text-base lg:text-lg leading-relaxed">
                  {review.content}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-2 text-sm">
                  <div>
                    <span className="font-bold text-white">Name</span>
                    <div className="text-secondary">Anonymous User</div>
                  </div>
                  <div>
                    <span className="font-bold text-white">Email</span>
                    <div className="text-secondary">Not provided</div>
                  </div>
                  <div>
                    <span className="font-bold text-white">Submitted At</span>
                    <div className="text-secondary">
                      {new Date(review.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <span className="font-bold text-white">Status</span>
                    <div
                      className={`capitalize ${
                        review.status === "approved"
                          ? "text-green-400"
                          : review.status === "rejected"
                            ? "text-red-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {review.status}
                    </div>
                  </div>
                </div>
                {review.mediaUrls && review.mediaUrls.length > 0 && (
                  <div className="mt-4">
                    <span className="font-bold text-white text-sm">Media:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {review.mediaUrls.map((url, index) => (
                        <div
                          key={index}
                          className="text-xs text-secondary bg-[#181A20] px-2 py-1 rounded"
                        >
                          Media {index + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}
