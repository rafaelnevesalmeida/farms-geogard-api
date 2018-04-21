'use strict'

const {
  TracksPaths,
  TracksIcons,
  Track,
  PolylinesPaths,
  PolylinesIcons,
  Polyline,
  Icon,
  IconItem,
  Path,
  Marker
} = require('../models')
require('dotenv').config()

const resolvers = {
  Query: {
    async allPolylines () {
      const polylines = await Polyline.all()
      return polylines
    },
    async allTracks () {
      const tracks = await Track.all()
      return tracks
    },
    async allMarkers () {
      const markers = await Marker.all()
      return markers
    },
    async allIcons () {
      const icons = await Icon.all()
      return icons
    },
    async allIconItems () {
      const iconItems = await IconItem.all()
      return iconItems
    },
    async allPaths () {
      const paths = await Path.all()
      return paths
    },
    async allPolylinesIcons () {
      const polylinesIcons = await PolylinesIcons.all()
      return polylinesIcons
    },
    async allPolylinesPaths () {
      const polylinesPaths = await PolylinesPaths.all()
      return polylinesPaths
    },
    async allTracksIcons () {
      const tracksIcons = await TracksIcons.all()
      return tracksIcons
    },
    async allTracksPaths () {
      const tracksPaths = await TracksPaths.all()
      return tracksPaths
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
      const iconItem = await IconItem.create({
        path,
        scale,
        strokeWeight,
        strokeColor,
        fillColor
      })
      return iconItem
    },

    async addIcon (_, {
      iconItemId,
      offset,
      repeat
    }) {
      const icon = await Icon.create({
        iconItemId,
        offset,
        repeat
      })
      return icon
    },

    async addPath (_, {
      lat,
      lng
    }) {
      const path = await Path.create({
        lat,
        lng
      })
      return path
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
      return polyline
    },

    async addTrack (_, {
      name,
      visible,
      strokeColor,
      strokeOpacity,
      strokeWeight
    }) {
      const track = await Track.create({
        name,
        visible,
        strokeColor,
        strokeOpacity,
        strokeWeight
      })
      return track
    },

    async addMarker (_, {
      name,
      visible,
      PathId
    }) {
      const marker = await Marker.create({
        name,
        visible,
        PathId
      })
      return marker
    },

    async addPolylinesIcons (_, {
      PolylineId,
      IconId
    }) {
      const polylinesIcons = await PolylinesIcons.create({
        PolylineId,
        IconId
      })
      return polylinesIcons
    },

    async addPolylinesPaths (_, {
      PolylineId,
      PathId
    }) {
      const polylinesPaths = await PolylinesPaths.create({
        PolylineId,
        PathId
      })
      return polylinesPaths
    },

    async addTracksIcons (_, {
      TrackId,
      IconId
    }) {
      const tracksIcons = await TracksIcons.create({
        TrackId,
        IconId
      })
      return tracksIcons
    },

    async addTracksPaths (_, {
      TrackId,
      PathId
    }) {
      const tracksPaths = await TracksPaths.create({
        TrackId,
        PathId
      })
      return tracksPaths
    }
  },

  Polyline: {
    async icons (polyline) {
      const icons = await polyline.getIcons()
      return icons
    },
    async path (polyline) {
      const path = await polyline.getPaths()
      return path
    }
  },

  Track: {
    async icons (track) {
      const icons = await track.getIcons()
      return icons
    },
    async path (track) {
      const path = await track.getPaths()
      return path
    }
  },

  Icon: {
    async iconItem (icon) {
      const iconItem = await icon.getIconItem()
      return iconItem
    }
  },

  Marker: {
    async position (marker) {
      const position = await marker.getPath()
      return position
    }
  }
}

module.exports = resolvers
