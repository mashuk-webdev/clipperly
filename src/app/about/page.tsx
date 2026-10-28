
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Award, Gem, Sparkles, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: `About Us - The Story of ${APP_NAME}`,
  description: `Learn about the history, values, and passion behind ${APP_NAME}. Discover our commitment to craftsmanship, community, and quality grooming services.`,
};

const values = [
    {
        icon: Gem,
        title: "Craftsmanship",
        description: "We are dedicated to the art and precision of barbering, constantly honing our skills to deliver perfection."
    },
    {
        icon: Users,
        title: "Community",
        description: `${APP_NAME} is more than a barbershop—it's a place to connect, relax, and feel at home.`
    },
    {
        icon: Award,
        title: "Quality",
        description: "We use only the finest products and techniques to ensure you look and feel your absolute best."
    },
    {
        icon: Sparkles,
        title: "Individuality",
        description: "Your style is unique, and we're here to help you express it with confidence and flair."
    }
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-20">
        <h1 className="text-4xl md:text-6xl font-headline font-bold text-foreground">
          The Heart of {APP_NAME}
        </h1>
        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
          More than just a barbershop, we are a cornerstone of style and community.
        </p>
      </ScrollReveal>

      <section className="grid md:grid-cols-2 gap-10 md:gap-16 items-center mb-20 md:mb-28">
        <ScrollReveal xOffset={-50} className="prose prose-lg text-foreground max-w-none">
          <h2 className="font-headline text-3xl md:text-4xl text-foreground mb-4">Our Story</h2>
          <p className="font-body leading-relaxed">
            {APP_NAME} was born from a passion for the timeless art of barbering and a desire to create a space
            where craftsmanship meets modern sophistication. Founded in 2010, our vision was simple: to offer
            exceptional grooming services in an atmosphere that feels both luxurious and welcoming.
          </p>
          <p className="font-body leading-relaxed">
            We believe that a great haircut is more than just a service—it’s an experience. From the moment you
            walk through our doors, you'll notice the difference. The rich scent of classic pomades, the sound
            of shears at work, and the warm camaraderie between barbers and clients – it all contributes to the
            unique {APP_NAME} ambiance.
          </p>
        </ScrollReveal>
        <ScrollReveal xOffset={50} className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300">
          <Image
            src="https://images.unsplash.com/photo-1553521041-d168abd31de3?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt={`Interior of ${APP_NAME} barbershop, showcasing a vintage and welcoming atmosphere.`}
            width={600}
            height={700}
            className="object-cover w-full h-full"
            data-ai-hint="vintage barbershop"
          />
        </ScrollReveal>
      </section>

      <section className="text-center mb-20 md:mb-28">
        <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">The principles that guide every cut, trim, and shave.</p>
        </ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {values.map((value, index) => (
                <ScrollReveal key={value.title} delay={index * 0.1}>
                    <div className="bg-card p-8 rounded-lg shadow-lg h-full border border-transparent hover:border-accent hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                        <value.icon className="h-10 w-10 text-accent mx-auto mb-4" />
                        <h3 className="text-xl font-headline font-semibold text-foreground">{value.title}</h3>
                        <p className="text-muted-foreground mt-2 text-sm">{value.description}</p>
                    </div>
                </ScrollReveal>
            ))}
        </div>
      </section>

      <ScrollReveal className="text-center py-10 bg-primary/5 rounded-lg">
         <Users className="h-12 w-12 text-accent mx-auto mb-4" />
        <h2 className="text-3xl font-headline font-bold text-foreground mb-4">
          Meet the Team Behind the Craft
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          Our talented barbers are the heart of {APP_NAME}. Discover their passion and expertise.
        </p>
        <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg">
          <Link href="/barbers">Our Barbers</Link>
        </Button>
      </ScrollReveal>
    </div>
  );
}
