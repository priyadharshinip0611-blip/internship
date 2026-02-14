import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, LogOut } from "lucide-react";

export function Navbar() {
  const [, setLocation] = useLocation();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLocation("/auth");
  };

  return (
    <nav className="border-b border-border bg-white/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
            <Leaf className="w-6 h-6 text-primary" />
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block text-primary">
            AgriMarket
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {token ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-destructive">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          ) : (
            <Link href="/auth">
              <Button>Login / Register</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
