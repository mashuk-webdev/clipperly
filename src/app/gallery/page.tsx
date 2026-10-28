
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { APP_NAME } from '@/lib/constants';
import { getGalleryImages } from '@/lib/data';
import type { Metadata } from 'next';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Camera } from 'lucide-react';

export const metadata: Metadata = {
  title: `Gallery - Our Stylebook | ${APP_NAME}`,
  description: `Explore our gallery of latest haircuts, styles, and beard trims. Get inspired for your next visit to ${APP_NAME}.`,
};

export default async function GalleryPage() {
  const galleryImages = await getGalleryImages();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Camera className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Our Stylebook & Gallery
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          A showcase of our craft. Find inspiration for your next look from our collection of fresh cuts and styles.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryImages.map((image, index) => (
          <ScrollReveal key={image.id} delay={index * 0.05}>
            <Card className="overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="relative h-64 w-full">
                <Image
                  src={image.src}
                  alt={image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={image.dataAiHint}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                  <p className="text-white text-center font-headline text-lg">{image.alt}</p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
