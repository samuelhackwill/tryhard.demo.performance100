import { Meteor } from "meteor/meteor"
import { WebApp } from "meteor/webapp"

const description = "Test de performance du navigateur. On teste l'animation de 100 pointeurs en JS vanilla."

WebApp.connectHandlers.use("/api/hello", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // Allow all origins (use specific domains for more security)
  res.setHeader("Content-Type", "text/plain")

  res.write(description)
  res.end()
})

Meteor.startup(() => {
  // code to run on server at startup
})

// Meteor.methods({
//   startAnimation() {
//     Woops = Meteor.setInterval(() => {
//       arrayOfClients = convertObjectToArrayOfObjects(Clients.all())
//       console.log("move", arrayOfClients)
//     }, 42)
//   },

//   stopAnimation() {
//     Meteor.clearInterval(Woops)
//   },
// })
