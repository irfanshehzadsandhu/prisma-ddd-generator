const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Token extends Model {
      static associate(models) {
            
      }
    }

    Token.init(
      {
         id: DataTypes.NUMBER,
         device: DataTypes.STRING,
         operatingSystem: DataTypes.STRING,
            
      },
      {
        sequelize,
        modelName: 'Token',
        timestamps: true,
        paranoid: true
      },
    );
    return Token;
};


