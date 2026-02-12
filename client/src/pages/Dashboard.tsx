import { Navbar } from "@/components/layout/Navbar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ShieldAlert, Tractor, Store, UserCheck } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background pb-12">
      <Navbar />

      <main className="container mx-auto px-4 pt-8">
        <div className="mb-8">
          <h1 className="text-4xl font-display font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Manage your agricultural activities and connections.
          </p>
        </div>

        {/* ADMIN UI */}
        <AdminDashboard />

        {/* FARMER UI */}
        <FarmerDashboard />

        {/* RETAILER UI */}
        <RetailerDashboard />
      </main>
    </div>
  );
}

/* ================= ADMIN DASHBOARD ================= */

function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-primary">
              <UserCheck className="w-5 h-5" /> Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-display">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Farmers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-display">0</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Retailers</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-display">0</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending Requests (0)</TabsTrigger>
          <TabsTrigger value="all">All Users</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Farmer Approval Requests</CardTitle>
              <CardDescription>
                Review and verify farmer credentials before approving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No pending approvals.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Business Name</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>Farmer</TableCell>
                    <TableCell>Green Valley Farms</TableCell>
                    <TableCell>
                      <Badge className="bg-green-600">Verified</Badge>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

/* ================= FARMER DASHBOARD ================= */

function FarmerDashboard() {
  return (
    <div className="grid gap-8 mt-12">
      <div className="bg-primary rounded-2xl p-8 text-primary-foreground relative overflow-hidden shadow-xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-display font-bold mb-2">
            Welcome, Farmer!
          </h2>
          <p className="opacity-90 flex items-center gap-2 text-lg">
            <Tractor className="w-5 h-5" />
            Your Farm Name
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>My Products</CardTitle>
            <CardDescription>Manage your inventory</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            No products listed yet
            <Button variant="outline" size="sm" className="mt-2">
              Add Product
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Track incoming orders</CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-muted-foreground text-center">
            No active orders
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Farm Analytics</CardTitle>
            <CardDescription>Sales and performance</CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-muted-foreground text-center">
            Data will appear here
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

/* ================= RETAILER DASHBOARD ================= */

function RetailerDashboard() {
  return (
    <div className="grid gap-8 mt-12">
      <div className="bg-secondary rounded-2xl p-8 text-secondary-foreground shadow-xl">
        <h2 className="text-3xl font-display font-bold mb-2">
          Welcome, Retailer!
        </h2>
        <p className="opacity-90 flex items-center gap-2 text-lg">
          <Store className="w-5 h-5" />
          Your Shop Name
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Marketplace</CardTitle>
            <CardDescription>Browse verified farmers</CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-muted-foreground text-center">
            Find fresh produce
            <Button variant="outline" size="sm" className="mt-2">
              Browse Market
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Orders</CardTitle>
            <CardDescription>View purchase history</CardDescription>
          </CardHeader>
          <CardContent className="py-8 text-muted-foreground text-center">
            No past orders
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
