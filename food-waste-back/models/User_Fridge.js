module.exports = (sequelize, DataTypes) => {
    const UserFridge = sequelize.define("UserFridge", {
        availability: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 15]
            }
        },
        foodId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                len: [1, 15]
            }
        },
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
    });

    UserFridge.associate = (models) => {
        UserFridge.hasMany(models.Foods, {
            foreignKey: 'id'
        })

        UserFridge.belongsTo(models.Users, {
            foreignKey: 'userId'
        });
    }

    return UserFridge;
};