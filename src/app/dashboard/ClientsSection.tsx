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
        (client.name?.toLowerCase().startsWith(query) &&
          client.name?.toLowerCase().includes(query)) ||
        (client.domain?.toLowerCase().startsWith(query) &&
          client.domain?.toLowerCase().includes(query))
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
        <h2 className="text-2xl font-bold text-primary">Clients</h2>
        <button
          className="btn-primary px-4 py-2 rounded-lg font-medium"
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
