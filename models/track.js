'use strict'

module.exports = (sequelize, DataTypes) => {
  var Track = sequelize.define('Track', {
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
  Track.associate = function (models) {
    Track.belongsToMany(models.Icon, { through: 'TracksIcons' })
    Track.belongsToMany(models.Path, { through: 'TracksPaths' })
  }
  return Track
}
