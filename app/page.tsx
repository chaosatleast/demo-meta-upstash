import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { Message } from "../typings";
import { getServerSession } from "next-auth";
import Provider from "./provider";
async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((response) => response.json());
  const session = await getServerSession();
  const messages: Message[] = data.messages;
  return (
    <Provider session={session}>
      <main>
        <MessageList initialMessages={messages} />
        <MessageInput session={session} />
      </main>
    </Provider>
  );
}

export default HomePage;
