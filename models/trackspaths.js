'use strict'

module.exports = (sequelize, DataTypes) => {
  var TracksPaths = sequelize.define('TracksPaths', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    TrackId: {
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
  TracksPaths.associate = function (models) {
    // associations can be defined here
  }
  return TracksPaths
}
