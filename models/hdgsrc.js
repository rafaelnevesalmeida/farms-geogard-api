'use strict'
module.exports = (sequelize, DataTypes) => {
  var HdgSrc = sequelize.define('HdgSrc', {
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
  HdgSrc.associate = function (models) {
    // associations can be defined here
  }
  return HdgSrc
}
