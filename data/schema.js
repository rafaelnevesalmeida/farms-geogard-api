'use strict'

const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
  type Polyline {
    id: ID!
    name: String
    visible: Boolean
    lineTypeId: Int
    lineType: LineType
    strokeColor: String
    waypoint: [Waypoint]
    polylinesWaypoints: [PolylinesWaypoints]
  }

  type LineType {
    id: ID!
    label: String
    strokeOpacity: Float
    strokeWeight: Int
    icons: [Icon]
  }

  type Marker {
    id: ID!
    name: String
    visible: Boolean
    waypointId: Int
    position: Waypoint
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
  }
 
  type LineTypesIcons {
    id: ID!
    LineTypeId: Int
    IconId: Int
  }

  type PolylinesWaypoints {
    id: ID!
    PolylineId: Int
    WaypointId: Int
    waypoint: Waypoint
  }
 
  type Task {
    id: ID!
    name: String
    visible: Boolean
    polylines: [Polyline]
    tasksPolylines: [TasksPolylines]
  }

   type TasksPolylines {
    id: ID!
    TaskId: Int
    PolylineId: Int
    polyline: Polyline
    Inverse: Boolean
    Sequence: Int
  }
 
  type Waypoint {
    id: ID!
    lat: Float
    lon: Float
    visible: Boolean
    hdgSrcId: Int
    weedingPatternId: Int
    command:  String
    hdgSrc: HdgSrc
    weedingPattern: WeedingPattern
  }

  type HdgSrc {
    id: ID!
    name: String
  }

  type WeedingPattern {
    id: ID!
    name: String
  }

  type Mutation {
    addPolyline (
      name: String,
      visible: Boolean,
      lineTypeId: Int,
      strokeColor: String,
    ): Polyline

    addLineType (
      label: String,
      strokeopacity: Float,
      strokeweight: Int,
    ): LineType

    addLineTypesIcons (
      LineTypeId: Int,
      IconId: Int
    ): LineTypesIcons

    visiblePolyline (
      id: Int
    ): Boolean

    visibleMarker (
      id: Int
    ): Boolean

    addMarker (
      name: String,
      visible: Boolean,
      WaipointId: Int,
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
   
    addPolylinesWaypoints (
      PolylineId: Int,
      WaypointId: Int
    ): PolylinesWaypoints

    addTask (
      name: String,
      visible: Boolean
    ): Task

    delTask (
      id: Int
    ): Boolean

    visibleTask (
      id: Int
    ): Boolean

    addTasksPolylines (
      TaskId: Int,
      PolylineId: Int,
      Inverse: Boolean,
      Sequence: Int
    ): TasksPolylines
 
    delTasksPolylines (
      id: Int
    ): Boolean
 
    delPolylinesWaypoints (
      id: Int
    ): Boolean

    upPolylineOnTask (
      id: Int
    ): Boolean

    downPolylineOnTask (
      id: Int
    ): Boolean

    inverseTasksPolylines (
      id: Int
    ): Boolean

    addWaypoint (
      lat: Float,
      lon: Float,
      visible: Boolean,
      hdgSrcId: Int,
      weedingPatternId: Int,
      command:  String,
    ): Waypoint

    addHdgSrc (
      name: String,
    ): HdgSrc
 
    addWeedingPattern (
      name: String,
    ): WeedingPattern

    setHdgSrcWaypoint (
      waypointId: Int,
      hdgSrcId: Int,
    ): Boolean

    setWeedingPatternWaypoint (
      waypointId: Int,
      weedingPatternId: Int,
    ): Boolean

    setCommandWaypoint (
      waypointId: Int,
      command: String
    ): Boolean

    visibleWaypoint (
      id: Int
    ): Boolean
    
  }

  type Query {
    allPolylines: [Polyline]
    allLineTypes: [LineType]
    allLineTypesIcons: [LineTypesIcons]
    allPolylinesWaypoints: [PolylinesWaypoints]
    allIcons: [Icon]
    allIconItems: [IconItem]
    allMarkers: [Marker]
    allTasks: [Task]
    allTasksPolylines: [TasksPolylines]
    findTasks: [Task]
    findTaskOrderer (id: Int): Task
    tasksPolylinesByTask (taskId: Int): [TasksPolylines]
    polylinesByType (lineTypeId: Int): [Polyline]
    allWaypoints: [Waypoint]
    allHdgSrc: [HdgSrc]
    allWeedingPattern: [WeedingPattern]
    polylinesWaypointsByPolyline (polylineId: Int): [PolylinesWaypoints]
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
