import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Video from "./Video";
import Users from "./User";

class Likes extends Model {}

Likes.init({
    // videoId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'videos',
    //         key: 'id',
    //     }
    // },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     references: {
    //         model: 'users',
    //         key: 'id',
    //     }
    // },
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, {
    sequelize,
    modelName: "like",
    tableName: "like",
    timestamps: false,
});

Likes.belongsTo(Video, {
    foreignKey: 'videoId',
});

Video.hasMany(Likes, {
    foreignKey: 'videoId'
});

Likes.belongsTo(Users, {
    foreignKey: 'userId',
});

export default Likes;