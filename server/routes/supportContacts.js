import express from "express"
import supportContactsController from "../controllers/supportContactsController.js"

const router = express.Router()

export default (db) => {
  const controller = supportContactsController(db)

  router.get("/", controller.getAll)
  router.post("/", controller.create)
  router.put("/:id", controller.update)
  router.delete("/:id", controller.remove)

  return router
}
