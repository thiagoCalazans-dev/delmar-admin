import z from "zod";

export const colorParamsSchema = z.object({
  id: z.coerce.number(),
});

export const colorCreateBodySchema = z.object({
  name: z.string(),
});

export const colorBodySchema = z.object({
  id: z.coerce.number(),
  name: z.string(),
});

export type colorParams = z.infer<typeof colorParamsSchema>;
