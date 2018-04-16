'use strict'

module.exports = (sequelize, DataTypes) => {
  var PolylinesIcons = sequelize.define('PolylinesIcons', {
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
    IconId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  PolylinesIcons.associate = function (models) {
    // associations can be defined here
  }
  return PolylinesIcons
}
