"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { IconAlertCircle, IconAlertTriangle, IconInfoCircle, IconCircleCheck, IconX } from "@tabler/icons-react";

const toastVariants = cva(
  "pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-lg border p-4 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
        warning: "border-yellow-500/50 bg-yellow-50 text-yellow-900 dark:bg-yellow-950 dark:text-yellow-100",
        info: "border-blue-500/50 bg-blue-50 text-blue-900 dark:bg-blue-950 dark:text-blue-100",
        success: "border-green-500/50 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-100",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconMap = {
  default: IconAlertCircle,
  destructive: IconAlertTriangle,
  warning: IconAlertTriangle,
  info: IconInfoCircle,
  success: IconCircleCheck,
} as const;

interface ToastProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof toastVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  onClose?: () => void;
}

function Toast({
  className,
  variant = "default",
  title,
  description,
  action,
  onClose,
  ...props
}: ToastProps) {
  const Icon = iconMap[variant ?? "default"];

  return (
    <div
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <div className="flex items-start space-x-3">
        <Icon className="size-4 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 grid gap-1">
          {title && <h5 className="text-sm font-medium">{title}</h5>}
          {description && <p className="text-sm opacity-90">{description}</p>}
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded text-current opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Close"
          >
            <IconX className="size-3" />
          </button>
        )}
      </div>
      {action && <div className="mt-3 flex items-center justify-end">{action}</div>}
    </div>
  );
}

interface ToastData extends ToastProps {
  id: string;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
}

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 5000;

type ToastState = {
  toasts: ToastData[];
};

const initialState: ToastState = {
  toasts: [],
};

const reducer = (state: ToastState, action: ToastAction): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };
    case "UPDATE_TOAST":
      return {
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };
    case "DISMISS_TOAST":
      const { toastId } = action;
      if (toastId) {
        return {
          toasts: state.toasts.map((t) =>
            t.id === toastId ? { ...t, open: false } : t
          ),
        };
      }
      return {
        toasts: state.toasts.map((t) => ({ ...t, open: false })),
      };
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return { toasts: [] };
      }
      return {
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default:
      return state;
  }
};

type ToastAction =
  | { type: "ADD_TOAST"; toast: ToastData }
  | { type: "UPDATE_TOAST"; toast: Partial<ToastData> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string };

const listeners: Array<(state: ToastState) => void> = [];

let memoryState: ToastState = initialState;

function dispatch(action: ToastAction) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

function genId() {
  return Math.random().toString(36).substring(2, 9);
}

const dismissToast = (toastId?: string) => {
  dispatch({ type: "DISMISS_TOAST", toastId });
  setTimeout(() => {
    dispatch({ type: "REMOVE_TOAST", toastId });
  }, 1000);
};

export function useToast() {
  const [state, setState] = React.useState<ToastState>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [setState]);

  const toast = React.useCallback(
    ({ ...props }: Omit<ToastData, "id" | "open">) => {
      const id = genId();
      const toastData: ToastData = {
        ...props,
        id,
        open: true,
        onOpenChange: (open: boolean) => {
          if (!open) {
            dismissToast(id);
          }
        },
      };
      dispatch({ type: "ADD_TOAST", toast: toastData });

      if (props.variant !== "destructive") {
        setTimeout(() => {
          dismissToast(id);
        }, TOAST_REMOVE_DELAY);
      }

      return {
        id,
        dismiss: () => dismissToast(id),
        update: (updateProps: Partial<ToastData>) =>
          dispatch({ type: "UPDATE_TOAST", toast: { ...updateProps, id } }),
      };
    },
    []
  );

  return {
    ...state,
    toast,
    dismiss: dismissToast,
  };
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts } = useToast();

  return (
    <>
      {children}
      <div
        className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:max-w-[400px]"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
}