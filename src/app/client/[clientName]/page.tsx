export default async function ClientDetailsPage({
  params,
}: {
  params: Promise<{ clientName: string }>;
}) {
  const { clientName } = await params;

  const decodedClientName = decodeURIComponent(clientName).replace(/-/g, " ");

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Client Details</h1>
      <p className="text-xl mt-4">
        Displaying information for:{" "}
        <span className="capitalize font-semibold">{decodedClientName}</span>
      </p>
    </main>
  );
}
