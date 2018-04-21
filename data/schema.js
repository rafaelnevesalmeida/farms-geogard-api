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
    path: [Path]
  }

  type Track {
    id: ID!
    name: String
    visible: Boolean
    strokeColor: String
    strokeOpacity: Float
    strokeWeight: Int
    icons: [Icon]
    path: [Path]
  }

  type Marker {
    id: ID!
    name: String
    visible: Boolean
    PathId: Int
    position: Path
  }

  type Icon {
    id: ID!
    iconItemId: Int
    offset: String
    repeat: String
    icon: IconItem 
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
 
  type TracksIcons {
    id: ID!
    TrackId: Int
    IconId: Int
  }

  type TracksPaths {
    id: ID!
    TrackId: Int
    PathId: Int
  }
 
  type Mutation {
    addPolyline (
      name: String,
      visible: Boolean,
      strokeColor: String,
      strokeOpacity: Float,
      strokeWeight: Int,
    ): Polyline

    addTrack (
      name: String,
      visible: Boolean,
      strokeColor: String,
      strokeOpacity: Float,
      strokeWeight: Int,
    ): Track

    addMarker (
      name: String,
      visible: Boolean,
      PathId: Int,
    ): Marker

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

    addTracksIcons (
      TrackId: Int,
      IconId: Int
    ): TracksIcons

    addTracksPaths (
      TrackId: Int,
      PathId: Int
    ): TracksPaths
 
  }

  type Query {
    allPolylines: [Polyline]
    allTracks: [Track]
    allPolylinesIcons: [PolylinesIcons]
    allTracksIcons: [TracksIcons]
    allPolylinesPaths: [PolylinesPaths]
    allTracksPaths: [TracksPaths]
    allIcons: [Icon]
    allIconItems: [IconItem]
    allPaths: [Path]
    allMarkers: [Marker]
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
