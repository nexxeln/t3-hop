import type { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const createMessage = trpc.useMutation("message.create");

  return (
    <div className="flex flex-col items-center mx-auto">
      <h1>T3 HOP</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          createMessage.mutate({
            message,
            author,
          });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="rounded-md px-4 py-2 text-lg bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />
        <input
          type="text"
          placeholder="author"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          className="rounded-md px-4 py-2 text-lg bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-zinc-600"
        />

        <input
          type="submit"
          value="Send"
          className="px-4 py-2 text-lg rounded-md bg-zinc-700 cursor-pointer"
        />
      </form>
    </div>
  );
};

export default Home;
