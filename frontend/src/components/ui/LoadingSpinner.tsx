/**
 * LoadingSpinner - Minimal loading indicator
 */

interface LoadingSpinnerProps {
  className?: string;
}

function LoadingSpinner({ className = "" }: LoadingSpinnerProps) {
  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-600 dark:border-zinc-700 dark:border-t-zinc-300" />
    </div>
  );
}

export default LoadingSpinner;
