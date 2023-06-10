import { DataTypes, Model } from "sequelize";
import { database } from "../index.js";
import { type Salesman } from "../../types/types.js";

class SalesmanModel extends Model {
  declare dataValues: Salesman;
}

SalesmanModel.init(
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
    round_robin_index: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: database,
    modelName: "Salesman",
    tableName: "salesman",
    createdAt: false,
    updatedAt: false,
    underscored: true,
  }
);

export default SalesmanModel;
