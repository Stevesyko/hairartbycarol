import { Instagram, Facebook, MapPin, Phone, Mail, Video, Youtube, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/habc-logo.png";
import logoWhite from "@/assets/habc-logo-white.png";

const Footer = () => {
  return (
    <footer className="relative bg-background text-foreground py-12 overflow-hidden">
      {/* Logo Background */}
      <div 
        className="absolute inset-0 opacity-5 bg-center bg-no-repeat bg-contain"
        style={{ backgroundImage: `url(${logoWhite})` }}
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="footer-brand flex items-center gap-3 md:flex-row flex-col md:items-center items-start">
            <img src={logoWhite} alt="HABC & Beauty Logo" className="h-12" />
            <p className="text-sm opacity-80 m-0">Luxury Hair & Beauty Redefined</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/services" className="hover:text-accent transition-smooth">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-accent transition-smooth">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-accent transition-smooth">
                  Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-smooth">
                  Book Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 uppercase tracking-wider text-sm">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent flex-shrink-0 mt-1" />
                <span>11990 Coit Rd, Ste 2<br />Frisco, TX 75035, United States</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+19403443487" className="hover:text-accent transition-smooth">
                  +1 (940) 344-3487
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-accent flex-shrink-0 mt-1" />
                <div className="space-y-1">
                  <a href="mailto:info@hairartbycarol.com" className="block hover:text-accent transition-smooth">
                    info@hairartbycarol.com
                  </a>
                  <a href="mailto:carolssuitcase@gmail.com" className="block hover:text-accent transition-smooth">
                    carolssuitcase@gmail.com
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-6">
              <a
                href="https://www.instagram.com/habcandbeauty/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/HABCarol/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://www.youtube.com/channel/UChITf3_1imWxEqH-uDoSwxw"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="YouTube"
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://vm.tiktok.com/ZMHvw8LmRgqTB-0nMG3/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="TikTok"
              >
                {/* Inline TikTok SVG to avoid icon import issues */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M21 8.5c-2.2 0-4.2-1-5.5-2.7V16a6.5 6.5 0 1 1-6.5-6.5c.3 0 .6 0 .9.1v3.1a3.5 3.5 0 1 0 2.6 3.4V2h3.2c.3 2.3 2.1 4.1 4.3 4.4V8.5z"/>
                </svg>
              </a>
              <a
                href="https://twitter.com/hairartbycarol"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-smooth"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} HABC and Beauty. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
