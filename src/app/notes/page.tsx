import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import NotesList from '@/components/notes/note-list'

export default async function NotesPage() {
  const supabase = await createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user's notes
  const { data: notes } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-zinc-50">My Notes</h1>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              Logged in as {user.email}
            </p>
          </div>
          <form action="/api/auth/signout" method="post">
            <button
              type="submit"
              className="rounded-md bg-zinc-200 px-4 py-2 text-sm font-medium text-black hover:bg-zinc-300 dark:bg-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-700"
            >
              Sign out
            </button>
          </form>
        </div>

        <NotesList initialNotes={notes || []} />
      </div>
    </div>
  )
}
