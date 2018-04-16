'use strict'

module.exports = (sequelize, DataTypes) => {
  var Path = sequelize.define('Path', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    lat: {
      type: DataTypes.FLOAT
    },
    lng: {
      type: DataTypes.FLOAT
    }
  }, {
    timestamps: false
  })
  Path.associate = function (models) {
    Path.belongsToMany(models.Polyline, { through: 'PolylinesPaths' })
  }
  return Path
}
