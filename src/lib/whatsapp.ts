export const STORE_WHATSAPP_NUMBER = "224620000000"; // Guinea number, international format without "+"

export function buildWhatsAppLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encoded}`;
}

export function productWhatsAppMessage(params: {
  productName: string;
  storage?: string;
  color?: string;
  price: string;
}): string {
  const lines = [
    `Bonjour ROI Technology, je suis intéressé(e) par :`,
    `• ${params.productName}`,
    params.storage ? `• Stockage : ${params.storage}` : null,
    params.color ? `• Couleur : ${params.color}` : null,
    `• Prix : ${params.price}`,
    ``,
    `Est-il disponible ?`,
  ].filter(Boolean);
  return lines.join("\n");
}

export function orderWhatsAppMessage(params: {
  name: string;
  city: string;
  items: { name: string; qty: number; price: string }[];
  total: string;
}): string {
  const lines = [
    `Bonjour ROI Technology, je souhaite confirmer ma commande :`,
    ``,
    `Client : ${params.name}`,
    `Ville : ${params.city}`,
    ``,
    ...params.items.map((it) => `• ${it.qty}x ${it.name} — ${it.price}`),
    ``,
    `Total : ${params.total}`,
  ];
  return lines.join("\n");
}
