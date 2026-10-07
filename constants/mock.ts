import { IconActivity, IconLayoutDashboard, IconServer } from "@tabler/icons-react";

export const STATS = [
  {
    label: "Active projects",
    value: "12",
    detail: "2 added this week",
    icon: IconLayoutDashboard,
  },
  {
    label: "API requests",
    value: "48.2k",
    detail: "Last 30 days",
    icon: IconActivity,
  },
  {
    label: "Connected servers",
    value: "3",
    detail: "All systems normal",
    icon: IconServer,
  },
] 

export const ACTIVITY = [
  { title: "Signed in to the console", time: "Just now" },
  { title: "Deployed the billing service", time: "2 hours ago" },
  { title: "Invited a new team member", time: "Yesterday" },
] 
