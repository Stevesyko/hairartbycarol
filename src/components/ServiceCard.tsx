import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  image?: string;
  duration?: string;
  requirements?: string[];
  details?: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  price, 
  image,
  duration,
  requirements = [],
  details = []
}) => {
  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden hover:shadow-elegant transition-smooth">
      {/* Image Section */}
      {image && (
        <div className="w-full h-64 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-smooth"
          />
        </div>
      )}
      
      {/* Content Section */}
      <div className="p-8">
        <h3 className="text-3xl font-serif italic mb-6 text-foreground">{title}</h3>
        
        {/* Price First */}
        {price && (
          <div className="mb-4">
            <p className="text-2xl font-bold text-white">
              {price}
            </p>
          </div>
        )}
        
        {/* Description Second */}
        {description && (
          <div className="mb-4">
            <p className="text-white leading-relaxed">
              {description}
            </p>
          </div>
        )}
        
        {/* Additional Details */}
        <ul className="space-y-3 text-white">
          {duration && (
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>{duration}</span>
            </li>
          )}
          
          {requirements.map((req, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span dangerouslySetInnerHTML={{ __html: req }} />
            </li>
          ))}
          
          {details.map((detail, index) => (
            <li key={index} className="flex items-start">
              <span className="mr-2">•</span>
              <span dangerouslySetInnerHTML={{ __html: detail }} />
            </li>
          ))}
        </ul>
        
        {/* ✅ Book Now button links to Vagaro */}
        <a
          href="https://www.vagaro.com/habcandbeauty"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="mt-6 bg-accent text-accent-foreground hover:opacity-90">
            Book Now
          </Button>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
