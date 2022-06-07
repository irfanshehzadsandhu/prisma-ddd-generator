const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
      static associate(models) {
            
      }
    }

    Post.init(
      {
         firstName: DataTypes.STRING,
         lastName: DataTypes.STRING,
            
      },
      {
        sequelize,
        modelName: 'Post',
        timestamps: true,
        paranoid: true
      },
    );
    return Post;
};


