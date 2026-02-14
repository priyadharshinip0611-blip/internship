import { useEffect, useState } from "react";
import { Store } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function RetailerDashboard({ user }: { user: any }) {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:8080/api/retailer/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:8080/api/retailer/orders", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [token]);

  const placeOrder = async (productId: number) => {
    if (!token) return;

    await fetch(
      `http://localhost:8080/api/retailer/order/${productId}?quantity=1`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    alert("Order placed successfully!");

    // Reload orders
    const res = await fetch("http://localhost:8080/api/retailer/orders", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const updatedOrders = await res.json();
    setOrders(updatedOrders);
  };

  return (
    <div className="grid gap-8 mt-12">
      {/* Welcome */}
      <div className="bg-secondary rounded-2xl p-8 text-secondary-foreground shadow-xl">
        <h2 className="text-3xl font-display font-bold mb-2">
          Welcome, {user.name}
        </h2>
        <p className="opacity-90 text-lg">
          Browse available products and place orders.
        </p>
      </div>

      {/* Marketplace */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Marketplace</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id}>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>₹{product.price}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-2">
                <p>Stock: {product.stock}</p>

                <Button
                  onClick={() => placeOrder(product.id)}
                  disabled={product.stock === 0}>
                  {product.stock === 0 ? "Out of Stock" : "Order"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* My Orders */}
      <div>
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-muted-foreground">No orders placed yet</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.product?.name}</TableCell>
                  <TableCell>{order.quantity}</TableCell>
                  <TableCell>₹{order.totalPrice}</TableCell>
                  <TableCell>
                    <Badge>{order.status ?? "PENDING"}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
