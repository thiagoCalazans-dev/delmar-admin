"use client";

import { Form } from "@/components/ui/Form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { api } from "@/libs/axios";
import { useRouter } from "next/navigation";

const createColorFormSchema = z.object({
  id: z.number().nullable().default(null),
  name: z.string().nonempty("Campo obrigatório"),
});

type ColorForm = z.infer<typeof createColorFormSchema>;

export function FormColor() {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ColorForm>({
    resolver: zodResolver(createColorFormSchema),
  });

  function onSubmit(data: ColorForm) {
    setIsLoading(true);
    api
      .post("/color", data)
      .then(() => {
        router.refresh();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
      <Button className="mt-2" type="submit" variant="primary">
        Register
      </Button>
    </form>
  );
}
