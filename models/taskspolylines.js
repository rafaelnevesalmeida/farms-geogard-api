'use strict'

module.exports = (sequelize, DataTypes) => {
  var TasksPolylines = sequelize.define('TasksPolylines', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    TaskId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    PolylineId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    Inverse: {
      type: DataTypes.BOOLEAN
    },
    Sequence: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  TasksPolylines.associate = function (models) {
    TasksPolylines.belongsTo(models.Polyline)
    TasksPolylines.belongsTo(models.Task)
  }
  return TasksPolylines
}
