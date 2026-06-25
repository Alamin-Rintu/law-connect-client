const AllTransactions = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/payments`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          All Transactions
        </h2>
        <p className="text-slate-500 mt-1">
          Total Transactions: {data.length}
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Lawyer
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Amount
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {data?.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-semibold text-slate-800">
                        {payment.lawyerName}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {payment.lawyerEmail}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div>
                      <h4 className="font-medium text-slate-800">
                        {payment.clientName}
                      </h4>
                      <p className="text-sm text-slate-500">
                        {payment.clientEmail}
                      </p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span className="font-bold text-green-600">
                      ${payment.amount}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        payment.paymentStatus === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden">
          {data?.map((payment) => (
            <div
              key={payment._id}
              className="p-4 border-b border-slate-200 last:border-b-0"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {payment.lawyerName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {payment.lawyerEmail}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${
                    payment.paymentStatus === "completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {payment.paymentStatus}
                </span>
              </div>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-medium text-slate-600">
                    Client:
                  </span>{" "}
                  {payment.clientName}
                </p>

                <p>
                  <span className="font-medium text-slate-600">
                    Email:
                  </span>{" "}
                  {payment.clientEmail}
                </p>

                <p>
                  <span className="font-medium text-slate-600">
                    Amount:
                  </span>{" "}
                  <span className="font-bold text-green-600">
                    ${payment.amount}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {data?.length === 0 && (
          <div className="py-12 text-center text-slate-500">
            No transactions found
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTransactions;