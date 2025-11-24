import express from "express"
import resourceCategoriesController from "../controllers/resourceCategoriesController.js"

const router = express.Router()

export default (db) => {
  const controller = resourceCategoriesController(db)

  router.get("/", controller.getAll)
  router.post("/", controller.create)
  router.put("/:id", controller.update)
  router.delete("/:id", controller.remove)

  return router
}
