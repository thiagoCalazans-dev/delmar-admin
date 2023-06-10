'use client'
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Spinner } from "@/components/ui/Spinner";
import { api } from "@/libs/axios";
import { Product } from "@prisma/client";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Search } from "lucide-react";

import { useState } from "react";
import { useQuery } from "react-query";

async function getColors(): Promise<Product[]> {
    const { data } = await api.get("/product");
    return data;
  }

export function SearchProductDialog() {
    const [open, setOpen] = useState(false);


     
    const { data: products, isLoading } = useQuery("products", getColors);
      
        if (isLoading) {
          return <Spinner />;
        }
  
    function closeDialog() {
      setOpen(false);
    }
  
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><Search/></Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Selecione um produto</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <ul>
            {products?.map((product) => {
                return (
                    <li key={product.id}>{product.name}</li>
                )
            })}
            </ul>
          </DialogDescription>
          
        </DialogContent>
      </Dialog>
    );
  }