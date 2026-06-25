import { Chip, Table } from "@heroui/react";

const getStatusChip = (status) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return (
        <Chip color="success" size="sm" variant="flat">
          Accepted
        </Chip>
      );

    case "rejected":
      return (
        <Chip color="danger" size="sm" variant="flat">
          Rejected
        </Chip>
      );

    default:
      return (
        <Chip color="warning" size="sm" variant="flat">
          Pending
        </Chip>
      );
  }
};

const HiringHistory = async ({ userEmail }) => {
  console.log(userEmail)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/hireLawyer/client?email=${userEmail}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();
// console.log(data)

  return (
    <div className="max-w-7xl mx-auto p-2 sm:p-4">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-5">
        My Hiring History ({data.length})
      </h2>

      <div className="w-full overflow-x-auto rounded-xl border">
        <Table>
          <Table.ResizableContainer>
            <Table.Content
              aria-label="Hiring history table"
              className="min-w-[900px]"
            >
              <Table.Header>
                <Table.Column isRowHeader id="lawyer" minWidth={180}>
                  LAWYER
                </Table.Column>

                <Table.Column id="client" minWidth={180}>
                  CLIENT
                </Table.Column>

                <Table.Column id="email" minWidth={220}>
                  EMAIL
                </Table.Column>

                <Table.Column id="message" minWidth={250}>
                  MESSAGE
                </Table.Column>

                <Table.Column id="date" minWidth={140}>
                  DATE
                </Table.Column>

                <Table.Column id="status" minWidth={120}>
                  STATUS
                </Table.Column>
              </Table.Header>

              <Table.Body>
                {data?.map((item) => (
                  <Table.Row key={item._id}>
                    <Table.Cell>{item.lawyerName}</Table.Cell>

                    <Table.Cell>{item.clientName}</Table.Cell>

                    <Table.Cell className="whitespace-nowrap">
                      {item.clientEmail}
                    </Table.Cell>

                    <Table.Cell className="max-w-[250px] truncate">
                      {item.message || "N/A"}
                    </Table.Cell>

                    <Table.Cell className="whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </Table.Cell>

                    <Table.Cell>
                      {getStatusChip(item.status)}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table.ResizableContainer>
        </Table>
      </div>
    </div>
  );
};

export default HiringHistory;