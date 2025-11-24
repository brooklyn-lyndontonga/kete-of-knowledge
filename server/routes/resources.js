import express from "express"
import resourcesController from "../controllers/resourcesController.js"

const router = express.Router()

export default (db) => {
  const controller = resourcesController(db)

  router.get("/", controller.getAll)
  router.get("/category/:categoryId", controller.getByCategory)
  router.post("/", controller.create)
  router.put("/:id", controller.update)
  router.delete("/:id", controller.remove)

  return router
}
