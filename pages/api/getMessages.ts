import type { NextApiRequest, NextApiResponse } from "next";
import redis from "../../redis/redis";
import { Message } from "../../typings";
type Data = {
  message: Message[];
};

type ErrorData = {
  body: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== "GET") {
    res.status(405).json({ body: "Method is not allowed" });
    return;
  }

  const messageResponse = await redis.hvals("messages");
  const messages: Message[] = messageResponse.map((message) =>
    JSON.parse(message)
  );
  const sortedMesage: Message[] = messages.sort(
    (a, b) => a.created_at - b.created_at
  );

  res.status(200).json({ message: sortedMesage });
}
