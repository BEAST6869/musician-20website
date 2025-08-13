import { cn } from "@/lib/utils";

interface LoadingProps {
  className?: string;
  text?: string;
}

export function Loading({ className, text = "Loading..." }: LoadingProps) {
  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mr-3"></div>
      <span className="text-muted-foreground">{text}</span>
    </div>
  );
}
