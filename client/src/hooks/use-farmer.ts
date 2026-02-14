import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const API = "http://localhost:8080";

/* ================= GET FARMER PRODUCTS ================= */

export function useFarmerProducts() {
  return useQuery({
    queryKey: ["farmer-products"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/farmer/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch products");

      return res.json();
    },
  });
}

/* ================= ADD PRODUCT ================= */

export function useAddProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: any) => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/api/farmer/product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
