"use client";
import { Storage } from "@/client/model/storage";
import { Form } from "@client/components/ui/Form";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@client/components/ui/Button";
import { useRouter } from "next/navigation";
import { SelectSizes } from "@client/components/common/SelectButtons/SelectSizes";
import { SelectColors } from "@client/components/common/SelectButtons/SelectColors";
import { SearchProductDialog } from "@client/components/common/Dialog/SearchProductDialog";
import { api } from "@/utils/libs/axios";

const createStorageFormSchema = z.object({
  id: z.number().nullable().default(null),
  product: z.object({
    id: z.string().nonempty("Campo obrigatório"),
    name: z.string().nonempty(),
  }),
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
  data?: Storage;
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
      setValue("product.id", String(data.product.id));
      setValue("product.name", String(data.product.name));
      setValue("id", data.id);
      setValue("amount", String(data.amount));
      setValue("colorId", String(data.color.id));
      setValue("price", String(data.price));
      setValue("descont", String(data.descont));
      setValue("sizeId", String(data.size.id));
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
            <Form.Label htmlFor="productId">Produto</Form.Label>
            <div className="flex gap-2">
              <Form.Input
                id="product.id"
                type="text"
                disabled={isLoading}
                register={register}
                required
                className="max-w-[3rem]"
              />
              <Form.Input id="product.name" disabled register={register} />
              <SearchProductDialog />
            </div>
            <Form.ErrorMessage field="product.id" />
          </Form.Control>

          <Form.Control className="w-full flex items-end justify-between gap-2">
            <div className="flex-1 min-w-[8rem]">
              <Form.Label htmlFor="price">Preço</Form.Label>
              <Form.Input
                id="price"
                type="text"
                disabled={isLoading}
                register={register}
                required
              />
            </div>
            <div className="flex-1 min-w-[8rem]">
              <Form.Label htmlFor="descont">Desconto</Form.Label>
              <Form.Input
                id="descont"
                type="text"
                disabled={isLoading}
                register={register}
                required
              />
              <Form.ErrorMessage field="amount" />
            </div>
            <div className="flex-1 min-w-[8rem]">
              <Form.Label htmlFor="amount">Quantidade</Form.Label>
              <Form.Input
                id="amount"
                type="text"
                disabled={isLoading}
                register={register}
                required
              />
              <Form.ErrorMessage field="amount" />
            </div>
          </Form.Control>
          <div className="w-full flex items-end justify-between gap-2">
            <Form.ErrorMessage field="price" />
          </div>
        </div>
        <Form.Control>
          <Controller
            name="sizeId"
            control={control}
            render={({ field }) => <SelectSizes field={field} data={data} />}
          />
        </Form.Control>
        <Form.Control>
          <Controller
            name="colorId"
            control={control}
            render={({ field }) => <SelectColors field={field} data={data} />}
          />
          <Form.ErrorMessage field="colorId" />
        </Form.Control>
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
