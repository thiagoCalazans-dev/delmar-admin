"use client";

import { Form } from "@client/components/ui/Form";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@client/components/ui/Button";

import { useRouter } from "next/navigation";
import { Category } from "@/client/model/category";
import { api } from "@/utils/libs/axios";

const createCategoryFormSchema = z.object({
  id: z.number().nullable().default(null),
  name: z.string().nonempty("Campo obrigatório"),
});

type CategoryForm = z.infer<typeof createCategoryFormSchema>;

interface FormCategoryProps {
  data?: Category;
  closeDialog: () => void;
}

export function FormCategory({ data, closeDialog }: FormCategoryProps) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryForm>({
    resolver: zodResolver(createCategoryFormSchema),
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("id", data.id);
    }
  }, []);

  async function onSubmit(data: CategoryForm) {
    setIsLoading(true);

    if (data.id !== null) {
      await api
        .put(`/product/category/${data.id}`, data)
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
        .post("/product/category", data)
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
