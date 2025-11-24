import express from "express"
import profileSeedsController from "../controllers/profileSeedsController.js"

const router = express.Router()

export default (db) => {
  const controller = profileSeedsController(db)

  router.get("/", controller.getAll)
  router.post("/", controller.create)
  router.put("/:id", controller.update)
  router.delete("/:id", controller.remove)

  return router
}
