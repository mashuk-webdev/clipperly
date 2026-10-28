
import type { Barber, GalleryImage, Service, Testimonial, Customer, Booking } from '@/types';
import db from '../../data.json';

// The data is now available synchronously at build time.
// We keep the async signature to avoid having to change the calling pages (which use await).
// This also makes it easy to switch to a real API later.

export async function getBarbers(): Promise<Barber[]> {
  return db.barbers || [];
}

export async function getServices(): Promise<Service[]> {
  return db.services || [];
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return db.testimonials || [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  return db.galleryImages || [];
}

export async function getServiceHighlights() {
  const db = await readDB();
  return db.serviceHighlights || [];
}

export async function getCustomers(): Promise<Customer[]> {
  return db.customers || [];
}

export async function getBookings(): Promise<Booking[]> {
  return db.bookings || [];
}

// @ts-ignore
async function readDB() {
  return db;
}
