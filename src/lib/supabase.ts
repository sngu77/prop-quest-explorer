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
        console.log('Mock sign in attempt:', { email, password });
        
        // Allow any email/password combination for demo
        if (email && password && password.length >= 6) {
          const mockUser = {
            id: '123',
            email: email,
            user_metadata: { name: email.split('@')[0] }
          };
          
          // Store user in localStorage for persistence
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          
          return { 
            data: { 
              user: mockUser,
              session: {
                access_token: 'mock_token',
                user: mockUser
              }
            }, 
            error: null 
          };
        }
        return { 
          data: null, 
          error: { message: 'Invalid email or password. Please use a valid email and password with at least 6 characters.' } 
        };
      },
      signUp: async ({ email, password }: { email: string; password: string }) => {
        // Simulate sign up for demo purposes
        console.log('Mock sign up attempt:', { email, password });
        
        if (email && password && password.length >= 6) {
          const mockUser = {
            id: '123',
            email: email,
            user_metadata: { name: email.split('@')[0] }
          };
          
          return { 
            data: { 
              user: mockUser,
              session: {
                access_token: 'mock_token',
                user: mockUser
              }
            }, 
            error: null 
          };
        }
        return { 
          data: null, 
          error: { message: 'Invalid email or password. Please use a valid email and password with at least 6 characters.' } 
        };
      },
      signOut: async () => {
        localStorage.removeItem('auth_user');
        return { error: null };
      },
      getUser: async () => {
        const user = localStorage.getItem('auth_user');
        if (user) {
          return { 
            data: { user: JSON.parse(user) }, 
            error: null 
          };
        }
        return { data: { user: null }, error: null };
      },
      onAuthStateChange: (callback: any) => {
        // Mock auth state change listener
        const user = localStorage.getItem('auth_user');
        if (user) {
          callback('SIGNED_IN', { user: JSON.parse(user) });
        } else {
          callback('SIGNED_OUT', null);
        }
        
        // Return unsubscribe function
        return {
          data: { subscription: { unsubscribe: () => {} } }
        };
      }
    }
  };
}

export { supabase };