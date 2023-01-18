// module.exports = (sequelize, DataTypes) => {
//     const Foods = sequelize.define("Foods", {
//         category: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [4, 15]
//             }
//         },
//         foodName: {
//             type: DataTypes.STRING,
//             allowNull: false,
//             validate: {
//                 len: [1, 15]
//             }
//         },
//         id: {
//             type: DataTypes.INTEGER,
//             autoIncrement: true,
//             primaryKey: true
//         },
//     });

//     //create foreign key relationship between Foods and UserFridge
//     Foods.associate = (models) => {
//         Foods.hasOne(models.UserFridge, {
//             foreignKey: 'foodId'
//         });

//         Foods.hasMany(models.ClaimedFood, {
//             foreignKey: 'foodId'
//         });
//     }

//     return Foods;
// };