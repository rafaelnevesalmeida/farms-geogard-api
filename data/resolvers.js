'use strict'

// const { GraphQLScalarType } = require('graphql')
// const { Kind } = require('graphql/language')
const { PolylinesPaths, PolylinesIcons, Polyline, Icon, IconItem, Path } = require('../models')
// const bcrypt = require('bcrypt')
// const jwt = require('jsonwebtoken')
// const slugify = require('slugify')
require('dotenv').config()

const resolvers = {
  Query: {
    async allPolylines () {
      return await Polyline.all()
    },
    async allIcons () {
      return await Icon.all()
    },
    async allIconItems () {
      return await IconItem.all()
    },
    async allPaths () {
      return await Path.all()
    },
    async allPolylinesIcons () {
      return await PolylinesIcons.all()
    },
    async allPolylinesPaths () {
      return await PolylinesPaths.all()
    }
  },

  Mutation: {
    async addIconItem (_, {
      path,
      scale,
      strokeWeight,
      strokeColor,
      fillColor
    }) {
      return await IconItem.create({
        path,
        scale,
        strokeWeight,
        strokeColor,
        fillColor
      })
    },

    async addIcon (_, {
      iconItemId,
      offset,
      repeat
    }) {
      return await Icon.create({
        iconItemId,
        offset,
        repeat
      })
    },

    async addPath (_, {
      lat,
      lng
    }) {
      return await Path.create({
        lat,
        lng
      })
    },

    async addPolyline (_, {
      name,
      visible,
      strokeColor,
      strokeOpacity,
      strokeWeight
    }) {
      const polyline = await Polyline.create({
        name,
        visible,
        strokeColor,
        strokeOpacity,
        strokeWeight
      })
      // await polyline.setPath(paths);
      // await polyline.setIcons(iconss);
      return polyline
    },

    async addPolylinesIcons (_, {
      PolylineId,
      IconId
    }) {
      return await PolylinesIcons.create({
        PolylineId,
        IconId
      })
    },

    async addPolylinesPaths (_, {
      PolylineId,
      PathId
    }) {
      return await PolylinesPaths.create({
        PolylineId,
        PathId
      })
    }
  },

  Polyline: {
    async icons (polyline) {
      return await polyline.getIcons()
    },
    async paths (polyline) {
      return await polyline.getPaths()
    }
  },

  Icon: {
    async iconItem (icon) {
      return await icon.getIconItem()
    }
  },

  IconItem: {
    async icons (iconitem) {
      return await iconitem.getIcons()
    }
  }
}

module.exports = resolvers
