
import { getBookings } from '@/lib/data';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { BookingTableCard } from './booking-table';
import type { Booking } from '@/types';

export default async function AdminBookingsPage() {
  const bookings = await getBookings();

  const filteredBookings = (status: Booking['status'] | 'all') => {
    if (status === 'all') return bookings;
    return bookings.filter(b => b.status === status);
  }

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Bookings</h1>
        <div className="ml-auto flex items-center gap-2">
           <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>
        </div>
      </div>
       <TabsContent value="all">
        <BookingTableCard 
          title="All Bookings"
          description="A list of all bookings in your system."
          bookings={filteredBookings('all')}
        />
       </TabsContent>
        <TabsContent value="pending">
          <BookingTableCard
            title="Pending Bookings"
            description="These bookings are awaiting your confirmation."
            bookings={filteredBookings('Pending')}
          />
        </TabsContent>
        <TabsContent value="confirmed">
          <BookingTableCard
            title="Confirmed Bookings"
            description="These bookings have been confirmed with the customer."
            bookings={filteredBookings('Confirmed')}
          />
        </TabsContent>
        <TabsContent value="completed">
          <BookingTableCard
            title="Completed Bookings"
            description="These are successfully completed appointments."
            bookings={filteredBookings('Completed')}
          />
        </TabsContent>
        <TabsContent value="cancelled">
          <BookingTableCard
            title="Cancelled Bookings"
            description="These bookings have been cancelled."
            bookings={filteredBookings('Cancelled')}
          />
        </TabsContent>
    </Tabs>
  );
}
