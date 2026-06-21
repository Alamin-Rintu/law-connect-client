"use client";

import { Button, Modal, TextArea, Textarea } from "@heroui/react";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const UpdateClientComment = ({ comment, onUpdate }) => {
  const router = useRouter();
  const [text, setText] = useState(comment.comment || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/client/${comment._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment: text }),
        },
      );

      const data = await res.json();

      if (data.modifiedCount > 0) {
        toast.success("Comment updated");

        onUpdate?.(comment._id, text);
        router.refresh();
      } else {
        toast.error("No changes were made");
      }
    } catch (error) {
      toast.error("Failed to update comment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal>
      <Button
        isIconOnly
        size="sm"
        className="bg-blue-500 text-white hover:bg-blue-600"
        aria-label="Edit comment"
      >
        <FaPen size={14} />
      </Button>

      <Modal.Backdrop className="bg-black/40 backdrop-blur-sm">
        <Modal.Container placement="center">
          <Modal.Dialog className="w-full max-w-md rounded-2xl bg-white p-0 shadow-xl">
            <Modal.CloseTrigger />

            <Modal.Header className="border-b px-6 py-4">
              <Modal.Heading className="text-lg font-semibold text-gray-900">
                Edit Comment
              </Modal.Heading>
              <p className="mt-1 text-sm text-gray-500">
                Update this client comment.
              </p>
            </Modal.Header>

            <Modal.Body className="px-6 py-5">
              <form onSubmit={handleUpdate} className="space-y-4">
                <TextArea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Write comment..."
                  className="w-full h-32"
                />

                <Button
                  type="submit"
                  disabled={loading || text.trim() === comment.comment}
                  className="w-full bg-blue-500 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Updating..." : "Update Comment"}
                </Button>
              </form>
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateClientComment;
