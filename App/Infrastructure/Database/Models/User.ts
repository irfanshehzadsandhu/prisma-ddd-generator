const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
      static associate(models) {
            
      }
    }

    User.init(
      {
         id: DataTypes.NUMBER,
         createdAt: DataTypes.DATE,
         updatedAt: DataTypes.DATE,
         email: DataTypes.STRING,
         name: DataTypes.STRING,
            
      },
      {
        sequelize,
        modelName: 'User',
        timestamps: true,
        paranoid: true
      },
    );
    return User;
};


