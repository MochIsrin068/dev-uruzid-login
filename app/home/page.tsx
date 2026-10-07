"use client";

import {
  IconBell,
  IconCheck,
  IconDatabase,
  IconLayoutDashboard,
  IconLogout,
  IconRefresh,
  IconShieldCheck,
  IconUser,
  IconX,
  IconMapPin,
  IconMail,
  IconPhone,
  IconBuilding,
  IconBriefcase,
  IconSettings,
  IconKey,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import useHome from "@/hooks/use-home";

export default function HomeScreen() {
  const {
    activity,
    stats,
    isLoading,
    error,
    handleRetry,
    handleLogout,
    user,
    checkPrivilege,
    checkConfig,
    isEmpty,
    router
  } = useHome();

  if (!user) {
    return (
      <div className="flex min-h-dvh flex-1 flex-col bg-muted/30">
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <IconShieldCheck className="size-12 text-muted-foreground/50 mb-4" />
              <h2 className="text-lg font-medium text-foreground">
                Session expired
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Please log in again.
              </p>
              <Button
                onClick={() => router.push("/")}
                className="mt-4 w-full sm:w-auto"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-dvh flex-1 flex-col bg-muted/30">
      <header className="sticky top-0 z-20 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <IconLayoutDashboard className="size-5" />
            </div>
            <span className="text-base font-semibold tracking-tight">
              Dashboard
            </span>
          </div>

          <nav className="hidden items-center gap-6 text-sm md:flex">
            <button type="button" className="font-medium text-foreground">
              Overview
            </button>
            <button
              type="button"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Projects
            </button>
            <button
              type="button"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Settings
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Notifications"
              className="hidden sm:inline-flex"
            >
              <IconBell className="size-4" />
            </Button>
            <div className="hidden items-center gap-2.5 rounded-lg border border-border bg-card px-2.5 py-1.5 sm:flex">
              <Avatar className="h-7 w-7">
                <AvatarImage
                  src={user.branch_picpath_thumb || user.branch_picpath}
                  alt={user.name}
                />
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.name}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="h-9 gap-1.5 px-3"
            >
              <IconLogout className="size-4" />
              Log out
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  User
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  {user.name}
                </span>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconUser className="size-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <IconBriefcase className="size-4 text-muted-foreground" />
                <span>{user.jabatan_name}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconKey className="size-4 text-muted-foreground" />
                <span>{user.group_id}</span>
                <Badge variant="secondary" className="ml-1">
                  {user.id}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconMail className="size-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconPhone className="size-4 text-muted-foreground" />
                <span>{user.mobile}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconSettings className="size-4 text-muted-foreground" />
                <span>Warehouse: {user.default_warehouse_id}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-muted-foreground">
                  Branch
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  {user.branch_name}
                </span>
              </div>
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <IconBuilding className="size-5" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <IconMapPin className="size-4 text-muted-foreground" />
                <span className="max-w-[80%] truncate">
                  {user.branch_address}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconPhone className="size-4 text-muted-foreground" />
                <span>Tel: {user.branch_tel1}</span>
                {user.branch_fax && <span className="mx-1">•</span>}
                {user.branch_fax && <span>Fax: {user.branch_fax}</span>}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconKey className="size-4 text-muted-foreground" />
                <span>Branch ID: {user.branch_id}</span>
                <Badge variant="outline" className="ml-1">
                  {user.branch_active === 1 ? "Active" : "Inactive"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <IconSettings className="size-4 text-muted-foreground" />
                <span>
                  Pricing: {user.pakai_harga === 1 ? "Enabled" : "Disabled"}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <Alert
            variant="destructive"
            title="Something went wrong"
            description={error.message}
            action={
              <Button variant="outline" size="sm" onClick={handleRetry}>
                <IconRefresh className="size-3.5 mr-1.5" />
                Try again
              </Button>
            }
            className="mt-6"
          />
        )}

        {!error && isLoading && (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2 mt-2" />
                  <CardAction>
                    <Skeleton className="size-9 rounded-lg" />
                  </CardAction>
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-1/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {!error && !isLoading && (
          <>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.label}>
                    <CardHeader>
                      <CardDescription>{stat.label}</CardDescription>
                      <CardTitle className="text-2xl font-semibold tracking-tight">
                        {stat.value}
                      </CardTitle>
                      <CardAction>
                        <span className="flex size-9 items-center justify-center rounded-lg bg-muted text-foreground">
                          <Icon className="size-4" />
                        </span>
                      </CardAction>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-xs">
                        {stat.detail}
                      </CardDescription>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Recent activity</CardTitle>
                  <CardAction>
                    <button
                      type="button"
                      className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                    >
                      View all
                    </button>
                  </CardAction>
                </CardHeader>
                <CardContent>
                  {isEmpty ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <IconX className="size-10 text-muted-foreground/50 mb-3" />
                      <h3 className="text-sm font-medium text-foreground">
                        No activity yet
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        Activity will appear here when you perform actions.
                      </p>
                    </div>
                  ) : (
                    <ul className="space-y-4">
                      {activity.map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
                            <IconCheck className="size-4" />
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-medium">{item.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {item.time}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workspace</CardTitle>
                  <CardDescription>
                    Your environment is ready. Invite teammates or connect a new
                    service to get started.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  <Button className="h-10 w-full gap-2">
                    <IconDatabase className="size-4" />
                    Connect a service
                  </Button>
                  <Button variant="outline" className="h-10 w-full gap-2">
                    <IconUser className="size-4" />
                    Invite teammate
                  </Button>
                  {checkPrivilege("APPROVE_AMV") && (
                    <Button variant="default" className="h-10 w-full gap-2">
                      <IconShieldCheck className="size-4" />
                      Approve AMV
                    </Button>
                  )}
                  {checkConfig("_app_use_konfirmasi_cetak_bill") && (
                    <Button variant="secondary" className="h-10 w-full gap-2">
                      <IconCheck className="size-4" />
                      Print Bill Confirmation
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 text-xs text-muted-foreground sm:px-6">
          © 2026 Muhammad Isrim. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
