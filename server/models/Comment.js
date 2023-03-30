import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import Video from "./Video";

class Comment extends Model {}

Comment.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    desc: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    tableName: "comment",
    modelName: 'comment'
});


export default Comment;

