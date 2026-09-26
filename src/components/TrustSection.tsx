import { BadgeCheck, MessageCircle, ShieldCheck, Truck } from "lucide-react";

const ITEMS = [
  {
    icon: Truck,
    title: "Livraison à Conakry",
    text: "Recevez vos commandes rapidement, partout dans la ville.",
  },
  {
    icon: MessageCircle,
    title: "Support WhatsApp",
    text: "Une équipe disponible pour répondre à vos questions.",
  },
  {
    icon: ShieldCheck,
    title: "Commande sécurisée",
    text: "Vos informations personnelles restent protégées.",
  },
  {
    icon: BadgeCheck,
    title: "Produits vérifiés",
    text: "Des produits soigneusement sélectionnés et contrôlés.",
  },
];

export default function TrustSection() {
  return (
    <section className="border-y border-neutral-100 bg-white py-12 sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {ITEMS.map((item) => (
          <div key={item.title} className="flex flex-col items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-[0.92rem] font-semibold text-neutral-900">{item.title}</h3>
            <p className="text-[0.82rem] leading-relaxed text-neutral-500">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
