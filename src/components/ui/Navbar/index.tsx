"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import { DoorOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { Button } from "../Button";

export function Navbar() {
  const router = useRouter();

  return (
    <Menubar className="flex items-center justify-between gap-5 text-zinc-100 w-full h-20 shadow-sm  bg-zinc-900 sm:px-16  ">
      <Link href="/admin">DELMAR</Link>
      <nav className="flex items-center justify-center gap-5 text-zinc-100 w-full h-20">
        <MenubarMenu>
          <MenubarTrigger className="flex h-full cursor-pointer select-none items-center  px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none  focus:bg-zinc-800 border-b-4 border-transparent hover:border-zinc-100 hover: data-[state=open]:bg-zinc-800">
            Cadastros
          </MenubarTrigger>
          <MenubarContent className="z-50 sm:min-w-[12rem] sm:w-auto sm:rounded-md text-center w-screen overflow-hidden   bg-white  text-zinc-900 shadow-sm  animate-in slide-in-from-top-1">
            <MenubarItem
              onClick={() => router.push("/admin/categories")}
              className="px-2 relative flex cursor-pointer select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Categorias
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/admin/colors")}
              className="px-2 relative flex cursor-pointer select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Cores
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/admin/brands")}
              className="px-2 relative flex cursor-pointer select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Marcas
            </MenubarItem>
            <MenubarItem
              onClick={() => router.push("/admin/sizes")}
              className="px-2 relative flex cursor-pointer select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Tamanhos
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
        <span className="flex h-full cursor-pointer select-none items-center  px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none  focus:bg-zinc-800 border-b-4 border-transparent hover:border-zinc-100 hover: data-[state=open]:bg-zinc-800">
          Estoque
        </span>
      </nav>
      <Button variant="ghost">
        <DoorOpen />
      </Button>
    </Menubar>
  );
}
