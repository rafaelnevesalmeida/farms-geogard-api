'use strict'

module.exports = (sequelize, DataTypes) => {
  var TracksIcons = sequelize.define('TracksIcons', {
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
    IconId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    timestamps: false
  })
  TracksIcons.associate = function (models) {
    // associations can be defined here
  }
  return TracksIcons
}
