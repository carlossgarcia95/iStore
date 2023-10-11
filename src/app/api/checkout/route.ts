import { getAuthSession } from "@/src/lib/auth";
import { db } from "@/src/lib/db";
import { stripe } from "@/src/lib/stripe";
import { CartProductType } from "@prisma/client";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: Request) {
  const body: { cartProducts: CartProductType[] } = await req.json();
  const { cartProducts } = body;

  const calculatedOrderAmount = (items: CartProductType[]) => {
    const totalPrice = items.reduce((acc, item) => {
      const itemTotal = item.price * item.quantity;
      return acc + itemTotal;
    }, 0);

    return totalPrice;
  };

  const total = calculatedOrderAmount(cartProducts) * 100;

  const userSession = await getAuthSession();
  if (!userSession) return new NextResponse("Not logged in", { status: 401 });

  try {
    // Create new order in database
    const order = await db.order.create({
      data: {
        user: { connect: { id: userSession.user.id } },
        amount: total,
        currency: "USD",
        status: "UNPAID",
        products: cartProducts,
        address: {
          city: "San Diego",
          country: "USA",
          line1: "2093 Myrtle Ave",
          postal_code: "20930",
          state: "CA",
        },
      },
    });

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      cartProducts.map((item) => {
        return {
          quantity: 1,
          price_data: {
            currency: "USD",
            product_data: {
              name: item.name,
              description: item.description!,
            },
            unit_amount: Math.round(item.price! * 100),
          },
        };
      });

    const checkoutSession = await stripe.checkout.sessions.create({
      line_items: line_items,
      metadata: {
        userId: userSession.user.id,
      },
      mode: "payment",
      success_url: `http://localhost:3000/orders/success=true`,
      cancel_url: `http://localhost:3000/orders/canceled=true`,
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.log("[checkout]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
