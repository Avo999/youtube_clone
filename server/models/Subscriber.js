import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Users from './User';

class Subscribers extends Model {}

Subscribers.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: "subscribers",
    timestamps: false,
});

Users.hasMany(Subscribers, {
    foreignKey: "userId",
    onDelete: "CASCADE",
});

Subscribers.belongsTo(Users, {
    foreignKey: "userId",
});

export default Subscribers;