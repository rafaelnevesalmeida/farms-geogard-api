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
    path: [Path]
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
  }
 
  type Path {
    id: ID!
    lat: Float
    lng: Float
  }

  type LineTypesIcons {
    id: ID!
    LineTypeId: Int
    IconId: Int
  }

  type PolylinesPaths {
    id: ID!
    PolylineId: Int
    PathId: Int
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

    addPolylinesPaths (
      PolylineId: Int,
      PathId: Int
    ): PolylinesPaths

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

    setCommandWayPoint (
      waypointId: Int,
      command: String
    ): Boolean
  }

  type Query {
    allPolylines: [Polyline]
    allLineTypes: [LineType]
    allLineTypesIcons: [LineTypesIcons]
    allPolylinesPaths: [PolylinesPaths]
    allIcons: [Icon]
    allIconItems: [IconItem]
    allPaths: [Path]
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
  }
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
