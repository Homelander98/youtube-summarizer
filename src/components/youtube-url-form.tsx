"use client";

import type * as React from 'react';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

const formSchema = z.object({
  youtubeUrl: z.string()
    .min(1, { message: "YouTube URL cannot be empty." })
    .url({ message: "Please enter a valid URL." })
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+(&.*)?$/, {
      message: "Please enter a valid YouTube video URL (e.g., youtube.com/watch?v=... or youtu.be/...)."
    }),
});

type FormData = z.infer<typeof formSchema>;

interface YoutubeUrlFormProps {
  onSubmit: (url: string) => Promise<void>;
  isLoading: boolean;
  initialUrl?: string;
}

export function YoutubeUrlForm({ onSubmit, isLoading, initialUrl = '' }: YoutubeUrlFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      youtubeUrl: initialUrl,
    },
  });

  useEffect(() => {
    form.setValue('youtubeUrl', initialUrl);
  }, [initialUrl, form]);

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    await onSubmit(data.youtubeUrl);
  };

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Youtube className="mr-2 h-7 w-7 text-primary" />
          Enter YouTube Video URL
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="youtubeUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="youtubeUrl" className="sr-only">YouTube Video URL</FormLabel>
                  <FormControl>
                    <Input
                      id="youtubeUrl"
                      placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full text-lg py-6">
              {isLoading ? 'Summarizing...' : 'Generate Summary'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
