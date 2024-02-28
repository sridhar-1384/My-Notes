import { redirect } from "next/navigation";
import Form from "./Form";
import { getServerSession } from "next-auth";
export default async function Login() {
  let session = await getServerSession()
  if(session)
    redirect("/")
  return <Form />;
}
