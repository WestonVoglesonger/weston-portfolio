"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './theme-toggle';


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/90">
      <div className="container mx-auto max-w-5xl flex h-14 items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link className="flex items-center" href="/">
            <Image 
              src="/portfolio-logo.png?v=2" 
              alt="Weston Voglesonger Logo" 
              width={32} 
              height={32}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="hidden gap-6 text-sm md:flex">
            <Link className="hover:underline" href="/projects">
              Projects
            </Link>
            <Link className="hover:underline" href="/writings">
              Writings
            </Link>
            <Link className="hover:underline" href="/about">
              About
            </Link>
            <Link className="hover:underline" href="/experience">
              Experience
            </Link>
            <Link className="hover:underline" href="/contact">
              Contact
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}


