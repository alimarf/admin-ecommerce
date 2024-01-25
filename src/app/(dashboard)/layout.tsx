import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import NextAuthProvider from "@/context/NextAuthProvider";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zivana Admin",
  description: "Zivana Admin",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const session = await getServerSession(authOptions);

  if(session === null){
    return redirect('/auth/signin')
  }
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <NextAuthProvider>
            <div>{children}</div>
          </NextAuthProvider>
        </main>
      </body>
    </html>
  );
}
