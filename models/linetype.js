'use strict'

module.exports = (sequelize, DataTypes) => {
  var LineType = sequelize.define('LineType', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    label: {
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
  LineType.associate = function (models) {
    LineType.belongsToMany(models.Icon, { through: 'LineTypesIcons' })
  }
  return LineType
}
