import { DataTypes } from "sequelize";
import { database } from "../index.js";
import SalesmanModel from "./SalesmanModel.js";

const OrderModel = database.define("Order", {
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
  },
});

export default OrderModel;
