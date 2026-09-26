import { db } from "@/db";
import { orders } from "@/db/schema";

export const dynamic = "force-dynamic";

interface OrderPayload {
  fullName: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city: string;
  address: string;
  notes?: string;
  paymentMethod: string;
  items: { name: string; storage?: string; color?: string; qty: number; price: number }[];
  total: number;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<OrderPayload>;

    if (!body.fullName || !body.phone || !body.city || !body.address || !body.paymentMethod || !body.items?.length) {
      return Response.json({ ok: false, error: "Champs obligatoires manquants." }, { status: 400 });
    }

    const [order] = await db
      .insert(orders)
      .values({
        fullName: body.fullName,
        phone: body.phone,
        whatsapp: body.whatsapp ?? null,
        email: body.email ?? null,
        city: body.city,
        address: body.address,
        notes: body.notes ?? null,
        paymentMethod: body.paymentMethod,
        items: body.items,
        total: Math.round(body.total ?? 0),
      })
      .returning();

    return Response.json({ ok: true, orderId: order.id });
  } catch (error) {
    console.error("Failed to create order", error);
    return Response.json({ ok: false, error: "Impossible d'enregistrer la commande." }, { status: 500 });
  }
}
