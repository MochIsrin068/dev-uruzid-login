"use client";

import { Controller } from "react-hook-form";
import {
  IconArrowRight,
  IconEye,
  IconEyeClosed,
  IconLoader2,
  IconLock,
  IconServer,
  IconShieldLock,
  IconUser,
} from "@tabler/icons-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import useAuth from "@/hooks/use-auth";

export default function Page() {
  const {
    control,
    handleFormSubmit,
    isPending,
    apiError,
    clearApiError,
    showPassword,
    setShowPassword,
  } = useAuth();

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center bg-muted/30 px-4 py-12 sm:px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <IconShieldLock className="size-6" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to your workspace to continue.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form
              onSubmit={handleFormSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {apiError && (
                <Alert
                  variant="destructive"
                  title={apiError}
                  // description={apiError.message}
                  action={
                    // apiError.retryable && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={clearApiError}
                      >
                        Try again
                      </Button>
                    // )
                  }
                  className="mb-2"
                />
              )}

              <FieldGroup>
                <Controller
                  control={control}
                  name="userServer"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userServer">Server</FieldLabel>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground"
                        >
                          <IconServer className="size-4" />
                        </span>
                        <Input
                          {...field}
                          id="userServer"
                          type="text"
                          autoComplete="off"
                          placeholder="server.example.com"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid ? "userServer-error" : undefined
                          }
                          className="h-10 pl-9"
                          onChange={(e) => {
                            field.onChange(e);
                            if (apiError) clearApiError();
                          }}
                          onBlur={field.onBlur}
                        />
                      </div>
                      <FieldError
                        id="userServer-error"
                        errors={[fieldState.error]}
                      />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="userId"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userId">User ID</FieldLabel>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground"
                        >
                          <IconUser className="size-4" />
                        </span>
                        <Input
                          {...field}
                          id="userId"
                          type="text"
                          autoComplete="username"
                          placeholder="your-user-id"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid ? "userId-error" : undefined
                          }
                          className="h-10 pl-9"
                          onChange={(e) => {
                            field.onChange(e);
                            if (apiError) clearApiError();
                          }}
                          onBlur={field.onBlur}
                        />
                      </div>
                      <FieldError
                        id="userId-error"
                        errors={[fieldState.error]}
                      />
                    </Field>
                  )}
                />

                <Controller
                  control={control}
                  name="userPassword"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="userPassword">Password</FieldLabel>
                      <div className="relative">
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-foreground"
                        >
                          <IconLock className="size-4" />
                        </span>
                        <Input
                          {...field}
                          id="userPassword"
                          type={showPassword ? "text" : "password"}
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          aria-invalid={fieldState.invalid}
                          aria-describedby={
                            fieldState.invalid
                              ? "userPassword-error"
                              : undefined
                          }
                          className="h-10 pl-9 pr-12"
                          onChange={(e) => {
                            field.onChange(e);
                            if (apiError) clearApiError();
                          }}
                          onBlur={field.onBlur}
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                          aria-pressed={showPassword}
                        >
                          {showPassword ? (
                            <IconEyeClosed className="size-4" />
                          ) : (
                            <IconEye className="size-4" />
                          )}
                        </button>
                      </div>
                      <FieldError
                        id="userPassword-error"
                        errors={[fieldState.error]}
                      />
                    </Field>
                  )}
                />
              </FieldGroup>

              <Button
                type="submit"
                disabled={isPending}
                className="h-10 w-full gap-2 text-sm font-medium"
                aria-busy={isPending}
              >
                {isPending ? (
                  <>
                    <IconLoader2
                      className="size-4 animate-spin"
                      aria-hidden="true"
                    />
                    Signing in…
                  </>
                ) : (
                  <>
                    Sign in
                    <IconArrowRight className="size-4" aria-hidden="true" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
