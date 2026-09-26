"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatGNF } from "@/lib/currency";
import { buildWhatsAppLink, orderWhatsAppMessage } from "@/lib/whatsapp";

const PAYMENT_METHODS = [
  "Paiement à la livraison",
  "Orange Money",
  "Mobile Money (MTN / Moov)",
  "Virement bancaire",
];

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    address: "",
    notes: "",
    paymentMethod: PAYMENT_METHODS[0],
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const whatsappHref = useMemo(
    () =>
      buildWhatsAppLink(
        orderWhatsAppMessage({
          name: form.fullName || "Client",
          city: form.city || "Conakry",
          items: items.map((i) => ({ name: i.name, qty: i.qty, price: formatGNF(i.price * i.qty) })),
          total: formatGNF(subtotal),
        }),
      ),
    [form.fullName, form.city, items, subtotal],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          items: items.map((i) => ({ name: i.name, storage: i.storage, color: i.color, qty: i.qty, price: i.price })),
          total: subtotal,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      clearCart();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
        <CheckCircle2 className="h-14 w-14 text-blue-600" />
        <h1 className="mt-5 text-2xl font-semibold text-neutral-950">Commande enregistrée</h1>
        <p className="mt-2 text-sm leading-relaxed text-neutral-500">
          Merci ! Notre équipe ROI Technology vous contactera très vite pour confirmer les détails de livraison.
          Vous pouvez aussi nous écrire directement sur WhatsApp pour accélérer le traitement.
        </p>
        <div className="mt-7 flex flex-col gap-2.5 sm:flex-row">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <MessageCircle className="h-4 w-4" />
            Contacter via WhatsApp
          </a>
          <Link
            href="/"
            className="flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold text-neutral-900 hover:border-neutral-400"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-2xl font-semibold text-neutral-950 sm:text-3xl">Commander</h1>
      <p className="mt-2 max-w-xl text-sm text-neutral-500">
        Renseignez vos informations. Contactez ROI Technology pour confirmer votre commande.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Nom complet" required value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
            <Field label="Téléphone" required value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
            <Field label="Numéro WhatsApp" value={form.whatsapp} onChange={(v) => setForm({ ...form, whatsapp: v })} />
            <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
            <Field label="Ville" required value={form.city} onChange={(v) => setForm({ ...form, city: v })} />
            <Field label="Adresse" required value={form.address} onChange={(v) => setForm({ ...form, address: v })} />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-900">Notes de commande</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
              placeholder="Précisions supplémentaires sur votre commande…"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-neutral-900">Mode de paiement</label>
            <select
              value={form.paymentMethod}
              onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
              className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
            >
              {PAYMENT_METHODS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <p className="mt-2 text-xs text-neutral-400">Contactez ROI Technology pour confirmer votre commande.</p>
          </div>

          <div className="mt-2 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="submit"
              disabled={items.length === 0 || status === "submitting"}
              className="flex flex-1 items-center justify-center rounded-full bg-neutral-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {status === "submitting" ? "Envoi en cours…" : "Passer la commande"}
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter via WhatsApp
            </a>
          </div>
          {status === "error" && (
            <p className="text-sm text-red-500">Une erreur est survenue. Merci de réessayer ou de nous contacter via WhatsApp.</p>
          )}
        </form>

        <aside className="h-fit rounded-2xl border border-neutral-200 p-5">
          <h2 className="mb-4 text-sm font-semibold text-neutral-900">Résumé de la commande</h2>
          {items.length === 0 ? (
            <p className="text-sm text-neutral-400">Votre panier est vide.</p>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-neutral-50">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-neutral-900">{item.name}</p>
                    <p className="text-xs text-neutral-400">
                      {[item.storage, item.color].filter(Boolean).join(" · ")} · x{item.qty}
                    </p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-neutral-900">{formatGNF(item.price * item.qty)}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
            <span className="text-sm text-neutral-500">Total</span>
            <span className="text-lg font-semibold text-neutral-950">{formatGNF(subtotal)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-900">
        {label} {required && <span className="text-blue-600">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-neutral-200 px-3.5 py-2.5 text-sm outline-none focus:border-blue-500"
      />
    </div>
  );
}
