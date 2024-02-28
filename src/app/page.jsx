import { getServerSession } from "next-auth";
import Link from "next/link";
export default async function Home() {
  let data=await getServerSession()
  return (
    <div className="flex justify-center bg-[#1B1A55] h-lvh text-white">
        <div className="h-fit p-5 my-auto flex flex-col gap-y-4 justify-center items-center">
          <p className="text-5xl font-mono">Welcome {data && data.user.name} {!data && "to My Notes.."}</p>
          <p className="text-2xl font-mono">Keep your notes here...</p>
          <Link href="/notes" className="w-fit hover:bg-[#2d355e] px-2 py-1 border-blue-200 rounded-md text-blue-500 font-semibold bg-[#535C91]">Notes</Link>
        </div>
    </div>
  );
}
