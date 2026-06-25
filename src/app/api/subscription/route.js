import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const hireId = formData.get("hireId");
    const lawyerName = formData.get("lawyerName");
    const fee = Number(formData.get("fee"));
    const pay = formData.get("pay");

    const headersList = await headers();

    const origin = headersList.get("origin") || process.env.NEXT_PUBLIC_APP_URL;

    const sessionData = await auth.api.getSession({
      headers: headersList,
    });

    const user = sessionData?.user;

    if (!user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!fee || fee <= 0) {
      return NextResponse.json(
        { error: "Invalid fee amount" },
        { status: 400 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      customer_email: user.email,

      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Lawyer Consultation - ${lawyerName}`,
            },
            unit_amount: Math.round(fee * 100),
          },
          quantity: 1,
        },
      ],

      metadata: {
        hireId: String(hireId || ""),
        lawyerName: String(lawyerName || ""),
        fee: String(fee),
        pay: String(pay || ""),
        userId: String(user.id || ""),
        email: String(user.email || ""),
        status: String(formData.get("status") || ""),
        specialization: String(formData.get("specialization") || ""),
        clientName: String(formData.get("clientName") || ""),
        clientEmail: String(formData.get("clientEmail") || ""),
        lawyerEmail: String(formData.get("lawyerEmail") || ""),
      },

      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${origin}/payment/cancel`,
    });

    return NextResponse.redirect(session.url, 303);
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

    return NextResponse.json(
      {
        error: error.message || "Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
