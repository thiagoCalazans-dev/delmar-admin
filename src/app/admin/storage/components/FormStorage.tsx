"use client";

import { Form } from "@/components/ui/Form";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";
import { SelectBrands } from "@/components/common/SelectButtons/SelectBrands";
import { SelectCategories } from "@/components/common/SelectButtons/SelectCategories";
import { Checkbox } from "@radix-ui/react-checkbox";

const createStorageFormSchema = z.object({
  id: z.number().nullable().default(null),
  productId: z.string().nonempty("Campo obrigatório"),
  sizeId: z.string().nonempty("Campo obrigatório"),
  colorId: z.string().nonempty("Campo obrigatório"),
  price: z
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
  descont: z.string().default("0"),
  amount: z.string(),
});

type StorageForm = z.infer<typeof createStorageFormSchema>;

interface FormStorageProps {
  data?: StorageForm;
  closeDialog: () => void;
}

export function FormStorage({ data, closeDialog }: FormStorageProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const createUseForm = useForm<StorageForm>({
    resolver: zodResolver(createStorageFormSchema),
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
      setValue("productId", data.productId);
      setValue("id", data.id);
      setValue("amount", data.amount);
      setValue("colorId", data.colorId);
      setValue("price", String(data.price));
      setValue("descont", String(data.descont));
      setValue("sizeId", String(data.sizeId));
    }
  }, []);

  async function onSubmit(data: StorageForm) {
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
            <Form.Label htmlFor="productId">Id Produto</Form.Label>
            <Form.Input
              id="productId"
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
