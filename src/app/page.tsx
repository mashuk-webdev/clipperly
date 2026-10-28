import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Scissors,
  Users,
  Quote,
  Edit,
  MapPin,
  BookOpen,
  Camera,
  DollarSign,
  Clock,
} from "lucide-react";
import { APP_NAME } from "@/lib/constants";
import {
  getBarbers,
  getGalleryImages,
  getServices,
  getTestimonials,
} from "@/lib/data";
import { RazorIcon, CombIcon } from "@/components/ui/icons";
import type { Barber, GalleryImage, Service, Testimonial } from "@/types";
import type { Metadata } from "next";
import { ScrollReveal } from "@/components/feature/scroll-reveal";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: `Home - Welcome to ${APP_NAME}`,
  description: `Your premier destination for top-quality barber services. Explore our classic cuts, modern styles, expert shaves, and meet our talented barbers. Book your experience at ${APP_NAME} today!`,
};

// Helper to map icon names to components
const iconMap: { [key: string]: React.ElementType } = {
  Scissors: Scissors,
  Razor: RazorIcon,
  Comb: CombIcon,
};

export default async function Home() {
  const allServices = await getServices();
  const allBarbers = await getBarbers();
  const allTestimonials = await getTestimonials();
  const galleryImages = await getGalleryImages();

  const previewServices = allServices.slice(0, 3);
  const previewBarbers = allBarbers;
  const previewTestimonials = allTestimonials;

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[80vh] md:h-screen flex items-center justify-center text-center overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
          poster="https://images.unsplash.com/photo-1517832606299-7ae9b720a186?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhcmJlcnxlbnwwfHwwfHx8MA%3D%3D"
        >
          <source src="/videos/barber-hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <ScrollReveal
            as="h1"
            delay={0.1}
            yOffset={60}
            className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold mb-6 leading-tight [text-shadow:_0_4px_12px_rgba(0,0,0,0.6)]"
          >
            The Art of Precision Grooming
          </ScrollReveal>
          <ScrollReveal
            as="p"
            delay={0.3}
            yOffset={50}
            className="text-lg md:text-xl mb-10 max-w-2xl mx-auto [text-shadow:_0_2px_6px_rgba(0,0,0,0.6)]"
          >
            Where timeless tradition meets modern sophistication. Your signature
            look awaits.
          </ScrollReveal>
          <ScrollReveal
            yOffset={40}
            delay={0.5}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Link href="/book-appointment">Book Your Experience</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-accent text-white bg-white/10 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl backdrop-blur-sm"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Service Highlights Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <h2 className="text-4xl font-headline font-bold text-foreground">
              Our Signature Services
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Crafted with precision, tailored for you.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewServices.map((service: Service, index: number) => {
              const IconComponent = iconMap[service.icon];
              return (
                <ScrollReveal key={service.id} delay={index * 0.1}>
                  <Card className="flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg overflow-hidden group h-full border-2 border-transparent hover:border-accent hover:-translate-y-2">
                    <CardHeader className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="p-3 bg-accent rounded-full w-fit transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                          {IconComponent && (
                            <IconComponent className="h-8 w-8 text-accent-foreground" />
                          )}
                        </div>
                        <CardTitle className="font-headline text-2xl text-foreground">
                          {service.name}
                        </CardTitle>
                      </div>
                      <CardDescription className="font-body text-base text-muted-foreground">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <CardFooter className="bg-muted/50 p-4 flex justify-between items-center text-sm font-semibold border-t">
                      <div className="flex items-center gap-2 text-foreground">
                        <DollarSign className="h-4 w-4 text-accent" />
                        <span>{service.price}</span>
                      </div>
                      <div className="flex items-center gap-2 text-foreground">
                        <Clock className="h-4 w-4 text-accent" />
                        <span>{service.duration}</span>
                      </div>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Link href="/services">
                View All Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* A Glimpse Into Our Story (from About Us) */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <BookOpen className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-headline font-bold text-foreground">
              A Glimpse Into Our Story
            </h2>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              Discover the passion and tradition behind {APP_NAME}.
            </p>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <ScrollReveal
              xOffset={-50}
              className="rounded-lg overflow-hidden shadow-xl transform hover:scale-105 transition-transform duration-300"
            >
              <Image
                src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={`${APP_NAME} barbershop atmosphere`}
                width={600}
                height={400}
                className="object-cover w-full h-full"
                data-ai-hint="vintage barbershop"
              />
            </ScrollReveal>
            <ScrollReveal
              xOffset={50}
              className="prose prose-lg text-foreground max-w-none"
            >
              <p className="font-body leading-relaxed">
                {APP_NAME} was born from a passion for the timeless art of
                barbering and a desire to create a space where craftsmanship
                meets modern sophistication. Founded in 2010, our vision was
                simple: to offer exceptional grooming services in an atmosphere
                that feels both luxurious and welcoming.
              </p>
              <p className="font-body leading-relaxed mt-4">
                We believe that a great haircut is more than just a service—it’s
                an experience. From the moment you walk through our doors,
                you'll notice the difference.
              </p>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="mt-8 border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Link href="/about">
                  Read Our Full Story <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Meet Our Expert Barbers (from Our Barbers) */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <Users className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-headline font-bold text-foreground">
              Meet Our Expert Barbers
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              The artisans ready to craft your perfect look.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewBarbers.map((barber: Barber, index: number) => (
              <ScrollReveal key={barber.id} delay={index * 0.1}>
                <Card className="flex flex-col group overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg h-full hover:-translate-y-2">
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      priority={index === 0}
                      src={barber.imageUrl}
                      alt={`Portrait of ${barber.name}, ${barber.specialty} at ${APP_NAME}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint={barber.dataAiHint || "barber portrait"}
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline text-2xl text-foreground">
                      {barber.name}
                    </CardTitle>
                    <CardDescription className="text-accent font-semibold">
                      {barber.specialty}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-muted-foreground text-sm font-body line-clamp-3">
                      {barber.bio}
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Link href="/barbers">Meet The Full Team</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* What Our Clients Say (from Testimonials) */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <ScrollReveal className="text-center mb-12">
            <Quote className="h-12 w-12 text-accent mx-auto mb-4" />
            <h2 className="text-4xl font-headline font-bold text-foreground">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground mt-2">
              Real words from real happy customers.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {previewTestimonials.map(
              (testimonial: Testimonial, index: number) => (
                <ScrollReveal key={testimonial.id} delay={index * 0.1}>
                  <Card className="flex flex-col bg-card shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg h-full p-6 hover:-translate-y-2">
                    <CardHeader className="p-0 pb-4">
                      <CardTitle className="font-body text-lg leading-relaxed text-foreground">
                        "{testimonial.quote}"
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow" />
                    <CardFooter className="p-0 flex flex-col items-start pt-4 border-t">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-accent/20 text-accent font-bold">
                            {testimonial.clientName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-headline text-md font-semibold text-foreground">
                            {testimonial.clientName}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Service: {testimonial.service}
                          </p>
                        </div>
                      </div>
                    </CardFooter>
                  </Card>
                </ScrollReveal>
              )
            )}
          </div>
          <ScrollReveal className="text-center mt-12">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Link href="/testimonials">Read More Testimonials</Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Style in Motion Section */}
      <section className="py-16 md:py-24 bg-background w-full overflow-hidden">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <Camera className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-4xl font-headline font-bold text-foreground">
            Our Style in Motion
          </h2>
          <p className="text-lg text-muted-foreground mt-2">
            A live look at our latest work and happy clients.
          </p>
        </ScrollReveal>
        <div className="w-full inline-flex flex-nowrap mt-12 [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 [&_img]:max-w-none animate-scroll">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <li key={`${image.id}-${index}`}>
                <Card className="w-72 h-80 overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={400}
                    height={500}
                    className="w-full h-full object-cover"
                    data-ai-hint={image.dataAiHint}
                  />
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Craft Your Own Testimonial Section */}
      <section className="py-16 md:py-24 bg-muted/50">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <Edit className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-6">
            Loved Your Visit? Share Your Story!
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            Use our AI assistant to help craft a testimonial about your
            experience at ${APP_NAME}. It's quick and easy!
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/ai-testimonial">
              Generate Your Testimonial <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </section>

      {/* Visit Us or Get in Touch (Simplified Contact) */}
      <section className="py-16 md:py-24 bg-background">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-foreground mb-6">
            Visit Us or Get in Touch
          </h2>
          <div className="text-lg text-foreground space-y-2 mb-8">
            <p>123, Vijay Vihar, Delhi, India</p>
            <p>Call Us: +91 93542 02593</p>
            <p>Email: guptavanshul484@gmail.com</p>
          </div>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Link href="/contact">
              Full Contact Details & Map <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </ScrollReveal>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <ScrollReveal className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6">
            Ready for Your Transformation?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Step into ${APP_NAME} and step out with confidence. Our expert
            barbers are here to provide you with a look that's uniquely yours.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <Link href="/book-appointment">Find Your Style</Link>
          </Button>
        </ScrollReveal>
      </section>
    </div>
  );
}
