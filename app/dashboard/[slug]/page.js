import Dashboard from "@/app/components/Dashboard";
import { databaseConnection } from "@/app/Connection/dbConnection";
import { fetchUsername } from "@/app/UserActions/actions";

export async function generateMetadata({ params }) {
  await databaseConnection();
  const { slug } = await params;
  const user = await fetchUsername(slug);
  console.log(slug)

  return {
    title: user?.name ? `${user.name} | LinkTree` : "User Dashboard | LinkTree",
    description: user?.name
      ? `Explore ${user.name}'s saved links and resources.`
      : "View user dashboard and manage links easily.",
  };

}

export default async function Page({ params }) {
  const { slug } = await params;

  return <Dashboard />;
}

