"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Search, Moon, Sun, ChevronDown, XCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const DesktopNav = () => (
    <div className="hidden md:flex items-center gap-6">
      <Button variant="ghost" asChild>
        <a href="/about-us">About Us</a>
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            Our Work <ChevronDown className="ml-1 w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <div className="grid gap-2 p-4">
            <div className="font-semibold">Our Work</div>
            <a href="#" className="hover:underline">
              Bitcoin Diploma
            </a>
            <a href="#" className="hover:underline">
              Meetups
            </a>
            <a href="#" className="hover:underline">
              Xonghoti Podcast
            </a>
            <a href="blog" className="hover:underline">
              Blog
            </a>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" asChild>
        <a href="/take-action">Take Action</a>
      </Button>
      <div className="flex items-center">
        <Search className="w-4 h-4 text-gray-500" />
        <Input
          type="search"
          placeholder="Search..."
          className="ml-2 w-32 md:w-48 h-8 text-sm"
        />
      </div>
      <Select value={language} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-24 h-8">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="as">Assamese</SelectItem>
        </SelectContent>
      </Select>
      {mounted && (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="h-8 w-8"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      )}
      <Button
        variant="default"
        className="bg-yellow-500 hover:bg-yellow-600 text-black h-9"
        asChild
      >
        <a
          href="https://geyser.fund/project/xonghoti"
          target="_blank"
          rel="noopener noreferrer"
        >
          Donate
        </a>
      </Button>
    </div>
  );

  const MobileNav = () => (
    <div className="md:hidden">
      <div className="flex items-center justify-between">
        <button
          onClick={toggleMobileMenu}
          className="md:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 flex">
          <div className="bg-background w-80 p-6 space-y-4 relative">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close mobile menu"
            >
              <XCircle className="h-6 w-6" />
            </button>
            <a href="/about-us" className="block py-2">
              About Us
            </a>
            <div>
              <div className="font-semibold py-2">Our Work</div>
              <a href="#" className="block py-2 pl-4">
                Bitcoin Diploma
              </a>
              <a href="#" className="block py-2 pl-4">
                Meetups
              </a>
              <a href="#" className="block py-2 pl-4">
                Xonghoti Podcast
              </a>
              <a href="blog" className="block py-2 pl-4">
                Blog
              </a>
            </div>
            <a href="/take-action" className="block py-2">
              Take Action
            </a>
            <a
              href="https://geyser.fund/project/xonghoti"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2"
            >
              Donate
            </a>
            <div className="py-2">
              <Select value={language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="as">Assamese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-8 w-8"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <nav className="bg-background border-b border-border">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold flex items-center">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span>Rikto Xonghoti</span>
        </Link>
        <DesktopNav />
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
