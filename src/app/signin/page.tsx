"use client";
import Image from "next/image";

import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Card } from "@/client/components/ui/Card";
import { Form } from "@/client/components/ui/Form";
import { Button } from "@/client/components/ui/Button";


const createLoginFormSchema = z.object({
  email: z
    .string()
    .nonempty("Campo obrigatório")
    .email("Esse não é um formato de email"),
  password: z.string().nonempty("Campo obrigatório"),
});

type LoginForm = z.infer<typeof createLoginFormSchema>;

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(createLoginFormSchema),
  });

  function Login(data: LoginForm) {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        console.log("Logged in");
        router.push("/");
      }

      if (callback?.error) {
        console.log(callback.error);
      }
    });
  }

  return (
    <main
      className="      
      flex 
      min-h-full 
      flex-col 
      justify-center     
      sm:px-6 
    
      bg-zinc-100
      items-center      
    "
    >
      <Card className="w-full  sm:max-w-xl">
        <div className="flex justify-center items-end">
          <div className="flex flex-col items-center p-2">
            <Image
              height="100"
              width="100"
              className="mx-auto w-auto"
              src="/images/blackLogo.png"
              alt="Logo"
            />
          </div>
        </div>
        <form className="flex flex-col gap-4 " onSubmit={handleSubmit(Login)}>
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
          <Button className="mt-2" type="submit" variant="primary">
            Login
          </Button>
        </form>
        <div className="mt-4 w-full text-end ">
          <Link
            className="text-sm text-brand-500 hover:underline hover:underline-offset-2 hover:decoration-0"
            href="/signup"
          >
            Create a new account
          </Link>
        </div>
      </Card>
    </main>
  );
}