import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useLogin, useRegister } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Tractor, Store, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

/* ================= AUTH PAGE ================= */

export default function AuthPage() {
  return (
    <div className="min-h-screen flex bg-background">
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between p-12 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-58197bd47d72?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <Leaf className="w-8 h-8" />
            <h1 className="text-3xl font-bold">AgriMarket</h1>
          </div>

          <h2 className="text-5xl font-bold leading-tight mb-6">
            From the soil
            <br />
            to your shelf.
          </h2>

          <p className="text-lg opacity-90 max-w-md">
            Connect directly with local farmers and verified producers. Fresh,
            sustainable, and transparent agricultural trading.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="register">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

/* ================= LOGIN ================= */

function LoginForm() {
  const [, setLocation] = useLocation();
  const { mutate: login, isPending } = useLogin();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    login(data, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setLocation("/dashboard");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: error.message,
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Enter your credentials</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Email</Label>
            <Input type="email" {...form.register("email")} required />
          </div>

          <div>
            <Label>Password</Label>
            <Input type="password" {...form.register("password")} required />
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Sign In"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

/* ================= REGISTER ================= */

function RegisterForm() {
  const [, setLocation] = useLocation();
  const { mutate: register, isPending } = useRegister();
  const { toast } = useToast();

  const registerSchema = z
    .object({
      email: z.string().email("Invalid email"),
      password: z.string().min(6, "Minimum 6 characters"),
      confirmPassword: z.string(),
      name: z.string(),
      role: z.string(),
      phone: z.string(),
      location: z.string(),
      farmName: z.string().optional(),
      shopName: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const form = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      role: "farmer",
      phone: "",
      location: "",
      farmName: "",
      shopName: "",
    },
  });

  const role = form.watch("role");

  const onSubmit = (data) => {
    const { confirmPassword, ...submitData } = data;

    register(submitData, {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        setLocation("/dashboard");
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message,
        });
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Account</CardTitle>
        <CardDescription>Join our agricultural community</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Label>I am a...</Label>

          <RadioGroup
            defaultValue="farmer"
            onValueChange={(val) => form.setValue("role", val)}
            className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="FARMER" id="farmer" />
              <Label htmlFor="farmer">Farmer</Label>
            </div>

            <div>
              <RadioGroupItem value="RETAILER" id="retailer" />
              <Label htmlFor="retailer">Retailer</Label>
            </div>
          </RadioGroup>

          <Input placeholder="Full Name" {...form.register("name")} />
          <Input placeholder="Phone" {...form.register("phone")} />
          <Input type="email" placeholder="Email" {...form.register("email")} />
          <Input placeholder="Location" {...form.register("location")} />

          {role === "farmer" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Farm Name" {...form.register("farmName")} />
            </motion.div>
          )}

          {role === "retailer" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Input placeholder="Shop Name" {...form.register("shopName")} />
            </motion.div>
          )}

          <Input
            type="password"
            placeholder="Password"
            {...form.register("password")}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            {...form.register("confirmPassword")}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
