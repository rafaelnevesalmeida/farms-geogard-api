'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('IconItems', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      path: {
        type: Sequelize.INTEGER
      },
      scale: {
        type: Sequelize.INTEGER
      },
      strokeWeight: {
        type: Sequelize.INTEGER
      },
      strokeColor: {
        type: Sequelize.STRING
      },
      fillColor: {
        type: Sequelize.STRING
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('IconItems')
  }
}
