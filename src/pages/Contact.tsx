import { useState, useEffect, useRef } from "react";
import { Star, Send, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import gsap from "gsap";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [reviewData, setReviewData] = useState({
    name: "",
    rating: 5,
    comment: "",
  });

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      comment: "Absolutely amazing! The strawberry cake was perfect for my daughter's birthday. Everyone loved it!",
      date: "2024-01-15",
    },
    {
      id: "2", 
      name: "Mike Chen",
      rating: 5,
      comment: "Best chocolate cake I've ever had. The delivery was fast and the cake arrived in perfect condition.",
      date: "2024-01-10",
    },
    {
      id: "3",
      name: "Emily Davis",
      rating: 4,
      comment: "Beautiful wedding cake that exceeded our expectations. Highly recommend for special occasions!",
      date: "2024-01-05",
    },
  ]);

  const contactRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-header",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );

      gsap.fromTo(
        ".contact-card",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.2,
          ease: "power2.out",
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".review-item",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      name: reviewData.name,
      rating: reviewData.rating,
      comment: reviewData.comment,
      date: new Date().toISOString().split('T')[0],
    };
    
    setReviews([newReview, ...reviews]);
    setReviewData({ name: "", rating: 5, comment: "" });
    
    toast({
      title: "Review added!",
      description: "Thank you for your feedback!",
    });
  };

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating
            ? "fill-warm-gold text-warm-gold"
            : "text-muted-foreground"
        } ${interactive ? "cursor-pointer hover:text-warm-gold transition-colors" : ""}`}
        onClick={interactive && onRatingChange ? () => onRatingChange(i + 1) : undefined}
      />
    ));
  };

  return (
    <div ref={contactRef} className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="contact-header text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about our cakes or need a custom order? We'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="contact-card bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground flex items-center">
                <MessageCircle className="mr-3 h-6 w-6 text-primary" />
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" className="w-full bg-gradient-primary">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="contact-card bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">(555) 123-CAKE</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <p className="text-muted-foreground">hello@sweetcakes.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="contact-card bg-gradient-card shadow-card">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  <div>
                    <h3 className="font-semibold text-foreground">Location</h3>
                    <p className="text-muted-foreground">123 Sweet Street<br />Cake City, CC 12345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div ref={reviewsRef} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Customer Reviews</h2>
            <p className="text-muted-foreground">See what our customers are saying about our cakes</p>
          </div>

          {/* Add Review */}
          <Card className="bg-gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="text-xl text-foreground">Leave a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewName">Your Name</Label>
                    <Input
                      id="reviewName"
                      value={reviewData.name}
                      onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label>Rating</Label>
                    <div className="flex items-center mt-1 space-x-1">
                      {renderStars(reviewData.rating, true, (rating) =>
                        setReviewData({ ...reviewData, rating })
                      )}
                    </div>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="reviewComment">Your Review</Label>
                  <Textarea
                    id="reviewComment"
                    value={reviewData.comment}
                    onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                    required
                    rows={3}
                    className="mt-1"
                  />
                </div>
                
                <Button type="submit" className="bg-gradient-primary">
                  Submit Review
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Reviews List */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <Card key={review.id} className="review-item bg-gradient-card shadow-card">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{review.name}</h4>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{review.date}</span>
                  </div>
                  <p className="text-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};