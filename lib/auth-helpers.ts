import { UserPrivilege, AppConfig } from "@/types/auth";

export function hasPrivilege(
  privileges: UserPrivilege[],
  privilege: string,
): boolean {
  return privileges.some(
    (item) => item.active === 1 && item.priviledge === privilege,
  );
}

export function getActivePrivileges(
  privileges: UserPrivilege[],
): UserPrivilege[] {
  return privileges.filter((item) => item.active === 1);
}

export function getAppConfig(
  configs: AppConfig[],
  id: string,
): AppConfig | undefined {
  return configs.find((config) => config.id === id);
}

export function isAppConfigEnabled(
  configs: AppConfig[],
  id: string,
): boolean {
  const config = getAppConfig(configs, id);
  if (!config) return false;
  return config.onoff === 1 && config.value === "1";
}

export function getAppConfigValue(
  configs: AppConfig[],
  id: string,
): string | undefined {
  const config = getAppConfig(configs, id);
  return config?.value;
}