
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: `Contact Us - Get in Touch with ${APP_NAME}`,
  description: `Contact ${APP_NAME} for appointments, inquiries, or directions. Find our address, phone number, email, and a map to our barbershop. We look forward to hearing from you!`,
};

export default function ContactPage() {
  const address = '123, Vijay Vihar, Delhi, India';
  const encodedAddress = encodeURIComponent(address);
  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  const googleMapsDirectionUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  const contactDetails = [
    {
      icon: Mail,
      label: 'Email Us',
      value: 'guptavanshul484@gmail.com',
      href: 'mailto:guptavanshul484@gmail.com',
    },
    {
      icon: Phone,
      label: 'Call Us',
      value: '+91 93542 02593',
      href: 'tel:+919354202593',
    },
    {
      icon: MapPin,
      label: 'Visit Us',
      value: address,
      href: googleMapsDirectionUrl,
      target: '_blank'
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Mail className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          We're here to answer your questions, book your appointments, or just chat about great hair.
        </p>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Contact & Business Hours Section */}
        <ScrollReveal xOffset={-50}>
          <Card className="shadow-lg h-full transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
            <CardHeader>
              <CardTitle className="font-headline text-3xl text-foreground">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-4">
                {contactDetails.map((detail, index) => (
                  <ScrollReveal as="li" delay={index * 0.1} key={detail.label}>
                    <a
                      href={detail.href}
                      target={detail.target || '_self'}
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 group p-2 rounded-lg -m-2 hover:bg-accent/10 transition-colors"
                    >
                      <detail.icon className="h-8 w-8 text-accent flex-shrink-0 transition-transform group-hover:scale-110" />
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{detail.label}</h3>
                        <p className="text-muted-foreground group-hover:text-accent transition-colors">{detail.value}</p>
                      </div>
                    </a>
                  </ScrollReveal>
                ))}
              </ul>

              <Separator className="my-6" />
              
              <ScrollReveal delay={0.4}>
                <h3 className="font-headline text-2xl text-foreground mb-3">Business Hours</h3>
                <div className="text-muted-foreground space-y-1">
                  <div className="flex justify-between"><span>Monday - Friday:</span> <span>9 AM - 7 PM</span></div>
                  <div className="flex justify-between"><span>Saturday:</span> <span>9 AM - 5 PM</span></div>
                  <div className="flex justify-between"><span>Sunday:</span> <span className="font-semibold text-destructive/80">Closed</span></div>
                </div>
              </ScrollReveal>
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Map & Social Media Section */}
        <div className="space-y-8">
          <ScrollReveal xOffset={50}>
            <Card className="shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-foreground">Find Our Shop</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-md overflow-hidden border">
                  <iframe
                    src={googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={`${APP_NAME} Location Map`}
                  ></iframe>
                </div>
                <Button variant="outline" asChild className="mt-4 w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
                    <a href={googleMapsDirectionUrl} target="_blank" rel="noopener noreferrer">
                      Get Directions <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
              </CardContent>
            </Card>
          </ScrollReveal>

          <ScrollReveal xOffset={50} delay={0.1}>
            <Card className="shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
              <CardHeader>
                <CardTitle className="font-headline text-3xl text-foreground">Connect With Us</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                {SOCIAL_LINKS.map((link) => (
                  <Button key={link.label} variant="outline" size="lg" asChild className="border-primary/50 hover:border-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105">
                    <a href={link.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2">
                      <link.icon className="h-5 w-5" />
                      <span>{link.label}</span>
                    </a>
                  </Button>
                ))}
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
