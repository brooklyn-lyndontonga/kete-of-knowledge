import express from "express"
import reflectionsController from "../controllers/reflectionsController.js"

const router = express.Router()

export default (db) => {
  const controller = reflectionsController(db)

  router.get("/", controller.getAll)
  router.post("/", controller.create)
  router.put("/:id", controller.update)
  router.delete("/:id", controller.remove)

  return router
}
