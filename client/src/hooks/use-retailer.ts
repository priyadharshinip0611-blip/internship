import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:8080";

/* ================= MARKETPLACE ================= */

export function useMarketplaceProducts() {
  return useQuery({
    queryKey: ["marketplace-products"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/retailer/products`);
      if (!res.ok) throw new Error("Failed to fetch marketplace");
      return res.json();
    },
  });
}

/* ================= PLACE ORDER ================= */

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: any) => {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `${API}/api/retailer/order/${productId}?quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!res.ok) throw new Error("Order failed");

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-orders"] });
      queryClient.invalidateQueries({ queryKey: ["marketplace-products"] });
    },
  });
}

/* ================= MY ORDERS ================= */

export function useRetailerOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/retailer/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      return res.json();
    },
  });
}
