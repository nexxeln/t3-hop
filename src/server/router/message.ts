import { createRouter } from "./context";
import { z } from "zod";
import { Hop } from "@onehop/js";
import cuid from "cuid";

// @ts-ignore
const hop = new Hop(process.env.HOP_PROJECT_TOKEN as string);

export const messageRouter = createRouter().mutation("create", {
  input: z.object({
    message: z.string(),
    author: z.string(),
  }),
  async resolve({ input: { message, author } }) {
    await hop.channels.publishMessage("messages", "MESSAGE_CREATE", {
      message,
      author,
      id: cuid(),
    });
  },
});
