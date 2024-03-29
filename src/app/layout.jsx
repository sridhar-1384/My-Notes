import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Logout from "./logout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Notes",
  description: "Generated by create next app",
};

export default async function RootLayout({ children }) {
  let session=await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="flex align-middle justify-between bg-[#070F2B] text-white  px-5 py-3">
          <Link className="font-bold text-2xl" href="/">My Notes</Link>
          {session && <Logout/>}
          {!session && <Link href="/login" className="border-white border-[1px] hover:bg-purple-700 focus:bg-purple-500 focus:border-none rounded-md px-2 py-0.5 bg-purple-950">Login</Link>}
        </nav>

        {children}
      </body>
    </html>
  );
}
