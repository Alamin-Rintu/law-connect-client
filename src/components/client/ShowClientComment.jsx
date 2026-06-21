import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const ShowClientComment = async ({ lawyer }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/client?lawyerId=${lawyer._id}`,
    { cache: "no-store" },
  );

  const comments = await res.json();

  if (!comments.length) {
    return <div className="mt-6 text-slate-500">No comments found</div>;
  }

  return (
    <div className="mt-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3">
        <h3 className="text-xl font-semibold text-slate-800">
          Reviews ({comments.length})
        </h3>
      </div>
      <div className="space-y-4">
        {comments.map((item) => (
          <div
            key={item._id}
            className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex gap-4">
              {/* Avatar */}
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 text-sm font-bold text-white uppercase shadow">
                {item.name?.charAt(0) || "U"}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-slate-800">
                    {item.name || "Anonymous User"}
                  </h4>
                  <span className="text-xs text-slate-400">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "recent"}
                  </span>
                </div>

                {/* Comment */}
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {item.comment}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowClientComment;
