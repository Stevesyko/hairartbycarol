import VideoHero from "@/components/VideoHero";
import ServiceCard from "@/components/ServiceCard";
import ProductCard from "@/components/ProductCard";
import ReviewCarousel from "@/components/ReviewCarousel";
import BookingButtons from "@/components/BookingButtons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Scissors, Heart, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import carolineImage1 from "@/assets/caroline-1.jpeg";
import homeHeroHair from "@/assets/home-hero-hair.jpg";
import homeBraids from "@/assets/home-braids.jpg";
import homeSilkpress from "@/assets/home-silkpress.jpg";
import homeWig from "@/assets/home-wig.jpg";

// ✅ IMPORT CMS DATA
import homeData from "../content/home.json";

// Define the Review type
type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  source: 'vagaro' | 'google' | 'manual' | 'yelp';
};

const Home = () => {
  const navigate = useNavigate();
  
  console.log('Home CMS Data:', homeData);

  // Fix for quick links scrolling to top
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Remove any hash from URL without scrolling
    if (window.location.hash) {
      history.replaceState(null, null, ' ');
    }

    // Enhanced video loading optimization
    const videos = document.querySelectorAll('video[data-src]');
    
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          const dataSrc = video.getAttribute('data-src');
          if (dataSrc && !video.src) {
            video.src = dataSrc;
            video.setAttribute('preload', 'metadata');
            videoObserver.unobserve(video);
          }
        }
      });
    }, { threshold: 0.1 });
    
    videos.forEach(video => {
      videoObserver.observe(video);
    });

    return () => {
      videoObserver.disconnect();
    };
  }, []);

  // Enhanced link handler to ensure scroll to top
  const handleNavigation = (path: string) => {
    // Scroll to top before navigation
    window.scrollTo(0, 0);
    navigate(path);
  };

  // Direct navigation to Vagaro for Book Now
  const handleBookNow = () => {
    window.open('https://vagaro.com/habcandbeauty', '_blank');
  };

  // normalize hero video field (some CMS exports hero_video or heroVideo)
  // avoid using `any` by treating imported JSON as a generic record and narrowing to string
  const cms = homeData as Record<string, unknown>;
  const heroVideo =
    (typeof cms['hero_video'] === 'string' ? (cms['hero_video'] as string) : undefined) ??
    (typeof cms['heroVideo'] === 'string' ? (cms['heroVideo'] as string) : undefined);

  // ✅ USE CMS DATA FOR ALL SECTIONS
  const featuredServices = homeData.featured_services || [
    {
      title: "Hair Styling",
      description: "Professional cuts, coloring, and treatments for every style.",
      price: "From $50",
      image: homeBraids,
    },
    {
      title: "Beauty Services",
      description: "Facials, lashes, brows, and makeup for flawless beauty.",
      price: "From $40",
      image: homeSilkpress,
    },
  ];

  const featuredProducts = homeData.featured_products || [
    {
      name: "Premium Hair Extensions",
      price: "$199",
      description: "100% human hair, salon quality",
      image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80",
    },
    {
      name: "Luxury Lace Wigs",
      price: "$299",
      description: "Natural looking, comfortable fit",
      image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=800&q=80",
    },
    {
      name: "Beauty Treatment Kit",
      price: "$89",
      description: "Professional grade skincare essentials",
      image: "https://images.unsplash.com-1556228578-8c89e6adf883?w=800&q=80",
    },
  ];

  // Updated testimonials from website (manual) only
  const reviews: Review[] = (homeData.reviews || [
    {
      id: "1",
      name: "Sarah Johnson",
      rating: 5,
      comment: "Caroline is a true artist! My hair has never looked better. She listened to exactly what I wanted and delivered beyond my expectations. The salon atmosphere is so relaxing and luxurious.",
      date: "2 weeks ago",
      source: "manual",
    },
    {
      id: "2",
      name: "Emily Davis",
      rating: 5,
      comment: "I've been coming to HABC for over a year now and I'm always amazed by the results. Caroline's attention to detail is unmatched. Every service feels like a spa day!",
      date: "1 month ago",
      source: "manual",
    },
    {
      id: "3",
      name: "Jessica Martinez",
      rating: 5,
      comment: "The wig installation was absolutely flawless! It looks so natural and feels comfortable. Caroline is a perfectionist and it shows in her work. Highly recommend!",
      date: "3 weeks ago",
      source: "manual",
    },
    {
      id: "4",
      name: "Michelle Thompson",
      rating: 5,
      comment: "My silk press was absolutely stunning! It lasted for weeks and the hair was so healthy afterwards. Caroline knows exactly how to treat different hair types.",
      date: "1 week ago",
      source: "manual",
    },
    {
      id: "5",
      name: "Amanda Wilson",
      rating: 5,
      comment: "The braids are incredible! Not only do they look beautiful, but they're so comfortable and last forever. Caroline is my go-to stylist for all my protective styles.",
      date: "2 months ago",
      source: "manual",
    },
    {
      id: "6",
      name: "Rachel Green",
      rating: 5,
      comment: "From consultation to finished look, the entire experience was exceptional. Caroline truly cares about her clients and it shows in every interaction. I feel beautiful every time I leave!",
      date: "3 days ago",
      source: "manual",
    },
  ]).map(review => ({
    ...review,
    id: review.id || String(Math.random()),
    source: 'manual' as const // Force all testimonials to be from manual/website
  }));

  const stats = homeData.stats || [
    {
      number: "15+",
      title: "Years Experience",
      description: "Trusted expertise in hair and beauty"
    },
    {
      number: "5000+",
      title: "Happy Clients",
      description: "Transformations delivered with care"
    },
    {
      number: "100%",
      title: "Premium Products",
      description: "Only the finest quality brands"
    },
    {
      number: "★★★★★",
      title: "5-Star Rated",
      description: "Based on client reviews"
    }
  ];

  const galleryImages = Array.isArray(cms['gallery_images'])
    ? (cms['gallery_images'] as unknown[])
    : [
      { image: homeBraids, alt: "Braids Style" },
      { image: homeSilkpress, alt: "Silk Press" },
      { image: homeWig, alt: "Wig Installation" },
      { image: homeHeroHair, alt: "Hero Hair" },
      { image: homeBraids, alt: "Braids Style" },
      { image: homeSilkpress, alt: "Silk Press" },
      { image: homeWig, alt: "Wig Installation" },
      { image: homeHeroHair, alt: "Hero Hair" }
    ];

  // ✅ ABOUT CAROLINE CMS DATA - UPDATED STRUCTURE
  const aboutTitle = homeData.about_title || "About Caroline";
  const aboutImage = homeData.about_image || "/uploads/caroline-profile.jpg";
  const aboutImageAlt = homeData.about_image_alt || "Caroline Menchaca";

  // Get paragraphs, filtering out empty ones
  const aboutParagraphs = [
    homeData.about_para1,
    homeData.about_para2, 
    homeData.about_para3
  ].filter(Boolean);

  // Fallback content
  const fallbackAboutContent = [
    "Caroline Menchaca is a master stylist with over 21 years of experience in the beauty industry. Born and raised in Kenya, East Africa, Caroline became one of Nairobi's most sought-after stylists before bringing her expertise to the United States.",
    "After earning her cosmetology license in 2019, Caroline founded HABC & Beauty, creating a sanctuary where every client feels like royalty. Her passion for helping women look radiant and feel empowered drives everything she does.",
    "When you book with Caroline, you're not just booking a service—you're booking an experience where luxury, professionalism, and genuine care come together with her signature magic touch."
  ];

  const displayAboutContent = aboutParagraphs.length > 0 ? aboutParagraphs : fallbackAboutContent;

  // Contact form state (moved from Contact page)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your message! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <main>
     {/* Optimized VideoHero with fast loading */}
      <VideoHero
        height={homeData.hero_height || "h-[60vh]"}
        videoUrl={
          (heroVideo || "https://vimeo.com/1130841079?fl=ip&fe=ec") +
          "?autoplay=1&muted=1&playsinline=1&background=1"
        }
        imageFallback={homeData.hero_image}
      />



      
      {/* Added spacing between hero video and content */}
      <div className="py-8 md:py-12"></div>

      {/* Hero Title Section */}
      <section className="py-4 md:py-8 px-6 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground mb-6 md:mb-8">
            {homeData.hero_title || "Luxury Hair & Beauty, Redefined"}
          </h1>
          
          {/* Three Buttons: Our Services, Book Now, Shop Now */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center">
            <Button 
              variant="luxuryOutline" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => handleNavigation("/services")}
            >
              Our Services
            </Button>
            <Button 
              variant="luxury" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={handleBookNow}
            >
              Book Now
            </Button>
            <Button 
              variant="luxuryOutline" 
              size="lg" 
              className="w-full sm:w-auto"
              onClick={() => handleNavigation("/shop")}
            >
              Shop Now
            </Button>
          </div>
        </div>
      </section>

      {/* About HABC and Beauty Section - UPDATED LAYOUT */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-foreground">{aboutTitle}</h2>
            <div className="rounded-lg overflow-hidden shadow-elegant max-w-md mx-auto mb-6">
              <img 
                src={aboutImage}
                alt={aboutImageAlt}
                className="w-full h-96 object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="space-y-4 text-center">
            {displayAboutContent.map((paragraph, index) => (
              <p key={index} className="text-lg leading-relaxed italic text-white">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - UPDATED TO USE WEBSITE TESTIMONIALS ONLY */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif italic mb-4 text-foreground">
              {homeData.reviews_title || "Client Testimonials"}
            </h2>
            {homeData.reviews_description ? (
              <p className="text-foreground text-lg">
                {homeData.reviews_description}
              </p>
            ) : (
              <p className="text-foreground text-lg">
                Read what our clients have to say about their experiences at HABC & Beauty
              </p>
            )}
          </div>
          <ReviewCarousel reviews={reviews} />
          <div className="text-center mt-10">
            <Button 
              variant="luxuryOutline" 
              size="lg"
              onClick={() => handleNavigation("/reviews")}
            >
              View All Testimonials
            </Button>
          </div>
        </div>
      </section>

      {/* Appointment Cancellation Policy Section */}
      <section className="py-16 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-background border border-primary rounded-lg p-8 shadow-elegant">
            <div className="flex items-start gap-4 mb-6">
              <AlertCircle className="w-10 h-10 text-primary flex-shrink-0 animate-pulse" />
              <div>
                <h2 className="text-3xl font-bold text-primary mb-2">
                  {homeData.cta_title || "Appointment Cancellation Policy"}
                </h2>
              </div>
            </div>
            <div className="space-y-3 text-foreground text-base md:text-lg">
              {homeData.cta_description ? (
                <>
                  {homeData.cta_description.split('\n').filter(item => item.trim()).map((policy, index) => (
                    <p key={index} className="font-semibold">
                      {policy.trim()}
                    </p>
                  ))}
                  {homeData.cta_closing && (
                    <p
                      className="italic mt-8 text-peach-cream-900 opacity-90 text-base md:text-lg"
                      style={{ color: '#DBB196' }}
                    >
                      {homeData.cta_closing}
                    </p>
                  )}
                </>
              ) : (
                <p className="font-semibold">Cancellations made at least 24 hours in advance are eligible for a full refund.</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="animate-fade-in">
              <h3 className="text-3xl font-serif italic mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone (Optional)</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help..."
                    required
                    className="mt-2 min-h-32"
                  />
                </div>
                <Button type="submit" variant="luxury" size="lg" className="w-full">
                  Send Message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <h3 className="text-3xl font-serif italic mb-6">Get In Touch</h3>
                <p className="text-muted-foreground mb-8">
                  We're here to answer your questions and help you look your best. Reach out 
                  through any of the channels below.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Location</h4>
                    <p className="text-muted-foreground">
                      11990 Coit Rd, Ste 2<br />
                      Frisco, TX 75035, United States
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Phone</h4>
                    <a href="tel:+19403443487" className="text-muted-foreground hover:text-accent transition-smooth">
                      +1 (940) 344-3487
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AlertCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold mb-1">Email</h4>
                    <div className="space-y-1">
                      <a href="mailto:info@hairartbycarol.com" className="block text-muted-foreground hover:text-accent transition-smooth">
                        info@hairartbycarol.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3345.8676542!2d-96.822!3d33.154!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzPCsDA5JzE0LjQiTiA5NsKwNDknMTkuMiJX!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="HABC and Beauty Location - 11990 Coit Rd, Ste 2, Frisco TX 75035"
        />
      </section>
    </main>
  );
};

export default Home;