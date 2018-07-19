'use strict'

module.exports = (sequelize, DataTypes) => {
  var Polyline = sequelize.define('Polyline', {
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
    strokeColor: {
      type: DataTypes.STRING
    },
    lineTypeId: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
  Polyline.associate = function (models) {
    Polyline.belongsTo(models.LineType)
    Polyline.belongsToMany(models.Path, { through: 'PolylinesPaths' })
  }
  return Polyline
}
