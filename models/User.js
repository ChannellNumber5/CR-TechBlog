const {Model, DataTypes} = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

//ask TA about this... rough guess is that it creates method on User to check that the password input is the same as the one initialized with specific user
class User extends Model {
    checkPassword(inputPass) {
        return bcrypt.compareSync(inputPass, this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false,
            unique: true, //ensures that usernames cannot be reused... still need to find a way to catch this error and ask the user to resubmit a username
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail:true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [9],
            },
        },
    },
    {
        hooks: {
            //hashes user password before creating user and saving their "profile" into the database
            beforeCreate: async (newUserInfo) => {
                newUserInfo.password = await bcrypt.hash(newuserInfo.password, 10);
                return newUserInfo;
            },
            beforeBulkCreate: async (newUserInfo) => {
                newUserInfo.password = await bcrypt.hash(newuserInfo.password, 10);
                return newUserInfo;
            },
            //hashes user's updated password, if user decides to update their password
            beforeupdate: async (updatedUserInfo) => {
                updatedUserInfo.password = await bcrypt.hash(updatedUserInfo.password, 10);
                return updatedUserInfo;
            },
        },
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: false,
        modelName:'user',
    }
);

module.exports = User;

