import { useChannelMessage } from "@onehop/react";
import type { NextPage } from "next";
import { useState } from "react";
import { trpc } from "../utils/trpc";

type Message = {
  id: string;
  message: string;
  author: string;
};

const Home: NextPage = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");

  const createMessage = trpc.useMutation("message.create");

  useChannelMessage("messages", "MESSAGE_CREATE", (data) => {
    // @ts-ignore
    setMessages((prevData) => [data, ...prevData]);
  });

  return (
    <div className="flex flex-col w-4/5 mx-auto md:w-2/5">
      <h1 className="text-3xl font-extrabold pb-10 pt-4">T3 HOP</h1>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          createMessage.mutate({
            message,
            author,
          });

          setMessage("");
          setAuthor("");
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

      <div className="self-start pt-10">
        {messages.map((msg: any) => {
          return (
            <div key={msg.id} className="py-2">
              <b>{msg.message}</b>
              <p>- {msg.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
