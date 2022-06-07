const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
      static associate(models) {
            
      }
    }

    Category.init(
      {
         id: DataTypes.NUMBER,
         name: DataTypes.STRING,
            
      },
      {
        sequelize,
        modelName: 'Category',
        timestamps: true,
        paranoid: true
      },
    );
    return Category;
};


