'use strict';

const { USER_GENDER } = require('../utils/constant');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn(
        'Users',
        'gender',
        {
          type: Sequelize.ENUM,
          values: Object.values(USER_GENDER),
          defaultValue: USER_GENDER.MALE,
        },
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      'Users',
        await queryInterface.removeColumn('Users', 'gender', { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
