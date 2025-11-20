'use client'

import { useState } from 'react'
import NoteForm from './note-form'
import NoteItem from './note-item'

type Note = {
  id: string
  title: string
  content: string | null
  created_at: string
  updated_at: string
}

export default function NotesList({ initialNotes }: { initialNotes: Note[] }) {
  const [isCreating, setIsCreating] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={() => setIsCreating(true)}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          New Note
        </button>
      </div>

      {isCreating && (
        <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h3 className="mb-4 text-lg font-semibold text-black dark:text-zinc-50">Create New Note</h3>
          <NoteForm onCancel={() => setIsCreating(false)} />
        </div>
      )}

      {initialNotes.length === 0 ? (
        <div className="rounded-lg border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-zinc-600 dark:text-zinc-400">
            No notes yet. Create your first note to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {initialNotes.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      )}
    </div>
  )
}
