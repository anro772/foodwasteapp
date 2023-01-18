module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define("Groups", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [2, 30]
            }
        }
    });

    Groups.associate = (models) => {
        Groups.hasMany(models.UserGroups, {
            foreignKey: "groupId"
        });
    }

    return Groups;
};