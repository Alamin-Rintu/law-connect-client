import { redirect } from "next/navigation";
import { stripe } from "../../lib/stripe";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const session = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["payment_intent"],
  });

  const status = session.status;
  const metadata = session.metadata;

  const customerEmail = session.customer_details?.email || "Unknown";

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    try {
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_SERVER_URL}/payment`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...metadata,
      stripeSessionId: session.id,
      paymentIntent: session.payment_intent?.id || null,
      amount: session.amount_total
        ? session.amount_total / 100
        : 0,
    }),
    cache: "no-store",
  }
);

      const result = await response.json();

      console.log("Payment Save Result:", result);

      if (!response.ok) {
        throw new Error(result.message || "Payment save failed");
      }
    } catch (error) {
      console.error("Payment Save Error:", error);
    }

    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
          <div className="mx-auto flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful 🎉
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your payment. A confirmation email has been sent to:
          </p>

          <div className="bg-gray-100 rounded-xl p-3 mb-6">
            <p className="font-medium text-gray-800">{customerEmail}</p>
          </div>

          <div className="space-y-3">
            <a
              href="/dashboard/user"
              className="block w-full bg-black text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              Go to Dashboard
            </a>

            <a
              href="mailto:orders@example.com"
              className="block w-full border border-gray-300 py-3 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition"
            >
              Contact Support
            </a>
          </div>
        </div>
      </section>
    );
  }

  return redirect("/");
}
