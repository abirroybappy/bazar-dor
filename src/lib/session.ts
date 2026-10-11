import 'server-only';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { getSessionCookie } from 'better-auth/cookies';
import { auth } from './auth';

export async function requireSession() {
  const requestHeaders = await headers();
  if (!getSessionCookie(requestHeaders)) redirect('/signin?reason=protected');
  // Cookie presence alone is never authentication; validate it on the server.
  const session = await auth.api.getSession({ headers: requestHeaders });
  if (!session) redirect('/signin?reason=protected');
  return session;
}
