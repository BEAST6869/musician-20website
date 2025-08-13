import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cyber-dark flex items-center justify-center">
          <div className="text-center space-y-4 p-8 border border-neon-pink rounded-lg bg-cyber-deep/50">
            <h1 className="text-2xl font-bold text-neon-pink">Something went wrong</h1>
            <p className="text-neon-cyan">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              className="px-4 py-2 bg-neon-pink text-cyber-dark rounded hover:bg-neon-violet transition-colors"
              onClick={() => this.setState({ hasError: false, error: undefined })}
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
