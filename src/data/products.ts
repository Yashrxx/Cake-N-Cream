import strawberryCake from "@/assets/strawberry-cake.jpg";
import chocolateCake from "@/assets/chocolate-cake.jpg";
import weddingCake from "@/assets/wedding-cake.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  featured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Strawberry Dream Cake",
    description: "Delicate vanilla sponge layered with fresh strawberries and whipped cream, topped with beautiful pink frosting",
    price: 45.99,
    image: strawberryCake,
    rating: 4.9,
    category: "Fruit Cakes",
    featured: true,
  },
  {
    id: "2", 
    name: "Chocolate Indulgence",
    description: "Rich chocolate cake with decadent ganache frosting and chocolate curls, perfect for chocolate lovers",
    price: 52.99,
    image: chocolateCake,
    rating: 4.8,
    category: "Chocolate Cakes",
    featured: true,
  },
  {
    id: "3",
    name: "Elegant Wedding Cake",
    description: "Three-tier vanilla wedding cake with buttercream roses and pearl decorations, customizable for your special day",
    price: 199.99,
    image: weddingCake,
    rating: 5.0,
    category: "Wedding Cakes",
    featured: true,
  },
  {
    id: "4",
    name: "Red Velvet Supreme",
    description: "Classic red velvet cake with cream cheese frosting and delicate white chocolate shavings",
    price: 48.99,
    image: strawberryCake, // Placeholder - can generate more images later
    rating: 4.7,
    category: "Classic Cakes",
  },
  {
    id: "5",
    name: "Lemon Bliss",
    description: "Light and airy lemon cake with tangy lemon curd filling and smooth buttercream frosting",
    price: 42.99,
    image: chocolateCake, // Placeholder
    rating: 4.6,
    category: "Fruit Cakes",
  },
  {
    id: "6",
    name: "Carrot Garden Cake", 
    description: "Moist carrot cake with warm spices, cream cheese frosting, and candied carrot decorations",
    price: 46.99,
    image: weddingCake, // Placeholder
    rating: 4.8,
    category: "Classic Cakes",
  },
];

export const categories = [
  "All",
  "Fruit Cakes",
  "Chocolate Cakes", 
  "Wedding Cakes",
  "Classic Cakes",
];

export const getFeaturedProducts = () => products.filter(p => p.featured);
export const getProductsByCategory = (category: string) => 
  category === "All" ? products : products.filter(p => p.category === category);