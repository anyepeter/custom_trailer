import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import TruckForm from "@/components/admin/TruckForm";
import { getTruckByIdAction } from "@/lib/admin/actions";

export const dynamic = 'force-dynamic';

interface EditTruckPageProps {
  params: {
    id: string;
  };
}

export default async function EditTruckPage({ params }: EditTruckPageProps) {
  const result = await getTruckByIdAction(params.id);

  if (!result.success || !result.data) {
    notFound();
  }

  // Convert Decimal fields to numbers for Client Component
  const truckData = {
    ...result.data,
    actualPrice: result.data.actualPrice ? Number(result.data.actualPrice) : undefined,
    regularPrice: result.data.regularPrice ? Number(result.data.regularPrice) : undefined,
  };

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
          <h1 className="text-3xl font-bold text-slate-900">Edit Truck</h1>
          <p className="text-slate-600 mt-1">
            Update truck details and specifications
          </p>
        </div>
      </div>

      {/* Form */}
      <TruckForm mode="edit" truck={truckData} />
    </div>
  );
}
