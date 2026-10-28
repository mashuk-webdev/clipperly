
import { NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import type { Service } from '@/types';

// Define the same schema as the frontend for validation
const serviceSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(10),
  price: z.string().regex(/^\$\d+(\.\d{2})?$/),
  duration: z.string().min(5),
});

const serviceUpdateSchema = serviceSchema.extend({
  id: z.string(),
});

const serviceDeleteSchema = z.object({
  id: z.string(),
});

// Path to the JSON database file
const dataPath = path.join(process.cwd(), 'data.json');

// Helper to read the database
const readDB = async () => {
  const data = await fs.readFile(dataPath, 'utf-8');
  return JSON.parse(data);
};

// Helper to write to the database
const writeDB = async (data: any) => {
  await fs.writeFile(dataPath, JSON.stringify(data, null, 2), 'utf-8');
};

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const newServiceData = serviceSchema.parse(json);
    const db = await readDB();
    
    const newService: Service = {
      ...newServiceData,
      id: `s${Date.now()}`,
      icon: 'Scissors', // Default icon for new services
    };

    db.services.push(newService);
    await writeDB(db);

    return NextResponse.json({ message: 'Service added successfully', data: newService }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('API Error (POST):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const json = await request.json();
    const serviceToUpdate = serviceUpdateSchema.parse(json);
    const db = await readDB();

    const serviceIndex = db.services.findIndex((s: Service) => s.id === serviceToUpdate.id);

    if (serviceIndex === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    db.services[serviceIndex] = { ...db.services[serviceIndex], ...serviceToUpdate };
    await writeDB(db);

    return NextResponse.json({ message: 'Service updated successfully', data: db.services[serviceIndex] }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('API Error (PUT):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const json = await request.json();
    const serviceToDelete = serviceDeleteSchema.parse(json);
    const db = await readDB();

    const initialLength = db.services.length;
    db.services = db.services.filter((s: Service) => s.id !== serviceToDelete.id);

    if (db.services.length === initialLength) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await writeDB(db);

    return NextResponse.json({ message: 'Service deleted successfully' }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error('API Error (DELETE):', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
