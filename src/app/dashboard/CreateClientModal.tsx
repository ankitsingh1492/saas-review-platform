"use client";
import { useState } from "react";
import { CreateClientModalProps, ClientFormData } from "@/types";

export default function CreateClientModal({
  isOpen,
  onClose,
  onClientCreated,
}: CreateClientModalProps) {
  const [formData, setFormData] = useState<ClientFormData>({
    name: "",
    domain: "",
    subscriptionTier: "starter",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          domain: formData.domain,
          subscriptionTier: formData.subscriptionTier,
          brandingConfig: {
            primaryColor: "#6C63FF",
            secondaryColor: "#5548c8",
            logoUrl: "",
            companyName: formData.name,
          },
          apiKeys: {
            public: "",
            secret: "",
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create client");
      }

      const newClient = await response.json();
      console.log("Client created:", newClient);

      // Reset form
      setFormData({
        name: "",
        domain: "",
        subscriptionTier: "starter",
      });

      onClientCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
      <div className="modal-content rounded-xl p-6 w-full max-w-md mx-4 shadow-modal">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-primary">Create New Client</h2>
          <button
            onClick={onClose}
            className="text-secondary hover:text-primary transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-primary mb-2"
            >
              Client Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg input-primary focus-ring"
              placeholder="Enter client name"
            />
          </div>

          <div>
            <label
              htmlFor="domain"
              className="block text-sm font-medium text-primary mb-2"
            >
              Domain *
            </label>
            <input
              type="text"
              id="domain"
              name="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg input-primary focus-ring"
              placeholder="example.com"
            />
          </div>

          <div>
            <label
              htmlFor="subscriptionTier"
              className="block text-sm font-medium text-primary mb-2"
            >
              Subscription Tier *
            </label>
            <select
              id="subscriptionTier"
              name="subscriptionTier"
              value={formData.subscriptionTier}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 rounded-lg input-primary focus-ring"
            >
              <option value="starter">Starter</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          {error && (
            <div className="text-error text-sm bg-error/10 border border-error/20 rounded-lg p-3">
              {error}
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1 px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex-1 px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Client"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
