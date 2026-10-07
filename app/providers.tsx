"use client";

import QueryProvider from "@/components/query-provider";
import { ToastProvider } from "@/components/ui/toast";
import { AuthProvider } from "@/hooks/use-auth-context";

export function Providers({ children }: React.PropsWithChildren) {
  return (
    <QueryProvider>
      <ToastProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ToastProvider>
    </QueryProvider>
  );
}