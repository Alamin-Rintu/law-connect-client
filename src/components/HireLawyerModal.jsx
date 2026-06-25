"use client";

import { useState } from "react";
import { Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function HireLawyerModal({ lawyer }) {
  // console.log("lawyer details", lawyer)
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const isAuthenticated = !!user;
  const [isHiring, setIsHiring] = useState(false);
  const [alreadyRequested, setAlreadyRequested] = useState(false);

  const handleHireRequest = async () => {
    try {
      setIsHiring(true);

      const hireRequest = {
        lawyerId: lawyer._id,
        lawyerName: lawyer.name,
        lawyerEmail: lawyer.email,
        fee:lawyer.fee,

        clientName: user?.name,
        clientEmail: user?.email,

        message: "Hire request",

        status: "pending",
        pay:"pay unavailable",
        createdAt: new Date(),
      };
      console.log("hireRequest", hireRequest)

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hireLawyer`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(hireRequest),
        }
      );

      const data = await res.json();

      if (res.status === 400) {
        toast.error(data.message);
        setAlreadyRequested(true);
        return;
      }

      if (data.insertedId) {
        toast.success("Request sent successfully!");
        setAlreadyRequested(true);
      } else {
        toast.error("Failed to send request!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <Modal>
      <Button
        className="bg-[#E6A337] hover:bg-[#c98d2e] text-white px-8 py-2.5 rounded-lg"
        onPress={() => {
          if (!isAuthenticated) {
            toast.error("Please log in to hire a lawyer.");
          }
        }}
      >
        Hire Lawyer
      </Button>

      {isAuthenticated && (
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-md">
              <Modal.CloseTrigger />

              <Modal.Header>
                <Modal.Heading>
                  Confirm Hiring Request
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                <p className="text-gray-600">
                  Send request to <strong>{lawyer.name}</strong>?
                </p>
              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-3 p-4 border-t">
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>

                <Button
                  onClick={handleHireRequest}
                  className="bg-[#E6A337] text-white"
                  disabled={isHiring || alreadyRequested}
                >
                  {alreadyRequested
                    ? "Already Requested"
                    : isHiring
                    ? "Sending..."
                    : "Confirm & Send"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}
    </Modal>
  );
}