// // server/routes/library.js

// import express from "express"

// import {
//   listResourceCategoriesController,
//   getResourceCategoryController,
//   createResourceCategoryController,
//   updateResourceCategoryController,
//   deleteResourceCategoryController,
// } from "../controllers/resourceCategoriesController.js"

// import { listResourcesByCategory } from "../controllers/libraryResourcesController.js"

// const router = express.Router()

// // ----------------------
// // RESOURCE CATEGORIES
// // ----------------------

// // GET /api/library
// router.get("/", listResourceCategoriesController)

// // GET /api/library/:id
// router.get("/:id", getResourceCategoryController)

// // GET /api/library/:id/resources
// router.get("/:id/resources", listResourcesByCategory)

// // ----------------------
// // ADMIN (later)
// // ----------------------
// router.post("/", createResourceCategoryController)
// router.put("/:id", updateResourceCategoryController)
// router.delete("/:id", deleteResourceCategoryController)

// export default router

import express from "express"
import {
  listResourceCategoriesController,
  getResourceCategoryController,
} from "../controllers/resourceCategoriesController.js"

import { listResourcesByCategory } from "../controllers/libraryResourcesController.js"

const router = express.Router()

router.use((req, res, next) => {
  console.log(`📚 Library API: ${req.method} ${req.originalUrl}`)
  next()
})

// categories
router.get("/", listResourceCategoriesController)
router.get("/:id", getResourceCategoryController)

// resources inside category
router.get("/:id/resources", listResourcesByCategory)


export default router
