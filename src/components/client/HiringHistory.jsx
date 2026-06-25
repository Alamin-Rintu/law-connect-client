import { Chip, Button } from "@heroui/react";

const getStatusChip = (status) => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return (
        <Chip color="success" variant="flat">
          Accepted
        </Chip>
      );

    case "rejected":
      return (
        <Chip color="danger" variant="flat">
          Rejected
        </Chip>
      );

    default:
      return (
        <Chip color="warning" variant="flat">
          Pending
        </Chip>
      );
  }
};

const HiringHistory = async ({ userEmail }) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/hireLawyer/client?email=${userEmail}`,
    {
      cache: "no-store",
    },
  );

  const data = await res.json();
  console.log("my dataaaaaaaaa", data);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">
        My Hiring History
        <span className="text-primary ml-2">({data?.length || 0})</span>
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-2xl border shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="text-left p-4">Lawyer</th>
              <th className="text-left p-4">Fee</th>
              <th className="text-left p-4">Message</th>
              <th className="text-left p-4">Date</th>
              <th className="text-left p-4">Status</th>
              <th className="text-left p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4 font-medium">{item.lawyerName}</td>

                <td className="p-4">${item.fee}</td>

                <td className="p-4 max-w-xs truncate">
                  {item.message || "N/A"}
                </td>

                <td className="p-4">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>

                <td className="p-4">{getStatusChip(item.status)}</td>

                <td className="p-4">
                  {item.status?.toLowerCase() === "accepted" &&
                  item.pay === "paynow" ? (
                    <form action="/api/subscription" method="POST">
                      <input type="hidden" name="hireId" value={item._id} />

                      <input type="hidden" name="status" value={item.status} />

                      <input
                        type="hidden"
                        name="specialization"
                        value={item.specialization || ""}
                      />

                      <input
                        type="hidden"
                        name="lawyerName"
                        value={item.lawyerName}
                      />

                      <input type="hidden" name="fee" value={item.fee} />

                      <input
                        type="hidden"
                        name="clientName"
                        value={item.clientName}
                      />

                      <input
                        type="hidden"
                        name="clientEmail"
                        value={item.clientEmail}
                      />

                      <input
                        type="hidden"
                        name="lawyerEmail"
                        value={item.lawyerEmail}
                      />

                      <input type="hidden" name="pay" value={item.pay} />

                      <Button type="submit" size="sm" color="success">
                        Pay Now
                      </Button>
                    </form>
                  ) : (
                    <Button
                      size="sm"
                      isDisabled
                      color={item.pay === "paid" ? "success" : "default"}
                    >
                      {item.pay === "paid" ? "Paid" : "Pay Unavailable"}
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data?.map((item) => (
          <div
            key={item._id}
            className="bg-white border rounded-2xl p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-lg">{item.lawyerName}</h3>

              {getStatusChip(item.status)}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Client:</span> {item.clientName}
              </p>

              <p>
                <span className="font-medium">Email:</span> {item.clientEmail}
              </p>

              <p>
                <span className="font-medium">Fee:</span> ${item.fee}
              </p>

              <p>
                <span className="font-medium">Message:</span>{" "}
                {item.message || "N/A"}
              </p>

              <p>
                <span className="font-medium">Date:</span>{" "}
                {new Date(item.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="mt-4">
              {item.status?.toLowerCase() === "accepted" &&
              item.pay === "paynow" ? (
                <form action="/api/subscription" method="POST">
                  <input type="hidden" name="hireId" value={item._id} />

                  <input type="hidden" name="status" value={item.status} />

                  <input
                    type="hidden"
                    name="specialization"
                    value={item.specialization || ""}
                  />

                  <input
                    type="hidden"
                    name="lawyerName"
                    value={item.lawyerName}
                  />

                  <input type="hidden" name="fee" value={item.fee} />

                  <input
                    type="hidden"
                    name="clientName"
                    value={item.clientName}
                  />

                  <input
                    type="hidden"
                    name="clientEmail"
                    value={item.clientEmail}
                  />

                  <input
                    type="hidden"
                    name="lawyerEmail"
                    value={item.lawyerEmail}
                  />

                  <input type="hidden" name="pay" value={item.pay} />

                  <Button type="submit" color="success" className="w-full">
                    Pay Now
                  </Button>
                </form>
              ) : (
                <Button
                  isDisabled
                  className="w-full"
                  color={item.pay === "paid" ? "success" : "default"}
                >
                  {item.pay === "paid" ? "Paid" : "Pay Unavailable"}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HiringHistory;
