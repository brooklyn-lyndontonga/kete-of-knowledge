// server/controllers/profilesController.js
import {
  getProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../models/profilesModel.js"

export async function getAllProfiles(req, res) {
  try {
    const profiles = await getProfiles(req.db)
    res.json(profiles)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function addProfile(req, res) {
  try {
    const { name, age, goals } = req.body
    await createProfile(req.db, { name, age, goals })
    res.status(201).json({ message: "Profile created successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function editProfile(req, res) {
  try {
    const { id } = req.params
    await updateProfile(req.db, id, req.body)
    res.json({ message: "Profile updated successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export async function removeProfile(req, res) {
  try {
    const { id } = req.params
    await deleteProfile(req.db, id)
    res.json({ message: "Profile deleted successfully" })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
