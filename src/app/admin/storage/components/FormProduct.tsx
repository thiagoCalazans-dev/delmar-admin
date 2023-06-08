"use client";

import { Form } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";
import { Product } from "@/@types/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Label } from "@/components/ui/Form/Label";
import { SelectBrands } from "@/components/common/SelectButtons/SelectBrands";
import { SelectCategories } from "@/components/common/SelectButtons/SelectCategories";
import { Checkbox } from "@radix-ui/react-checkbox";
import { ErrorMessage } from "@/components/ui/Form/ErrorMessage";

const createProductFormSchema = z.object({
  id: z.number().nullable().default(null),
  name: z.string().nonempty("Required"),
  code: z.string().nonempty("Required"),
  description: z.string().nonempty("Required"),
  value: z
    .string()
    .nonempty("Required")
    .refine(
      (valor) => {
        // Expressão regular para verificar números, vírgulas, pontos e no máximo duas casas decimais
        const regex = /^[\d,.]+(\.\d{1,2})?$/;

        // Verificar se a string corresponde à expressão regular
        if (!regex.test(valor)) {
          return false;
        }

        // Verificar se não há mais de duas casas decimais
        const partes = valor.replace(",", ".").split(".");
        if (partes[1] && partes[1].length > 2) {
          return false;
        }

        return true;
      },
      {
        message:
          "Apenas números, vírgulas, e no máximo duas casas decimais são permitidos.",
      }
    ),
  brandId: z.string().nonempty("Campo obrigatório"),
  categoryId: z.string().nonempty("Campo obrigatório"),
  trending: z.boolean(),
});

type ProductForm = z.infer<typeof createProductFormSchema>;

interface FormProductProps {
  data?: Product;
  closeDialog: () => void;
}

export function FormProduct({ data, closeDialog }: FormProductProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createUseForm = useForm<ProductForm>({
    resolver: zodResolver(createProductFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = createUseForm;

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("id", data.id);
      setValue("code", data.code);
      setValue("description", data.description);
      setValue("value", String(data.value));
      setValue("brandId", String(data.brandId));
      setValue("categoryId", String(data.categoryId));
      setValue("trending", data.trending);
    }
  }, []);

  async function onSubmit(data: ProductForm) {
    setIsLoading(true);
    if (data.id !== null) {
      await api
        .put(`/product/${data.id}`, data)
        .then((res) => {
          console.log(res);
          router.refresh();
          closeDialog();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await api
        .post("/product", data)
        .then((res) => {
          console.log(res);
          router.refresh();
          closeDialog();
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...createUseForm}>
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
            <Form.ErrorMessage field="code" />
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
            <Form.ErrorMessage field="name" />
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
            <Form.ErrorMessage field="description" />
          </Form.Control>

          <Form.Control className="w-full flex items-end justify-between gap-2">
            <div className="flex-1 min-w-[8rem]">
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
              render={({ field }) => <SelectBrands field={field} data={data} />}
            />
          </Form.Control>
          <div className="w-full flex items-end justify-between gap-2">
            <Form.ErrorMessage field="value" />
            <Form.ErrorMessage field="brandId" />
          </div>
        </div>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => <SelectCategories field={field} data={data} />}
        />
        <Form.ErrorMessage field="categoryId" />
        <Controller
          name="trending"
          control={control}
          render={({ field }) => (
            <div className="flex items-center justify-end space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                id="trending"
                className="peer h-4 w-4 shrink-0 rounded-full border border-zinc-300 ring-offset-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-zinc-900  data-[state=checked]:text-zinc-100"
              />
              <label
                htmlFor="trending"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Trending
              </label>
            </div>
          )}
        />
        <Button
          className="mt-2"
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          Register
        </Button>
      </FormProvider>
    </form>
  );
}
