import { Order, OrderItem, Pizza, Salesman } from "../types/types";

export const mockOrder = {
  order_id: "0b090da2-e356-4525-a66e-1b7457509723",
  salesman_name: "Vendedor 1",
  details: [
    { item_id: "c10f2eb4-9db4-4f2c-9b8a-62eefc4cc7c5", pizza_name: "BBQ", quantity: 2 },
    { item_id: "5ef0a8f9-6210-48e0-944b-9f1aef9d7aaf", pizza_name: "BBQ", quantity: 1 },
  ],
};

export const mockOrders: Order[] = [
  { id: "0b090da2-e356-4525-a66e-1b7457509723", salesman_id: "d81221c2-33d0-43a1-bd75-422b7c72209d" },
  { id: "6c24e3cf-3eb7-4e05-8e77-3a9d4e7bbd52", salesman_id: "8a59b1b9-0e85-4f34-a8da-5723ccfd1e1c" },
];

export const mockSalesmen: Salesman[] = [
  { id: "d81221c2-33d0-43a1-bd75-422b7c72209d", name: "Vendedor 1", round_robin_index: 1 },
  { id: "8a59b1b9-0e85-4f34-a8da-5723ccfd1e1c", name: "Vendedor 2", round_robin_index: 2 },
];

export const mockPizzas: Pizza[] = [
  {
    id: "74159faf-751d-42c4-aef3-82efdfa21f87",
    name: "BBQ",
    price: 12.5,
  },
  {
    id: "61c450a7-c1b0-4679-a657-aafca3091d04",
    name: "Hawaiian",
    price: 12.15,
  },
];

export const mockOrderItems: OrderItem[] = [
  {
    id: "c10f2eb4-9db4-4f2c-9b8a-62eefc4cc7c5",
    pizza_id: "b377d17e-89d1-42d3-920f-6d4a22b85f92",
    order_id: "0b090da2-e356-4525-a66e-1b7457509723",
    quantity: 2,
  },
  {
    id: "5ef0a8f9-6210-48e0-944b-9f1aef9d7aaf",
    pizza_id: "ef5d1f51-c650-46c0-83f7-07f572705d4e",
    order_id: "0b090da2-e356-4525-a66e-1b7457509723",
    quantity: 1,
  },
];
