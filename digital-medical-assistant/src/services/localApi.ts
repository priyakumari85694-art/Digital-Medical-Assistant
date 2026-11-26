export interface LocalAccount {
  id: string;
  name: string;
  email: string;
}

export const localApi = async <T>(path: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    ...options,
    credentials: 'same-origin',
    headers: {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    }
  });

  if (response.status === 204) return undefined as T;
  const result = await response.json() as T & { error?: string };
  if (!response.ok) throw new Error(result.error || 'The local demo service is unavailable.');
  return result;
};