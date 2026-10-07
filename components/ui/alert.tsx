"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import { IconAlertCircle, IconAlertTriangle, IconInfoCircle, IconCircleCheck } from "@tabler/icons-react";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        warning: "border-yellow-500/50 text-yellow-900 dark:text-yellow-100 [&>svg]:text-yellow-500",
        info: "border-blue-500/50 text-blue-900 dark:text-blue-100 [&>svg]:text-blue-500",
        success: "border-green-500/50 text-green-900 dark:text-green-100 [&>svg]:text-green-500",
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

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof alertVariants> {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children?: React.ReactNode;
}

function Alert({
  className,
  variant = "default",
  title,
  description,
  action,
  children,
  ...props
}: AlertProps) {
  const Icon = iconMap[variant ?? "default"];

  return (
    <div
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <Icon className="size-4 shrink-0" aria-hidden="true" />
      <div className="grid gap-1 [&>p]:leading-tight">
        {title && <h5 className="text-sm font-medium">{title}</h5>}
        {description && <p className="text-sm opacity-90">{description}</p>}
        {children && <div className="text-sm">{children}</div>}
      </div>
      {action && <div className="mt-4 flex items-center justify-end">{action}</div>}
    </div>
  );
}

export { Alert, alertVariants };