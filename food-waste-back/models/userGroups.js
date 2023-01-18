module.exports = (sequelize, DataTypes) => {
    const UserGroups = sequelize.define("UserGroups", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        
        groupName: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 30]
            }
        },
        preference: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                len: [1, 30]
            }
        }
    });

    UserGroups.associate = (models) => {
        UserGroups.belongsTo(models.Users, {
            foreignKey: 'userId'
        });

        UserGroups.belongsTo(models.Groups, {
            foreignKey: 'groupId'
        });

    }
    return UserGroups;
};