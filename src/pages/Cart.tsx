import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import gsap from "gsap";

export const Cart = () => {
  const { items, updateQuantity, removeItem, total, clearCart } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cart-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".cart-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".cart-summary",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power2.out" }
      );
    });

    return () => ctx.revert();
  }, [items.length]);

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8">
        <div className="text-center max-w-md mx-auto px-4">
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6 animate-float" />
          <h2 className="text-3xl font-bold text-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any delicious cakes to your cart yet.
          </p>
          <Button asChild className="bg-gradient-primary">
            <Link to="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={cartRef} className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="cart-header mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Clear Cart
            </Button>
          </div>
          <p className="text-muted-foreground">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.id} className="cart-item bg-gradient-card hover:shadow-card transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg shadow-soft"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-1">
                        {item.name}
                      </h3>
                      <p className="text-primary font-bold text-xl">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      
                      <span className="font-semibold text-lg min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-accent"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive mt-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="cart-summary bg-gradient-card shadow-card sticky top-8">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-semibold">${total.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-lg">
                  <span className="text-muted-foreground">Delivery:</span>
                  <span className="font-semibold text-primary">Free</span>
                </div>
                
                <hr className="border-border" />
                
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${total.toFixed(2)}</span>
                </div>

                <Button className="w-full bg-gradient-primary hover:shadow-floating transition-all duration-300 text-lg py-6">
                  Proceed to Checkout
                </Button>

                <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Link to="/products">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Continue Shopping
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};