import { getServerSession } from "next-auth/next";
import "../styles/globals.css";
import Header from "./Header";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html>
      <head />
      <body>
        <main>
          {/*@ts-ignore*/}
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
