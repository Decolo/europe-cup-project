import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_API_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const res = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");

  const dateTime = new Date(res?.created * 1000).toLocaleDateString();
  const timeString = new Date(res?.created * 1000).toLocaleDateString();

  const secret = process.env.STRIPE_API_KEY!;
    console.log('** log secret **', secret)
  if (!secret) {
    return;
  }

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      secret
    );

    console.log('** log event **', event.type, new Date().getTime())
    return NextResponse.json({
        event: event.type
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({
      error,
    }, {
        status: 500
    });
  }
}
