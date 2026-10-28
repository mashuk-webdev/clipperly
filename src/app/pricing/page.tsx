
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { getServices } from '@/lib/data';
import type { Metadata } from 'next';
import { DollarSign, Clock } from 'lucide-react';
import { ScrollReveal } from '@/components/feature/scroll-reveal';

export const metadata: Metadata = {
  title: `Pricing - Our Service Menu | ${APP_NAME}`,
  description: `Find detailed pricing for all our services at ${APP_NAME}. Get transparent pricing for haircuts, shaves, beard trims, and grooming packages.`,
};

export default async function PricingPage() {
  const services = await getServices();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <DollarSign className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Our Service Pricing
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Transparent pricing for premium services. No hidden fees, just exceptional quality.
        </p>
      </ScrollReveal>

      <div className="space-y-6 max-w-4xl mx-auto">
        {services.map((service, index) => (
            <ScrollReveal key={service.id} delay={index * 0.05} yOffset={20}>
                <Card className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 shadow-lg hover:shadow-2xl hover:border-accent border-2 border-transparent transition-all duration-300 hover:-translate-y-1 group">
                    <div className="flex-1 mb-4 md:mb-0 pr-4">
                        <h3 className="text-xl font-headline font-semibold text-foreground transition-colors group-hover:text-accent">{service.name}</h3>
                        <p className="text-muted-foreground mt-1 text-sm">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-6 md:gap-8 w-full md:w-auto shrink-0">
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="h-5 w-5 text-accent" />
                            <span className="font-medium text-foreground">{service.duration}</span>
                        </div>
                        <div className="flex-grow text-right md:text-left">
                           <span className="text-2xl font-bold text-foreground">{service.price}</span>
                        </div>
                    </div>
                </Card>
            </ScrollReveal>
        ))}
      </div>
      
      <ScrollReveal className="text-center mt-16">
        <h2 className="text-3xl font-headline font-bold text-foreground mb-4">Ready for Your Transformation?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Your new look is just an appointment away. Book now to experience the best.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Link href="/book-appointment">Book Now</Link>
        </Button>
      </ScrollReveal>
    </div>
  );
}
