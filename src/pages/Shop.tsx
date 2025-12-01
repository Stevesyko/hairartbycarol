import React, { useEffect, useState } from "react";
import VideoHero from "@/components/VideoHero";
import shopData from "@/content/shop.json";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  handle: string;
  variantId: string;
  category?: string;
  tags: string[];
  productType?: string;
}

const ShopSection: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Updated Category definitions - Wigs, Bundles, Products
  const categories = [
    { id: "all", name: "All Products" },
    { id: "wigs", name: "Wigs" },
    { id: "bundles", name: "Bundles" },
    { id: "products", name: "Products" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const domain = import.meta.env.VITE_SHOPIFY_DOMAIN;
        const token = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN;

        const query = `
          {
            products(first: 20) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  tags
                  productType
                  images(first: 1) {
                    edges {
                      node {
                        src
                      }
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        id
                        price {
                          amount
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `;

        const response = await fetch(`https://${domain}/api/2024-07/graphql.json`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": token,
          },
          body: JSON.stringify({ query }),
        });

        const data = await response.json();

        interface ShopifyProductEdge {
          node: {
            id: string;
            title: string;
            description: string;
            handle: string;
            tags: string[];
            productType?: string;
            images: {
              edges: {
                node: {
                  src: string;
                };
              }[];
            };
            variants: {
              edges: {
                node: {
                  id: string;
                  price: {
                    amount: string;
                  };
                };
              }[];
            };
          };
        }

        const productsData = (data.data.products.edges as ShopifyProductEdge[]).map((edge) => {
          const category = determineProductCategory(edge.node);
          
          return {
            id: edge.node.id,
            title: edge.node.title,
            description: edge.node.description,
            handle: edge.node.handle,
            image: edge.node.images.edges[0]?.node.src,
            price: edge.node.variants.edges[0]?.node.price.amount,
            variantId: edge.node.variants.edges[0]?.node.id,
            category: category,
            tags: edge.node.tags || [],
            productType: edge.node.productType
          };
        });

        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (err) {
        console.error("Error fetching Shopify products:", err);
        
        // Fallback to mock data if Shopify fails - Updated for new categories
        const mockProducts: Product[] = [
          {
            id: "1",
            title: "Premium Lace Front Wig",
            description: "100% human hair, natural looking hairline",
            image: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=400&q=80",
            price: "299.00",
            handle: "premium-lace-front-wig",
            variantId: "1",
            category: "wigs",
            tags: ["wig", "lace-front", "human-hair"],
            productType: "Wig"
          },
          {
            id: "2",
            title: "360 Lace Frontal Wig",
            description: "Full perimeter styling flexibility",
            image: "https://images.unsplash.com/photo-1588248242436-828b57272cdd?w=400&q=80",
            price: "349.00",
            handle: "360-lace-frontal-wig",
            variantId: "2",
            category: "wigs",
            tags: ["wig", "360-lace", "frontal"],
            productType: "Wig"
          },
          {
            id: "3",
            title: "Brazilian Body Wave Bundle",
            description: "Silky smooth Brazilian human hair bundle",
            image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=400&q=80",
            price: "199.00",
            handle: "brazilian-body-wave-bundle",
            variantId: "3",
            category: "bundles",
            tags: ["bundle", "brazilian", "body-wave", "hair-bundle"],
            productType: "Hair Bundle"
          },
          {
            id: "4",
            title: "Peruvian Straight Bundle",
            description: "Premium Peruvian straight hair bundle",
            image: "https://images.unsplash.com/photo-1556228705-5c2b4b0e0e5e?w=400&q=80",
            price: "229.00",
            handle: "peruvian-straight-bundle",
            variantId: "4",
            category: "bundles",
            tags: ["bundle", "peruvian", "straight", "hair-bundle"],
            productType: "Hair Bundle"
          },
          {
            id: "5",
            title: "Argan Oil Hair Treatment",
            description: "Deep conditioning treatment for all hair types",
            image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=400&q=80",
            price: "29.99",
            handle: "argan-oil-hair-treatment",
            variantId: "5",
            category: "products",
            tags: ["treatment", "argan-oil", "conditioner"],
            productType: "Hair Care"
          },
          {
            id: "6",
            title: "Sulfate-Free Shampoo",
            description: "Gentle cleansing for colored and treated hair",
            image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80",
            price: "24.99",
            handle: "sulfate-free-shampoo",
            variantId: "6",
            category: "products",
            tags: ["shampoo", "sulfate-free", "color-safe"],
            productType: "Hair Care"
          },
          {
            id: "7",
            title: "Heat Protectant Spray",
            description: "Protects hair up to 450°F from heat damage",
            image: "https://images.unsplash.com/photo-1590439471364-0bdb5f9d8d6d?w=400&q=80",
            price: "19.99",
            handle: "heat-protectant-spray",
            variantId: "7",
            category: "products",
            tags: ["styling", "heat-protectant", "spray"],
            productType: "Styling Product"
          }
        ];
        
        setProducts(mockProducts);
        setFilteredProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Updated Function to determine product category for Wigs, Bundles, Products
  const determineProductCategory = (product: any): string => {
    const { tags, productType, title } = product;
    const lowerTitle = title.toLowerCase();
    const lowerTags = tags.map((tag: string) => tag.toLowerCase());
    const lowerProductType = productType?.toLowerCase() || '';

    // Check for wig category
    if (lowerTags.includes('wig') || 
        lowerTags.includes('wigs') ||
        lowerProductType.includes('wig') ||
        lowerTitle.includes('wig') ||
        lowerTitle.includes('lace') ||
        lowerTitle.includes('frontal')) {
      return 'wigs';
    }

    // Check for bundles category
    if (lowerTags.includes('bundle') || 
        lowerTags.includes('bundles') ||
        lowerProductType.includes('bundle') ||
        lowerTitle.includes('bundle') ||
        lowerTitle.includes('weave') ||
        lowerTags.includes('hair-bundle')) {
      return 'bundles';
    }

    // Check for products category (hair care, treatments, etc.)
    if (lowerTags.includes('hair') || 
        lowerTags.includes('product') ||
        lowerTags.includes('care') ||
        lowerTags.includes('treatment') ||
        lowerTags.includes('shampoo') ||
        lowerTags.includes('conditioner') ||
        lowerProductType.includes('hair') ||
        lowerTitle.includes('oil') ||
        lowerTitle.includes('treatment') ||
        lowerTitle.includes('shampoo') ||
        lowerTitle.includes('conditioner') ||
        lowerTitle.includes('spray') ||
        lowerTitle.includes('serum')) {
      return 'products';
    }

    return 'products'; // default fallback
  };

  // Filter products by category
  const filterProductsByCategory = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  if (loading) return <p className="text-center py-20">Loading products...</p>;

  return (
    <main>
      {/* HERO SECTION - VIDEO or blur fallback image */}
      {/* HERO SECTION - VIDEO or blur fallback image */}
<VideoHero
  height={shopData.hero_height || "h-[60vh]"}
  videoUrl={
    "https://vimeo.com/1009745436?fl=ip&fe=ec" +
    "&autoplay=1&muted=1&playsinline=1&background=1"
  }
  imageFallback={shopData.hero_image}
/>

      {/* Added spacing between hero video and content */}
      <div className="py-8 md:py-12"></div>

      {/* Hero Title Section */}
      <section className="py-8 px-6 bg-background">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-serif italic text-foreground mb-4">
            {shopData.hero_title || "Shop Our Products"}
          </h1>
          {/* Tagline removed as per request. */}
        </div>
      </section>

      {/* Category Filters - Updated styling with thin dark peach cream border */}
      <section className="py-6 px-6 bg-background">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => filterProductsByCategory(category.id)}
                className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                  activeCategory === category.id
                    ? 'bg-black text-white border-[#D8C4B6] border-2' // Active: black bg, white text, thin peach border
                    : 'bg-black text-white border-[#D8C4B6] border hover:bg-gray-900 border-2' // Inactive: same styling
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-background text-center">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border border-border rounded-lg overflow-hidden hover:shadow-elegant transition-smooth flex flex-col"
            >
              {/* Updated image container - show whole image without cropping */}
              <div className="w-full h-64 flex items-center justify-center bg-white p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="p-4 text-left flex-grow">
                <h3 className="text-xl font-serif italic mb-2">{product.title}</h3>
                <p className="text-sm text-foreground/80 mb-4">${product.price}</p>
              </div>
              {/* View Product Button Container */}
              <div className="p-4 border-t border-[#D8C4B6]"> {/* Dark peach cream border */}
                <a
                  href={`https://${import.meta.env.VITE_SHOPIFY_DOMAIN}/products/${product.handle}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-black text-white py-3 px-6 rounded-none border-2 border-[#D8C4B6] hover:bg-gray-900 transition-colors duration-300 flex items-center justify-center font-medium"
                >
                  View Product
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-serif italic mb-4">No products found</h3>
            <p className="text-gray-600 mb-8">
              We couldn't find any products in this category.
            </p>
            <button
              onClick={() => filterProductsByCategory('all')}
              className="bg-black text-white px-8 py-3 border-2 border-[#D8C4B6] hover:bg-gray-900 transition-colors duration-300"
            >
              View All Products
            </button>
          </div>
        )}

        {/* Linkfree Section */}
        <div className="linkfree-section mt-16">
          <p className="linkfree-text text-[#E7A77C] font-bold mb-4">
            Explore our digital tools and tutorials here:
          </p>
          <a 
            href="https://linktr.ee/habcandbeauty" 
            className="linkfree-button inline-block px-8 py-3 text-white bg-black border-2 border-[#E7A77C] rounded-lg no-underline font-bold transition-all duration-300 hover:bg-[#111] hover:border-[#f0b892]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Linkfree
          </a>
        </div>
      </section>
    </main>
  );
};

export default ShopSection;