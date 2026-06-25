import HiringHistory from "@/components/client/HiringHistory";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userEmail = session?.user?.email;

  if (!userEmail) {
    return <div>Please login first</div>;
  }

  return (
    <div>
      <HiringHistory userEmail={userEmail} />
    </div>
  );
}