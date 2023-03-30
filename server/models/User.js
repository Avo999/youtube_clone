import {DataTypes, Model} from "sequelize";
import sequelize from "../services/sequelize";
import md5 from 'md5';
import Video from "./Video";
import Comment from "./Comment";

const {PASSWORD_SECRET} = process.env;

class Users extends Model {
    static passHash = (password) => {
        return md5(md5(password) + PASSWORD_SECRET);
    }
}

Users.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
            return undefined;
        },
        set(val) {
            if (val) {
                this.setDataValue('password', Users.passHash(val))
            }
        }
    },
    image: {
        type: DataTypes.STRING
    },
    activationCode: {
        type: DataTypes.STRING,
        allowNull: true,
        get() {
            return undefined
        }
    },

}, {
    sequelize,
    tableName: 'users',
    modelName: 'users',
    indexes: [{
        fields: [
            'email',
        ],
        unique: true
    },
        {
            fields: [
                'name'
            ],
            unique: true
        }
        ]
    });

Users.hasMany(Video, {
    foreignKey: "userId",
    onDelete: "cascade"
});

Video.belongsTo(Users, {
    foreignKey: 'userId',
    onDelete: 'cascade'
});

Users.hasMany(Comment, {
    foreignKey: "userId",
});

Comment.belongsTo(Users, {
    foreignKey: "userId"
});

export default Users;