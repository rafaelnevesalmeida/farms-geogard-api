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
    strokeOpacity: {
      type: DataTypes.FLOAT
    },
    strokeWeight: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  })
  Polyline.associate = function (models) {
    Polyline.belongsToMany(models.Icon, { through: 'PolylinesIcons' })
    Polyline.belongsToMany(models.Path, { through: 'PolylinesPaths' })
    // Polyline.hasMany(models.TasksPolylines)
  }
  return Polyline
}
