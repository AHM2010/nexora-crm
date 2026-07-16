import type { Metadata } from "next";
import { SettingsWorkspace } from "@/components/settings/settings-workspace";

export const metadata: Metadata = {
  title: "Settings | Nexora CRM",
  description: "Manage your Nexora CRM preferences and account.",
};
export default function SettingsPage() {
  return <SettingsWorkspace />;
}
