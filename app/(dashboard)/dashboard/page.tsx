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

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Review customer activity, sales performance, and upcoming work.",
};

export default function DashboardPage() {
  return (
    <div className="space-y-6 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500">
      <DashboardHeader />
      <DashboardStats />
      <SalesChart />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <SectionHeader
              title="Recent activities"
              description="The latest updates from your customers"
            />
          </CardHeader>
          <CardContent className="px-0">
            <ActivityList activities={recentActivities} />
          </CardContent>
        </Card>
        <Card className="shadow-sm">
          <CardHeader>
            <SectionHeader
              title="Upcoming tasks"
              description="Your next priorities, sorted by due date"
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
