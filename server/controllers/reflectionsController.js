import * as R from '../models/reflectionsTemplatesModel.js'

export const latest = async (req, res) => res.json(await R.getLatest())
export const index = async (req, res) => res.json(await R.getAll())
export const show = async (req, res) => res.json(await R.get(req.params.id))
export const create = async (req, res) =>
  res.status(201).json(await R.create(req.body))
export const update = async (req, res) =>
  res.json(await R.update(req.params.id, req.body))
export const remove = async (req, res) =>
  res.json(await R.remove(req.params.id))
