'use strict'

module.exports = (sequelize, DataTypes) => {
  var IconItem = sequelize.define('IconItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    path: {
      type: DataTypes.INTEGER
    },
    scale: {
      type: DataTypes.INTEGER
    },
    strokeWeight: {
      type: DataTypes.INTEGER
    },
    strokeColor: {
      type: DataTypes.STRING
    },
    fillColor: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  IconItem.associate = function (models) {
    IconItem.hasMany(models.Icon)
  }
  return IconItem
}
