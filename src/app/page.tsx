"use client";

import { useState, useEffect, useCallback } from 'react';
import { YoutubeUrlForm } from '@/components/youtube-url-form';
import { SummaryDisplay } from '@/components/summary-display';
import { HistoryList } from '@/components/history-list';
import type { SummarizeYoutubeVideoOutput } from '@/ai/flows/summarize-youtube-video';
import { generateSummaryAction } from './actions';
import type { HistoryItem } from '@/lib/types';
import { Loader2, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button'; // For potential future use or consistency
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MAX_HISTORY_ITEMS = 20;
const HISTORY_STORAGE_KEY = 'tubeDigestHistory_v2'; // Versioned key

export default function HomePage() {
  const [currentSummary, setCurrentSummary] = useState<SummarizeYoutubeVideoOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [currentFormUrl, setCurrentFormUrl] = useState<string>('');

  const { toast } = useToast();

  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem(HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from local storage:", e);
      localStorage.removeItem(HISTORY_STORAGE_KEY);
      toast({
        title: "History Error",
        description: "Could not load previous history. It has been reset.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const updateHistory = useCallback((newHistory: HistoryItem[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(newHistory));
    } catch (e) {
      console.error("Failed to save history to local storage:", e);
      toast({
        title: "Storage Error",
        description: "Could not save history. Local storage might be full or inaccessible.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const addOrUpdateHistoryItem = useCallback((url: string, summaryData: SummarizeYoutubeVideoOutput) => {
    const newItem: HistoryItem = {
      url,
      title: summaryData.title,
      summary: summaryData.summary,
      timestamp: Date.now(),
    };

    let updatedHistory = history.filter(item => item.url !== url);
    updatedHistory = [newItem, ...updatedHistory];

    if (updatedHistory.length > MAX_HISTORY_ITEMS) {
      updatedHistory = updatedHistory.slice(0, MAX_HISTORY_ITEMS);
    }
    updateHistory(updatedHistory);
  }, [history, updateHistory]);

  const handleFormSubmit = useCallback(async (youtubeUrl: string) => {
    setIsLoading(true);
    setCurrentSummary(null);
    setError(null);
    setCurrentFormUrl(youtubeUrl);

    try {
      const result = await generateSummaryAction({ youtubeVideoUrl: youtubeUrl });
      setCurrentSummary(result);
      addOrUpdateHistoryItem(youtubeUrl, result);
      toast({
        title: "Summary Generated!",
        description: `Summary for "${result.title}" is ready.`,
      });
    } catch (e: any) {
      console.error("Error generating summary:", e);
      const errorMessage = e.message || "Failed to generate summary. Please check the URL or try again later.";
      setError(errorMessage);
      toast({
        title: "Summarization Error",
        description: errorMessage,
        variant: "destructive",
      });
      setCurrentSummary(null);
    } finally {
      setIsLoading(false);
    }
  }, [addOrUpdateHistoryItem, toast]);

  const handleSelectHistoryItem = useCallback((item: HistoryItem) => {
    setCurrentFormUrl(item.url);
    setCurrentSummary({
        title: item.title,
        summary: item.summary,
        watchLink: item.url, // Original URL is the watch link
    });
    setError(null);
    setIsLoading(false); 
    // Optionally, move this item to the top of history by re-adding it
    addOrUpdateHistoryItem(item.url, { title: item.title, summary: item.summary, watchLink: item.url });
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top to see form and summary
    toast({
        title: "Loaded from History",
        description: `Displaying summary for "${item.title}".`,
    });
  }, [addOrUpdateHistoryItem, toast]);
  
  const handleClearHistory = useCallback(() => {
    updateHistory([]);
    toast({
      title: "History Cleared",
      description: "Your summary history has been cleared.",
    });
  }, [updateHistory, toast]);


  return (
    <div className="min-h-screen bg-background flex flex-col items-center py-8 sm:py-12 px-4">
      <header className="mb-8 sm:mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary tracking-tight">TubeDigest</h1>
        <p className="text-md sm:text-lg text-muted-foreground mt-2 max-w-xl mx-auto">
          Instantly get AI-powered summaries of YouTube videos. Paste a link below to begin.
        </p>
      </header>

      <main className="w-full max-w-2xl space-y-8">
        <YoutubeUrlForm onSubmit={handleFormSubmit} isLoading={isLoading} initialUrl={currentFormUrl} />

        {isLoading && (
          <div className="flex flex-col justify-center items-center p-6 bg-card rounded-lg shadow-md min-h-[150px]">
            <Loader2 className="h-10 w-10 animate-spin text-accent" />
            <p className="mt-4 text-lg text-foreground">Generating summary, please wait...</p>
          </div>
        )}

        {error && !isLoading && (
           <Alert variant="destructive" className="shadow-md">
            <AlertTriangle className="h-5 w-5" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {currentSummary && !isLoading && !error && (
          <SummaryDisplay summaryData={currentSummary} />
        )}
        
        <HistoryList history={history} onSelectItem={handleSelectHistoryItem} onClearHistory={handleClearHistory} />
      </main>
      <footer className="mt-12 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} TubeDigest. Powered by AI.</p>
      </footer>
    </div>
  );
}
