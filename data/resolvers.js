'use strict'
var Sequelize = require('sequelize')
const Op = Sequelize.Op

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
  Marker,
  Task,
  TasksPolylines
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
    },
    async allTasks () {
      const tasks = await Task.all()
      return tasks
    },
    async allTasksPolylines () {
      const tasksPolylines = await TasksPolylines.all()
      return tasksPolylines
    },

    async findTasks () {
      return Task.findAll({
        /* include: [{
          model: TasksPolylines,
          where: { TaskId: Sequelize.col('Task.id') }
        }],
        order: [
          ['id'],
          [TasksPolylines, 'Sequence', 'ASC']
        ] */
      })
    },
    async findTaskOrderer (_, { id }) {
      return Task.findOne({
        where: { id: id },
        include: [{
          model: TasksPolylines,
          where: { TaskId: Sequelize.col('Task.id') }
        }],
        order: [[TasksPolylines, 'Sequence', 'ASC']]
      })
    },

    async tasksPolylinesByTask (_, { taskId }) {
      return TasksPolylines.findAll({
        where: { TaskId: taskId },
        order: [['Sequence', 'ASC']]
      })
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

    async visiblePolyline (_, { id }) {
      let result = false
      let polyline = await Polyline.findById(id)

      if (polyline != null) {
        Polyline.update({ visible: !polyline.visible }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
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
    },

    async addTask (_, {
      name,
      visible
    }) {
      const task = await Task.create({
        name,
        visible
      })
      return task
    },

    async delTask (_, { id }) {
      return Task.destroy({
        where: { id }
      })
        .then(
          TasksPolylines.destroy({
            where: {
              TaskId: id
            }
          })
        )
    },

    async visibleTask (_, { id }) {
      let result = false
      let task = await Task.findById(id)

      if (task != null) {
        Task.update({ visible: !task.visible }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
    },

    async addTasksPolylines (_, {
      TaskId,
      PolylineId
    }) {
      let tasksPolylines = await TasksPolylines.findOne({
        where: {
          TaskId: TaskId
        },
        order: [['Sequence', 'DESC']],
        limit: 1
      })
      const Sequence = tasksPolylines != null ? tasksPolylines.Sequence + 1 : 1
      const Inverse = 0

      tasksPolylines = await TasksPolylines.create({
        TaskId,
        PolylineId,
        Inverse,
        Sequence
      })
      return tasksPolylines
    },

    async delTasksPolylines (_, { id }) {
      return TasksPolylines.destroy({
        where: { id }
      })
    },

    async upPolylineOnTask (_, { id }) {
      let result = false
      let tasksPolylinesToUp = await TasksPolylines.findById(id)

      if (tasksPolylinesToUp != null) {
        let tasksPolylinesToDown = await TasksPolylines.findOne({
          where: {
            TaskId: tasksPolylinesToUp.TaskId,
            Sequence: {
              [Op.lt]: tasksPolylinesToUp.Sequence
            }
          },
          order: [['Sequence', 'DESC']],
          limit: 1
        })

        if (tasksPolylinesToDown != null) {
          TasksPolylines.update({ Sequence: tasksPolylinesToUp.Sequence }, {
            where: { id: tasksPolylinesToDown.id }
          }).then(
            TasksPolylines.update({ Sequence: tasksPolylinesToDown.Sequence }, {
              where: { id: id }
            }).then(
              result = true
            )
          )
        }
      }
      return result
    },

    async downPolylineOnTask (_, { id }) {
      let result = false
      let tasksPolylinesToDown = await TasksPolylines.findById(id)

      if (tasksPolylinesToDown != null) {
        let tasksPolylinesToUp = await TasksPolylines.findOne({
          where: {
            TaskId: tasksPolylinesToDown.TaskId,
            Sequence: {
              [Op.gt]: tasksPolylinesToDown.Sequence
            }
          },
          order: [['Sequence', 'ASC']],
          limit: 1
        })

        if (tasksPolylinesToUp != null) {
          TasksPolylines.update({ Sequence: tasksPolylinesToDown.Sequence }, {
            where: { id: tasksPolylinesToUp.id }
          }).then(
            TasksPolylines.update({ Sequence: tasksPolylinesToUp.Sequence }, {
              where: { id: id }
            }).then(
              result = true
            )
          )
        }
      }
      return result
    },

    async inverseTasksPolylines (_, { id }) {
      let result = false
      let tasksPolylines = await TasksPolylines.findById(id)

      if (tasksPolylines != null) {
        TasksPolylines.update({ Inverse: !tasksPolylines.Inverse }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
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
    async icon (iconOwner) {
      const icon = await iconOwner.getIconItem()
      return icon
    }
  },

  Marker: {
    async position (marker) {
      const position = await marker.getPath()
      return position
    }
  },

  Task: {
    async tasksPolylines (task) {
      const tasksPolylines = await task.getTasksPolylines()
      return tasksPolylines
    },
    async polylines (task) {
      const polylines = await task.getPolylines()
      return polylines
    }
  },

  TasksPolylines: {
    async polyline (tasksPolylines) {
      const polyline = await tasksPolylines.getPolyline()
      return polyline
    }
  }
}

module.exports = resolvers
