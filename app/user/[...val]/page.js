import User from "@/app/components/User"

export default async function Page({ params }) {
  const { slug } = await params
  return <User />
}