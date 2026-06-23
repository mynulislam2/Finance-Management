import { supabase } from '../../lib/supabase';

export const signUp = async (name: string, email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  await supabase.from('profiles').insert({
    id: data.user!.id,
    name,
    email,
    currency: 'USD',
  });
  return data;
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const resetPassword = async (email: string) => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  if (error) throw error;
};