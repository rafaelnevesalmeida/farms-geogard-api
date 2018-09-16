'use strict'

module.exports = (sequelize, DataTypes) => {
  var PolylinesWaypoints = sequelize.define('PolylinesWaypoints', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    PolylineId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    WaypointId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  PolylinesWaypoints.associate = function (models) {
    PolylinesWaypoints.belongsTo(models.Polyline)
    PolylinesWaypoints.belongsTo(models.Waypoint)
  }
  return PolylinesWaypoints
}
