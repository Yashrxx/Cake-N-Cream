import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Info cards animation
      gsap.fromTo(infoRef.current?.children || [], 
        { opacity: 0, y: 40, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          ease: "power3.out",
          stagger: 0.2,
          delay: 0.3
        }
      );

      // Form animation
      gsap.fromTo(formRef.current, 
        { opacity: 0, x: 50 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 1, 
          ease: "power3.out",
          delay: 0.6
        }
      );

      // Reviews animation
      gsap.fromTo(reviewsRef.current?.children || [], 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.6, 
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.8
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Something went wrong. Try again later.",
        variant: "destructive"
      });
    }
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

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Cake Shop",
      details: ["123 Sweet Street", "Cake District, CD 12345", "Downtown Location"],
      color: "text-primary"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(555) 123-CAKE", "Mon-Fri: 7:00 AM - 8:00 PM", "Sat-Sun: 8:00 AM - 7:00 PM"],
      color: "text-sweet-pink"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@sweetcakes.com", "orders@sweetcakes.com", "custom@sweetcakes.com"],
      color: "text-berry-accent"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Monday - Friday: 7:00 AM - 8:00 PM", "Saturday - Sunday: 8:00 AM - 7:00 PM", "Holidays: 9:00 AM - 5:00 PM"],
      color: "text-primary"
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div ref={heroRef} className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Get In
              <span className="text-primary block">Touch</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              We'd love to hear from you! Whether you have questions about our cakes, 
              want to place a custom order, or just want to say hello, we're here to help.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div ref={infoRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 border-0 shadow-soft hover:shadow-card transition-shadow duration-300 bg-gradient-card">
                <CardHeader className="pb-4">
                  <info.icon className={`h-12 w-12 ${info.color} mx-auto mb-4`} />
                  <CardTitle className="text-xl text-foreground">{info.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {info.details.map((detail, detailIndex) => (
                      <p key={detailIndex} className="text-muted-foreground text-sm">
                        {detail}
                      </p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Form */}
            <div ref={formRef}>
              <Card className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Send Us a Message</CardTitle>
                  <p className="text-muted-foreground">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Name *
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Email *
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Phone
                        </label>
                        <Input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="(555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Subject *
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-primary hover:scale-105 transition-transform duration-300"
                      size="lg"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Placeholder */}
            <div className="space-y-6">
              <Card className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-2xl text-foreground">Find Us</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gradient-to-br from-primary/10 to-primary-glow/10 rounded-lg h-64 flex items-center justify-center border border-border">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground text-sm">
                        123 Sweet Street, Cake District
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-card bg-gradient-card">
                <CardHeader>
                  <CardTitle className="text-xl text-foreground">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Best Times to Visit</h4>
                      <p className="text-sm text-muted-foreground">Mornings (8-11 AM) for fresh cakes, afternoons (3-6 PM) for custom consultations</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Phone className="h-5 w-5 text-sweet-pink mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Custom Orders</h4>
                      <p className="text-sm text-muted-foreground">Call 72 hours ahead for custom cakes and wedding orders</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Mail className="h-5 w-5 text-berry-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-foreground">Special Events</h4>
                      <p className="text-sm text-muted-foreground">Email us for birthdays, weddings, and corporate celebrations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="space-y-8">
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
                      <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                      <Input
                        value={reviewData.name}
                        onChange={(e) => setReviewData({ ...reviewData, name: e.target.value })}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Rating</label>
                      <div className="flex items-center mt-1 space-x-1">
                        {renderStars(reviewData.rating, true, (rating) =>
                          setReviewData({ ...reviewData, rating })
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Your Review</label>
                    <Textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>
                  
                  <Button type="submit" className="bg-gradient-primary">
                    Submit Review
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Reviews List */}
            <div ref={reviewsRef} className="space-y-4">
              {reviews.map((review) => (
                <Card key={review.id} className="bg-gradient-card shadow-card">
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
      </section>

      <Footer />
    </div>
  );
};