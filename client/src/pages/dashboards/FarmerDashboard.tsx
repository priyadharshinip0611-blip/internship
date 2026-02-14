import { useEffect, useState } from "react";
import { Tractor } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const API = "http://localhost:8080";

export default function FarmerDashboard({ user }: { user: any }) {
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
  });

  /* ================= LOAD DATA ================= */

  const loadProducts = async () => {
    const res = await fetch(`${API}/api/farmer/products`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setProducts(await res.json());
    }
  };

  const loadOrders = async () => {
    const res = await fetch(`${API}/api/farmer/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setOrders(await res.json());
    }
  };

  useEffect(() => {
    loadProducts();
    loadOrders();
  }, []);

  /* ================= ADD PRODUCT ================= */

  const addProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      alert("All fields required");
      return;
    }

    setLoading(true);

    const res = await fetch(`${API}/api/farmer/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: newProduct.name,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
      }),
    });

    setLoading(false);

    if (!res.ok) {
      alert("Failed to add product");
      return;
    }

    setNewProduct({ name: "", price: "", stock: "" });

    await loadProducts();
  };

  /* ================= UPDATE STOCK ================= */

  const updateStock = async (productId: number, stock: number) => {
    const res = await fetch(`${API}/api/farmer/product/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ stock }),
    });

    if (!res.ok) {
      alert("Failed to update stock");
      return;
    }

    await loadProducts();
  };

  /* ================= UI ================= */

  return (
    <div className="grid gap-8 mt-12">
      {/* Welcome Banner */}
      <div className="bg-primary rounded-2xl p-8 text-primary-foreground shadow-xl">
        <h2 className="text-3xl font-display font-bold mb-2">
          Welcome, {user.name}
        </h2>
        <p className="opacity-90 text-lg">
          Manage your farm products and stock.
        </p>
      </div>

      {/* Add Product */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Product</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          <input
            className="border p-2 w-full rounded"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />

          <input
            className="border p-2 w-full rounded"
            type="number"
            placeholder="Price"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />

          <input
            className="border p-2 w-full rounded"
            type="number"
            placeholder="Stock"
            value={newProduct.stock}
            onChange={(e) =>
              setNewProduct({ ...newProduct, stock: e.target.value })
            }
          />

          <Button onClick={addProduct} disabled={loading}>
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </CardContent>
      </Card>

      {/* My Products */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Products</h2>

        {products.length === 0 && (
          <p className="text-muted-foreground">No products added yet</p>
        )}

        <div className="grid md:grid-cols-2 gap-4">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
              </CardHeader>

              <CardContent>
                ₹{product.price}
                <br />
                Stock: {product.stock}
                <br />
                <div className="flex gap-2 mt-3">
                  <Button
                    size="sm"
                    onClick={() => updateStock(product.id, product.stock + 10)}>
                    +10 Stock
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Orders Received */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Orders Received</h2>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>{order.product?.name}</TableCell>
                <TableCell>{order.quantity}</TableCell>
                <TableCell>{order.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
