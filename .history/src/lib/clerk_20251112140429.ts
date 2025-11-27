import { auth, currentUser } from '@clerk/nextjs/server';

// Get current authenticated user
export async function getCurrentUser() {
  const user = await currentUser();
  return user;
}

// Get current user's auth object
export async function getAuth() {
  return auth();
}

// Check if user is admin
export async function isAdmin() {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === 'admin';
}

// Check if user has specific role
export async function hasRole(role: string) {
  const { sessionClaims } = await auth();
  return sessionClaims?.metadata?.role === role;
}

// Clerk public metadata type
export interface UserMetadata {
  role?: 'admin' | 'member' | 'viewer';
  memberId?: string;
  approvedAt?: string;
}

// Helper to get user metadata
export async function getUserMetadata(): Promise<UserMetadata | null> {
  const user = await currentUser();
  if (!user) return null;
  
  return (user.publicMetadata as UserMetadata) || null;
}