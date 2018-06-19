'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      visible: {
        type: Sequelize.BOOLEAN
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tasks')
  }
}
