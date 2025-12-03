"use client";

import * as React from "react";
import { X } from "lucide-react";

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToastVariant = "default" | "success" | "error" | "warning";

interface Toast {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastContextType {
  toasts: Toast[];
  toast: (options: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | null>(null);

let toastCount = 0;

function generateId() {
  return `toast-${++toastCount}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([]);

  const toast = React.useCallback((options: Omit<Toast, "id">) => {
    const id = generateId();
    const newToast = { ...options, id };

    setToasts((prev) => {
      const updated = [...prev, newToast];
      return updated.slice(-TOAST_LIMIT);
    });

    // Auto-remove after delay
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_REMOVE_DELAY);

    return id;
  }, []);

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

interface ToastViewportProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

function ToastViewport({ toasts, onDismiss }: ToastViewportProps) {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
}

function ToastItem({ toast, onDismiss }: ToastItemProps) {
  const variantStyles: Record<ToastVariant, string> = {
    default:
      "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700",
    success:
      "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
    error: "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800",
    warning:
      "bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800",
  };

  const textStyles: Record<ToastVariant, string> = {
    default: "text-slate-900 dark:text-white",
    success: "text-green-800 dark:text-green-200",
    error: "text-red-800 dark:text-red-200",
    warning: "text-yellow-800 dark:text-yellow-200",
  };

  const variant = toast.variant || "default";

  return (
    <div
      className={`pointer-events-auto rounded-lg border p-4 shadow-lg animate-in slide-in-from-bottom-2 fade-in-0 duration-200 ${variantStyles[variant]}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-1">
          {toast.title && (
            <p className={`text-sm font-semibold ${textStyles[variant]}`}>
              {toast.title}
            </p>
          )}
          {toast.description && (
            <p
              className={`text-sm mt-1 opacity-90 ${textStyles[variant]}`}
            >
              {toast.description}
            </p>
          )}
        </div>
        <button
          onClick={() => onDismiss(toast.id)}
          className={`shrink-0 opacity-70 hover:opacity-100 transition-opacity ${textStyles[variant]}`}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

