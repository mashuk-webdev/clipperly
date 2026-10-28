
'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const monthlyRevenue = [
  { month: "Jan", revenue: 1860 },
  { month: "Feb", revenue: 3050 },
  { month: "Mar", revenue: 2370 },
  { month: "Apr", revenue: 7300 },
  { month: "May", revenue: 2090 },
  { month: "Jun", revenue: 2140 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
}

const servicesBreakdown = [
    { name: 'Classic Haircut', bookings: 400, fill: "var(--color-classic)" },
    { name: 'Modern Fade', bookings: 300, fill: "var(--color-fade)" },
    { name: 'Hot Towel Shave', bookings: 200, fill: "var(--color-shave)" },
    { name: 'Beard Trim', bookings: 278, fill: "var(--color-beard)" },
    { name: 'The Full Works', bookings: 189, fill: "var(--color-works)" },
]

const servicesChartConfig = {
    bookings: {
        label: "Bookings",
    },
    classic: { label: "Classic Cut", color: "hsl(var(--chart-1))" },
    fade: { label: "Modern Fade", color: "hsl(var(--chart-2))" },
    shave: { label: "Hot Towel Shave", color: "hsl(var(--chart-3))" },
    beard: { label: "Beard Trim", color: "hsl(var(--chart-4))" },
    works: { label: "The Full Works", color: "hsl(var(--chart-5))" },
}


export default function AdminAnalyticsPage() {
  return (
    <>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Analytics</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* These would be dynamic in a real app */}
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$18,889.00</div>
              <p className="text-xs text-muted-foreground">+15.2% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+1367</div>
               <p className="text-xs text-muted-foreground">+12.1% from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">Based on 250 reviews</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+112</div>
              <p className="text-xs text-muted-foreground">+5.2% from last month</p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
             <ChartContainer config={chartConfig} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyRevenue}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      tickMargin={10}
                      axisLine={false}
                    />
                     <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                  </BarChart>
              </ResponsiveContainer>
             </ChartContainer>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Services Breakdown</CardTitle>
             <CardDescription>Bookings distribution per service.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={servicesChartConfig} className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                <BarChart data={servicesBreakdown} layout="vertical" margin={{ left: 10 }}>
                   <CartesianGrid horizontal={false} />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    width={110}
                  />
                  <XAxis dataKey="bookings" type="number" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="bookings" radius={5} />
                </BarChart>
              </ResponsiveContainer>
             </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
