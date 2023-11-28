'use strict';
import { JOB_STATUS, JOB_TYPE } from '../utils/constant';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Job.belongsTo(models.User, { foreignKey: 'createdBy' });
    }
  }
  Job.init(
    {
      company: DataTypes.STRING,

      position: { type: DataTypes.STRING, defaultValue: 'Staff' },

      jobStatus: {
        type: DataTypes.ENUM,
        values: Object.values(JOB_STATUS),
        defaultValue: JOB_STATUS.PENDING,
      },

      jobType: {
        type: DataTypes.ENUM,
        values: Object.values(JOB_TYPE),
        defaultValue: JOB_TYPE.FULL_TIME,
      },

      jobLocation: DataTypes.STRING,

      createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Job',
    }
  );
  return Job;
};
