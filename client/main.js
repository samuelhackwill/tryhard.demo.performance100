import { Template } from "meteor/templating"
import { Clients } from "../both/api.js"

import "./main.html"

rootUrl = Meteor.absoluteUrl().replace(/\/+$/, "")

Template.perf.onCreated(function helloOnCreated() {
  // counter starts at 0
  allAnimations = []
})

Template.perf.helpers({
  cursorSrc() {
    return rootUrl + "/cursor.png"
  },

  client() {
    let resultArray = convertObjectToArrayOfObjects(Clients.all())

    return resultArray
  },

  getCoords(arg) {
    return this.coords[Number(arg.hash.arg)]
  },
})

Template.perf.events({
  "click .addPointers"(event, instance) {
    index = Object.keys(Clients.all()).length

    for (let x = index; x < index + 10; x++) {
      var randomNumber1 = Math.floor(Math.random() * 1200)
      var randomNumber2 = Math.floor(Math.random() * 800)
      Clients.set(x, [randomNumber1, randomNumber2])
    }
  },
  "click .stopAnimation"() {
    obj = Object.keys(allAnimations)

    for (let i = 0; i < obj.length; i++) {
      clearInterval(allAnimations[obj[i]])
    }
  },
  "click .startAnimation"() {
    const everybody = document.getElementsByClassName("pointer")
    const total = everybody.length
    let index = 0

    fuck = setInterval(function () {
      // console.log("animate", everybody[index]?.id)
      moveDivInCircle(everybody[index]?.id)
      if (index >= total - 1) {
        console.log("stop adding animation to new cursors")
        clearInterval(fuck)
      }
      index = index + 1
    }, 50)
  },
})

const convertObjectToArrayOfObjects = (obj) => {
  return Object.entries(obj).map(([id, coords]) => ({ id, coords }))
}

moveDivInCircle = function (id, coords) {
  // Get the DICT element
  var div = document.getElementById(id)
  var strX = div.style.left
  var strY = div.style.top
  var coordsX = Number(strX.match(/\d+/)[0])
  var coordsY = Number(strY.match(/\d+/)[0])

  // Define variables
  var centerX = coordsX // X coordinate of the center
  var centerY = coordsY // Y coordinate of the center
  var radius = 100 // Radius of the circle
  var angle = 0 // Initial angle

  // Update div position 24 times per second
  var interval = 1000 / 60 // Interval in milliseconds

  allAnimations[id] = setInterval(function () {
    // Calculate new coordinates
    var newX = centerX + radius * Math.cos(angle)
    var newY = centerY + radius * Math.sin(angle)

    // Update DICT COORDS
    div.style.left = newX + "px"
    div.style.top = newY + "px"

    // Increment angle for the next position
    angle += (2 * Math.PI) / 60 // Increment by one full circle in one second
  }, interval)
}
