import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { Resend } from "npm:resend";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const {
      customerEmail,
      customerName,
      orderId,
      total,
      status,
    } = await req.json();

    // Customer Email
    await resend.emails.send({
      from: "Rahim Store <onboarding@resend.dev>",
      to: customerEmail,
      subject: `Order #${orderId} Confirmed`,
      html: `
        <h2>Thank you, ${customerName}!</h2>
        <p>Your order has been placed successfully.</p>

        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> $${total}</p>
        <p><strong>Status:</strong> ${status}</p>
      `,
    });

    // Admin Email
    await resend.emails.send({
      from: "Rahim Store <onboarding@resend.dev>",
      to: "rahim@gmail.com",
      subject: "New Order Received",
      html: `
        <h2>New Order</h2>

        <p><strong>Customer:</strong> ${customerName}</p>
        <p><strong>Email:</strong> ${customerEmail}</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> $${total}</p>
      `,
    });

    return new Response(
      JSON.stringify({
        success: true,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});