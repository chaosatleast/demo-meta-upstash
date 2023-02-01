"use client";
import useSWR from "swr";
import messageFetcher from "../utils/messageFetcher";
import { Message } from "../typings";
import MessageComponent from "./MessageComponent";
import { clientPusher } from "../pusher/clientPusher";
import { useEffect } from "react";

type Props = {
  initialMessages: Message[];
};
function MessageList({ initialMessages }: Props) {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<Message[]>("/api/getMessages", messageFetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe("messages");
    channel.bind("new-message", async (data: Message) => {
      // if you sent the message,no need update the cache
      if (messages?.find((message) => message.id === data.id)) return;

      if (!messages) {
        mutate(messageFetcher);
      } else {
        mutate(messageFetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages, mutate, clientPusher]);

  return (
    <div className="space-y-1 px-5 pt-8 pb-32 max-w-3xl xl:max-w-6xl mx-auto">
      {(messages || initialMessages)?.map((message, index) => (
        <MessageComponent message={message} key={index} />
      ))}
    </div>
  );
}

export default MessageList;
