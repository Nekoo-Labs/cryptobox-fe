"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Box, Twitter, Github, MessageCircle, Mail } from "lucide-react";

const footerLinks = {
  product: [
    { label: "Home", href: "/" },
    { label: "Open Boxes", href: "/create" },
    { label: "Inventory", href: "/inventory" },
    { label: "Marketplace", href: "/marketplace" },
  ],
  resources: [
    { label: "Documentation", href: "/docs" },
    { label: "FAQ", href: "/faq" },
    { label: "Support", href: "/support" },
    { label: "Blog", href: "/blog" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Contact", href: "/contact" },
  ],
};

const socialLinks = [
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com",
    color: "hover:text-cyan-400",
  },
  {
    name: "Discord",
    icon: MessageCircle,
    href: "https://discord.com",
    color: "hover:text-cyan-400",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
    color: "hover:text-cyan-400",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:hello@cryptobox.com",
    color: "hover:text-cyan-400",
  },
];

export function Footer() {
  return (
    <footer className="relative bg-[#0a0e1a]/95 border-t border-white/5 mt-auto">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Main Footer Content */}
        <div className="py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <Link
                href="/"
                className="inline-flex items-center gap-2 group mb-4"
              >
                <Box className="w-8 h-8 text-cyan-400 transition-transform group-hover:rotate-12" />
                <span className="text-2xl font-audiowide bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent">
                  Cryptobox
                </span>
              </Link>
              <p className="text-gray-400 text-sm sm:text-base mb-6 max-w-sm">
                The most secure and exciting platform for LP NFT mystery boxes.
                Open, collect, and earn rewards on the blockchain.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-audiowide text-sm sm:text-base mb-4">
                Product
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h3 className="text-white font-audiowide text-sm sm:text-base mb-4">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h3 className="text-white font-audiowide text-sm sm:text-base mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-xs sm:text-sm text-center sm:text-left">
              © {new Date().getFullYear()} Cryptobox. All rights reserved.
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/terms"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-xs sm:text-sm"
              >
                Terms
              </Link>
              <Link
                href="/privacy"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-xs sm:text-sm"
              >
                Privacy
              </Link>
              <Link
                href="/cookies"
                className="text-gray-500 hover:text-cyan-400 transition-colors text-xs sm:text-sm"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
