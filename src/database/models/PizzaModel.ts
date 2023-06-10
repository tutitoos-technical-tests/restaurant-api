import { DataTypes, Model } from "sequelize";
import { database } from "../index.js";
import { type Pizza } from "../../types/types.js";

class PizzaModel extends Model {
  declare dataValues: Pizza;
}

PizzaModel.init(
  {
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
  },
  {
    sequelize: database,
    modelName: "Pizza",
    tableName: "pizza",
    createdAt: false,
    updatedAt: false,
    underscored: true,
  }
);

export default PizzaModel;
