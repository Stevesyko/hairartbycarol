import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import servicesData from "@/content/services.json";
import ServiceCard from "@/components/ServiceCard";
import { ArrowLeft } from "lucide-react";

interface Service {
  title: string;
  price: string;
  description: string;
  image: string;
  duration: string;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ServicesCategory: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  interface Category {
    id?: string;
    title: string;
    description?: string;
    services: Service[];
  }
  
  // Scroll to top on component mount
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const category = (servicesData.categories || []).find((c) => {
    const s = slugify(c.id || c.title || "");
    return s === slug;
  });

  // Enhanced navigation with scroll to top
  const handleBackClick = () => {
    window.scrollTo(0, 0);
    navigate("/services");
  };

  // Ensure services have proper price formatting
  const services: Service[] = (category?.services || []).map((service: any) => {
    // Handle price formatting - ensure it's always a string
    let priceString = "";
    
    if (typeof service.price === "number") {
      priceString = `$${service.price.toFixed(2)}`;
    } else if (typeof service.price === "string") {
      priceString = service.price;
    } else {
      priceString = "Price upon request";
    }
    
    // Ensure price starts with $ if it's a numeric value
    if (priceString && !priceString.startsWith('$') && !isNaN(parseFloat(priceString))) {
      priceString = `$${priceString}`;
    }

    return {
      title: service.title || "Service",
      price: priceString,
      description: service.description || "",
      image: service.image || "",
      duration: service.duration || "",
    };
  });

  return (
    <main>
      {/* Show only this category and its services, hide full category listing */}
      <section className="py-8 px-6 bg-background">
        <div className="container mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <Link 
              to="/services" 
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
              onClick={handleBackClick}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to All Services
            </Link>
          </div>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground mb-2 md:mb-4">
              {(category && typeof category.title === 'string' && category.title.trim()) ? category.title : slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : "Services"}
            </h1>
            {category?.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-card">
        <div className="container mx-auto">
          {services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service: Service, idx: number) => (
                <ServiceCard
                  key={idx}
                  title={service.title}
                  price={service.price}
                  description={service.description}
                  image={service.image}
                  duration={service.duration}
                  showPrice={true} // Force price display
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-2xl font-serif italic mb-4">No services found</h3>
              <p className="text-muted-foreground mb-8">
                We couldn't find any services in this category.
              </p>
              <button
                onClick={handleBackClick}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full hover:bg-primary/90 transition-colors duration-200"
              >
                View All Services
              </button>
            </div>
          )}
        </div>
      </section>

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

export default ServicesCategory;