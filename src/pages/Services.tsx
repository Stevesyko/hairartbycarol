// src/pages/Services.tsx
import React from "react";
import VideoHero from "@/components/VideoHero";
import ServiceCard from "@/components/ServiceCard";
import { Link } from "react-router-dom";
import servicesData from "@/content/services.json";
import {
  Scissors,
  Palette,
  Wind,
  User,
  Link2,
  Grid,
  Layers,
  Heart,
  MoreHorizontal,
  Lock,
  Sparkles,
  Users,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Scissors,
  Palette,
  Wind,
  User,
  Link2,
  Grid,
  Layers,
  Heart,
  MoreHorizontal,
  Lock,
  Sparkles,
  Users,
};

interface Service {
  title: string;
  price: string;
  description?: string;
  image?: string;
  duration?: string;
}

interface Category {
  id?: string;
  title: string;
  icon?: string;
  description?: string;
  services?: Service[];
}

const Services: React.FC = () => {
  return (
    <main>
      {/* HERO SECTION - VIDEO or blur fallback image */}
<VideoHero
  height={servicesData.hero_height || "h-[60vh]"}
  videoUrl={
    "https://vimeo.com/1130838830?fl=ip&fe=ec" +
    "&autoplay=1&muted=1&playsinline=1&background=1"
  }
  imageFallback={servicesData.hero_image}
/>

      {/* Added spacing between hero video and content */}
      <div className="py-8 md:py-12"></div>

      {/* Hero Title Section */}
      <section className="py-4 md:py-8 px-6 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground mb-2 md:mb-4">
            {servicesData.hero_title || "Our Services"}
          </h1>
          {/* Tagline REMOVED as per request */}
        </div>
      </section>

      {/* Category Navigation */}
      <section className="py-6 px-6 bg-accent/10 border-y border-accent/20">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-4 justify-center">
            {servicesData.categories.map((cat: Category, i: number) => {
              const slug = (cat.id || cat.title || `cat-${i}`)
                .toString()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              return (
                <Link 
                  key={slug} 
                  to={`/services/category/${slug}`}
                  onClick={() => window.scrollTo(0, 0)} // Scroll to top on navigation
                >
                  <span className="inline-block px-5 py-2 rounded-2xl border-2 border-primary text-foreground hover:bg-primary hover:text-primary-foreground uppercase tracking-wider transition-all duration-300">
                    {cat.title}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories from CMS */}
      {servicesData.categories?.map((category, index) => {
        const Icon = iconMap[category.icon] || MoreHorizontal;
        return (
          <section key={index} className="py-20 px-6 bg-card">
            <div className="container mx-auto">
              <div className="text-center mb-12 animate-fade-in">
                <Icon className="w-12 h-12 mx-auto mb-4 text-accent" />
                <h2 className="text-4xl md:text-5xl font-serif italic mb-4">
                  {category.title}
                </h2>
                {category.description && (
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    {category.description}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.services?.map((service, sIndex) => (
                  <div
                    key={sIndex}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${sIndex * 0.1}s` }}
                  >
                    <ServiceCard
                      title={service.title}
                      price={service.price}
                      description={service.description}
                      image={service.image}
                      duration={service.duration}
                      // Ensure price is always displayed
                      showPrice={true}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Disclaimer Section */}
      {servicesData.disclaimer && (
        <section className="py-12 px-6 bg-background border-t border-muted">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-muted/30 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground italic">
                {servicesData.disclaimer}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Services;