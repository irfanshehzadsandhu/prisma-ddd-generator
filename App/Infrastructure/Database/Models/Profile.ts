const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Profile extends Model {
      static associate(models) {
            
      }
    }

    Profile.init(
      {
         id: DataTypes.NUMBER,
         bio: DataTypes.STRING,
         userId: DataTypes.NUMBER,
            
      },
      {
        sequelize,
        modelName: 'Profile',
        timestamps: true,
        paranoid: true
      },
    );
    return Profile;
};


