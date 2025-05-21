"use server";

import { summarizeYoutubeVideo, type SummarizeYoutubeVideoInput, type SummarizeYoutubeVideoOutput } from "@/ai/flows/summarize-youtube-video";
import { z } from "zod";

const ActionInputSchema = z.object({
  youtubeVideoUrl: z.string().url({ message: "Invalid YouTube URL format." })
    .regex(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/, { message: "Please enter a valid YouTube URL." }),
});

export async function generateSummaryAction(
  input: SummarizeYoutubeVideoInput
): Promise<SummarizeYoutubeVideoOutput> {
  const validatedInput = ActionInputSchema.safeParse(input);

  if (!validatedInput.success) {
    // Simplified error handling for server action; client-side form validation should catch most cases.
    // For a production app, you might want more robust error structures.
    throw new Error(validatedInput.error.errors.map(e => e.message).join(", "));
  }
  
  try {
    const summary = await summarizeYoutubeVideo(validatedInput.data);
    return summary;
  } catch (error) {
    console.error("Error in generateSummaryAction:", error);
    // It's often better to throw a more generic error to the client
    // and log the detailed error on the server.
    throw new Error("Failed to generate summary due to a server error.");
  }
}
