import Pusher from "pusher";

export const serverPusher = new Pusher({
  appId: process.env.PUSHER_ID!,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY!,
  secret: process.env.PUSHER_SECRET!,
  cluster: "ap3",
  useTLS: true,
});
