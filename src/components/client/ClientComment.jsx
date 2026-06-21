"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ClientComment = ({ lawyer }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();

  const isLawyer = user?.role === "lawyer";

  const handleComment = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const commentData = Object.fromEntries(formData.entries());

    const payload = {
      comment: commentData.comment,
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
      lawyerImg: lawyer?.image,
      createdAt: new Date().toISOString(),
      name: user?.name,
      userEmail:user?.email
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/client`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data) {
        toast.success("Comment added successfully!");
        e.target.reset();
        router.refresh();
      } else {
        toast.error("Failed to add comment");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="space-y-4">
      {isLawyer ? (
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-700">
          Lawyers are not allowed to post comments. You can only view reviews.
        </div>
      ) : (
        <form onSubmit={handleComment} className="space-y-4">
          <textarea
            name="comment"
            placeholder="Write your comment here..."
            className="min-h-[120px] w-full rounded-xl border border-slate-200 p-4 outline-none focus:border-blue-500"
            required
          />

          <button
            type="submit"
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default ClientComment;
