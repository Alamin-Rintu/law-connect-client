"use client";

import { Table, Chip, Button } from "@heroui/react";
import { FaCheck, FaTimes } from "react-icons/fa";


const LawyerHireRequests = ({  data = [] }) => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        Hire Requests ({data.length})
      </h2>

      <div className="overflow-x-auto border rounded-xl">
        <Table>
          <Table.Content className="min-w-[700px]">
            <Table.Header>
              <Table.Column isRowHeader>Client Name</Table.Column>
              <Table.Column>Request Date</Table.Column>
              <Table.Column>Actions</Table.Column>
            </Table.Header>

            <Table.Body>
              {data.map((item) => (
                <Table.Row key={item._id}>
                  <Table.Cell>{item.clientName}</Table.Cell>


                  <Table.Cell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </Table.Cell>

       

                  <Table.Cell className="flex gap-2">
                    <Button
                      size="sm"
                      color="success"
                      startContent={<FaCheck />}
                      onPress={() => console.log("accept", item._id)}
                    >
                      Accept
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      startContent={<FaTimes />}
                      onPress={() => console.log("reject", item._id)}
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