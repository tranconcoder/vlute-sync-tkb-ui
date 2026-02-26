'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchCurrentUser } from '@/store/slices/userSlice';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = must be logged in, false = must NOT be logged in (login page)
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo,
}: AuthGuardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isInitialized, isLoading } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    if (!isInitialized && !isLoading) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isInitialized, isLoading]);

  useEffect(() => {
    if (!isInitialized) return;

    if (requireAuth && !isAuthenticated) {
      router.replace(redirectTo || '/login');
    } else if (!requireAuth && isAuthenticated) {
      router.replace(redirectTo || '/features');
    }
  }, [isInitialized, isAuthenticated, requireAuth, redirectTo, router, pathname]);

  // Show nothing while checking auth
  if (!isInitialized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  // If auth requirement doesn't match, don't render children (redirect is happening)
  if (requireAuth && !isAuthenticated) return null;
  if (!requireAuth && isAuthenticated) return null;

  return <>{children}</>;
}
