"use client";

import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FaTrashAlt } from "react-icons/fa";

export function DeleteLawyer({ service }) {
  const handleDeleteLawyer = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/lawyer/${service._id}`,
      {
        method: "DELETE",
      },
    );
    const data = await res.json();
    if (data.deletedCount > 0) {
      toast.success("Service deleted successfully");
      window.location.reload();

      // remove from state (best way)
      onDelete(service._id);
    } else {
      toast.error("Delete failed");
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
                Delete service permanently?
              </AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>{service.name}</strong> and
                all of its data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button
                onClick={handleDeleteLawyer}
                slot="close"
                variant="danger"
              >
                Delete Service
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}
