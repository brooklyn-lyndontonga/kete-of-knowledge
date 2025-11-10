import { Router } from "express"
import { getProfiles, createProfile, updateProfile, deleteProfile } from "../controllers/profilesController.js"

const router = Router()

router.get("/", async (req, res) => res.json(await getProfiles(req.db)))
router.post("/", async (req, res) => { await createProfile(req.db, req.body); res.json({ message: "Created" }) })
router.put("/:id", async (req, res) => { await updateProfile(req.db, req.params.id, req.body); res.json({ message: "Updated" }) })
router.delete("/:id", async (req, res) => { await deleteProfile(req.db, req.params.id); res.json({ message: "Deleted" }) })

export default router

