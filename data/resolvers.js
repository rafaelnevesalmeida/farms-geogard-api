'use strict'
var Sequelize = require('sequelize')
const Op = Sequelize.Op

const {
  LineTypesIcons,
  LineType,
  PolylinesWaypoints,
  Polyline,
  Icon,
  IconItem,
  Marker,
  Task,
  TasksPolylines,
  Waypoint,
  HdgSrc,
  WeedingPattern
} = require('../models')
require('dotenv').config()

const resolvers = {
  Query: {
    async allPolylines () {
      const polylines = await Polyline.all()
      return polylines
    },
    async allLineTypes () {
      const lineTypes = await LineType.all()
      return lineTypes
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
    async allLineTypesIcons () {
      const lineTypesIcons = await LineTypesIcons.all()
      return lineTypesIcons
    },
    async allPolylinesWaypoints () {
      const polylinesWaypoints = await PolylinesWaypoints.all()
      return polylinesWaypoints
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
    },

    async polylinesByType (_, { lineTypeId }) {
      return Polyline.findAll({
        where: { lineTypeId: lineTypeId },
        order: [['name', 'ASC']]
      })
    },

    async allWaypoints () {
      const waypoints = await Waypoint.all()
      return waypoints
    },

    async allHdgSrc () {
      const hdgSrc = await HdgSrc.all()
      return hdgSrc
    },

    async allWeedingPattern () {
      const weedingPattern = await WeedingPattern.all()
      return weedingPattern
    },

    async polylinesWaypointsByPolyline (_, { polylineId }) {
      return PolylinesWaypoints.findAll({
        where: { PolylineId: polylineId },
        order: [['WaypointId', 'ASC']]
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

    async addPolyline (_, {
      name,
      visible,
      strokeColor,
      lineTypeId
    }) {
      const polyline = await Polyline.create({
        name,
        visible,
        strokeColor,
        lineTypeId
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

    async visibleMarker (_, { id }) {
      let result = false
      let marker = await Marker.findById(id)

      if (marker != null) {
        Marker.update({ visible: !marker.visible }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
    },

    async addLineType (_, {
      label,
      strokeOpacity,
      strokeWeight
    }) {
      const lineType = await LineType.create({
        label,
        strokeOpacity,
        strokeWeight
      })
      return lineType
    },

    async addMarker (_, {
      name,
      visible,
      WaypointId
    }) {
      const marker = await Marker.create({
        name,
        visible,
        WaypointId
      })
      return marker
    },

    async addLineTypesIcons (_, {
      LineTypeId,
      IconId
    }) {
      const lineTypesIcons = await LineTypesIcons.create({
        LineTypeId,
        IconId
      })
      return lineTypesIcons
    },

    async addPolylinesWaypoints (_, {
      PolylineId,
      WaypointId
    }) {
      const polylinesWaypoints = await PolylinesWaypoints.create({
        PolylineId,
        WaypointId
      })
      return polylinesWaypoints
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
    },

    async addWaypoint (_, {
      lat,
      lon,
      visible,
      hdgSrcId,
      weedingPatternId,
      command
    }) {
      const waypoint = await Waypoint.create({
        lat,
        lon,
        visible,
        hdgSrcId,
        weedingPatternId,
        command
      })
      return waypoint
    },

    async addHdgSrc (_, { name }) {
      const hdgSrc = await HdgSrc.create({
        name
      })
      return hdgSrc
    },

    async addWeedingPattern (_, { name }) {
      const weedingPattern = await WeedingPattern.create({
        name
      })
      return weedingPattern
    },

    async setHdgSrcWaypoint (_, {
      waypointId,
      hdgSrcId
    }) {
      let result = false

      Waypoint.update({ hdgSrcId: hdgSrcId }, {
        where: { id: waypointId }
      }).then(
        result = true
      )
      return result
    },

    async setWeedingPatternWaypoint (_, {
      waypointId,
      weedingPatternId
    }) {
      let result = false

      Waypoint.update({ weedingPatternId: weedingPatternId }, {
        where: { id: waypointId }
      }).then(
        result = true
      )
      return result
    },

    async setCommandWaypoint (_, { waypointId, command }) {
      let result = false

      Waypoint.update({ command: command }, {
        where: { id: waypointId }
      }).then(
        result = true
      )
      return result
    },

    async visibleWaypoint (_, { id }) {
      let result = false
      let waypoint = await Waypoint.findById(id)

      if (waypoint != null) {
        Waypoint.update({ visible: !waypoint.visible }, {
          where: { id: id }
        }).then(
          result = true
        )
      }
      return result
    },

    async delPolylinesWaypoints (_, { id }) {
      return PolylinesWaypoints.destroy({
        where: { id }
      })
    }
  },

  Polyline: {
    async waypoint (polyline) {
      const waypoint = await polyline.getWaypoints()
      return waypoint
    },
    async lineType (polyline) {
      const lineType = await polyline.getLineType()
      return lineType
    },
    async polylinesWaypoints (polyline) {
      const polylinesWaypoints = await polyline.getPolylinesWaypoints()
      return polylinesWaypoints
    }
  },

  LineType: {
    async icons (lineType) {
      const icons = await lineType.getIcons()
      return icons
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
      const position = await marker.getWaypoint()
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
  },

  PolylinesWaypoints: {
    async waypoint (polylinesWaypoints) {
      const waypoint = await polylinesWaypoints.getWaypoint()
      return waypoint
    }
  },

  Waypoint: {
    async hdgSrc (waypoint) {
      const hdgSrc = await waypoint.getHdgSrc()
      return hdgSrc
    },
    async weedingPattern (waypoint) {
      const weedingPattern = await waypoint.getWeedingPattern()
      return weedingPattern
    }
  }
}

module.exports = resolvers
