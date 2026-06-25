import LawyerHireRequests from "@/components/lawyer/LawyerHireRequests";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LawyerHomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const lawyerEmail = user?.email;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/hireLawyer?lawyerEmail=${lawyerEmail}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return <LawyerHireRequests user={user} data={data} />;
};

export default LawyerHomePage;