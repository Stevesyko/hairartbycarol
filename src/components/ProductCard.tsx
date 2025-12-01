import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: string;
  image?: string;
  description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image, description }) => {
  return (
    <Card className="overflow-hidden group hover:shadow-elegant transition-smooth">
      <div className="relative h-64 overflow-hidden bg-muted">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center gradient-luxury">
            <span className="text-4xl">💇‍♀️</span>
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        {description && <p className="text-sm text-muted-foreground mb-2">{description}</p>}
        {price && <p className="text-2xl font-bold text-accent">{price}</p>}
      </CardContent>
      <CardFooter>
        <Button variant="luxury" className="w-full">
          <ShoppingCart className="mr-2" size={18} />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
