var Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 30]
            }
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 30]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });

    Users.associate = (models) => {
        Users.hasMany(models.UserGroups, {
            foreignKey: 'userId'
        });
        //create one to one relationship between user and userFridge
        Users.hasOne(models.UserFridge, {
            foreignKey: 'userId'
        });

        // Users.hasMany(models.ClaimedFood, {
        //     foreignKey: 'userId'
        // });
    }
    return Users;
};