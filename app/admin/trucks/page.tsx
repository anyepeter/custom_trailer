import Link from "next/link";
import { Plus, Truck as TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import TruckCard from "@/components/admin/TruckCard";
import { getAllTrucksAction } from "@/lib/admin/actions";
import type { Truck } from "@prisma/client";

export default async function TrucksListPage() {
  const result = await getAllTrucksAction();
  const trucksRaw: Truck[] = result.data || [];

  // Convert Decimal fields to numbers for Client Components
  const trucks = trucksRaw.map((truck) => ({
    ...truck,
    actualPrice: truck.actualPrice ? Number(truck.actualPrice) : null,
    regularPrice: truck.regularPrice ? Number(truck.regularPrice) : null,
  }));

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">All Trucks</h1>
          <p className="text-sm sm:text-base text-slate-600 mt-1">
            Manage your truck inventory ({trucks.length} total)
          </p>
        </div>
        <Link href="/admin/trucks/create" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            <span className="sm:inline">Create Truck</span>
          </Button>
        </Link>
      </div>

      {/* Trucks Grid */}
      {trucks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <TruckIcon className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
            No trucks yet
          </h3>
          <p className="text-sm sm:text-base text-slate-600 mb-6">
            Get started by creating your first truck
          </p>
          <Link href="/admin/trucks/create" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto">
              <Plus className="mr-2 h-4 w-4" />
              Create Your First Truck
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {trucks.map((truck) => (
            <TruckCard key={truck.id} truck={truck} />
          ))}
        </div>
      )}
    </div>
  );
}
