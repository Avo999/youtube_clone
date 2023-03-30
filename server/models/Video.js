import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Comment from "./Comment";

class Video extends Model {}

Video.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    videoUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    views: {
        type: DataTypes.BIGINT,
        default: 0
    },
}, {
    sequelize,
    tableName: 'videos',
    modelName: 'videos',
});

Video.hasMany(Comment, {
    foreignKey: 'videoId',
    onDelete: 'cascade'
});

Comment.belongsTo(Video, {
    foreignKey: 'videoId',
    onDelete: 'cascade'
});

export default Video;