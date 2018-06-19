'use strict'

module.exports = (sequelize, DataTypes) => {
  var Task = sequelize.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN
    }
  }, {
    timestamps: false
  })
  Task.associate = function (models) {
    Task.belongsToMany(models.Polyline, { through: 'TasksPolylines' })
    Task.hasMany(models.TasksPolylines)
  }
  return Task
}
