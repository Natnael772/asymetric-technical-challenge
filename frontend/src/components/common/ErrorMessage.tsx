/**
 * ErrorMessage - Clean error display
 */

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="rounded-lg border border-red-200/60 bg-red-50/50 px-4 py-3 dark:border-red-900/40 dark:bg-red-950/20">
      <p className="text-[14px] text-red-700 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 text-[13px] font-medium text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
        >
          Try again →
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
