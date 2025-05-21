import type { SummarizeYoutubeVideoOutput } from '@/ai/flows/summarize-youtube-video';

export interface HistoryItem {
  url: string;
  title: string; // Title is always present in SummarizeYoutubeVideoOutput
  summary: string; // Summary is always present
  timestamp: number;
  // watchLink is essentially the 'url', so not storing it separately in history to avoid redundancy
}
