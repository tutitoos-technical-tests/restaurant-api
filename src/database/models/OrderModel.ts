import { DataTypes, Model } from "sequelize";
import { database } from "../index.js";
import SalesmanModel from "./SalesmanModel.js";

class OrderModel extends Model {}

OrderModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    salesman_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: SalesmanModel,
        key: "id",
      },
      field: "salesman_id",
    },
  },
  {
    sequelize: database,
    modelName: "Order",
    tableName: "order",
    createdAt: false,
    updatedAt: false,
    underscored: true,
  }
);

export default OrderModel;
