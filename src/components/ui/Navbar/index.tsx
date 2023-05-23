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
import { Button } from "../Button";

const registerMenuItens = [
  {
    name: "Categorias",
    path: "/admin/categories",
  },
  {
    name: "Cores",
    path: "/admin/colors",
  },
  {
    name: "Marcas",
    path: "/admin/brands",
  },
  {
    name: "Tamanhos",
    path: "/admin/sizes",
  },
  {
    name: "Produtos",
    path: "/products",
  },
];

const sortedByNameRegisterMenuItens = registerMenuItens.sort((a, b) => {
  const nameA = a.name.toUpperCase();
  const nameB = b.name.toUpperCase();

  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});

export function Navbar() {
  const router = useRouter();

  return (
    <Menubar className="flex items-center justify-between gap-5 text-zinc-100 w-full h-20 shadow-sm  bg-zinc-900 sm:px-16">
      <Link href="/admin" className="flex items-center hover:bg-zinc-700">
        <Image
          height="80"
          width="80"
          className="w-auto h-16"
          src="/images/whiteLogo.png"
          alt="Logo"
        />
      </Link>
      <div className="flex flex-1 items-center justify-between">
        <nav className="flex flex-1 items-center gap-5 text-zinc-100 w-full h-20">
          <MenubarMenu>
            <MenubarTrigger className="flex h-full cursor-pointer select-none items-center  px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none  focus:bg-zinc-800 hover:bg-zinc-700 hover: data-[state=open]:bg-zinc-700">
              Cadastros
            </MenubarTrigger>
            <MenubarContent className="z-50 sm:min-w-[12rem] sm:w-auto  text-center w-screen overflow-hidden   bg-white  text-zinc-900 shadow-sm  animate-in slide-in-from-top-1">
              {sortedByNameRegisterMenuItens.map((item) => {
                return (
                  <MenubarItem
                    key={item.name}
                    onClick={() => router.push(item.path)}
                    className="px-2 relative flex cursor-pointer select-none items-center   py-1.5 text-sm outline-none focus:bg-zinc-700 focus:text-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    {item.name}
                  </MenubarItem>
                );
              })}
            </MenubarContent>
          </MenubarMenu>
          <span className="flex h-full cursor-pointer select-none items-center  px-3 py-1.5 text-sm font-medium text-zinc-100 outline-none  focus:bg-zinc-800 hover:bg-zinc-700 hover: data-[state=open]:bg-zinc-800">
            Estoque
          </span>
        </nav>
        <Button variant="ghost">
          <DoorOpen />
        </Button>
      </div>
    </Menubar>
  );
}
