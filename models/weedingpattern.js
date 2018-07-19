'use strict'
module.exports = (sequelize, DataTypes) => {
  var WeedingPattern = sequelize.define('WeedingPattern', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  WeedingPattern.associate = function (models) {
    // associations can be defined here
  }
  return WeedingPattern
}
