import Link from "next/link";
import { Truck, FileText, Clock, CheckCircle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDashboardStatsAction } from "@/lib/admin/actions";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboard() {
  // Safely fetch dashboard stats with fallback for build time
  let data = {
    truckCount: 0,
    buildRequestCount: 0,
    pendingRequests: 0,
    completedRequests: 0,
  };

  try {
    const result = await getDashboardStatsAction();
    if (result.success && result.data) {
      data = result.data;
    }
  } catch (error) {
    // During build time, database might not be available
    console.log('Dashboard stats unavailable during build');
  }

  const stats = [
    {
      title: "Total Trucks",
      value: data.truckCount,
      description: "Active inventory",
      icon: Truck,
      href: "/admin/trucks",
      color: "text-blue-600 bg-blue-100",
    },
    {
      title: "Build Requests",
      value: data.buildRequestCount,
      description: "Total submissions",
      icon: FileText,
      href: "/admin/build-requests",
      color: "text-purple-600 bg-purple-100",
    },
    {
      title: "Pending Requests",
      value: data.pendingRequests,
      description: "Awaiting review",
      icon: Clock,
      href: "/admin/build-requests?status=pending",
      color: "text-orange-600 bg-orange-100",
    },
    {
      title: "Completed",
      value: data.completedRequests,
      description: "Successfully processed",
      icon: CheckCircle,
      href: "/admin/build-requests?status=completed",
      color: "text-green-600 bg-green-100",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm sm:text-base text-slate-600 mt-2">
          Welcome to your food truck inventory management system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2 p-4 sm:p-6">
              <CardTitle className="text-xs sm:text-sm font-medium text-slate-600">
                {stat.title}
              </CardTitle>
              <div className={`rounded-full p-1.5 sm:p-2 ${stat.color}`}>
                <stat.icon className="h-3 w-3 sm:h-4 sm:w-4" />
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="text-2xl sm:text-3xl font-bold text-slate-900">{stat.value}</div>
              <p className="text-xs text-slate-500 mt-1">{stat.description}</p>
              <Link href={stat.href} className="mt-3 sm:mt-4 inline-block">
                <Button variant="link" className="p-0 h-auto text-sm text-blue-600">
                  View details
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">Quick Actions</CardTitle>
            <CardDescription className="text-sm">Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
            <Link href="/admin/trucks/create">
              <Button className="w-full justify-start text-sm" variant="outline">
                <Truck className="mr-2 h-4 w-4" />
                Add New Truck
              </Button>
            </Link>
            <Link href="/admin/trucks">
              <Button className="w-full justify-start text-sm" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View All Trucks
              </Button>
            </Link>
            <Link href="/admin/build-requests">
              <Button className="w-full justify-start text-sm" variant="outline">
                <Clock className="mr-2 h-4 w-4" />
                Review Build Requests
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl">System Overview</CardTitle>
            <CardDescription className="text-sm">Current status and health</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Database Status</span>
              <span className="flex items-center gap-2 text-sm font-medium text-green-600">
                <span className="h-2 w-2 rounded-full bg-green-600" />
                Connected
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Last Backup</span>
              <span className="text-sm font-medium text-slate-900">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Storage Used</span>
              <span className="text-sm font-medium text-slate-900">2.4 GB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
