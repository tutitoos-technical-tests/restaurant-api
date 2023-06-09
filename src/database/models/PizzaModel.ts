import { DataTypes } from "sequelize";
import { database } from "../index.js";

const PizzaModel = database.define("Pizza", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

export default PizzaModel;
