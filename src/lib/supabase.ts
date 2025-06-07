import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have valid Supabase credentials
const hasValidCredentials = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-id.supabase.co' && 
  supabaseAnonKey !== 'your-anon-key-here';

let supabase: any = null;

if (hasValidCredentials) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client for development
  supabase = {
    auth: {
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        // Simulate authentication for demo purposes
        if (email === 'demo@example.com' && password === 'password') {
          return { data: { user: { email } }, error: null };
        }
        return { data: null, error: { message: 'Invalid credentials' } };
      },
      signUp: async ({ email, password }: { email: string; password: string }) => {
        // Simulate sign up for demo purposes
        return { data: { user: { email } }, error: null };
      }
    }
  };
}

export { supabase };