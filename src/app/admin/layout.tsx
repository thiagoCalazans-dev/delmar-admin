"use client";

import { Navbar } from "@/components/ui/Navbar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <main className="w-full h-full bg-zinc-100">{children}</main>
    </>
  );
}