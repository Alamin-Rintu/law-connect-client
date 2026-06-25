"use client";

import { Table, Button } from "@heroui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";

const LawyerHireRequests = ({ data = [], refetch }) => {
  const handleStatusUpdate = async (id, status) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/hireLawyer/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        }
      );

      const result = await res.json();

      if (result.modifiedCount > 0) {
        toast.success(`Request ${status}`);
        refetch?.();
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        Hire Requests ({data.length})
      </h2>

      <div className="overflow-x-auto border rounded-xl">
        <Table>
          <Table.Content className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>
                Client Name
              </Table.Column>

              <Table.Column>
                Request Date
              </Table.Column>

              <Table.Column>
                Status
              </Table.Column>

              <Table.Column>
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>
                    {item.clientName}
                  </Table.Cell>

                  <Table.Cell>
                    {new Date(
                      item.createdAt
                    ).toLocaleDateString()}
                  </Table.Cell>

                  <Table.Cell>
                    {item.status || "pending"}
                  </Table.Cell>

                  <Table.Cell className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      startContent={<FaCheck />}
                      isDisabled={
                        item.status === "accepted"
                      }
                      onPress={() =>
                        handleStatusUpdate(
                          item._id,
                          "accepted"
                        )
                      }
                    >
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      className="bg-red-500 text-white"
                      startContent={<FaTimes />}
                      isDisabled={
                        item.status === "rejected"
                      }
                      onPress={() =>
                        handleStatusUpdate(
                          item._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table>
      </div>
    </div>
  );
};

export default LawyerHireRequests;