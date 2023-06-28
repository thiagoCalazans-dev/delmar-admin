"use client";
import { QueryClientProvider } from "react-query";
import "@client/styles/globals.css";
import { Raleway } from "next/font/google";
import { queryClient } from "@/utils/libs/queryClient";

const raleway = Raleway({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={`${raleway.className} vsc-initialized`}>
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
