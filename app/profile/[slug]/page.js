import Profile from "@/app/components/Profile"

export default async function Page({ params }) {
    const { slug } = await params
    return <Profile username={params.slug} />
}
