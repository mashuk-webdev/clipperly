
import type { LucideIcon } from 'lucide-react';

export type NavLink = {
  href: string;
  label: string;
  icon?: React.ReactNode;
};

export type SocialLink = {
  href: string;
  icon: LucideIcon;
  label: string;
};

export type Barber = {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  bio: string;
  dataAiHint?: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  service: string;
};

export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  dataAiHint: string;
};

export type Service = {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  icon: 'Scissors' | 'Razor' | 'Comb' | string;
};

export type Customer = {
  id: string;
  name: string;
  email: string;
  totalSpent: string;
  bookings: number;
}

export type Booking = {
  id: string;
  customerName: string;
  barberName: string;
  serviceName: string;
  date: string;
  time: string;
  status: 'Confirmed' | 'Completed' | 'Pending' | 'Cancelled';
  price: string;
}
