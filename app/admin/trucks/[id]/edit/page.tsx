"use client";

import { useEffect, useState } from "react";
import { useParams, notFound, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TruckForm from "@/components/admin/TruckForm";
import { getTruckByIdAction } from "@/lib/admin/actions";

export default function EditTruckPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [truckData, setTruckData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    async function loadTruck() {
      try {
        const result = await getTruckByIdAction(id);

        if (!result || !result.success || !result.data) {
          setNotFoundError(true);
          return;
        }

        // Convert Decimal fields to numbers for Client Component
        const converted = {
          ...result.data,
          actualPrice: result.data.actualPrice ? Number(result.data.actualPrice) : undefined,
          regularPrice: result.data.regularPrice ? Number(result.data.regularPrice) : undefined,
        };

        setTruckData(converted);
      } catch (error) {
        console.error('Failed to load truck:', error);
        setNotFoundError(true);
      } finally {
        setLoading(false);
      }
    }

    loadTruck();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Loading truck data...</p>
        </div>
      </div>
    );
  }

  if (notFoundError || !truckData) {
    notFound();
  }

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
