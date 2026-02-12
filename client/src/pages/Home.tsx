import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, CheckCircle, Leaf, ShieldCheck, Truck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground py-24 lg:py-32">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        {/* Scenic farm landscape */}

        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            <span className="text-sm font-medium">Connecting farmers & retailers directly</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-8">
            The Marketplace for <br/>
            <span className="text-green-300">Modern Agriculture</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed">
            Eliminate the middlemen. Source fresh produce directly from verified local farmers or list your harvest for thousands of retailers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 h-14 shadow-xl shadow-black/10">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-white/30 hover:bg-white/10 text-white text-lg px-8 h-14">
              View Marketplace
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">Why choose AgriMarket?</h2>
            <p className="text-muted-foreground text-lg">We've built a platform that puts transparency and quality first.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck className="w-10 h-10 text-primary" />}
              title="Verified Farmers"
              description="Every farmer on our platform is vetted and approved by our administration team to ensure quality."
            />
            <FeatureCard 
              icon={<Leaf className="w-10 h-10 text-primary" />}
              title="Fresh Produce"
              description="Shorten the supply chain. Get produce that was harvested just hours ago, not weeks."
            />
            <FeatureCard 
              icon={<Truck className="w-10 h-10 text-primary" />}
              title="Reliable Logistics"
              description="Coordinate delivery and pickup directly with producers through our secure platform."
            />
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-foreground">
                Built for the agricultural community
              </h2>
              <div className="space-y-4">
                <CheckItem text="Zero commission fees for small farmers" />
                <CheckItem text="Secure payment processing" />
                <CheckItem text="Real-time inventory management" />
                <CheckItem text="Direct communication channels" />
              </div>
              <Button className="mt-8" size="lg" variant="secondary">Learn More</Button>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=2070&auto=format&fit=crop" 
                  alt="Farmer holding fresh produce"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
              {/* Floating card */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block border border-border">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                    98%
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Satisfaction Rate</p>
                    <p className="text-xs text-muted-foreground">Based on 10k+ orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground/60 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Leaf className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-xl text-white">AgriMarket</span>
            </div>
            <div className="text-sm">
              © 2024 AgriMarket Inc. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="w-16 h-16 rounded-xl bg-primary/5 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-3 font-display text-foreground">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
        <CheckCircle className="w-4 h-4 text-green-600" />
      </div>
      <span className="text-lg text-foreground/80">{text}</span>
    </div>
  );
}
