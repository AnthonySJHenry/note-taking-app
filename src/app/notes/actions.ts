'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function createNote(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase.from('notes').insert({
    user_id: user.id,
    title,
    content,
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/notes')
  return { success: true }
}

export async function updateNote(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  const { error } = await supabase
    .from('notes')
    .update({ title, content, updated_at: new Date().toISOString() })
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/notes')
  return { success: true }
}

export async function deleteNote(formData: FormData) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Not authenticated' }
  }

  const id = formData.get('id') as string

  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/notes')
  return { success: true }
}
