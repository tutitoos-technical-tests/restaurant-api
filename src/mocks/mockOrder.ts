import { Order, OrderItem, Pizza, Salesman } from "../types/types";

export const mockOrders: Order[] = [
  { id: "0b090da2-e356-4525-a66e-1b7457509723", salesman_id: "d81221c2-33d0-43a1-bd75-422b7c72209d" },
  { id: "6c24e3cf-3eb7-4e05-8e77-3a9d4e7bbd52", salesman_id: "8a59b1b9-0e85-4f34-a8da-5723ccfd1e1c" },
  { id: "ae2ed199-b4f3-48c5-84da-9f3b83e94b7a", salesman_id: "d81221c2-33d0-43a1-bd75-422b7c72209d" },
];

export const mockSalesmen: Salesman[] = [
  { id: "d81221c2-33d0-43a1-bd75-422b7c72209d", name: "Vendedor 1", round_robin_index: 1 },
  { id: "8a59b1b9-0e85-4f34-a8da-5723ccfd1e1c", name: "Vendedor 2", round_robin_index: 2 },
];

export const mockPizzas: Pizza[] = [
  { id: "b377d17e-89d1-42d3-920f-6d4a22b85f92", name: "Pizza 1", price: 9.99 },
  { id: "ef5d1f51-c650-46c0-83f7-07f572705d4e", name: "Pizza 2", price: 8.99 },
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
  {
    id: "3b6d411e-9d8e-4382-94c7-1cc64e9c6757",
    pizza_id: "b377d17e-89d1-42d3-920f-6d4a22b85f92",
    order_id: "6c24e3cf-3eb7-4e05-8e77-3a9d4e7bbd52",
    quantity: 3,
  },
];
