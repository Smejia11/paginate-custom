import { z } from "zod";

export const PaginateParamsSchema = z.object({
  page: z.number().int().gt(0),
  limit: z.number().int().lt(100),
  data: z.array(z.any()),
  url: z.string().url(),
});
