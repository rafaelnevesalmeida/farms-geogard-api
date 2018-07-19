'use strict'
module.exports = (sequelize, DataTypes) => {
  var Waypoint = sequelize.define('Waypoint', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lon: {
      type: DataTypes.FLOAT
    },
    hdgSrcId: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    weedingPatternId: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    command: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  Waypoint.associate = function (models) {
    Waypoint.belongsTo(models.HdgSrc)
  }
  return Waypoint
}
