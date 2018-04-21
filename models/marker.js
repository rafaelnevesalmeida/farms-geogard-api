'use strict'

module.exports = (sequelize, DataTypes) => {
  var Marker = sequelize.define('Marker', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING
    },
    visible: {
      type: DataTypes.BOOLEAN
    },
    PathId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
  Marker.associate = function (models) {
    Marker.belongsTo(models.Path)
  }
  return Marker
}
