
import type { Metadata } from 'next';
import { APP_NAME } from '@/lib/constants';
import BookingForm from '@/components/feature/booking-form';
import { CalendarCheck } from 'lucide-react';
import { getBarbers, getServices } from '@/lib/data';
import { ScrollReveal } from '@/components/feature/scroll-reveal';

export const metadata: Metadata = {
  title: `Book an Appointment - ${APP_NAME}`,
  description: `Schedule your next visit at ${APP_NAME}. Choose your service, barber, and preferred time with our easy-to-use booking form.`,
};

export default async function BookAppointmentPage() {
  const services = await getServices();
  const barbers = await getBarbers();

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <ScrollReveal as="header" className="text-center mb-12 md:mb-16">
        <CalendarCheck className="h-12 w-12 text-accent mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-foreground">
          Book Your Appointment
        </h1>
        <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">
          We can't wait to see you. Fill out the form below to schedule your visit.
        </p>
      </ScrollReveal>

      <ScrollReveal className="max-w-2xl mx-auto" delay={0.2}>
        <BookingForm services={services} barbers={barbers} />
      </ScrollReveal>
    </div>
  );
}
