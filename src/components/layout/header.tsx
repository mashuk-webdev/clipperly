'use client';

import Link from 'next/link';
import { Menu, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { NAV_LINKS, APP_NAME } from '@/lib/constants';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/feature/theme-toggle';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const mobileNavContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { ease: 'easeOut' } },
  };

  return (
    <header
      className={cn(
        "bg-background/90 backdrop-blur-sm sticky top-0 z-50 transition-all duration-300 ease-in-out",
        isScrolled ? 'shadow-md h-16' : 'h-20'
      )}
    >
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Scissors className="h-8 w-8 text-accent group-hover:rotate-[-25deg] transition-transform duration-300 ease-in-out" />
          <span className="text-3xl font-headline font-bold tracking-tight group-hover:text-accent transition-colors">
            {APP_NAME}
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "group relative text-sm font-medium transition-colors hover:text-accent pb-1",
                pathname === link.href ? "text-accent" : "text-foreground/80"
              )}
            >
              {link.label}
              {pathname === link.href ? (
                 <motion.div
                  layoutId="active-nav-underline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              ) : (
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-accent transition-all duration-300 group-hover:w-full"></span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-sm hover:shadow-md transition-shadow transform hover:scale-105">
            <Link href="/book-appointment">Book Now</Link>
          </Button>
        </div>


        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/5 hover:text-accent">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] bg-background p-0 flex flex-col">
              <SheetHeader className="p-6 pb-0">
                <SheetTitle className="text-left">
                  <Link href="/" className="flex items-center gap-2 group">
                     <Scissors className="h-7 w-7 text-accent" />
                    <span className="text-2xl font-headline font-bold text-foreground group-hover:text-accent transition-colors">
                      {APP_NAME}
                    </span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              
              <motion.nav 
                className="flex flex-col gap-2 p-6 flex-1"
                variants={mobileNavContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {NAV_LINKS.map((link) => (
                   <SheetClose asChild key={link.href}>
                    <motion.div variants={mobileNavItemVariants}>
                      <Link
                        href={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-lg font-medium hover:bg-primary/5 hover:text-accent transition-all duration-200",
                          pathname === link.href ? "text-accent bg-primary/5" : "text-foreground/90"
                        )}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  </SheetClose>
                ))}
              </motion.nav>

              <div className="p-6 border-t">
                 <SheetClose asChild>
                    <Button asChild size="lg" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Link href="/book-appointment">Book Appointment</Link>
                    </Button>
                 </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
