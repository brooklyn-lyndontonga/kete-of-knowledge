import express from "express"
import snapshotsController from "../controllers/snapshotsController.js"

const router = express.Router()

export default (db) => {
  const controller = snapshotsController(db)

  router.get("/", controller.getAll)
  router.put("/:id", controller.update)

  return router
}
