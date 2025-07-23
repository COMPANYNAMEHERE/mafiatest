import { z } from 'zod';

export const BusinessSchema = z.object({
  type: z.string(),
  level: z.number().int()
});

export type Business = z.infer<typeof BusinessSchema>;
