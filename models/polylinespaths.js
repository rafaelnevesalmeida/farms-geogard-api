'use strict'

module.exports = (sequelize, DataTypes) => {
  var PolylinesPaths = sequelize.define('PolylinesPaths', {
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
    PathId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  PolylinesPaths.associate = function (models) {
    // associations can be defined here
  }
  return PolylinesPaths
}
