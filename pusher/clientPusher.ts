import Pusher from "pusher-js";

const pusherKey: string = process.env.NEXT_PUBLIC_PUSHER_KEY!;
export const clientPusher = new Pusher(pusherKey, {
  cluster: "ap3",
  forceTLS: true,
});
