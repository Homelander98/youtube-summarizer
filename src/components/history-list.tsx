"use client";

import type { HistoryItem } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface HistoryListProps {
  history: HistoryItem[];
  onSelectItem: (item: HistoryItem) => void;
  onClearHistory: () => void;
}

export function HistoryList({ history, onSelectItem, onClearHistory }: HistoryListProps) {
  if (history.length === 0) {
    return (
      <Card className="mt-8 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-xl">
            <History className="mr-2 h-6 w-6 text-primary" />
            Summary History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No summaries generated yet. Your history will appear here.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-12 shadow-xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="flex items-center text-2xl">
          <History className="mr-2 h-7 w-7 text-primary" />
          Recent Summaries
        </CardTitle>
        <Button variant="outline" size="sm" onClick={onClearHistory} className="text-destructive hover:bg-destructive/10">
          Clear History
        </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px] pr-4"> {/* Max height and scroll */}
          <div className="space-y-4">
            {history.map((item) => (
              <Card key={item.timestamp} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg truncate" title={item.title}>{item.title}</CardTitle>
                  <CardDescription className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <p className="text-sm text-foreground/80 line-clamp-2">{item.summary}</p>
                </CardContent>
                <CardFooter>
                   <Button variant="secondary" size="sm" onClick={() => onSelectItem(item)} className="w-full">
                     <Eye className="mr-2 h-4 w-4" /> View Summary
                   </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
