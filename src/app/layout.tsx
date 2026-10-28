
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { APP_NAME } from '@/lib/constants';
import { ThemeProvider } from '@/components/layout/theme-provider';
import CustomCursor from '@/components/feature/custom-cursor';
import { Playfair_Display, PT_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import ScrollToTopButton from '@/components/feature/scroll-to-top-button';

const fontHeadline = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-headline',
  weight: ['400', '700'],
  display: 'swap',
});

const fontBody = PT_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
  display: 'swap',
});


export const metadata: Metadata = {
  metadataBase: new URL('https://www.clipperly.com'),
  title: {
    default: `${APP_NAME} - Premium Barber Services`,
    template: `%s | ${APP_NAME}`,
  },
  description: `Discover ${APP_NAME}, your go-to barbershop for premium cuts, modern styles, and classic grooming. Book your appointment today for an exceptional barbering experience.`,
  keywords: ['barbershop', 'barber', 'haircut', 'men\'s grooming', 'hairstylist', 'beard trim', 'shave', 'Clipperly'],
  authors: [{ name: `${APP_NAME} Team`, url: 'https://www.clipperly.com' }],
  creator: `${APP_NAME} Team`,
  publisher: APP_NAME,
  openGraph: {
    title: `${APP_NAME} - Premium Barber Services`,
    description: `Experience the art of barbering at ${APP_NAME}. Modern styles, classic cuts, and exceptional service.`,
    url: 'https://www.clipperly.com',
    siteName: APP_NAME,
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: `A preview of the ${APP_NAME} barbershop experience.`,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${APP_NAME} - Premium Barber Services`,
    description: `Experience the art of barbering at ${APP_NAME}. Modern styles, classic cuts, and exceptional service.`,
    images: ['/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: ['/favicon-16x16.png', '/favicon-32x32.png'],
    apple: '/apple-touch-icon.png',
    other: [
        {
            rel: 'android-chrome-192x192',
            url: '/android-chrome-192x192.png'
        },
        {
            rel: 'android-chrome-512x512',
            url: '/android-chrome-512x512.png'
        }
    ]
  },
  manifest: '/site.webmanifest',
  alternates: {
    canonical: 'https://www.clipperly.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={cn(fontHeadline.variable, fontBody.variable)}>
      <body className="font-body antialiased flex flex-col min-h-screen">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
          <CustomCursor />
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster />
          <ScrollToTopButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
