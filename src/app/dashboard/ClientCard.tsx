import { ClientCardProps } from "@/types";
import { useRouter } from "next/navigation";

export default function ClientCard({ client }: ClientCardProps) {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(
      `/client/${encodeURIComponent(client.name.toLowerCase().replace(/\s+/g, "-"))}`
    );
  };

  return (
    <div
      className="card-primary rounded-xl p-6 flex flex-col gap-2 shadow-card"
      style={{ cursor: "pointer" }}
      onClick={handleCardClick}
    >
      <span className="font-bold text-lg text-primary">{client.name}</span>
      <span className="text-secondary text-sm">Domain: {client.domain}</span>
    </div>
  );
}
