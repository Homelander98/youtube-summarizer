'use server';

/**
 * @fileOverview A YouTube video summarization AI agent.
 *
 * - summarizeYoutubeVideo - A function that handles the YouTube video summarization process.
 * - SummarizeYoutubeVideoInput - The input type for the summarizeYoutubeVideo function.
 * - SummarizeYoutubeVideoOutput - The return type for the summarizeYoutubeVideo function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeYoutubeVideoInputSchema = z.object({
  youtubeVideoUrl: z.string().describe('The URL of the YouTube video to summarize.'),
});
export type SummarizeYoutubeVideoInput = z.infer<typeof SummarizeYoutubeVideoInputSchema>;

const SummarizeYoutubeVideoOutputSchema = z.object({
  title: z.string().describe('The title of the YouTube video.'),
  summary: z.string().describe('A concise summary of the YouTube video.'),
  watchLink: z.string().describe('Link to watch the video.')
});
export type SummarizeYoutubeVideoOutput = z.infer<typeof SummarizeYoutubeVideoOutputSchema>;

export async function summarizeYoutubeVideo(input: SummarizeYoutubeVideoInput): Promise<SummarizeYoutubeVideoOutput> {
  return summarizeYoutubeVideoFlow(input);
}

const getVideoMetadataAndTranscript = ai.defineTool({
  name: 'getVideoMetadataAndTranscript',
  description: 'Retrieves the title and transcript of a YouTube video given its URL.',
  inputSchema: z.object({
    youtubeVideoUrl: z.string().describe('The URL of the YouTube video.'),
  }),
  outputSchema: z.object({
    title: z.string().describe('The title of the YouTube video.'),
    transcript: z.string().describe('The transcript of the YouTube video.'),
  }),
}, async (input) => {
  // Placeholder implementation for fetching video metadata and transcript
  // In a real application, this would involve calling the YouTube Data API
  // and potentially using a transcription service if captions are not available.
  // For demonstration purposes, we'll return dummy data.
  console.log('Fetching video metadata and transcript for URL:', input.youtubeVideoUrl);
  return {
    title: `Dummy Title for ${input.youtubeVideoUrl}`,
    transcript: 'This is a dummy transcript for demonstration purposes. ' +
        'It provides a summary of the key points discussed in the video.',
  };
});

const prompt = ai.definePrompt({
  name: 'summarizeYoutubeVideoPrompt',
  input: {schema: SummarizeYoutubeVideoInputSchema},
  output: {schema: SummarizeYoutubeVideoOutputSchema},
  tools: [getVideoMetadataAndTranscript],
  prompt: `You are an AI expert in providing summaries of YouTube videos.

  Given a YouTube video URL, your task is to provide a concise and informative summary of the video.
  First use the getVideoMetadataAndTranscript tool to retrieve the video title and transcript.

  Then generate a summary of the video using the title and transcript.
  Make sure to set the title from the getVideoMetadataAndTranscript tool.
  Make sure to return the original youtubeVideoUrl as the watchLink.

  YouTube Video URL: {{{youtubeVideoUrl}}}
  Summary:
  `,
});

const summarizeYoutubeVideoFlow = ai.defineFlow(
  {
    name: 'summarizeYoutubeVideoFlow',
    inputSchema: SummarizeYoutubeVideoInputSchema,
    outputSchema: SummarizeYoutubeVideoOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
