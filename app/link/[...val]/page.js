import Sharelink from "@/app/components/Sharelink"
import { databaseConnection } from "@/app/Connection/dbConnection"
import Link from "@/app/models/Link";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { val } = await params
  await databaseConnection();
  const user = await Link.findOne({id: val[1]});
  if(user){
    return <Sharelink userlink={val}/>
  }
  return notFound();
}