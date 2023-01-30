import { Message } from "../typings";

const messageFetcher = async () => {
  const response = await fetch("/api/getMessages");
  const data = await response.json();
  const messages: Message[] = data.message;
  return messages;
};

export default messageFetcher;
