
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Booking } from '@/types';

type BookingTableCardProps = {
  title: string;
  description: string;
  bookings: Booking[];
}

export function BookingTableCard({ title, description, bookings }: BookingTableCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Barber</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Price</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length > 0 ? bookings.map((booking) => (
              <TableRow key={booking.id}>
                <TableCell className="font-medium">{booking.customerName}</TableCell>
                <TableCell>{booking.barberName}</TableCell>
                <TableCell>{booking.serviceName}</TableCell>
                <TableCell>{booking.date} at {booking.time}</TableCell>
                <TableCell>
                  <Badge variant={
                    booking.status === 'Completed' ? 'default' :
                    booking.status === 'Confirmed' ? 'secondary' :
                    booking.status === 'Cancelled' ? 'destructive' :
                    'outline'
                  }>{booking.status}</Badge>
                </TableCell>
                <TableCell className="text-right">{booking.price}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No bookings found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>{bookings.length}</strong> of <strong>{bookings.length}</strong> bookings
        </div>
      </CardFooter>
    </Card>
  );
}
