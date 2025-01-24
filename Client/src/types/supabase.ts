export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: 'user' | 'admin' | 'agent'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          role?: 'user' | 'admin' | 'agent'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          role?: 'user' | 'admin' | 'agent'
          created_at?: string
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          name: string
          description: string | null
          program_id: string
          credits: number | null
          duration: string | null
          instructor: string | null
          mode: 'Online' | 'Offline' | 'Hybrid' | null
          fee: number | null
          prerequisites: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          program_id: string
          credits?: number | null
          duration?: string | null
          instructor?: string | null
          mode?: 'Online' | 'Offline' | 'Hybrid' | null
          fee?: number | null
          prerequisites?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          program_id?: string
          credits?: number | null
          duration?: string | null
          instructor?: string | null
          mode?: 'Online' | 'Offline' | 'Hybrid' | null
          fee?: number | null
          prerequisites?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      programs: {
        Row: {
          id: string
          name: string
          description: string | null
          duration: string | null
          fee: number | null
          degree_id: string | null
          university_id: string | null
          prerequisites: string[] | null
          available_seats: number
          application_deadline: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          duration?: string | null
          fee?: number | null
          degree_id?: string | null
          university_id?: string | null
          prerequisites?: string[] | null
          available_seats?: number
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          duration?: string | null
          fee?: number | null
          degree_id?: string | null
          university_id?: string | null
          prerequisites?: string[] | null
          available_seats?: number
          application_deadline?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      degrees: {
        Row: {
          id: string
          name: string
          abbreviation: string | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          abbreviation?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          abbreviation?: string | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      // ... other existing tables
    }
    Enums: {
      // Add enum types if any
    }
  }
}