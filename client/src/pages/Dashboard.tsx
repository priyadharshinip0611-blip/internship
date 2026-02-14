import { useEffect } from "react";
import { useLocation } from "wouter";
import { useUser } from "@/hooks/use-auth";
import { Navbar } from "@/components/layout/Navbar";
import { Loader2 } from "lucide-react";
import { useFarmerProducts, useAddProduct } from "@/hooks/use-farmer";
import {
  useMarketplaceProducts,
  usePlaceOrder,
  useRetailerOrders,
} from "@/hooks/use-retailer";

import AdminDashboard from "./dashboards/AdminDashboard";
import FarmerDashboard from "./dashboards/FarmerDashboard";
import RetailerDashboard from "./dashboards/RetailerDashboard";

export default function Dashboard() {
  const { data: user, isLoading } = useUser();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      setLocation("/auth");
    }
  }, [user, isLoading, setLocation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />
      <main className="container mx-auto px-4 pt-8">
        {user.role === "ADMIN" && <AdminDashboard />}
        {user.role === "FARMER" && <FarmerDashboard user={user} />}
        {user.role === "RETAILER" && <RetailerDashboard user={user} />}
      </main>
    </div>
  );
}
