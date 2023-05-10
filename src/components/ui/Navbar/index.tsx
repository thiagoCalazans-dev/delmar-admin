"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@radix-ui/react-menubar";
import Image from "next/image";

export function Navbar() {
  return (
    <Menubar className="flex items-center  w-full h-20 shadow-sm  bg-white  ">
      <Image
        height="80"
        width="80"
        className=""
        src="/images/logo.jpg"
        alt="Logo"
      />
      <MenubarMenu>
        <MenubarTrigger className="flex h-full cursor-pointer select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium text-brand-500 outline-none  focus:bg-zinc-100 border-b-2 border-transparent hover:border-brand-500 hover: data-[state=open]:bg-zinc-100 ">
          Cadastro
        </MenubarTrigger>
        <MenubarContent className="z-50 min-w-[12rem] overflow-hidden rounded-md  bg-white  text-brand-500 shadow-md animate-in slide-in-from-top-1">
          <MenubarItem className="px-2 relative flex cursor-default select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Cores
          </MenubarItem>
          <MenubarItem className="px-2 relative flex cursor-default select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Categorias
          </MenubarItem>
          <MenubarItem className="px-2 relative flex cursor-default select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Marcas
          </MenubarItem>
          <MenubarItem className="px-2 relative flex cursor-default select-none items-center rounded-sm  py-1.5 text-sm outline-none focus:bg-zinc-100  data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
            Tamanhos
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
