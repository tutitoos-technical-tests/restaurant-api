import { DataTypes } from "sequelize";
import { database } from "../index.js";
import OrderModel from "./OrderModel.js";
import PizzaModel from "./PizzaModel.js";

const OrderItemModel = database.define("OrderItem", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pizza_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PizzaModel,
      key: "id",
    },
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: OrderModel,
      key: "id",
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default OrderItemModel;
