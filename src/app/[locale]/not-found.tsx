import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center text-center">
      <p className="font-display text-7xl font-extrabold text-gradient">404</p>
      <p className="mt-4 text-muted-foreground">
        Page introuvable · Page not found
      </p>
      <Button asChild className="mt-8">
        <Link href="/">[One]Log</Link>
      </Button>
    </div>
  );
}
