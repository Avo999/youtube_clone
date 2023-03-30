import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";

class VideoTag  extends Model {}

VideoTag.init({},{
    sequelize,
    modelName: 'video_tag',
    tableName: 'video_tag',
    timestamps: false
});


export default VideoTag;