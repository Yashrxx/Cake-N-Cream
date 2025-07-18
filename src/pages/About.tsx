import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Award, Users, Heart, Clock } from 'lucide-react';
import heroBakery from '@/assets/hero-bakery.jpg';

gsap.registerPlugin(ScrollTrigger);

export const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const storyRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(heroRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Story section animation
      gsap.fromTo(storyRef.current, 
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: storyRef.current,
            start: "top 80%"
          }
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [], 
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.8, 
          ease: "back.out(1.7)",
          stagger: 0.2,
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%"
          }
        }
      );

      // Values animation
      gsap.fromTo(valuesRef.current?.children || [], 
        { opacity: 0, y: 40 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "29", label: "Years in Business", icon: Clock },
    { number: "100+", label: "Cake Varieties", icon: Heart },
    { number: "15", label: "Master Bakers", icon: Users },
    { number: "25", label: "Awards Won", icon: Award }
  ];

  const values = [
    {
      title: "Traditional Recipes",
      description: "We honor time-tested cake recipes passed down through generations of master bakers.",
      icon: Clock
    },
    {
      title: "Premium Ingredients", 
      description: "Only the finest flour, butter, and seasonal fruits make it into our cakes.",
      icon: Award
    },
    {
      title: "Community Love",
      description: "We're proud to celebrate life's sweetest moments with families for decades.",
      icon: Users
    },
    {
      title: "Passion for Perfection",
      description: "Every cake is crafted with love, attention to detail, and artistic flair.",
      icon: Heart
    }
  ];

  return (
    <div ref={sectionRef} className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBakery}
            alt="Our Sweet Bakery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div ref={heroRef} className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Our Story of
              <span className="text-primary-glow block">Sweetness & Joy</span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              For nearly three decades, Sweet Cakes has been creating magical moments, 
              where traditional baking meets modern artistry and every cake tells a story of celebration.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div ref={storyRef} className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-8">
              Founded on Sweet Dreams
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Sweet Cakes began in 1995 when Emma and James decided to bring 
                their grandmother's authentic cake recipes to life. What started 
                as a small neighborhood bakery has grown into a beloved destination for cake lovers.
              </p>
              <p>
                Today, our second generation continues the legacy, blending traditional 
                techniques with modern innovation. We still bake fresh every day to 
                ensure our cakes are perfect, our decorations are stunning, and our customers 
                celebrate life's sweetest moments with something truly special.
              </p>
              <p>
                Every layer, every decoration, every custom design is made with the same care and passion 
                that Emma put into her very first wedding cake. It's not just about baking – it's about 
                creating memories, one celebration at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-4">
                <stat.icon className="h-12 w-12 text-primary-glow mx-auto" />
                <div className="text-4xl font-bold text-primary-glow">{stat.number}</div>
                <div className="text-primary-foreground/90 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our values guide everything we do, from sourcing ingredients to creating masterpieces.
            </p>
          </div>
          
          <div ref={valuesRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="bg-card p-8 rounded-lg shadow-soft border border-border hover:shadow-card transition-shadow duration-300">
                <value.icon className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};