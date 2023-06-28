import { FormProvider, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@client/components/ui/Form";
import { Button } from "@client/components/ui/Button";
import { supabase } from "@/utils/libs/supabase";


const createUploadImageFormSchema = z.object({
  id: z.number().nullable().default(null),
  image: z.instanceof(FileList).transform((list) => list.item(0)!),
  description: z.string(),
});

type uploadImageForm = z.infer<typeof createUploadImageFormSchema>;

interface FormImageUploadProps {
  closeDialog: () => void;
}

export function FormImageUpload({ closeDialog }: FormImageUploadProps) {
  const createUseForm = useForm<uploadImageForm>({
    resolver: zodResolver(createUploadImageFormSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = createUseForm;

  async function onSubmit(data: uploadImageForm) {
    const { data: path, error } = await supabase.storage
      .from("images")
      .upload(data.image.name, data.image);

    const { data: url } = await supabase.storage
      .from("images")
      .getPublicUrl(path!.path);
    console.log(url.publicUrl);
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <FormProvider {...createUseForm}>
        <Form.Control>
          <Form.Label htmlFor="id">Id</Form.Label>
          <Form.Input id="id" disabled register={register} />
        </Form.Control>
        <Form.Control className="flex-1 min-w-[8rem]">
          <Form.Label htmlFor="description">Descrição</Form.Label>
          <Form.Input
            id="description"
            type="text"
            register={register}
            required
          />
          <Form.ErrorMessage field="description" />
        </Form.Control>
        <Form.Control className="w-full ">
          <Form.Label htmlFor="image">Adcionar Imagem</Form.Label>
          <div>
            <Form.Input
              id="image"
              accept="image/*"
              type="file"
              register={register}
              required
            />
          </div>
          <Form.ErrorMessage field="image" />
        </Form.Control>
        <Button className="" type="submit" variant="primary">
          Register
        </Button>
      </FormProvider>
    </form>
  );
}
