"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const DeleteClientComment = ({ comment }) => {
  const handleDeleteComment = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/client/${comment._id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0 || data.success) {
        toast.success("Comment deleted successfully");
        window.location.reload();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <AlertDialog>
      <Button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition">
        <FaTrashAlt size={14} />
      </Button>

      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />

            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>
                Delete Comment Permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This comment will be permanently deleted. This action cannot be
                undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button
                slot="close"
                variant="danger"
                onClick={handleDeleteComment}
              >
                Delete Comment
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default DeleteClientComment;