/**
 * Error Boundaries and Error Handling Utilities
 * Production-ready error handling for React components
 */

'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the component tree
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('🔴 Error caught by boundary:', error, errorInfo);
    
    // Log to error reporting service (Sentry, etc.)
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.captureException(error, {
        extra: {
          componentStack: errorInfo.componentStack,
        },
      });
    }

    // Call custom error handler
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          <div className="max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
            <div className="text-center">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                Tâm Ma Nhập Thể
              </h2>
              <p className="text-gray-300 mb-6">
                Có lỗi xảy ra trong quá trình tu luyện. Đệ tử hãy thử lại sau.
              </p>

              {/* Error Details (Dev Mode) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mb-6 text-left">
                  <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                    Chi tiết lỗi (Development)
                  </summary>
                  <pre className="mt-2 p-3 bg-black/30 rounded-lg text-xs text-red-300 overflow-auto max-h-48">
                    {this.state.error.toString()}
                  </pre>
                </details>
              )}

              {/* Actions */}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={this.handleRetry}
                  variant="primary"
                  className="px-6 py-2"
                >
                  🔄 Thử Lại
                </Button>
                <Button
                  onClick={() => window.history.back()}
                  variant="secondary"
                  className="px-6 py-2"
                >
                  ← Quay Lại
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Async Error Handler for Server Components and API routes
 */
export class AsyncError extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number = 500,
    public details?: Record<string, any>
  ) {
    super(message);
    this.name = 'AsyncError';
  }

  static badRequest(message: string, details?: Record<string, any>) {
    return new AsyncError(message, 'BAD_REQUEST', 400, details);
  }

  static unauthorized(message: string = 'Unauthorized') {
    return new AsyncError(message, 'UNAUTHORIZED', 401);
  }

  static forbidden(message: string = 'Forbidden') {
    return new AsyncError(message, 'FORBIDDEN', 403);
  }

  static notFound(message: string = 'Not Found') {
    return new AsyncError(message, 'NOT_FOUND', 404);
  }

  static internal(message: string = 'Internal Server Error', details?: Record<string, any>) {
    return new AsyncError(message, 'INTERNAL_ERROR', 500, details);
  }

  static validation(message: string, details?: Record<string, any>) {
    return new AsyncError(message, 'VALIDATION_ERROR', 422, details);
  }
}

/**
 * Wrap async function with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options?: {
    onError?: (error: Error) => void;
    fallback?: T;
  }
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    
    console.error('❌ Async error:', err);
    
    options?.onError?.(err);
    
    if (options?.fallback !== undefined) {
      return options.fallback;
    }
    
    throw err;
  }
}

/**
 * Create safe async handler for API routes
 */
export function createApiHandler<T>(
  handler: (req: Request) => Promise<T>
) {
  return async (req: Request): Promise<Response> => {
    try {
      const result = await handler(req);
      return Response.json({ success: true, data: result });
    } catch (error) {
      console.error('API Error:', error);
      
      if (error instanceof AsyncError) {
        return Response.json(
          { success: false, error: error.message, code: error.code },
          { status: error.status }
        );
      }
      
      return Response.json(
        { success: false, error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  };
}
