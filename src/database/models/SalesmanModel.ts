import { DataTypes } from "sequelize";
import { database } from "../index.js";

const SalesmanModel = database.define("Salesman", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  round_robin_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default SalesmanModel;
