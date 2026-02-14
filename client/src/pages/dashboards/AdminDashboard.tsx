import { useEffect } from "react";
import { useLocation } from "wouter";
import { useUser } from "@/hooks/use-auth";
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
import { Loader2, ShieldAlert, Tractor, Store, UserCheck } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {" "}
      <div className="grid gap-6 md:grid-cols-3">
        {" "}
        <Card className="bg-primary/5 border-primary/20">
          {" "}
          <CardHeader>
            {" "}
            <CardTitle className="flex items-center gap-2 text-primary">
              {" "}
              <UserCheck className="w-5 h-5" /> Pending Approvals{" "}
            </CardTitle>{" "}
          </CardHeader>{" "}
          <CardContent>
            {" "}
            <p className="text-4xl font-bold font-display">0</p>{" "}
          </CardContent>{" "}
        </Card>{" "}
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle>Total Farmers</CardTitle>{" "}
          </CardHeader>{" "}
          <CardContent>
            {" "}
            <p className="text-4xl font-bold font-display">0</p>{" "}
          </CardContent>{" "}
        </Card>{" "}
        <Card>
          {" "}
          <CardHeader>
            {" "}
            <CardTitle>Total Retailers</CardTitle>{" "}
          </CardHeader>{" "}
          <CardContent>
            {" "}
            <p className="text-4xl font-bold font-display">0</p>{" "}
          </CardContent>{" "}
        </Card>{" "}
      </div>{" "}
      <Tabs defaultValue="pending" className="w-full">
        {" "}
        <TabsList className="mb-4">
          {" "}
          <TabsTrigger value="pending">Pending Requests (0)</TabsTrigger>{" "}
          <TabsTrigger value="all">All Users</TabsTrigger>{" "}
        </TabsList>{" "}
        <TabsContent value="pending">
          {" "}
          <Card>
            {" "}
            <CardHeader>
              {" "}
              <CardTitle>Farmer Approval Requests</CardTitle>{" "}
              <CardDescription>
                {" "}
                Review and verify farmer credentials before approving.{" "}
              </CardDescription>{" "}
            </CardHeader>{" "}
            <CardContent>
              {" "}
              <div className="text-center py-8 text-muted-foreground">
                {" "}
                No pending approvals.{" "}
              </div>{" "}
            </CardContent>{" "}
          </Card>{" "}
        </TabsContent>{" "}
        <TabsContent value="all">
          {" "}
          <Card>
            {" "}
            <CardHeader>
              {" "}
              <CardTitle>User Directory</CardTitle>{" "}
            </CardHeader>{" "}
            <CardContent>
              {" "}
              <Table>
                {" "}
                <TableHeader>
                  {" "}
                  <TableRow>
                    {" "}
                    <TableHead>Name</TableHead> <TableHead>Role</TableHead>{" "}
                    <TableHead>Business Name</TableHead>{" "}
                    <TableHead>Status</TableHead>{" "}
                  </TableRow>{" "}
                </TableHeader>{" "}
                <TableBody>
                  {" "}
                  <TableRow>
                    {" "}
                    <TableCell>John Doe</TableCell>{" "}
                    <TableCell>Farmer</TableCell>{" "}
                    <TableCell>Green Valley Farms</TableCell>{" "}
                    <TableCell>
                      {" "}
                      <Badge className="bg-green-600">Verified</Badge>{" "}
                    </TableCell>{" "}
                  </TableRow>{" "}
                </TableBody>{" "}
              </Table>{" "}
            </CardContent>{" "}
          </Card>{" "}
        </TabsContent>{" "}
      </Tabs>{" "}
    </div>
  );
}
