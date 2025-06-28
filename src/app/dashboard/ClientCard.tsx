import { ClientCardProps } from "@/types";

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="card-primary rounded-xl p-6 flex flex-col gap-2 shadow-card">
      <span className="font-bold text-lg text-primary">{client.name}</span>
      <span className="text-secondary text-sm">Domain: {client.domain}</span>
    </div>
  );
}
