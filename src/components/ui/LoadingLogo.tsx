"use client";
import Image from "next/image";

export function LoadingLogo() {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center sm:items-center animate-pulse">
      <Image height="100" width="100" src="/images/blackLogo.png" alt="Logo" />
    </div>
  );
}
