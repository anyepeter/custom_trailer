import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TruckForm from "@/components/admin/TruckForm";

export default function CreateTruckPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/trucks">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Create New Truck</h1>
          <p className="text-slate-600 mt-1">
            Add a new truck to your inventory
          </p>
        </div>
      </div>

      {/* Form */}
      <TruckForm mode="create" />
    </div>
  );
}
