import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from './services/supabase';
import { LocalAccount, localApi } from './services/localApi';

export interface AccountUser {
  id: string;
  name: string;
  email: string | null;
}

interface AuthContextValue {
  user: AccountUser | null;
  loading: boolean;
  configured: boolean;
  refreshUser: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AccountUser | null>(null);
  const [loading, setLoading] = useState(isSupabaseConfigured);
  const [configured, setConfigured] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!supabase) {
      let active = true;
      setLoading(true);
      void localApi<{ mode: string }>('/health')
        .then(() => {
          if (!active) return;
          setConfigured(true);
          return localApi<{ user: LocalAccount }>('/auth/me')
            .then(({ user: account }) => active && setUser(account))
            .catch(() => active && setUser(null));
        })
        .catch(() => {
          if (active) setConfigured(false);
        })
        .finally(() => {
          if (active) setLoading(false);
        });
      return () => { active = false; };
    }

    let active = true;
    void supabase.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ? mapSupabaseUser(data.session.user) : null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ? mapSupabaseUser(session.user) : null);
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, []);

  const refreshUser = async () => {
    if (supabase) {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      setUser(data.user ? mapSupabaseUser(data.user) : null);
      return;
    }

    const { user: account } = await localApi<{ user: LocalAccount }>('/auth/me');
    setUser(account);
  };

  const signOut = async () => {
    if (supabase) {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } else {
      await localApi<void>('/auth/logout', { method: 'POST' });
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, configured, refreshUser, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const mapSupabaseUser = (user: User): AccountUser => ({
  id: user.id,
  email: user.email ?? null,
  name: typeof user.user_metadata?.full_name === 'string'
    ? user.user_metadata.full_name
    : user.email ?? 'Customer'
});

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};