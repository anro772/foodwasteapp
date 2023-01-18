// module.exports = (sequelize, DataTypes) => {
//     const ClaimedFood = sequelize.define("ClaimedFood", {
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },

//     });


//     ClaimedFood.associate = (models) => {
//         ClaimedFood.belongsTo(models.Foods, {
//             foreignKey: 'foodId'
//         });

//         ClaimedFood.belongsTo(models.Users, {
//             foreignKey: 'userId'
//         });

//     }
//     return ClaimedFood;
// }