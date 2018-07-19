'use strict'

module.exports = (sequelize, DataTypes) => {
  var LineTypesIcons = sequelize.define('LineTypesIcons', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    LineTypeId: {
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
  LineTypesIcons.associate = function (models) {
  }
  return LineTypesIcons
}
