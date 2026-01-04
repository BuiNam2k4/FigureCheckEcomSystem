import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const formSchema = z.object({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  password: z.string().min(1, { message: "Password is required" }),
});

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        password: "",
      },
    });
  
    async function onSubmit(values) {
      setIsLoading(true);
      // Removed setError("") to prevent UI shake/layout shift while loading
      try {
        const result = await login(values.username, values.password);
        if (result && result.success) {
            if (result.isAdmin) {
                navigate('/admin');
            } else {
                navigate('/');
            }
        }
      } catch (error) {
        console.error("Login failed", error);
        setError(error.message || "Invalid username or password");
      } finally {
        setIsLoading(false);
      }
    }

  return (
    <div className="w-full min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Image */}
      <div className="hidden lg:flex flex-col relative bg-muted text-white dark:border-r">
         <div className="absolute inset-0 bg-zinc-900"/>
         <div className="relative z-20 flex items-center text-lg font-medium p-6 md:p-10">
            <div className="h-8 w-8 bg-white rounded-lg flex items-center justify-center mr-2">
                <span className="text-zinc-900 font-bold text-xl">F</span>
            </div>
            FigureCheck
         </div>
         <div className="relative z-20 mt-auto p-6 md:p-10">
            <blockquote className="space-y-2">
                <p className="text-lg">
                "This platform saved me from buying a fake $400 figure. The AI authenticity check is mind-blowing!"
                </p>
                <footer className="text-sm">Sofia Davis</footer>
            </blockquote>
         </div>
         <div className="absolute inset-0 z-10 opacity-40">
            <img 
               src="https://images.unsplash.com/photo-1620336655052-b57986f5a26a?q=80&w=1000&auto=format&fit=crop" 
               alt="Anime Figure" 
               className="h-full w-full object-cover"
            />
         </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto w-full max-w-[350px] space-y-6 px-4">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
            <p className="text-sm text-muted-foreground">
              Enter your details to sign in
            </p>
          </div>

          {error && (
            <div className="p-3 rounded-md bg-red-500/15 text-red-500 text-sm flex items-center gap-2">
                <div role="alert" className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" x2="12" y1="8" y2="12" />
                      <line x1="12" x2="12.01" y1="16" y2="16" />
                    </svg>
                    <span>{error}</span>
                </div>
            </div>
          )}

          <Button variant="outline" className="w-full" type="button">
            {/* Google Icon SVG */}
            <svg role="img" viewBox="0 0 24 24" className="mr-2 h-4 w-4">
                <path fill="currentColor" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
            </svg>
            Sign in with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter username" {...field} />
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
                        <div className="relative">
                            <Input type={showPassword ? "text" : "password"} {...field} />
                            <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                                ) : (
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                )}
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline">
                      Forgot password?
                  </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <p className="px-8 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
