"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { Home, Info, Briefcase, Book, DollarSign, Mail, Menu, X } from "lucide-react";

function NavigationMenu({ className, ...props }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={cn("fixed top-0 w-full shadow-md bg-gray-800 text-white", className)} {...props}>
      <div className="container mx-auto flex items-center justify-between p-4">
      
        <button className="lg:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      
        <div className={`lg:flex lg:items-center lg:space-x-4 ${isOpen ? "block" : "hidden"} w-full lg:w-auto`}>
          <NavigationMenuItem href="/" icon={Home}>Home</NavigationMenuItem>
          <NavigationMenuItem href="/about" icon={Info}>About</NavigationMenuItem>
          <NavigationMenuItem href="/contact" icon={Mail}>Contact</NavigationMenuItem>
          <NavigationMenuItem href="/blog" icon={Book}>Blog</NavigationMenuItem>
          <NavigationMenuItem
            href="/services"
            icon={Briefcase}
            submenu={[
              { label: "Web Development", href: "/services/Web", icon: Briefcase },
              { label: "Mobile Development", href: "/services/Mobile", icon: Briefcase },
              { label: "Mobile UI/UX Design", href: "/services/ui-ux", icon: Briefcase }
            ]}
          >
            Services
          </NavigationMenuItem>
          <NavigationMenuItem href="/pricing" icon={DollarSign}>Pricing</NavigationMenuItem>
        </div>

        
        <div className={`lg:flex ${isOpen ? "block" : "hidden"} space-x-4`}>
          <Link href="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Login
          </Link>
          <Link href="/signup" className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">
            Signup
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavigationMenuItem({ href, children, submenu, icon: Icon }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative group">
      <Link
        href={href || "#"}
        className="flex items-center gap-2 p-2 hover:underline"
        onClick={() => setOpen(!open)}
      >
        {Icon && <Icon className="w-5 h-5" />} {children}
      </Link>

      {Array.isArray(submenu) && submenu.length > 0 && (
        <div className={`absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md transition-opacity duration-200 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}>
          {submenu.map((item, index) => (
            <Link key={index} href={item.href} className="flex items-center gap-2 block px-4 py-2 hover:bg-gray-200 text-black">
              {item.icon && <item.icon className="w-4 h-4" />} {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export { NavigationMenu };
