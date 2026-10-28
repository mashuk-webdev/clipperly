
import TestimonialGeneratorForm from '@/components/feature/testimonial-generator-form';
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import { ScrollReveal } from '@/components/feature/scroll-reveal';
import { Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: `AI Testimonial Generator - Share Your ${APP_NAME} Experience`,
  description: `Use our innovative AI tool to easily craft a testimonial for your experience at ${APP_NAME}. Just provide a few details, and let our AI help you write a great review!`,
};

export default function AITestimonialPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <Sparkles className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          AI Testimonial Generator
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          Need help wording your experience? Let our AI assistant craft a testimonial for you!
          Simply tell us about the service and your barber.
        </p>
      </ScrollReveal>

      <ScrollReveal className="max-w-2xl mx-auto" delay={0.2}>
        <TestimonialGeneratorForm />
      </ScrollReveal>
    </div>
  );
}
