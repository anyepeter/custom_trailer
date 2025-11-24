"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Trash2, Eye, Loader2 } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { deleteTruckAction } from "@/lib/admin/actions";
import { useRouter } from "next/navigation";
import type { Truck } from "@prisma/client";

// Type for truck with serialized Decimal fields
type TruckWithNumbers = Omit<Truck, 'actualPrice' | 'regularPrice'> & {
  actualPrice?: number | null;
  regularPrice?: number | null;
};

interface TruckCardProps {
  truck: TruckWithNumbers;
}

export default function TruckCard({ truck }: TruckCardProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteTruckAction(truck.id);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete truck",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const actualPrice = truck.actualPrice ?? null;
  const regularPrice = truck.regularPrice ?? null;

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
        {truck.images.length > 0 ? (
          <img
            src={truck.images[0]}
            alt={truck.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-400 text-center">
            <Eye className="h-12 w-12 mx-auto mb-2 opacity-50" />
            <span className="text-sm">No image</span>
          </div>
        )}
        {truck.modelCode && (
          <Badge className="absolute top-2 right-2 bg-blue-600">
            {truck.modelCode}
          </Badge>
        )}
      </div>

      {/* Content */}
      <CardContent className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2 line-clamp-1">
          {truck.name}
        </h3>

        {truck.description && (
          <p className="text-xs sm:text-sm text-slate-600 mb-3 line-clamp-2">
            {truck.description}
          </p>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2 mb-3">
          {actualPrice !== null && (
            <span className="text-base sm:text-lg font-bold text-slate-900">
              ${actualPrice.toLocaleString()}
            </span>
          )}
          {regularPrice !== null && regularPrice > (actualPrice || 0) && (
            <span className="text-xs sm:text-sm text-slate-500 line-through">
              ${regularPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Metadata */}
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {truck.images.length > 0 && (
            <Badge variant="outline">{truck.images.length} images</Badge>
          )}
          {truck.concessionFeatures && (
            <Badge variant="outline">Features configured</Badge>
          )}
          {truck.additionalOptions && (
            <Badge variant="outline">
              {(truck.additionalOptions as any[]).length} options
            </Badge>
          )}
        </div>
      </CardContent>

      {/* Actions */}
      <CardFooter className="p-3 sm:p-4 pt-0 flex gap-2">
        <Link href={`/admin/trucks/${truck.id}/edit`} className="flex-1">
          <Button variant="outline" className="w-full text-sm">
            <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            Edit
          </Button>
        </Link>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="icon" disabled={isDeleting} className="h-9 w-9 sm:h-10 sm:w-10">
              {isDeleting ? (
                <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
              )}
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete &quot;{truck.name}&quot;. This action cannot be
                undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDelete}
                className="bg-red-600 hover:bg-red-700"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
