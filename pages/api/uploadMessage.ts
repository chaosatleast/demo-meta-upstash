import { serverPusher } from "./../../pusher/pusher";
import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis/redis";
import { Message } from "../../typings";
type Data = {
  message: Message;
};

type ErrorData = {
  body: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "POST") {
    res.status(405).json({ body: "Method is not allowed" });
    return;
  }

  const { message } = req.body;

  // replace frontend timestamp to server timestamp
  const formattedMessage = {
    ...message,
    created_at: Date.now(),
  };

  await redis.hset("messages", message.id, JSON.stringify(formattedMessage));

  serverPusher.trigger("messages", "new-message", formattedMessage);

  res.status(200).json({ message: formattedMessage });
}
