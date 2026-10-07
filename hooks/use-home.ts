import { ACTIVITY, STATS } from "@/constants/mock";
import { ActivityItem, Stat } from "@/types/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "./use-auth-context";

export default function useHome() {
  const router = useRouter();
  const {
    user,
    logout,
    hasPrivilege: checkPrivilege,
    isConfigEnabled: checkConfig,
  } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [stats, setStats] = useState<Stat[]>([]);
  const [activity, setActivity] = useState<ActivityItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (Math.random() < 0.1) {
          throw new Error("Failed to load dashboard data");
        }

        setStats(STATS);
        setActivity(ACTIVITY);
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error("Something went wrong"),
        );
        setStats([]);
        setActivity([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRetry = () => {
    setIsLoading(true);
    setError(null);
    setTimeout(() => {
      setStats(STATS);
      setActivity(ACTIVITY);
      setIsLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  const isEmpty =
    !isLoading && !error && stats.length === 0 && activity.length === 0;

  return {
    user,
    stats,
    activity,
    isLoading,
    error,
    isEmpty,
    checkPrivilege,
    checkConfig,
    handleRetry,
    handleLogout,
    router
  };
}
