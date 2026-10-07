
export type Stat = {
  label: string;
  value: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

export type ActivityItem = {
  title: string;
  time: string;
}
