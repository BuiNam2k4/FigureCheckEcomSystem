import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder as createOrderService } from '../../services/tradeService';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const formSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  shippingAddress: z.string().min(10, "Please provide a valid shipping address"),
  phoneNumber: z.string().min(10, "Please provide a valid phone number"),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

const CheckoutPage = () => {
    const { cartItems, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    // Redirect if cart is empty
    if (cartItems.length === 0) {
        navigate('/cart');
    }

    const subtotal = getCartTotal();
    const shipping = 5.00;
    const total = subtotal + shipping;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() : "",
            shippingAddress: "",
            phoneNumber: "",
            paymentMethod: "COD",
        },
    });

    async function onSubmit(values) {
        if (!user?.id) {
            alert("Please login to proceed.");
            navigate('/login');
            return;
        }
        
        setIsSubmitting(true);
        try {
            const orderPayload = {
                buyerId: user.id,
                shippingAddress: values.shippingAddress,
                phoneNumber: values.phoneNumber,
                paymentMethod: values.paymentMethod,
                listingIds: cartItems.map(item => item.listing ? item.listing.id : null).filter(Boolean)
            };
            
            await createOrderService(orderPayload);
            
            clearCart();
            alert("Order placed successfully!");
            navigate('/'); // Or order confirmation page
        } catch (error) {
            console.error("Order failed", error);
            alert("Failed to place order: " + error.message);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="container max-w-4xl py-10 mx-auto">
            <div className="mb-6">
                <Button variant="ghost" asChild className="pl-0 hover:pl-0 hover:bg-transparent">
                    <Link to="/cart" className="flex items-center text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Cart
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold mt-2">Checkout</h1>
            </div>

            <div className="grid md:grid-cols-12 gap-8">
                {/* Checkout Form */}
                <div className="md:col-span-7 lg:col-span-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Shipping & Payment</CardTitle>
                            <CardDescription>Enter your details to complete your order.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                                        name="shippingAddress"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Shipping Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="123 Anime St, Akihabara" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <FormField
                                            control={form.control}
                                            name="phoneNumber"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Phone Number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="+84 90 123 4567" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        
                                        <FormField
                                            control={form.control}
                                            name="paymentMethod"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Payment Method</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select payment method" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="COD">Cash on Delivery (COD)</SelectItem>
                                                            <SelectItem value="BANK_TRANSFER">Bank Transfer (QR)</SelectItem>
                                                            <SelectItem value="MOMO">MoMo E-Wallet</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    
                                    <Button type="submit" size="lg" className="w-full mt-4" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Processing...
                                            </>
                                        ) : `Place Order - $${total.toFixed(2)}`}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary Side */}
                <div className="md:col-span-5 lg:col-span-4">
                    <Card className="bg-muted/40 sticky top-24">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="flex justify-between text-sm">
                                        <span className="line-clamp-1">{item.listing?.condition} Figure x 1</span>
                                        <span>${item.listing?.price?.toFixed(2)}</span>
                                    </div>
                                ))}
                            </div>
                            
                            <Separator />
                            
                            <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                            </div>
                            
                            <Separator />
                            
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
