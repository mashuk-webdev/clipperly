
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { getTestimonials } from '@/lib/data';
import type { Testimonial } from '@/types';
import { Quote, Edit } from 'lucide-react';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export const metadata: Metadata = {
  title: `Client Testimonials - What People Say About ${APP_NAME}`,
  description: `Read real testimonials from satisfied clients of ${APP_NAME}. Discover why our customers love our barbering services, skilled barbers, and welcoming atmosphere.`,
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Quote className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Words From Our Valued Clients
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Hear what people are saying about their ${APP_NAME} experience.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {testimonials.map((testimonial: Testimonial, index: number) => (
          <ScrollReveal key={testimonial.id} delay={index * 0.1}>
            <Card className="flex flex-col bg-card shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg h-full p-6 hover:-translate-y-2">
              <CardHeader className="p-0 pb-4">
                <Quote className="h-8 w-8 text-accent mb-4" />
                <CardTitle className="font-body text-lg leading-relaxed text-foreground">
                  "{testimonial.quote}"
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 flex-grow" />
              <CardFooter className="p-0 flex flex-col items-start pt-4 border-t">
                 <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-accent/20 text-accent font-bold">
                        {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-headline text-md font-semibold text-foreground">{testimonial.clientName}</p>
                      <p className="text-sm text-muted-foreground">Service: {testimonial.service}</p>
                    </div>
                  </div>
              </CardFooter>
            </Card>
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal className="text-center py-12 px-6 bg-primary/5 rounded-lg">
        <Edit className="h-10 w-10 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-headline font-bold text-foreground mb-4">Share Your Experience!</h2>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Loved your visit? Use our AI tool to help craft your own testimonial.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Link href="/ai-testimonial">
            Generate Your Testimonial
          </Link>
        </Button>
      </ScrollReveal>
    </div>
  );
}
