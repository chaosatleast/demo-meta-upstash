import { Message } from "../typings";
import { useSession } from "next-auth/react";
import ReactTimeago from "react-timeago";
export default function MessageComponent(props: any) {
  const { message } = props;

  const { data: session } = useSession();
  const isUser = session?.user?.email === message.email;
  return (
    <div
      className={`h-auto flex items-end pb-1 w-fit  ${isUser && "ml-auto"}  `}
    >
      <div
        className={`
        ${isUser && "order-last"}
        bg-fixed
       ${
         isUser
           ? " bg-gradient-to-b from-red-500 via-yellow-300 to-pink-500"
           : "bg-gray-500"
       }
        ${
          isUser ? " rounded-l-lg rounded-br-lg" : " rounded-r-lg rounded-bl-lg"
        }
        px-3 py-2 w-fit text-white
       `}
      >
        <p>{message.message}</p>
      </div>
      <div>
        <p className="text-[10px] italic px-2 text-gray-400">
          <ReactTimeago date={new Date(message.created_at)} />
        </p>
      </div>
    </div>
  );
}
