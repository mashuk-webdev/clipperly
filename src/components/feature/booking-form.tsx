
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Loader2, CalendarIcon, Clock, User, Mail, Phone, Scissors, Users } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import type { Barber, Service } from '@/types';
import { motion, Variants } from 'framer-motion';

const bookingFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
  serviceId: z.string({ required_error: 'Please select a service.' }),
  barberId: z.string({ required_error: 'Please select a barber.' }),
  date: z.date({ required_error: 'Please select a date.' }),
  time: z.string({ required_error: 'Please select a time.' }),
});

type BookingFormData = z.infer<typeof bookingFormSchema>;

type BookingFormProps = {
  services: Service[];
  barbers: Barber[];
}

const availableTimes = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '01:30 PM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
  '04:00 PM', '04:30 PM'
];

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

export default function BookingForm({ services, barbers }: BookingFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingFormSchema),
  });

  const selectedDate = watch('date');
  const selectedTime = watch('time');

  const onSubmit: SubmitHandler<BookingFormData> = async (data) => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            ...data,
            date: data.date.toISOString(), // Send date as ISO string
        }),
      });

      if (!response.ok) {
        throw new Error('Something went wrong. Please try again.');
      }

      toast({
        title: 'Appointment Request Sent!',
        description: `Thank you, ${data.name}. We've received your request for ${format(data.date, 'PPP')} at ${data.time}. We will contact you shortly to confirm.`,
      });
      reset();
    } catch (error) {
       toast({
        title: 'Error!',
        description: (error as Error).message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="shadow-xl border">
      <CardHeader>
        <CardTitle className="font-headline text-3xl text-foreground">Schedule Your Visit</CardTitle>
        <CardDescription>Fill in your details to request an appointment.</CardDescription>
      </CardHeader>
      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="name" className="font-semibold flex items-center gap-2"><User className="h-4 w-4 text-accent" />Full Name</Label>
            <Input id="name" placeholder="John Doe" {...register('name')} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="email" className="font-semibold flex items-center gap-2"><Mail className="h-4 w-4 text-accent" />Email Address</Label>
            <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </motion.div>
          
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="phone" className="font-semibold flex items-center gap-2"><Phone className="h-4 w-4 text-accent" />Phone Number</Label>
            <Input id="phone" type="tel" placeholder="(555) 123-4567" {...register('phone')} />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
             <Label htmlFor="date" className="font-semibold flex items-center gap-2"><CalendarIcon className="h-4 w-4 text-accent" />Preferred Date</Label>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) || date.getDay() === 0} // Sundays are disabled
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
            {errors.date && <p className="text-sm text-destructive">{errors.date.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2 md:col-span-2">
            <Label className="font-semibold flex items-center gap-2"><Clock className="h-4 w-4 text-accent" /> Preferred Time</Label>
            <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      type="button"
                      variant={field.value === time ? 'default' : 'outline'}
                      onClick={() => field.onChange(time)}
                      className={cn(
                        "transition-all duration-300 transform hover:scale-105",
                        field.value === time 
                          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                          : 'border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
                )}
            />
            {errors.time && <p className="text-sm text-destructive">{errors.time.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="serviceId" className="font-semibold flex items-center gap-2"><Scissors className="h-4 w-4 text-accent" />Service</Label>
            <Controller
                name="serviceId"
                control={control}
                render={({ field }) => (
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                            {services.map(service => (
                            <SelectItem key={service.id} value={service.id}>
                                {service.name} - {service.price}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.serviceId && <p className="text-sm text-destructive">{errors.serviceId.message}</p>}
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="barberId" className="font-semibold flex items-center gap-2"><Users className="h-4 w-4 text-accent" />Preferred Barber</Label>
             <Controller
                name="barberId"
                control={control}
                render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a barber" />
                        </SelectTrigger>
                        <SelectContent>
                            {barbers.map(barber => (
                            <SelectItem key={barber.id} value={barber.id}>{barber.name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {errors.barberId && <p className="text-sm text-destructive">{errors.barberId.message}</p>}
          </motion.div>

        </CardContent>
        <CardFooter>
          <motion.div variants={itemVariants} className="w-full">
            <Button type="submit" size="lg" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Request Appointment
            </Button>
          </motion.div>
        </CardFooter>
      </motion.form>
    </Card>
  );
}
