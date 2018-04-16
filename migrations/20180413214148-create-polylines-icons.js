'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PolylinesIcons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      PolylineId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      },
      IconId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PolylinesIcons')
  }
}
