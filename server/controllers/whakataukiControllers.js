import * as W from "../models/whakataukiModel.js"

export const index = async (req, res) => res.json(await W.getAll())
export const random = async (req, res) => res.json(await W.getRandom())
export const show = async (req, res) => res.json(await W.get(req.params.id))
export const create = async (req, res) =>
  res.status(201).json(await W.create(req.body))
export const update = async (req, res) =>
  res.json(await W.update(req.params.id, req.body))
export const remove = async (req, res) =>
  res.json(await W.remove(req.params.id))
