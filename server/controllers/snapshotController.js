import * as S from "../models/snapshotModel.js"

export const latest = async (req, res) => res.json(await S.getLatest())
export const index = async (req, res) => res.json(await S.getAll())
export const show = async (req, res) => res.json(await S.get(req.params.id))
export const create = async (req, res) =>
  res.status(201).json(await S.create(req.body))
export const update = async (req, res) =>
  res.json(await S.update(req.params.id, req.body))
export const remove = async (req, res) =>
  res.json(await S.remove(req.params.id))
