'use strict'

module.exports = (sequelize, DataTypes) => {
  var Icon = sequelize.define('Icon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    iconItemId: {
      type: DataTypes.INTEGER.UNSIGNED
    },
    offset: {
      type: DataTypes.STRING
    },
    repeat: {
      type: DataTypes.STRING
    }
  }, {
    timestamps: false
  })
  Icon.associate = function (models) {
    Icon.belongsTo(models.IconItem)
    Icon.belongsToMany(models.Polyline, { through: 'PolylinesIcons' })
  }
  return Icon
}
