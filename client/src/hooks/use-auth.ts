import { useMutation, useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:8080/api/auth";

/* ================= LOGIN ================= */

export function useLogin() {
  return useMutation({
    mutationFn: async (credentials) => {
      const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Login failed");
      }

      return await res.json();
    },
  });
}

/* ================= REGISTER ================= */

/* ================= GET USER ================= */

export function useUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const token = localStorage.getItem("token");

      if (!token) return null;

      const res = await fetch(`${BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return null;

      return await res.json();
    },
    retry: false,
  });
}

/* ================= LOGOUT ================= */

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem("token");
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data) => {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: data.role.toUpperCase(), // VERY IMPORTANT
        }),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Registration failed");
      }

      return await res.text();
    },
  });
}
