import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Product } from "@/data/products";
import { useCart } from "@/hooks/useCart";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className = "" }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <Card className={`group hover:shadow-floating transition-all duration-300 hover:-translate-y-2 bg-gradient-card border-border/50 ${className}`}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-warm-gold text-warm-gold" />
            <span className="text-sm font-medium text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        
        <CardDescription className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </CardDescription>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <span className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground">
            {product.category}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-gradient-primary hover:shadow-soft transition-all duration-300 hover:scale-105"
          size="sm"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};