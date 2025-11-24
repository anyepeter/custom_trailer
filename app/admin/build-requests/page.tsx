"use client";

import { useState, useEffect } from "react";
import { FileText, Calendar, Mail, Phone, MapPin, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getAllBuildRequestsAction, updateBuildRequestAction } from "@/lib/admin/actions";
import type { BuildRequest } from "@prisma/client";

export default function BuildRequestsPage() {
  const [requests, setRequests] = useState<BuildRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<BuildRequest | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState("");
  const [notes, setNotes] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    loadRequests();
  }, [statusFilter, searchQuery]);

  const loadRequests = async () => {
    setLoading(true);
    const result = await getAllBuildRequestsAction({
      status: statusFilter !== "all" ? statusFilter : undefined,
      search: searchQuery || undefined,
    });

    if (result.success) {
      setRequests(result.data);
    }
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: string) => {
    const result = await updateBuildRequestAction(id, {
      status: status as any,
      notes: notes || undefined,
    });

    if (result.success) {
      toast({
        title: "Success",
        description: "Request status updated",
      });
      loadRequests();
      setSelectedRequest(null);
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Build Submissions</h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Review and manage custom build requests ({requests.length} total)
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-sm"
        />
      </div>

      {/* Requests Grid */}
      {loading ? (
        <div className="text-center py-12 text-sm sm:text-base">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <FileText className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
            No build requests
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            Build requests will appear here when customers submit them
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {requests.map((request) => (
            <Card key={request.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">
                      {request.firstName} {request.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">{new Date(request.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(request.status)} text-xs whitespace-nowrap`}>
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 min-w-0">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{request.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span>{request.phoneNumber}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span>{request.zipcode}</span>
                </div>
                {request.totalPrice && (
                  <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                    <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span>${Number(request.totalPrice).toLocaleString()}</span>
                  </div>
                )}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4 text-sm"
                      onClick={() => {
                        setSelectedRequest(request);
                        setUpdatingStatus(request.status);
                        setNotes(request.notes || "");
                      }}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle>
                        Build Request Details - {request.firstName} {request.lastName}
                      </DialogTitle>
                      <DialogDescription>
                        Submitted on {new Date(request.createdAt).toLocaleDateString()}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div>
                        <h3 className="font-semibold mb-2">Contact Information</h3>
                        <div className="grid gap-2 text-sm">
                          <div><strong>Email:</strong> {request.email}</div>
                          <div><strong>Phone:</strong> {request.phoneNumber}</div>
                          <div><strong>Zipcode:</strong> {request.zipcode}</div>
                        </div>
                      </div>

                      {/* Trailer Details */}
                      <div>
                        <h3 className="font-semibold mb-2">Trailer Details</h3>
                        <div className="grid gap-2 text-sm">
                          <div><strong>Size:</strong> {request.trailerSize}</div>
                          {request.porchConfiguration && (
                            <div><strong>Porch:</strong> {request.porchConfiguration}</div>
                          )}
                        </div>
                      </div>

                      {/* Equipment */}
                      <div>
                        <h3 className="font-semibold mb-2">Equipment</h3>
                        <div className="grid gap-2 text-sm">
                          <div><strong>Range Hood:</strong> {request.rangeHood}</div>
                          <div><strong>Fire Suppression:</strong> {request.fireSuppressionSystem}</div>
                          {request.flatTopGriddle && (
                            <div><strong>Flat Top Griddle:</strong> {request.flatTopGriddle}</div>
                          )}
                          {request.charbroiler && (
                            <div><strong>Charbroiler:</strong> {request.charbroiler}</div>
                          )}
                          {request.deepFryer && (
                            <div><strong>Deep Fryer:</strong> {request.deepFryer}</div>
                          )}
                          {request.refrigeration && request.refrigeration.length > 0 && (
                            <div><strong>Refrigeration:</strong> {request.refrigeration.join(", ")}</div>
                          )}
                        </div>
                      </div>

                      {/* Customization */}
                      <div>
                        <h3 className="font-semibold mb-2">Customization</h3>
                        <div className="grid gap-2 text-sm">
                          <div><strong>Exterior Color:</strong> {request.exteriorColor}</div>
                          <div><strong>Interior Finish:</strong> {request.interiorFinish}</div>
                        </div>
                      </div>

                      {/* Financial */}
                      <div>
                        <h3 className="font-semibold mb-2">Financial</h3>
                        <div className="grid gap-2 text-sm">
                          <div><strong>Budget:</strong> {request.budget}</div>
                          <div><strong>Financing Needed:</strong> {request.needFinancing}</div>
                          {request.totalPrice && (
                            <div><strong>Estimated Price:</strong> ${Number(request.totalPrice).toLocaleString()}</div>
                          )}
                        </div>
                      </div>

                      {/* Additional Info */}
                      {request.additionalInfo && (
                        <div>
                          <h3 className="font-semibold mb-2">Additional Information</h3>
                          <p className="text-sm text-slate-700">{request.additionalInfo}</p>
                        </div>
                      )}

                      {/* Status Update */}
                      <div className="space-y-4 border-t pt-4">
                        <div className="space-y-2">
                          <Label>Status</Label>
                          <Select
                            value={updatingStatus}
                            onValueChange={setUpdatingStatus}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="completed">Completed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Add notes about this request..."
                            rows={3}
                          />
                        </div>

                        <Button
                          onClick={() => handleStatusUpdate(request.id, updatingStatus)}
                          className="w-full"
                        >
                          Update Status
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
