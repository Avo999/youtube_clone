import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Video from "./Video";
import VideoTag from "./VideoTag";


class Tags extends Model {}

Tags.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }

}, {
    sequelize,
    tableName: 'tags',
    modelName: 'tags'
});

Tags.belongsToMany(Video, {through: VideoTag});
Video.belongsToMany(Tags, {through: VideoTag});
export default Tags;