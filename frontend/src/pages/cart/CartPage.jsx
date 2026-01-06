import React from 'react';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/cart/CartItem';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';
import { ArrowLeft, ShoppingBag } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, getCartTotal } = useCart();
  const subtotal = getCartTotal();
  const shipping = cartItems.length > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className="container py-20 text-center">
        <div className="mb-6 flex justify-center">
            <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center">
                <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
        </div>
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground mb-8">
          Looks like you haven't added any figures to your cart yet.
        </p>
        <Button asChild>
          <Link to="/">
            Start Shopping
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-8">
            <div className="space-y-1">
                {cartItems.map((item) => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        onRemove={removeFromCart} 
                    />
                ))}
            </div>
            
            <div className="mt-8">
                <Button variant="ghost" asChild className="pl-0 hover:pl-0 hover:bg-transparent">
                    <Link to="/" className="flex items-center text-muted-foreground hover:text-foreground">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Continue Shopping
                    </Link>
                </Button>
            </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-4">
            <div className="bg-muted/40 rounded-lg p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Shipping Estimate</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    
                    <Button className="w-full text-base py-6 mt-4" asChild>
                        <Link to="/checkout">
                            Proceed to Checkout
                        </Link>
                    </Button>
                    
                    <div className="text-xs text-center text-muted-foreground mt-4">
                        <p>Secure Checkout powered by Stripe</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
