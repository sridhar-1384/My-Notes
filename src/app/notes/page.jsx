import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Form from "./Form";
import NoteCard from "./NoteCard";
export default async function Notes() {
  let session = await getServerSession();
  if (!session) redirect("/login");
  let res=await fetch(process.env.APP_URI+`/api/notes/${session.user.email}`)
  let data=await res.json()
  return (
    <div className="bg-gray-800 min-h-screen">
      <Form/>
      <div className="mt-4 flex flex-wrap mx-0 md:mx-5 justify-around">
        {
          data.map((item)=>
            <NoteCard title={item.title} message={item.message} key={item._id} id={item._id}/>
          )
        }
      </div>
    </div>
  );
}
