import { Component, type ErrorInfo, type ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4 text-center dark:bg-zinc-900">
          <div className="max-w-md space-y-6">
            <h1 className="text-7xl md:text-9xl font-black text-gray-200 dark:text-zinc-800">
              Oops!
            </h1>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Something went wrong
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                We apologize for the inconvenience. An unexpected error has
                occurred.
              </p>
              {this.state.error && (
                <div className="mt-4 overflow-hidden rounded-lg bg-red-50 p-4 text-left dark:bg-red-900/20">
                  <p className="font-mono text-sm text-red-800 dark:text-red-200">
                    {this.state.error.toString()}
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200"
              >
                Refresh Page
              </button>
              <Link
                to="/"
                className="rounded-lg border border-gray-200 px-6 py-3 text-sm font-medium text-gray-900 transition-colors hover:bg-gray-50 dark:border-zinc-700 dark:text-white dark:hover:bg-zinc-800"
                onClick={() => this.setState({ hasError: false, error: null })}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
