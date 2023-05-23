"use client";

import { Form } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";
import { Product } from "@/@types/types";
import { ComboboxBrands } from "./ComboboxBrands";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/Select";
import { error } from "console";

const createProductFormSchema = z.object({
  id: z.number().nullable().default(null),
  name: z.string().nonempty("Campo obrigatório"),
  code: z.string(),
  description: z.string(),
  value: z.number(),
  brandId: z.number(),
});

type ProductForm = z.infer<typeof createProductFormSchema>;

interface FormProductProps {
  data?: Product;
  closeDialog: () => void;
}

export function FormProduct({ data, closeDialog }: FormProductProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<ProductForm>({
    resolver: zodResolver(createProductFormSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("id", data.id);
      setValue("code", data.code);
      setValue("description", data.description);
      setValue("value", data.value);
    }
  }, []);

  async function onSubmit(data: ProductForm) {
    setIsLoading(true);

    console.log(data);
    console.log("erro:", errors);

    // if (data.id !== null) {
    //   await api
    //     .put(`/product/${data.id}`, data)
    //     .then((res) => {
    //       console.log(res);
    //       router.refresh();
    //       closeDialog();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // } else {
    //   await api
    //     .post("/product", data)
    //     .then((res) => {
    //       console.log(res);
    //       router.refresh();
    //       closeDialog();
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
  }

  return (
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col  items-start">
        <Form.Control>
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Input id="id" disabled register={register} />
        </Form.Control>
        <Form.Control className="w-full ">
          <Form.Label htmlFor="code">Código</Form.Label>
          <Form.Input
            id="code"
            type="text"
            disabled={isLoading}
            register={register}
            required
          />
        </Form.Control>
        <Form.Control className="w-full ">
          <Form.Label htmlFor="name">Name</Form.Label>
          <Form.Input
            id="name"
            type="text"
            disabled={isLoading}
            register={register}
            required
          />
        </Form.Control>
        <Form.Control className="w-full ">
          <Form.Label htmlFor="description">Descrição</Form.Label>
          <Form.Input
            id="description"
            type="text"
            disabled={isLoading}
            register={register}
            required
          />
        </Form.Control>

        <Form.Control className="w-full flex items-end justify-between gap-2">
          <div className="flex-1">
            <Form.Label htmlFor="value">Valor</Form.Label>
            <Form.Input
              id="value"
              type="text"
              disabled={isLoading}
              register={register}
              required
            />
          </div>
          <Controller
            name="brandId"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                defaultValue={String(field.value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma marca.." />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="1">Marca 1</SelectItem>
                  <SelectItem value="2">Marca 2</SelectItem>
                  <SelectItem value="3">Marca 3</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </Form.Control>
      </div>
      <Button
        className="mt-2"
        type="submit"
        variant="primary"
        disabled={isLoading}
      >
        Register
      </Button>
    </form>
  );
}
