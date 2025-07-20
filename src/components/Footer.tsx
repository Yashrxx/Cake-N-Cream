import { Heart, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: "#A062DB" }} className="bg-purple-900 text-white border-t border-purple-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-6 w-6 text-pink-400 fill-pink-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-300 bg-clip-text text-transparent">
                Cake N Cream
              </span>
            </div>
            <p className="text-purple-200 text-sm">
              Crafting delicious cakes with love and passion since 1995.
              Every slice tells a story of tradition and quality.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["/", "/products", "/about", "/contact"].map((path, i) => (
                <li key={i}>
                  <Link
                    to={path}
                    className="text-purple-200 hover:text-pink-400 transition-colors text-sm"
                  >
                    {["Home", "Products", "About Us", "Contact"][i]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Info</h3>
            <div className="space-y-2 text-sm text-purple-200">
              <p>123 Sweet Street</p>
              <p>Bakery District, BD 12345</p>
              <p>Phone: (555) 123-CAKE</p>
              <p>Email: hello@sweetcakes.com</p>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="text-purple-200 hover:text-pink-400 transition-colors"
                  aria-label={["Instagram", "Facebook", "Twitter"][i]}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-purple-800 mt-8 pt-8 text-center">
          <p className="text-purple-300 text-sm">
            © 2024 Sweet Cakes. All rights reserved. Made with{" "}
            <Heart className="h-4 w-4 inline text-pink-400 fill-pink-400" />{" "}
            for cake lovers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
};