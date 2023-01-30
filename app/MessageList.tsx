"use client";
import useSWR from "swr";
import messageFetcher from "../utils/messageFetcher";
import { Message } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher/clientPusher";
import { useEffect } from "react";

function MessageList() {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", messageFetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      if (!messages) {
        mutate(messageFetcher);
      } else {
        mutate(messageFetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-1 px-5 pt-8 pb-32 max-w-3xl xl:max-w-6xl mx-auto">
      {messages?.map((message, index) => (
        <MessageComponent message={message} key={index} />
      ))}
    </div>
  );
}

export default MessageList;
