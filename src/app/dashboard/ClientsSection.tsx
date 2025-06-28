"use client";
import { useState, useMemo } from "react";
import ClientList from "./ClientList";
import SearchInput from "./SearchInput";
import CreateClientModal from "./CreateClientModal";
import { ClientsSectionProps } from "@/types";

export default function ClientsSection({ clients }: ClientsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredClients = useMemo(() => {
    if (!searchQuery.trim()) return clients;

    const query = searchQuery.toLowerCase();
    return clients.filter(
      (client) =>
        client.name?.toLowerCase().includes(query) ||
        client.domain?.toLowerCase().includes(query)
    );
  }, [clients, searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleCreate = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleClientCreated = () => {
    // Refresh the clients list by refetching from the server
    // In a real app, you might want to use SWR or React Query for this
    window.location.reload();
  };

  return (
    <section className="w-full max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Clients</h2>
        <button
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 text-white font-medium hover:from-violet-500 hover:to-purple-500 transition-all duration-200 shadow-lg hover:shadow-violet-500/25"
          onClick={handleCreate}
        >
          + Create a new client
        </button>
      </div>
      <SearchInput onSearch={handleSearch} />
      <ClientList clients={filteredClients} />

      <CreateClientModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onClientCreated={handleClientCreated}
      />
    </section>
  );
}
