"use client";

import type { SummarizeYoutubeVideoOutput } from '@/ai/flows/summarize-youtube-video';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, FileText } from 'lucide-react';

interface SummaryDisplayProps {
  summaryData: SummarizeYoutubeVideoOutput;
}

export function SummaryDisplay({ summaryData }: SummaryDisplayProps) {
  // Using video title as key to re-trigger animation on new summary
  return (
    <Card key={summaryData.title} className="shadow-xl animate-in fade-in-50 duration-700">
      <CardHeader>
        <CardTitle className="text-3xl text-primary">{summaryData.title}</CardTitle>
        <CardDescription className="flex items-center pt-2">
           <FileText className="mr-2 h-5 w-5 text-muted-foreground" />
           AI Generated Summary
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed text-base">
          {summaryData.summary}
        </p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline">
          <a href={summaryData.watchLink} target="_blank" rel="noopener noreferrer" className="font-medium">
            Watch Video on YouTube
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
