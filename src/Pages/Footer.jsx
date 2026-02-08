import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white/20 backdrop-blur-md border border-white/30 text-slate-600">
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-sky-400 mb-3">HotelHunt</h2>
          <p className="text-sm leading-relaxed">
            Book luxury hotels, budget stays, and resorts at the best prices.
            Your comfort is our priority.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-sky-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Hotels
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Bookings
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Offers
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-sky-400">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Cancellation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-sky-400">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold text-slate-700 mb-4">
            Contact Us
          </h3>
          <p className="text-sm">📧 support@stayease.com</p>
          <p className="text-sm mt-2">📞 +91 98765 43210</p>

          <div className="flex gap-4 mt-4 text-xl">
            <a href="#" className="hover:text-sky-400">
              🌐
            </a>
            <a href="#" className="hover:text-sky-400">
              📘
            </a>
            <a href="#" className="hover:text-sky-400">
              📸
            </a>
            <a href="#" className="hover:text-sky-400"></a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-700 text-center py-4 text-sm text-slate-400">
        © 2026 StayEase. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
