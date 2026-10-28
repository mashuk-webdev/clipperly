
import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import type { Service, Barber, Booking } from '@/types';
import { format } from 'date-fns';

// Schema for validating incoming booking data
const bookingRequestSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  serviceId: z.string(),
  barberId: z.string(),
  date: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  time: z.string(),
});

// Path to the JSON database file
const dataPath = path.join(process.cwd(), 'data.json');

// Helper to read the database
const readDB = async () => {
  try {
    const data = await fs.readFile(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file:", error);
    throw new Error("Could not read database.");
  }
};

// Helper to write to the database
const writeDB = async (data: any) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Error writing to database file:", error);
    throw new Error("Could not write to database.");
  }
};

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const bookingData = bookingRequestSchema.parse(json);
    
    const db = await readDB();
    
    const service = db.services.find((s: Service) => s.id === bookingData.serviceId);
    const barber = db.barbers.find((b: Barber) => b.id === bookingData.barberId);

    if (!service || !barber) {
      return NextResponse.json({ error: 'Invalid service or barber selected.' }, { status: 400 });
    }

    const newBooking: Booking = {
      id: `b${Date.now()}`,
      customerName: bookingData.name,
      barberName: barber.name,
      serviceName: service.name,
      date: format(new Date(bookingData.date), 'yyyy-MM-dd'),
      time: bookingData.time,
      status: 'Pending', // All new bookings are initially pending
      price: service.price,
    };

    db.bookings.push(newBooking);
    await writeDB(db);

    return NextResponse.json({ message: 'Booking created successfully', data: newBooking }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('API Error (POST /api/bookings):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
