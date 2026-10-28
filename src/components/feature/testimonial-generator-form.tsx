
'use client';

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateTestimonial, type GenerateTestimonialOutput } from '@/ai/flows/generate-testimonial';
import { Loader2, Sparkles, Quote, ClipboardCopy } from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const formSchema = z.object({
  service: z.string().min(3, { message: 'Service must be at least 3 characters.' }).max(100),
  barber: z.string().min(2, { message: "Barber's name must be at least 2 characters." }).max(50),
});

type FormData = z.infer<typeof formSchema>;

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
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


export default function TestimonialGeneratorForm() {
  const [generatedTestimonial, setGeneratedTestimonial] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setGeneratedTestimonial(null);
    try {
      const result: GenerateTestimonialOutput = await generateTestimonial(data);
      setGeneratedTestimonial(result.testimonial);
      reset(); 
    } catch (err) {
      console.error('Error generating testimonial:', err);
      const errorMessage = 'Failed to generate testimonial. Please try again.';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (generatedTestimonial) {
      navigator.clipboard.writeText(generatedTestimonial);
      toast({
        title: 'Copied to Clipboard!',
        description: 'Your generated testimonial has been copied.',
      });
    }
  };


  return (
    <Card className="shadow-xl overflow-hidden">
      <CardHeader>
        <CardTitle className="font-headline text-2xl text-foreground">Tell Us About Your Visit</CardTitle>
        <CardDescription>Fill in the details below and let our AI craft a starting point for your review.</CardDescription>
      </CardHeader>
      <motion.form 
        onSubmit={handleSubmit(onSubmit)}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <CardContent className="space-y-6">
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="service" className="font-semibold">Service Received</Label>
            <Input
              id="service"
              placeholder="e.g., Classic Haircut, Beard Trim"
              {...register('service')}
              className={errors.service ? 'border-destructive' : ''}
            />
            {errors.service && <p className="text-sm text-destructive">{errors.service.message}</p>}
          </motion.div>
          <motion.div variants={itemVariants} className="space-y-2">
            <Label htmlFor="barber" className="font-semibold">Barber's Name</Label>
            <Input
              id="barber"
              placeholder="e.g., Marcus, Lena"
              {...register('barber')}
              className={errors.barber ? 'border-destructive' : ''}
            />
            {errors.barber && <p className="text-sm text-destructive">{errors.barber.message}</p>}
          </motion.div>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-4">
          <motion.div variants={itemVariants} className="w-full">
            <Button type="submit" disabled={isLoading} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Testimonial
                </>
              )}
            </Button>
          </motion.div>
          {error && !isLoading && <p className="text-sm text-destructive text-center">{error}</p>}
        </CardFooter>
      </motion.form>

      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="p-6 border-t"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-headline font-semibold mb-4 text-foreground">AI is writing...</h3>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
              <Skeleton className="h-4 w-[95%]" />
              <Skeleton className="h-4 w-[85%]" />
            </div>
          </motion.div>
        )}

        {generatedTestimonial && !isLoading && (
          <motion.div
            className="p-6 border-t bg-muted/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-headline font-semibold mb-4 text-foreground">Here's your draft!</h3>
            <div className="relative bg-card p-6 rounded-lg shadow-inner border">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-accent/50 -z-0" />
              <Button onClick={handleCopy} size="icon" variant="ghost" className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:bg-accent/20 hover:text-accent z-10">
                <ClipboardCopy className="h-5 w-5" />
                <span className="sr-only">Copy to clipboard</span>
              </Button>
              <p className="relative font-body text-base text-foreground/90 pl-10 pt-2 leading-relaxed z-1">
                {generatedTestimonial}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">Feel free to edit and make it your own before sharing.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}
