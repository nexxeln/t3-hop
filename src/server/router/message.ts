import { createRouter } from "./context";
import { z } from "zod";

export const messageRouter = createRouter().mutation("create", {
  input: z.object({
    message: z.string(),
    author: z.string(),
  }),
  async resolve() {},
});
