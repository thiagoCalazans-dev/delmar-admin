import { Navbar } from "@client/components/ui/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen">
      <Navbar />
      <main className="w-full bg-zinc-100">{children}</main>
    </div>
  );
}
