import React, { useState } from "react";
import {
  Heart,
  ShoppingCart,
  Globe,
  Phone,
  User,
  Menu,
  X,
  Mail,
  PlaneTakeoff,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  isLoggedIn: boolean;
  onAuthClick: () => void;
  onLogout: () => void;
  wishlistCount: number;
  cartCount: number;
  onWishlistClick: () => void;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isLoggedIn,
  onAuthClick,
  onLogout,
  wishlistCount,
  cartCount,
  onWishlistClick,
  onCartClick,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState<string | null>(null);

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-white via-blue-50 to-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <PlaneTakeoff className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold tracking-wide text-gray-800">
              Travel Planner
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-12">
            {/* Destinations */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("destinations")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <a className="cursor-pointer hover:text-blue-500 transition">
                Destinations
              </a>
              {hoverMenu === "destinations" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-3 px-5 w-48">
                  <ul className="space-y-2 text-sm">
                    <li className="hover:text-blue-500 cursor-pointer">Paris</li>
                    <li className="hover:text-blue-500 cursor-pointer">Bali</li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Maldives
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">Tokyo</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bookings */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("bookings")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <a className="cursor-pointer hover:text-blue-500 transition">
                Bookings
              </a>
              {hoverMenu === "bookings" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-3 px-5 w-56">
                  <ul className="space-y-2 text-sm">
                    <li className="hover:text-blue-500 cursor-pointer">
                      Flight Tickets
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Hotel Reservations
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Tour Packages
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Car Rentals
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Offers */}
            <div
              className="relative"
              onMouseEnter={() => setHoverMenu("offers")}
              onMouseLeave={() => setHoverMenu(null)}
            >
              <a className="cursor-pointer hover:text-blue-500 transition">
                Offers
              </a>
              {hoverMenu === "offers" && (
                <div className="absolute top-8 left-0 bg-white shadow-lg rounded-lg py-3 px-5 w-60">
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                    By Month
                  </h4>
                  <ul className="space-y-1 text-sm mb-3">
                    <li className="hover:text-blue-500 cursor-pointer">
                      January Deals
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Summer Specials
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Winter Discounts
                    </li>
                  </ul>
                  <h4 className="font-semibold text-gray-700 mb-2 text-sm">
                    By Destination
                  </h4>
                  <ul className="space-y-1 text-sm">
                    <li className="hover:text-blue-500 cursor-pointer">
                      Europe
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      Asia
                    </li>
                    <li className="hover:text-blue-500 cursor-pointer">
                      America
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
              <Globe className="w-4 h-4" />
              <select className="bg-transparent outline-none text-sm">
                <option>English</option>
                <option>தமிழ்</option>
                <option>हिंदी</option>
                <option>Français</option>
              </select>
            </div>

            {/* Contact */}
            <a
              href="mailto:support@travelplanner.com"
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              <Mail className="w-4 h-4" /> Contact
            </a>
            <a
              href="tel:+91-7305587479"
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              <Phone className="w-4 h-4" /> +91-7305587479
            </a>

            {/* Wishlist */}
            <button
              onClick={onWishlistClick}
              className="relative hover:text-blue-500 transition"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={onCartClick}
              className="relative hover:text-blue-500 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth */}
            {isLoggedIn ? (
              <button
                onClick={onLogout}
                className="flex items-center gap-1 px-4 py-2 rounded-md border border-gray-300 hover:border-blue-500 hover:text-blue-500 transition"
              >
                <User className="w-4 h-4" /> Logout
              </button>
            ) : (
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow">
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
