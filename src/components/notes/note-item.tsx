'use client'

import { useState } from 'react'
import { deleteNote } from '@/app/notes/actions'
import NoteForm from './note-form'

type Note = {
  id: string
  title: string
  content: string | null
  created_at: string
  updated_at: string
}

export default function NoteItem({ note }: { note: Note }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return
    }

    setIsDeleting(true)
    const formData = new FormData()
    formData.append('id', note.id)
    await deleteNote(formData)
  }

  if (isEditing) {
    return (
      <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">Edit Note</h3>
        <NoteForm note={note} onCancel={() => setIsEditing(false)} />
      </div>
    )
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-black dark:text-zinc-50">{note.title}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm text-red-600 hover:text-red-700 disabled:opacity-50 dark:text-red-400 dark:hover:text-red-300"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      {note.content && (
        <p className="mb-4 whitespace-pre-wrap text-zinc-700 dark:text-zinc-300">{note.content}</p>
      )}

      <div className="text-xs text-zinc-500 dark:text-zinc-500">
        Created: {new Date(note.created_at).toLocaleDateString()}
        {note.updated_at !== note.created_at && (
          <> • Updated: {new Date(note.updated_at).toLocaleDateString()}</>
        )}
      </div>
    </div>
  )
}
