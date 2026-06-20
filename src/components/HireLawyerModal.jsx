"use client";

import React, { useState } from "react";
import { Button, Modal } from "@heroui/react";
import toast from "react-hot-toast";

export default function HireLawyerModal({ lawyer }) {
  const [isHiring, setIsHiring] = useState(false);

  // MOCK AUTH STATE: Replace with your actual auth logic (e.g., useSession)
  const isAuthenticated = true;

  const handleHireRequest = async () => {
    setIsHiring(true);
    try {
      // Simulate API call to backend
      // await fetch('/api/hire', { method: 'POST', body: JSON.stringify({ lawyerId: lawyer._id }) });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success(`Hiring request sent to ${lawyer.name}!`);
    } catch (error) {
      toast.error("Failed to send request.");
    } finally {
      setIsHiring(false);
    }
  };

  return (
    <Modal>
      <Button
        className="bg-[#E6A337] hover:bg-[#c98d2e] text-white px-8 py-2.5 rounded-lg font-medium transition-colors w-full sm:w-auto"
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
                <Modal.Heading className="text-xl text-[#08152C]">
                  Confirm Hiring Request
                </Modal.Heading>
              </Modal.Header>

              <Modal.Body className="p-6">
                <p className="text-gray-600">
                  You are about to send a hiring request to{" "}
                  <strong>{lawyer.name}</strong>. Their consultation fee is{" "}
                  <strong>${lawyer.fee} / session</strong>.
                </p>
                <p className="text-gray-600 mt-4 text-sm">
                  They will review your request and get back to you shortly. Do
                  you wish to proceed?
                </p>
              </Modal.Body>

              <Modal.Footer className="flex justify-end gap-3 p-4 border-t">
                <Button slot="close" variant="secondary" disabled={isHiring}>
                  Cancel
                </Button>
                <Button
                  onClick={handleHireRequest}
                  className="bg-[#E6A337] text-white"
                  disabled={isHiring || lawyer.status !== "Available"}
                >
                  {isHiring ? "Sending..." : "Confirm & Send"}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      )}
    </Modal>
  );
}
