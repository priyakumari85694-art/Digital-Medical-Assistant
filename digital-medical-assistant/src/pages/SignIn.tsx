import React, { useEffect, useState } from 'react';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck, UserRound } from 'lucide-react';
import { NavPage } from '../types';
import { useAuth } from '../AuthContext';
import { supabase } from '../services/supabase';
import { LocalAccount, localApi } from '../services/localApi';

interface SignInProps {
  onNavigate: (page: NavPage) => void;
}

export const SignIn: React.FC<SignInProps> = ({ onNavigate }) => {
  const { user, configured, refreshUser } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [demoAccounts, setDemoAccounts] = useState<LocalAccount[]>([]);

  useEffect(() => {
    if (supabase || !configured) return;
    void localApi<{ accounts: LocalAccount[] }>('/auth/demo-accounts')
      .then(({ accounts }) => setDemoAccounts(accounts))
      .catch(() => setNotice('The local demo account list could not be loaded. Restart the development server and try again.'));
  }, [configured]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!configured) {
      setNotice('Account service is unavailable. Start the app with npm run dev and try again.');
      return;
    }

    setIsSubmitting(true);
    setNotice('');
    try {
      if (isRegistering) {
        if (supabase) {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { full_name: fullName.trim() } }
          });
          if (error) throw error;
          if (!data.session) {
            setNotice('Account created. Check your email to confirm the address before signing in.');
          } else {
            onNavigate('dashboard');
          }
        } else {
          await localApi('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name: fullName, email, password })
          });
          await refreshUser();
          onNavigate('dashboard');
        }
      } else {
        if (supabase) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
        } else {
          await localApi('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
          });
          await refreshUser();
        }
        onNavigate('dashboard');
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Account request failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (accountId: string) => {
    setIsSubmitting(true);
    setNotice('');
    try {
      await localApi('/auth/demo-login', {
        method: 'POST',
        body: JSON.stringify({ accountId })
      });
      await refreshUser();
      onNavigate('dashboard');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Demo sign-in failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!supabase) return;

    setIsSubmitting(true);
    setNotice('');
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) {
      setNotice(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-[65vh] px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[1fr_0.9fr]">
        <div className="flex flex-col justify-between bg-slate-900 p-7 text-white sm:p-10">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-400/15 text-teal-300">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-10 text-xs font-semibold uppercase tracking-wider text-teal-300">Customer access</p>
            <h1 className="mt-3 max-w-sm text-3xl font-bold leading-tight sm:text-4xl">Your health tools, all in one place.</h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
                Sign in to return to your saved health assistant conversations and visit notes.
            </p>
          </div>
          <p className="mt-12 border-t border-white/10 pt-5 text-xs leading-5 text-slate-400">
              {supabase
                ? 'Passwords are handled by Supabase Auth. Account records follow the configured database policies.'
                : 'Local demo only: passwords are hashed and sessions use HttpOnly cookies. SQLite records are not encrypted; use fictional information only.'}
          </p>
        </div>

        <div className="p-7 sm:p-10">
          <h2 className="text-xl font-bold text-slate-900">{isRegistering ? 'Create your account' : 'Sign in to your account'}</h2>
          <p className="mt-1 text-sm text-slate-600">
            {isRegistering ? 'Create a customer account with your email address.' : 'Use your customer email and password.'}
          </p>

          {supabase && (
            <button
              type="button"
              onClick={() => void handleGoogleSignIn()}
              disabled={isSubmitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:opacity-50"
            >
              <span aria-hidden="true" className="font-bold text-blue-600">G</span>
              Continue with Google
            </button>
          )}

          {user && (
            <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-900">
              Signed in as {user.email}.{' '}
              <button onClick={() => onNavigate('dashboard')} className="font-semibold underline">Open your dashboard</button>
            </div>
          )}

          {configured && !supabase && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Local demo mode stores data in a SQLite file on this device. Use fictional data only; this setup is not suitable for real patient information.
            </div>
          )}

          {!configured && (
            <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900">
              Account service is unavailable. Start the app using <code>npm run dev</code> to use local demo accounts, or configure Supabase for hosted accounts.
            </div>
          )}

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            {isRegistering && (
              <div>
                <label htmlFor="signin-name" className="mb-1.5 block text-sm font-medium text-slate-700">Full name</label>
                <div className="relative">
                  <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    id="signin-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>
            )}
            <div>
              <label htmlFor="signin-email" className="mb-1.5 block text-sm font-medium text-slate-700">Email address</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="signin-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <div>
              <label htmlFor="signin-password" className="mb-1.5 block text-sm font-medium text-slate-700">Password</label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="signin-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-slate-300 bg-white py-2.5 pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              {isSubmitting ? 'Please wait...' : isRegistering ? 'Create account' : 'Sign in'}
              <ArrowRight className="h-4 w-4" />
            </button>

            <p aria-live="polite" className="min-h-5 text-sm text-amber-800">{notice}</p>
          </form>

          {!supabase && demoAccounts.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-5">
              <h3 className="text-sm font-semibold text-slate-800">Demo accounts</h3>
              <div className="mt-2 grid gap-2">
                {demoAccounts.map((account) => (
                  <button
                    key={account.id}
                    type="button"
                    onClick={() => void handleDemoLogin(account.id)}
                    disabled={isSubmitting}
                    className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2.5 text-left transition hover:border-blue-300 hover:bg-blue-50 disabled:opacity-50"
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-800">{account.name}</span>
                      <span className="block truncate text-xs text-slate-500">{account.email}</span>
                    </span>
                    <span className="shrink-0 text-xs font-semibold text-blue-700">Use demo</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="mt-5 border-t border-slate-100 pt-5 text-sm text-slate-600">
            {isRegistering ? 'Already have an account?' : 'New customer?'}{' '}
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setNotice('');
              }}
              className="font-semibold text-blue-700 hover:text-blue-900"
            >
              {isRegistering ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};