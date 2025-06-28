import { ClientCardProps } from "@/types";

export default function ClientCard({ client }: ClientCardProps) {
  return (
    <div className="bg-slate-800/80 rounded-xl p-6 flex flex-col gap-2 shadow-lg">
      <span className="font-bold text-lg">{client.name}</span>
      <span className="text-slate-400 text-sm">Domain: {client.domain}</span>
    </div>
  );
}
