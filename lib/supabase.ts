import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface RsvpRow {
  id: string
  name: string
  attendance: 'Hadir' | 'Tidak Hadir'
  guest_count: number
  message: string | null
  submitted_at: string
}
