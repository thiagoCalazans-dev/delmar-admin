"use client";
import { Button } from "@client/components/ui/Button";
import { Form } from "@client/components/ui/Form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Card } from "@client/components/ui/Card";
import { api } from "@/utils/libs/axios";

const createRegisterFormSchema = z.object({
  name: z.string().nonempty("Campo obrigatório"),
  email: z
    .string()
    .nonempty("Campo obrigatório")
    .email("Esse não é um formato de email"),
  password: z.string().nonempty("Campo obrigatório"),
});

type LoginForm = z.infer<typeof createRegisterFormSchema>;

export default function SignUp() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(createRegisterFormSchema),
  });

  function Register(data: any) {
    setIsLoading(true);

    api
      .post("/register", data)
      .then(() => {
        console.log("Registered!");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <main
      className=" justify-center 
    items-center 
    flex 
    overflow-x-hidden 
    overflow-y-auto 
    fixed 
    inset-0"
    >
      <div
        className="
          relative 
          w-full
          md:w-4/6
          lg:w-3/6
          xl:w-2/5
          my-6
          mx-auto 
          h-auto               
"
      >
        <Card
          className=" p-4 
          pb-2         "
        >
          <h1 className="text-2xl mb-4 ">Sign Up</h1>
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(Register)}
          >
            <Form.Control>
              <Form.Label htmlFor="Email">Name</Form.Label>
              <Form.Input
                id="name"
                disabled={isLoading}
                register={register}
                required
              />
            </Form.Control>
            <Form.Control>
              <Form.Label htmlFor="Email">Email</Form.Label>
              <Form.Input
                id="email"
                disabled={isLoading}
                register={register}
                required
              />
            </Form.Control>
            <Form.Control>
              <Form.Label htmlFor="password">Password</Form.Label>
              <Form.Input
                id="password"
                type="password"
                disabled={isLoading}
                register={register}
                required
              />
            </Form.Control>
            <Button className="" type="submit" variant="primary">
              Register
            </Button>
          </form>
          <div className="mt-4 w-full text-end   ">
            <Link
              className="text-sm text-brand-500  hover:underline hover:underline-offset-2 hover:decoration-0 "
              href="/"
            >
              Login
            </Link>
          </div>
        </Card>
      </div>
    </main>
  );
}
