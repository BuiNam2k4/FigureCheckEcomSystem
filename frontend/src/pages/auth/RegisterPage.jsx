import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Link, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().default(false).refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

const RegisterPage = () => {
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        terms: false,
      },
    });
  
    async function onSubmit(values) {
      setIsLoading(true);
      try {
        await registerUser(values);
        navigate('/login');
      } catch (error) {
        console.error("Registration failed", error);
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      {/* Right Side - Image (flipped for register page variety, or keep consistent) */}
      <div className="hidden lg:flex flex-col relative bg-muted text-white dark:border-r order-last">
         <div className="absolute inset-0 bg-indigo-950"/>
         <div className="relative z-20 flex items-center text-lg font-medium p-6 md:p-10">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center mr-2">
                <span className="text-zinc-900 font-bold text-xl">F</span>
            </div>
            FigureCheck
         </div>
         <div className="relative z-20 mt-auto p-6 md:p-10">
            <blockquote className="space-y-2">
                <p className="text-lg">
                "Join the community of 50,000+ collectors verifying their figures daily."
                </p>
            </blockquote>
         </div>
         <div className="absolute inset-0 z-10 opacity-40">
            <img 
               src="https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1000&auto=format&fit=crop" 
               alt="Anime Collection" 
               className="h-full w-full object-cover"
            />
         </div>
      </div>

      {/* Left Side - Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-full max-w-[350px] space-y-6 px-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">
              Enter your information to get started
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="name@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="terms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I agree to the <Link to="/terms" className="underline hover:text-primary">Terms</Link> & <Link to="/privacy" className="underline hover:text-primary">Privacy Policy</Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
              </Button>
            </form>
          </Form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
