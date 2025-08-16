import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="navbar-brand text-white text-2xl">TravelPlanner</h3>
            <p className="text-background/80 text-sm leading-relaxed">
              Your trusted companion for unforgettable travel experiences. 
              Discover the world with our expertly curated travel packages 
              and personalized itineraries.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-background/80 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-background/80 hover:text-white transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Destinations</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Tour Packages</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Travel Guides</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Reviews</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Flight Booking</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Hotel Reservations</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Car Rentals</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Travel Insurance</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Visa Assistance</a></li>
              <li><a href="#" className="text-background/80 hover:text-white transition-colors text-sm">Group Tours</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-background/80 text-sm">Call Us</p>
                  <p className="text-white font-medium">+1-800-TRAVEL</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-background/80 text-sm">Email</p>
                  <p className="text-white font-medium">info@travelplanner.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-background/80 text-sm">Address</p>
                  <p className="text-white font-medium">123 Travel Street, City, State 12345</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-background/80 text-sm">
              © 2024 TravelPlanner. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-background/80 hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-background/80 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-background/80 hover:text-white transition-colors text-sm">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};