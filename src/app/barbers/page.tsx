
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { APP_NAME } from '@/lib/constants';
import { getBarbers } from '@/lib/data';
import type { Barber } from '@/types';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Users } from 'lucide-react';

export const metadata: Metadata = {
  title: `Our Barbers - Meet the Skilled Team at ${APP_NAME}`,
  description: `Get to know the talented and experienced barbers at ${APP_NAME}. Discover their specialties and find the perfect stylist for your next haircut or grooming service.`,
};

export default async function BarbersPage() {
  const barbers = await getBarbers();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Users className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Meet Our Talented Barbers
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          The artisans behind your perfect look. Dedicated, skilled, and passionate about their craft.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {barbers.map((barber: Barber, index) => (
          <ScrollReveal key={barber.id} delay={index * 0.1}>
            <Card className="group flex flex-col overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg h-full hover:-translate-y-2">
              <div className="relative h-72 w-full overflow-hidden">
                <Image
                  src={barber.imageUrl}
                  alt={`Portrait of ${barber.name}, ${barber.specialty} at ${APP_NAME}`}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 ease-in-out group-hover:scale-105"
                  data-ai-hint={barber.dataAiHint || "barber portrait"}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-2xl text-foreground">{barber.name}</CardTitle>
                <CardDescription className="text-accent font-semibold">{barber.specialty}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm font-body">{barber.bio}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105" asChild>
                  <Link href="/book-appointment">Book with {barber.name.split(' ')[0]}</Link>
                </Button>
              </CardFooter>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
