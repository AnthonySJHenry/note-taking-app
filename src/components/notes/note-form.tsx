'use client'

import { createNote, updateNote } from '@/app/notes/actions'
import { useState } from 'react'

type Note = {
  id: string
  title: string
  content: string | null
}

type NoteFormProps = {
  note?: Note
  onCancel: () => void
}

export default function NoteForm({ note, onCancel }: NoteFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData(e.currentTarget)

    try {
      const result = note ? await updateNote(formData) : await createNote(formData)

      if (result.error) {
        setError(result.error)
      } else {
        onCancel()
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {note && <input type="hidden" name="id" value={note.id} />}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          defaultValue={note?.title}
          required
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Enter note title"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          rows={4}
          defaultValue={note?.content || ''}
          className="mt-1 block w-full rounded-md border border-zinc-300 px-3 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
          placeholder="Enter note content"
        />
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-3 text-sm text-red-800 dark:bg-red-900/20 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800 disabled:opacity-50 dark:bg-zinc-50 dark:text-black dark:hover:bg-zinc-200"
        >
          {isSubmitting ? 'Saving...' : note ? 'Update' : 'Create'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
