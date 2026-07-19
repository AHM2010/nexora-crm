import type { Metadata } from "next";
import { ActivityList } from "@/components/dashboard/activity-list";
import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { SalesChart } from "@/components/dashboard/sales-chart";
import { SectionHeader } from "@/components/dashboard/section-header";
import { TaskWidget } from "@/components/dashboard/task-widget";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { recentActivities } from "@/data/activities";
import { upcomingTasks } from "@/data/tasks";
import {getTranslations} from "next-intl/server";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review customer activity, sales performance, and upcoming work.",
};

export default async function DashboardPage() {
  const t = await getTranslations("Dashboard");
  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <DashboardHeader />
      <DashboardStats />
      <SalesChart />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <SectionHeader
              title={t("recent")}
              description={t("recentDescription")}
            />
          </CardHeader>
          <CardContent className="px-0">
            <ActivityList activities={recentActivities} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <SectionHeader
              title={t("upcoming")}
              description={t("upcomingDescription")}
            />
          </CardHeader>
          <CardContent className="px-0">
            <TaskWidget tasks={upcomingTasks} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
