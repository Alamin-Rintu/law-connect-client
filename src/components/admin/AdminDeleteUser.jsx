"use client";

import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

const AdminDeleteUser = ({ user, onDelete }) => {
  const router = useRouter();
  const handleDeleteUser = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${user._id}`,
        {
          method: "DELETE",
        },
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("User deleted successfully");
        router.refresh();

        // best practice: update UI state instead of reload
        if (onDelete) {
          onDelete(user._id);
        }
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
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
                Delete user permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>

            <AlertDialog.Body>
              <p>
                This will permanently delete{" "}
                <strong>{user?.name || "this user"}</strong> and all of their
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>

            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>

              <Button onClick={handleDeleteUser} slot="close" variant="danger">
                Delete User
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
};

export default AdminDeleteUser;
