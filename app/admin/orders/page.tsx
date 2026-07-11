"use client";

import { useState, useEffect } from "react";
import {
  ShoppingCart,
  Calendar,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  Package,
} from "lucide-react";
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
import { getAllOrdersAction, updateOrderAction } from "@/lib/admin/actions";
import type { AdminOrder } from "@/lib/admin/order-types";

const money = (n: number) =>
  `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ORDER_STATUSES = [
  "pending",
  "confirmed",
  "in_production",
  "completed",
  "cancelled",
] as const;

const PAYMENT_STATUSES = ["pending", "deposit_paid", "paid", "refunded"] as const;

const prettify = (s: string) =>
  s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState("");
  const [updatingPayment, setUpdatingPayment] = useState("");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFilter, searchQuery]);

  const loadOrders = async () => {
    setLoading(true);
    const result = await getAllOrdersAction({
      status: statusFilter !== "all" ? statusFilter : undefined,
      search: searchQuery || undefined,
    });
    if (result.success) {
      setOrders(result.data);
    }
    setLoading(false);
  };

  const handleUpdate = async (id: string) => {
    setSaving(true);
    const result = await updateOrderAction(id, {
      status: updatingStatus as (typeof ORDER_STATUSES)[number],
      paymentStatus: updatingPayment as (typeof PAYMENT_STATUSES)[number],
      notes: notes || undefined,
    });
    setSaving(false);

    if (result.success) {
      toast({ title: "Saved", description: "Order updated." });
      loadOrders();
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
      case "confirmed":
        return "bg-blue-100 text-blue-800";
      case "in_production":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "deposit_paid":
        return "bg-blue-100 text-blue-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const itemCount = (order: AdminOrder) =>
    order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Orders</h1>
        <p className="text-sm sm:text-base text-slate-600 mt-1">
          Customer orders placed through checkout ({orders.length} shown)
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
            {ORDER_STATUSES.map((s) => (
              <SelectItem key={s} value={s}>
                {prettify(s)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder="Search by name, email or order #..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:max-w-sm"
        />
      </div>

      {/* Orders Grid */}
      {loading ? (
        <div className="text-center py-12 text-sm sm:text-base">Loading...</div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
          <ShoppingCart className="h-12 w-12 sm:h-16 sm:w-16 text-slate-300 mb-4" />
          <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-2">
            No orders
          </h3>
          <p className="text-sm sm:text-base text-slate-600">
            Orders will appear here when customers check out
          </p>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
          {orders.map((order) => (
            <Card key={order.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-base sm:text-lg truncate">
                      {order.firstName} {order.lastName}
                    </CardTitle>
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
                      <span className="font-mono truncate">
                        #{order.orderNumber}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                      <span className="truncate">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <Badge
                      className={`${getStatusColor(order.status)} text-xs whitespace-nowrap`}
                    >
                      {prettify(order.status)}
                    </Badge>
                    <Badge
                      className={`${getPaymentColor(order.paymentStatus)} text-xs whitespace-nowrap`}
                    >
                      {prettify(order.paymentStatus)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-4 sm:p-6 pt-0">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 min-w-0">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{order.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span>{order.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700">
                  <Package className="h-3 w-3 sm:h-4 sm:w-4 text-slate-400 flex-shrink-0" />
                  <span>
                    {itemCount(order)} item{itemCount(order) > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm sm:text-base font-semibold text-slate-900">
                  <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                  <span>{money(order.total)}</span>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4 text-sm"
                      onClick={() => {
                        setUpdatingStatus(order.status);
                        setUpdatingPayment(order.paymentStatus);
                        setNotes(order.notes || "");
                      }}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto p-4 sm:p-6">
                    <DialogHeader>
                      <DialogTitle>
                        Order #{order.orderNumber}
                      </DialogTitle>
                      <DialogDescription>
                        {order.firstName} {order.lastName} &middot; Placed{" "}
                        {new Date(order.createdAt).toLocaleString()}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6">
                      {/* Customer Info */}
                      <div>
                        <h3 className="font-semibold mb-2">Customer</h3>
                        <div className="grid gap-2 text-sm">
                          <div>
                            <strong>Email:</strong> {order.email}
                          </div>
                          <div>
                            <strong>Phone:</strong> {order.phone}
                          </div>
                          <div>
                            <strong>Address:</strong> {order.address},{" "}
                            {order.city}, {order.state} {order.zipCode}
                          </div>
                        </div>
                      </div>

                      {/* Items */}
                      <div>
                        <h3 className="font-semibold mb-2">
                          Items ({order.items.length})
                        </h3>
                        <div className="space-y-3">
                          {order.items.map((item) => (
                            <div
                              key={item.id}
                              className="rounded-lg border border-slate-200 p-3 text-sm"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <div className="font-medium text-slate-900">
                                    {item.truckName}
                                  </div>
                                  <div className="text-xs text-slate-500">
                                    {item.truckSize}
                                    {item.truckType ? ` · ${item.truckType}` : ""}{" "}
                                    &middot; Qty {item.quantity}
                                  </div>
                                </div>
                                <div className="text-right font-semibold whitespace-nowrap">
                                  {money(item.itemTotal)}
                                </div>
                              </div>
                              <div className="mt-1 text-xs text-slate-600">
                                Unit: {money(item.unitPrice)}
                              </div>
                              {item.upgrades && item.upgrades.length > 0 && (
                                <div className="mt-2 border-t border-slate-100 pt-2">
                                  <div className="text-xs font-medium text-slate-700 mb-1">
                                    Upgrades ({money(item.upgradesTotal)})
                                  </div>
                                  <ul className="list-disc pl-5 text-xs text-slate-600 space-y-0.5">
                                    {item.upgrades.map((u, idx) => (
                                      <li key={u.id || idx}>
                                        {u.name} &mdash; {money(u.price)}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Totals */}
                      <div>
                        <h3 className="font-semibold mb-2">Payment</h3>
                        <div className="grid gap-2 text-sm">
                          <div>
                            <strong>Method:</strong> {order.paymentMethod}
                          </div>
                          <div className="flex justify-between max-w-xs">
                            <span className="text-slate-600">Subtotal</span>
                            <span>{money(order.subtotal)}</span>
                          </div>
                          {order.tax != null && (
                            <div className="flex justify-between max-w-xs">
                              <span className="text-slate-600">Tax</span>
                              <span>{money(order.tax)}</span>
                            </div>
                          )}
                          <div className="flex justify-between max-w-xs font-semibold text-slate-900">
                            <span>Total</span>
                            <span>{money(order.total)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Financing */}
                      {order.financingPreference &&
                        order.financingPreference !== "no" && (
                          <div>
                            <h3 className="font-semibold mb-2">Financing</h3>
                            <div className="grid gap-2 text-sm">
                              <div>
                                <strong>Preference:</strong>{" "}
                                {order.financingPreference}
                              </div>
                              {order.financingTerm != null && (
                                <div>
                                  <strong>Term:</strong> {order.financingTerm}{" "}
                                  months
                                </div>
                              )}
                              {order.financingMonthlyEstimate != null && (
                                <div>
                                  <strong>Est. Monthly:</strong>{" "}
                                  {money(order.financingMonthlyEstimate)}
                                </div>
                              )}
                            </div>
                          </div>
                        )}

                      {/* Status Update */}
                      <div className="space-y-4 border-t pt-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Order Status</Label>
                            <Select
                              value={updatingStatus}
                              onValueChange={setUpdatingStatus}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {ORDER_STATUSES.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {prettify(s)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label>Payment Status</Label>
                            <Select
                              value={updatingPayment}
                              onValueChange={setUpdatingPayment}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {PAYMENT_STATUSES.map((s) => (
                                  <SelectItem key={s} value={s}>
                                    {prettify(s)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Internal notes about this order..."
                            rows={3}
                          />
                        </div>

                        <Button
                          onClick={() => handleUpdate(order.id)}
                          className="w-full"
                          disabled={saving}
                        >
                          {saving ? "Saving..." : "Update Order"}
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
