import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:8080";

function getToken() {
  return localStorage.getItem("token");
}

/* ================= FARMER ================= */

export function useFarmerProducts() {
  return useQuery({
    queryKey: ["farmer-products"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/farmer/products`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch farmer products");
      return res.json();
    },
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: {
      name: string;
      price: number;
      stock: number;
    }) => {
      const res = await fetch(`${API}/api/farmer/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(product),
      });

      if (!res.ok) throw new Error("Failed to add product");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer-products"] });
    },
  });
}

/* ================= RETAILER ================= */

export function useBrowseProducts() {
  return useQuery({
    queryKey: ["market-products"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/retailer/products`);

      if (!res.ok) throw new Error("Failed to fetch products");
      return res.json();
    },
  });
}

export function usePlaceOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: number;
      quantity: number;
    }) => {
      const res = await fetch(
        `${API}/api/retailer/order/${productId}?quantity=${quantity}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        },
      );

      if (!res.ok) throw new Error("Order failed");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["retailer-orders"] });
    },
  });
}

export function useRetailerOrders() {
  return useQuery({
    queryKey: ["retailer-orders"],
    queryFn: async () => {
      const res = await fetch(`${API}/api/retailer/orders`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");
      return res.json();
    },
  });
}
