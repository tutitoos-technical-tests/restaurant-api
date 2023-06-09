interface Root {
  id: string;
}

export interface Pizza extends Root {
  name: string;
  price: number;
}

export interface Salesman extends Root {
  name: string;
  round_robin_index: number;
}

export interface Order extends Root {
  salesman_id: string;
}

export interface OrderItem extends Root {
  pizza_id: string;
  order_id: string;
  quantity: number;
}

export interface DatabaseProps {
  dbName: string;
  user: string;
  password: string;
  host: string;
  port: number;
}
