import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Star, Heart, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { getFeaturedProducts } from "@/data/products";
import heroImage from "@/assets/hero-bakery.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  
  const featuredProducts = getFeaturedProducts();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        ".hero-content",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      // Features animation
      gsap.fromTo(
        ".feature-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        }
      );

      // Products animation
      gsap.fromTo(
        ".product-card",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: productsRef.current,
            start: "top 70%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center bg-gradient-hero overflow-hidden"
      >
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Sweet Cakes Bakery"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>
        
        <div className="hero-content relative z-10 container mx-auto px-4 text-center max-w-4xl">
          <Heart className="h-16 w-16 text-primary mx-auto mb-6 animate-float" />
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Sweet Moments,
            <br />
            <span className="text-foreground">Sweeter Cakes</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Handcrafted with love, delivered fresh to your door. Experience the magic of our artisanal cakes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gradient-primary hover:shadow-floating transition-all duration-300">
              <Link to="/products">
                Shop Cakes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/contact">
                Custom Orders
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div ref={featuresRef} className="py-20 bg-soft-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose Sweet Cakes?</h2>
            <p className="text-xl text-muted-foreground">Creating memorable moments with every bite</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-8 bg-card rounded-2xl shadow-card hover:shadow-floating transition-all duration-300">
              <Star className="h-12 w-12 text-warm-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Premium Quality</h3>
              <p className="text-muted-foreground">Using only the finest ingredients, each cake is a masterpiece of flavor and artistry.</p>
            </div>
            
            <div className="feature-card text-center p-8 bg-card rounded-2xl shadow-card hover:shadow-floating transition-all duration-300">
              <Heart className="h-12 w-12 text-berry-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Made with Love</h3>
              <p className="text-muted-foreground">Every cake is handcrafted with passion and attention to detail by our expert bakers.</p>
            </div>
            
            <div className="feature-card text-center p-8 bg-card rounded-2xl shadow-card hover:shadow-floating transition-all duration-300">
              <Award className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-foreground">Award Winning</h3>
              <p className="text-muted-foreground">Recognized for excellence in taste and design by culinary experts worldwide.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div ref={productsRef} className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Featured Cakes</h2>
            <p className="text-xl text-muted-foreground">Our most beloved creations</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                className="product-card"
              />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/products">
                View All Cakes <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};