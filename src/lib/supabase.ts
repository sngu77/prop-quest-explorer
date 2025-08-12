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
  // Create a robust mock client for development/demo without real Supabase credentials
  // Persists simple tables in localStorage so CRUD works across sessions
  const DB_KEY = 'mock_db';
  const ensureDB = () => {
    const existing = localStorage.getItem(DB_KEY);
    if (!existing) {
      const initial = { properties: [], rental_applications: [] };
      localStorage.setItem(DB_KEY, JSON.stringify(initial));
      return initial;
    }
    try {
      return JSON.parse(existing as string);
    } catch {
      const initial = { properties: [], rental_applications: [] };
      localStorage.setItem(DB_KEY, JSON.stringify(initial));
      return initial;
    }
  };
  const getDB = () => ensureDB();
  const setDB = (db: any) => localStorage.setItem(DB_KEY, JSON.stringify(db));
  const genId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  supabase = {
    auth: {
      signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
        // Simulate authentication for demo purposes
        console.log('Mock sign in attempt:', { email, password });
        if (email && password && password.length >= 6) {
          const mockUser = {
            id: '123',
            email: email,
            user_metadata: { name: email.split('@')[0] }
          };
          localStorage.setItem('auth_user', JSON.stringify(mockUser));
          return {
            data: {
              user: mockUser,
              session: { access_token: 'mock_token', user: mockUser }
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
        console.log('Mock sign up attempt:', { email, password });
        if (email && password && password.length >= 6) {
          const mockUser = {
            id: '123',
            email: email,
            user_metadata: { name: email.split('@')[0] }
          };
          return {
            data: { user: mockUser, session: { access_token: 'mock_token', user: mockUser } },
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
          return { data: { user: JSON.parse(user) }, error: null };
        }
        return { data: { user: null }, error: null };
      },
      onAuthStateChange: (callback: any) => {
        const user = localStorage.getItem('auth_user');
        if (user) {
          callback('SIGNED_IN', { user: JSON.parse(user) });
        } else {
          callback('SIGNED_OUT', null);
        }
        return { data: { subscription: { unsubscribe: () => {} } } };
      }
    },

    // Minimal PostgREST-like query builder
    from(table: string) {
      const state: any = { table, filters: [] as Array<{ col: string; val: any }>, order: null as any, action: 'select', payload: null as any };

      const applyFilters = (rows: any[]) =>
        state.filters.length === 0
          ? rows
          : rows.filter((r) => state.filters.every((f: any) => r[f.col] === f.val));

      const readRows = () => {
        const db = getDB();
        let rows = (db[table] || []) as any[];
        rows = applyFilters(rows);
        if (state.order) {
          const { column, ascending } = state.order;
          rows = rows.slice().sort((a: any, b: any) => {
            const av = a[column];
            const bv = b[column];
            if (av == null && bv == null) return 0;
            if (av == null) return 1;
            if (bv == null) return -1;
            if (av > bv) return ascending ? 1 : -1;
            if (av < bv) return ascending ? -1 : 1;
            return 0;
          });
        }
        return rows;
      };

      const performUpdate = () => {
        const db = getDB();
        const rows = (db[table] || []) as any[];
        const updated: any[] = [];
        const newRows = rows.map((r) => {
          const match = state.filters.every((f: any) => r[f.col] === f.val);
          if (match) {
            const merged = { ...r, ...state.payload, updated_at: new Date().toISOString() };
            updated.push(merged);
            return merged;
          }
          return r;
        });
        db[table] = newRows;
        setDB(db);
        return updated;
      };

      const performDelete = () => {
        const db = getDB();
        const rows = (db[table] || []) as any[];
        const remaining = rows.filter((r) => !state.filters.every((f: any) => r[f.col] === f.val));
        db[table] = remaining;
        setDB(db);
        return { data: null, error: null };
      };

      const builder: any = {
        select(_cols: string = '*') {
          state.action = 'select';
          return builder;
        },
        order(column: string, opts: { ascending?: boolean } = {}) {
          state.order = { column, ascending: opts.ascending !== false };
          const data = readRows();
          return Promise.resolve({ data, error: null });
        },
        eq(col: string, val: any) {
          state.filters.push({ col, val });
          if (state.action === 'delete') {
            return performDelete();
          }
          return builder;
        },
        single() {
          if (state.action === 'update') {
            const updated = performUpdate();
            return Promise.resolve({ data: updated[0] ?? null, error: null });
          }
          const data = readRows()[0] ?? null;
          return Promise.resolve({ data, error: null });
        },
        insert(rows: any[]) {
          const db = getDB();
          const toInsert = rows.map((r) => ({
            id: r.id ?? genId(),
            created_at: new Date().toISOString(),
            ...r
          }));
          db[table] = [ ...(db[table] || []), ...toInsert ];
          setDB(db);
          return {
            select: () => ({
              single: () => Promise.resolve({ data: toInsert[0], error: null })
            })
          };
        },
        update(updates: any) {
          state.action = 'update';
          state.payload = updates;
          return builder;
        },
        delete() {
          state.action = 'delete';
          return builder;
        }
      };

      return builder;
    },

    // No-op real-time channel mock
    channel(_name: string) {
      const api = {
        on: (_event: any, _filter: any, _callback: any) => api,
        subscribe: () => ({ unsubscribe: () => {} })
      };
      return api;
    }
  };
}

export { supabase };