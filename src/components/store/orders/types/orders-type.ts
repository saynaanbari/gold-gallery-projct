export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
}

export interface CreateOrderData {
  shippingAddress: ShippingAddress;
  paymentMethod: "cash";
}
