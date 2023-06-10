import { DataTypes, Model } from "sequelize";
import { database } from "../index.js";
import OrderModel from "./OrderModel.js";
import PizzaModel from "./PizzaModel.js";
import { type OrderItem } from "../../types/types.js";

class OrderItemModel extends Model {
  declare dataValues: OrderItem;
}

OrderItemModel.init(
  {
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
      field: "pizza_id",
    },
    order_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: OrderModel,
        key: "id",
      },
      field: "order_id",
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "OrderItem",
    tableName: "order_item",
    createdAt: false,
    updatedAt: false,
    underscored: true,
  }
);

export default OrderItemModel;
