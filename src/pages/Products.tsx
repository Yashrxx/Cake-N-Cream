import { useState, useEffect, useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { products, categories, getProductsByCategory } from "@/data/products";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const productsRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilteredProducts(getProductsByCategory(selectedCategory));
  }, [selectedCategory]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        ".products-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      // Filter buttons animation
      gsap.fromTo(
        ".filter-button",
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          delay: 0.3,
        }
      );

      // Products animation
      gsap.fromTo(
        ".product-item",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, [filteredProducts]);

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headerRef} className="products-header text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Delicious Cakes
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our full collection of handcrafted cakes, each made with premium ingredients and lots of love.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`filter-button transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gradient-primary shadow-soft"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div ref={productsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              className="product-item"
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              No cakes found in this category
            </h3>
            <p className="text-muted-foreground mb-6">
              Try selecting a different category to see our available cakes.
            </p>
            <Button
              onClick={() => setSelectedCategory("All")}
              className="bg-gradient-primary"
            >
              View All Cakes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};