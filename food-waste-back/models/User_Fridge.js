module.exports = (sequelize, DataTypes) => {
    const UserFridge = sequelize.define("UserFridge", {
        availability: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 15]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        foodName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 35]
            }
        },
        foodCategory: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 35]
            }
        },
    });

    UserFridge.associate = (models) => {
        UserFridge.belongsTo(models.Users, {
            foreignKey: 'userId'
        });
    }

    return UserFridge;
};