import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { Message } from "../typings";
async function HomePage() {
  const data = await fetch(
    `${process.env.VERCEL_URL || "http://localhost:3000"}/api/getMessages`
  ).then((response) => response.json());

  const messages: Message[] = data.messages;
  return (
    <main>
      <MessageList initialMessages={messages} />
      <MessageInput />
    </main>
  );
}

export default HomePage;
