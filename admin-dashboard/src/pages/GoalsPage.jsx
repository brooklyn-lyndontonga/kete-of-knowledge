/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react'
import CrudTable from '../components/CrudTable'
import CrudModal from '../components/CrudModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import { useAdminToast } from '../components/AdminToastProvider'

import * as goalsApi from '../api/goals'

export default function GoalsPage() {
  const [goals, setGoals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [editing, setEditing] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  async function load() {
    try {
      const data = await goalsApi.fetchGoals()
      setGoals(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  async function handleSave(formData) {
    try {
      if (editing) {
        await goalsApi.updateGoal(editing.id, formData)
        useAdminToast().success('Goal updated')
      } else {
        await goalsApi.createGoal(formData)
        useAdminToast.success('Goal created')
      }
      setModalOpen(false)
      setEditing(null)
      load()
    } catch (err) {
      useAdminToast.error(err.message)
    }
  }

  async function handleDelete() {
    try {
      await goalsApi.deleteGoal(deleteId)
      useAdminToast.success('Deleted')
      setDeleteId(null)
      load()
    } catch (err) {
      useAdminToast.error(err.message)
    }
  }

  return (
    <div className="page-container">
      <h1>User Goals</h1>

      <button
        className="btn-primary"
        onClick={() => {
          setEditing(null)
          setModalOpen(true)
        }}
      >
        + Add Goal
      </button>

      <CrudTable
        rows={goals}
        loading={loading}
        error={error}
        columns={[
          { key: 'title', label: 'Title' },
          { key: 'description', label: 'Description' },
        ]}
        onEdit={(row) => {
          setEditing(row)
          setModalOpen(true)
        }}
        onDelete={(row) => setDeleteId(row.id)}
      />

      <CrudModal
        open={modalOpen}
        initial={editing}
        fields={[
          { name: 'title', label: 'Title' },
          { name: 'description', label: 'Description', type: 'textarea' },
        ]}
        onSave={handleSave}
        onClose={() => {
          setEditing(null)
          setModalOpen(false)
        }}
      />

      <DeleteConfirmModal
        open={deleteId !== null}
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  )
}
