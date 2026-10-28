
import Link from 'next/link';
import { SOCIAL_LINKS, APP_NAME, NAV_LINKS } from '@/lib/constants';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Scissors, ArrowRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Footer() {
  // A selection of important links for the footer
  const footerNavLinks = [
    NAV_LINKS.find(link => link.label === 'Home'),
    NAV_LINKS.find(link => link.label === 'Services'),
    NAV_LINKS.find(link => link.label === 'Our Barbers'),
    NAV_LINKS.find(link => link.label === 'Contact'),
  ].filter(Boolean); // Filter out any undefined links if labels change

  return (
    <ScrollReveal as="footer" className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center md:text-left">
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center justify-center md:justify-start gap-2 group w-fit mx-auto md:mx-0">
              <Scissors className="h-8 w-8 text-accent group-hover:rotate-[-25deg] transition-transform duration-300 ease-in-out" />
              <span className="text-3xl font-headline font-bold tracking-tight group-hover:text-accent transition-colors">
                {APP_NAME}
              </span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              The Art of Precision Grooming. <br/> Where timeless tradition meets modern sophistication.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-semibold text-accent">Quick Links</h3>
            <ul className="space-y-2">
              {footerNavLinks.map((link) => (
                link && (
                  <li key={link.href} className="group w-fit mx-auto md:mx-0">
                    <Link
                      href={link.href}
                      className="relative text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                    >
                      {link.label}
                       <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent transition-all duration-300 ease-in-out group-hover:w-full"></span>
                    </Link>
                  </li>
                )
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="space-y-4">
             <h3 className="font-headline text-xl font-semibold text-accent">Visit Us</h3>
             <address className="text-sm text-primary-foreground/70 not-italic space-y-1">
                <p>123, Vijay Vihar</p>
                <p>Delhi, India</p>
                <p className="pt-2">
                  <a href="tel:+919354202593" className="hover:text-accent transition-colors">+91 93542 02593</a>
                </p>
             </address>
          </div>

          {/* Column 4: Newsletter & Social */}
          <div className="space-y-4">
            <h3 className="font-headline text-xl font-semibold text-accent">Stay Updated</h3>
            <p className="text-sm text-primary-foreground/70">
              Get the latest news and special offers directly in your inbox.
            </p>
            <form className="flex w-full max-w-sm items-center space-x-2">
                <Input
                  type="email"
                  placeholder="Your Email"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-accent focus:ring-accent"
                  aria-label="Email for newsletter"
                />
                <Button type="submit" size="icon" className="bg-accent hover:bg-accent/90 text-accent-foreground flex-shrink-0">
                  <ArrowRight className="h-4 w-4" />
                  <span className="sr-only">Subscribe</span>
                </Button>
            </form>
            <div className="flex justify-center md:justify-start gap-5 pt-4">
              {SOCIAL_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-primary-foreground hover:text-accent transition-all duration-300 transform hover:scale-125"
                >
                  <link.icon className="h-6 w-6" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            &copy; {new Date().getFullYear()} {APP_NAME}. All Rights Reserved.
          </p>
          <div className="text-xs text-primary-foreground/50">
             <Link href="/admin/dashboard" className="hover:text-accent transition-colors">
              Admin Panel
            </Link>
          </div>
        </div>
      </div>
    </ScrollReveal>
  );
}
