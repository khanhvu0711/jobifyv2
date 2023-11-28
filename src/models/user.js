'use strict';
import {
  JOB_STATUS,
  JOB_TYPE,
  USER_GENDER,
  USER_ROLE,
} from '../utils/constant';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Job, { foreignKey: 'createdBy' });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.TEXT,
      location: { type: DataTypes.STRING, defaultValue: 'my city' },
      image: DataTypes.BLOB,
      role: {
        type: DataTypes.ENUM,
        values: Object.values(USER_ROLE),
        defaultValue: Object.values(USER_ROLE.USER),
      },
      gender: {
        type: DataTypes.ENUM,
        values: Object.values(USER_GENDER),
        defaultValue: Object.values(USER_GENDER.MALE),
      },
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
