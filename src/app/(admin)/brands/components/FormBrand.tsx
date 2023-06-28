"use client";

import { Form } from "@client/components/ui/Form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@client/components/ui/Button";
import { api } from "@/utils/libs/axios";
import { useRouter } from "next/navigation";
import { Brand } from "@/client/model/brand";

const createBrandFormSchema = z.object({
  id: z.number().nullable().default(null),
  name: z.string().nonempty("Campo obrigatório"),
});

type BrandForm = z.infer<typeof createBrandFormSchema>;

interface FormBrandProps {
  data?: Brand;
  closeDialog: () => void;
}

export function FormBrand({ data, closeDialog }: FormBrandProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BrandForm>({
    resolver: zodResolver(createBrandFormSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("id", data.id);
    }
  }, []);

  async function onSubmit(data: BrandForm) {
    setIsLoading(true);

    if (data.id !== null) {
      await api
        .put(`/product/brand/${data.id}`, data)
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
        .post("/product/brand", data)
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
    <form className="flex flex-col gap-4 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-2 items-end">
        <Form.Control>
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Input id="id" disabled register={register} />
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
