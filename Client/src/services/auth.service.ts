import { supabase } from '../lib/supabase';
import type { LoginRequest, RegisterRequest } from '../types/api';

export const authService = {
  login: async ({ email, password }: LoginRequest) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  register: async ({ email, password, name, role = 'user' }: RegisterRequest) => {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
        },
      },
    });

    if (authError) throw authError;

    // Create user profile
    const { data: profile, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user!.id,
          email,
          name,
          role,
        },
      ])
      .select()
      .single();

    if (profileError) throw profileError;
    return { user: profile, session: authData.session };
  },

  logout: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  getProfile: async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return data;
  },

  updateProfile: async (updates: Partial<User>) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};