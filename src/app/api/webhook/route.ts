import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { stripe } from "@/src/lib/stripe";
import { db } from "@/src/lib/db";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const orderId = session?.metadata?.orderId;
  const userId = session?.metadata?.userId;

  if (event.type === "checkout.session.completed") {
    if (!userId) {
      return new NextResponse(`Webhook Error: Missing metadata`, {
        status: 400,
      });
    }
  }

  await db.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: "PAID",
    },
  });

  return new NextResponse(null, { status: 200 });
}
