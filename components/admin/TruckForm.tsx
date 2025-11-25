"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2, Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { truckFormSchema, type TruckFormSchema } from "@/lib/admin/schemas";
import { createTruckAction, updateTruckAction } from "@/lib/admin/actions";
import type { Truck } from "@prisma/client";
import Image from "next/image";

// Type for truck with serialized Decimal fields
type TruckWithNumbers = Omit<Truck, 'actualPrice' | 'regularPrice'> & {
  actualPrice?: number | null;
  regularPrice?: number | null;
};

interface TruckFormProps {
  truck?: TruckWithNumbers;
  mode: "create" | "edit";
}

const CONCESSION_FEATURES_KEYS = [
  "range_hood_size",
  "griddle_size",
  "fryer_size",
  "range_type",
  "charbroiler_size",
  "warming",
  "other_equipment",
  "smoker",
  "reach_in_fridge",
  "reach_in_freezer",
  "refrigerated_prep_table",
  "gas_lines",
  "fire_suppression",
  "serving_window",
  "plumbing",
  "bathroom_option",
  "additional_sinks",
  "electrical",
  "air_conditioning",
];

export default function TruckForm({ truck, mode }: TruckFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // Image handling
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = React.useState<string[]>([]);
  const [existingImages, setExistingImages] = React.useState<string[]>(truck?.images || []);

  // Specification handling (now string array)
  const [specifications, setSpecifications] = React.useState<string[]>(
    (truck?.specialSpecifications as string[]) || []
  );
  const [newSpec, setNewSpec] = React.useState("");

  // Parse existing data
  const defaultValues = {
    name: truck?.name || "",
    modelCode: truck?.modelCode || "",
    type: truck?.type || "",
    size: truck?.size || "",
    actualPrice: truck?.actualPrice ? Number(truck.actualPrice) : undefined,
    regularPrice: truck?.regularPrice ? Number(truck.regularPrice) : undefined,
    description: truck?.description || "",
    videoUrl: truck?.videoUrl || "",
    concessionFeatures: (truck?.concessionFeatures as any) || {},
    additionalOptions: (truck?.additionalOptions as any) || [],
  };

  const form = useForm({
    defaultValues,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = form;

  // Field arrays for additional options
  const { fields: optionFields, append: appendOption, remove: removeOption } = useFieldArray({
    control,
    name: "additionalOptions",
  });

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles((prev) => [...prev, ...files]);

    // Generate previews
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  // Remove new image
  const removeNewImage = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Remove existing image
  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Add specification
  const addSpecification = () => {
    if (newSpec.trim()) {
      setSpecifications((prev) => [...prev, newSpec.trim()]);
      setNewSpec("");
    }
  };

  // Remove specification
  const removeSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      // Add files
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      // Add existing images for edit mode
      if (mode === "edit") {
        formData.append("existingImages", JSON.stringify(existingImages));
      }

      // Add other fields
      formData.append("name", data.name);
      if (data.modelCode) formData.append("modelCode", data.modelCode);
      if (data.type) formData.append("type", data.type);
      if (data.size) formData.append("size", data.size);
      if (data.actualPrice) formData.append("actualPrice", data.actualPrice.toString());
      if (data.regularPrice) formData.append("regularPrice", data.regularPrice.toString());
      if (data.description) formData.append("description", data.description);
      if (data.videoUrl) formData.append("videoUrl", data.videoUrl);

      // Add JSON fields
      if (data.concessionFeatures) {
        formData.append("concessionFeatures", JSON.stringify(data.concessionFeatures));
      }
      if (specifications.length > 0) {
        formData.append("specialSpecifications", JSON.stringify(specifications));
      }
      if (data.additionalOptions && data.additionalOptions.length > 0) {
        formData.append("additionalOptions", JSON.stringify(data.additionalOptions));
      }

      const result = mode === "create"
        ? await createTruckAction(formData)
        : await updateTruckAction(truck!.id, formData);

      if (result.success) {
        toast({
          title: "Success",
          description: result.message,
        });
        router.push("/admin/trucks");
        router.refresh();
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save truck",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Basic Information</CardTitle>
          <CardDescription className="text-sm">Primary details about the truck</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                Truck Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                {...register("name")}
                placeholder="e.g., Gourmet Street Kitchen"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="modelCode">Model Code</Label>
              <Input
                id="modelCode"
                {...register("modelCode")}
                placeholder="e.g., GSK-2024"
              />
              {errors.modelCode && (
                <p className="text-sm text-red-500">{errors.modelCode.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Input
                id="type"
                {...register("type")}
                placeholder="e.g., Hot Kitchen, BBQ, Coffee, etc."
              />
              {errors.type && (
                <p className="text-sm text-red-500">{errors.type.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                {...register("size")}
                placeholder="e.g., 8.5x16, 7x14, etc."
              />
              {errors.size && (
                <p className="text-sm text-red-500">{errors.size.message as string}</p>
              )}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="actualPrice">Actual Price ($)</Label>
              <Input
                id="actualPrice"
                type="number"
                step="0.01"
                {...register("actualPrice", { valueAsNumber: true })}
                placeholder="89900"
              />
              {errors.actualPrice && (
                <p className="text-sm text-red-500">{errors.actualPrice.message as string}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="regularPrice">Regular Price ($)</Label>
              <Input
                id="regularPrice"
                type="number"
                step="0.01"
                {...register("regularPrice", { valueAsNumber: true })}
                placeholder="99900"
              />
              {errors.regularPrice && (
                <p className="text-sm text-red-500">{errors.regularPrice.message as string}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Detailed description of the truck..."
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description.message as string}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="videoUrl">Video URL</Label>
            <Input
              id="videoUrl"
              {...register("videoUrl")}
              placeholder="https://youtube.com/watch?v=..."
            />
            {errors.videoUrl && (
              <p className="text-sm text-red-500">{errors.videoUrl.message as string}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Images - File Upload */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Images</CardTitle>
          <CardDescription className="text-sm">Upload truck images (will be stored in Cloudinary)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          {/* Existing Images (Edit Mode) */}
          {mode === "edit" && existingImages.length > 0 && (
            <div>
              <Label className="mb-2 block">Existing Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map((url, index) => (
                  <div key={index} className="relative group">
                    <Image
                      src={url}
                      alt={`Existing ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
            </div>
          )}

          {/* New Images Preview */}
          {imagePreviews.length > 0 && (
            <div>
              <Label className="mb-2 block">New Images</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewImage(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* File Input */}
          <div>
            <Label htmlFor="images" className="cursor-pointer">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, WEBP up to 10MB</p>
              </div>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Concession Features */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Concession Features</CardTitle>
          <CardDescription className="text-sm">Equipment and feature specifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          <div className="grid gap-4 md:grid-cols-2">
            {CONCESSION_FEATURES_KEYS.map((key) => (
              <div key={key} className="space-y-2">
                <Label htmlFor={`cf-${key}`}>
                  {key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                </Label>
                <Input
                  id={`cf-${key}`}
                  {...register(`concessionFeatures.${key}` as any)}
                  placeholder={`Enter ${key.replace(/_/g, " ")}`}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Special Specifications - String Array */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Special Specifications</CardTitle>
          <CardDescription className="text-sm">Add custom specifications (list of strings)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          {/* Display specifications */}
          {specifications.length > 0 && (
            <div className="space-y-2">
              {specifications.map((spec, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{spec}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSpecification(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add new specification */}
          <div className="flex gap-2">
            <Input
              value={newSpec}
              onChange={(e) => setNewSpec(e.target.value)}
              placeholder="Enter specification"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSpecification();
                }
              }}
            />
            <Button type="button" onClick={addSpecification} variant="outline">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Additional Options */}
      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Additional Options</CardTitle>
          <CardDescription className="text-sm">Optional add-ons with pricing</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
          {optionFields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-2">
              <Input
                {...register(`additionalOptions.${index}.name` as const)}
                placeholder="Option name"
                className="flex-1"
              />
              <Input
                {...register(`additionalOptions.${index}.price` as const, {
                  valueAsNumber: true,
                })}
                type="number"
                step="0.01"
                placeholder="Price"
                className="w-32"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeOption(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendOption({ name: "", price: undefined })}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Option
          </Button>
        </CardContent>
      </Card>

      {/* Form Actions */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="w-full sm:w-auto order-2 sm:order-1"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto order-1 sm:order-2">
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              <span className="hidden sm:inline">Uploading & Saving...</span>
              <span className="sm:hidden">Saving...</span>
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Create Truck" : "Update Truck"}
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
