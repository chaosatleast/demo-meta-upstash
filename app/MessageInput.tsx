"use client";
import { FormEvent, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { Message } from "../typings";
import useSWR from "swr";
import messageFetcher from "../utils/messageFetcher";
import { clientPusher } from "../pusher/clientPusher";
function MessageInput() {
  const [input, setInput] = useState("");

  const {
    data: messages,
    error,
    mutate,
  } = useSWR("/api/getMessages", messageFetcher);
  console.log(messages);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input) return;

    const contentToSend = input;

    setInput("");

    const id = uuid();
    const message: Message = {
      id,
      message: contentToSend,
      created_at: Date.now(),
      username: "Alice",
      email: "acxy9@gmail.com",
    };

    const uploadMessageToServer = async () => {
      const data = await fetch("/api/uploadMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }).then((res) => res.json());
      return [data.message, ...messages!];
    };

    await mutate(uploadMessageToServer, {
      optimisticData: [message, ...messages!],
      rollbackOnError: true,
    });
  };

  return (
    <form
      className="fixed bottom-0 px-10 py-5 space-x-2 w-full flex  border-t border-grey-100 bg-white"
      onSubmit={sendMessage}
    >
      <input
        className="flex-1 rounded border-solid border-2 border-grey-600
        focus:outline-none focus:ring-2  focus:ring-blue-600 focus:border-transparent px-5 py-3
        disabled:opacity-50 disabled:cursor-not-allowed "
        placeholder="Enter your message..."
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Send
      </button>
    </form>
  );
}

export default MessageInput;
