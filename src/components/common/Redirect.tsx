"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface RedirectProps {
  href: string;
}

export function Redirect({ href }: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    router.push(href);
  }, []);

  return <div />;
}
