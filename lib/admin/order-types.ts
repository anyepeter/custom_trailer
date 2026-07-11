// Plain, serializable shapes for orders returned from server actions to the
// admin client pages. Prisma Decimal / Date values are converted to number /
// ISO-string here so they cross the server -> client boundary cleanly.

export interface AdminOrderItem {
  id: string;
  truckName: string;
  truckSize: string;
  truckType: string | null;
  truckImage: string;
  truckImages: string[];
  upgrades: { id: string; name: string; price: number }[];
  quantity: number;
  unitPrice: number;
  upgradesTotal: number;
  itemTotal: number;
}

export interface AdminOrder {
  id: string;
  orderNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  subtotal: number;
  tax: number | null;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  financingPreference: string | null;
  financingTerm: number | null;
  financingMonthlyEstimate: number | null;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  items: AdminOrderItem[];
}
