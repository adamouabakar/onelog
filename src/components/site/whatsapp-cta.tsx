import { MessageCircle } from "lucide-react";

type WhatsAppCtaProps = {
  number: string;
  label: string;
};

export function WhatsAppCta({ number, label }: WhatsAppCtaProps) {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;

  return (
    <a
      href={`https://wa.me/${digits}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(1.25rem,env(safe-area-inset-right))] z-50 grid size-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
    >
      <MessageCircle className="size-6" aria-hidden />
    </a>
  );
}