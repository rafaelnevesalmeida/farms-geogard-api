'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Polyline {
    id: ID!
    name: String
    visible: Boolean
    strokeColor: String
    strokeOpacity: Float
    strokeWeight: Int
    icons: [Icon]
    paths: [Path]
  }

  type Icon {
    id: ID!
    iconItemId: Int
    offset: String
    repeat: String
    iconItem: IconItem 
  }

  type IconItem {
    id: ID!
    path: Int
    scale: Int
    strokeWeight: Int
    strokeColor: String
    fillColor: String
    icons: [Icon]
  }
 
  type Path {
    id: ID!
    lat: Float
    lng: Float
  }

  type PolylinesIcons {
    id: ID!
    PolylineId: Int
    IconId: Int
  }

  type PolylinesPaths {
    id: ID!
    PolylineId: Int
    PathId: Int
  }
 
  type Mutation {
    addPolyline (
      name: String,
      visible: Boolean,
      strokeColor: String,
      strokeOpacity: Float,
      strokeWeight: Int,
      icons: [Int],
      path: [Int],
    ): Polyline

    addIcon (
      iconItemId: Int,
      offset: String,
      repeat: String,
    ): Icon

    addIconItem (
      path: Int,
      scale: Int,
      strokeWeight: Int,
      strokeColor: String,
      fillColor: String
    ): IconItem
   
    addPath (
      lat: Float,
      lng: Float,
    ): Path

    addPolylinesIcons (
      PolylineId: Int,
      IconId: Int
    ): PolylinesIcons

    addPolylinesPaths (
      PolylineId: Int,
      PathId: Int
    ): PolylinesPaths
  }

  type Query {
    allPolylines: [Polyline]
    allPolylinesIcons: [PolylinesIcons]
    allPolylinesPaths: [PolylinesPaths]
    allIcons: [Icon]
    allIconItems: [IconItem]
    allPaths: [Path]
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
