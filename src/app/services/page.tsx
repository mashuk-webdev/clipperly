
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { getServices } from '@/lib/data';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Scissors, Clock, DollarSign } from 'lucide-react';
import { RazorIcon, CombIcon } from '@/components/ui/icons';
import { ScrollReveal } from '@/components/feature/scroll-reveal';

export const metadata: Metadata = {
  title: `Our Services - What We Offer | ${APP_NAME}`,
  description: `Explore the wide range of grooming services at ${APP_NAME}, from classic haircuts and modern fades to luxury hot towel shaves and expert beard sculpting.`,
};

const iconMap: { [key: string]: React.ElementType } = {
  Scissors: Scissors,
  Razor: RazorIcon,
  Comb: CombIcon,
};

export default async function ServicesPage() {
  const services = await getServices();
  
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Scissors className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Our Grooming Services
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Crafted with precision, tailored for the modern gentleman. We offer a comprehensive range of services to ensure you look and feel your best.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => {
          const IconComponent = iconMap[service.icon];
          return (
            <ScrollReveal key={service.id} delay={index * 0.1}>
              <Card className="flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden group h-full border-2 border-transparent hover:border-accent hover:-translate-y-2">
                <CardHeader className="p-6">
                   <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent rounded-full w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                      {IconComponent && <IconComponent className="h-8 w-8 text-accent-foreground" />}
                    </div>
                    <CardTitle className="font-headline text-2xl text-foreground">{service.name}</CardTitle>
                  </div>
                  <CardDescription className="font-body text-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow" />
                <CardFooter className="bg-muted/50 p-4 flex justify-between items-center text-sm font-semibold border-t">
                  <div className="flex items-center gap-2 text-foreground">
                    <DollarSign className="h-4 w-4 text-accent" />
                    <span>{service.price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground">
                    <Clock className="h-4 w-4 text-accent" />
                    <span>{service.duration}</span>
                  </div>
                </CardFooter>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>

       <ScrollReveal className="text-center mt-16">
        <h2 className="text-3xl font-headline font-bold text-foreground mb-4">Ready to Book?</h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Choose a service and book your appointment with one of our expert barbers today.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Link href="/book-appointment">Book an Appointment</Link>
        </Button>
      </ScrollReveal>
    </div>
  );
}
