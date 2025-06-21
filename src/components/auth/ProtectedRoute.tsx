/**
 * Arquivo: ProtectedRoute.tsx
 * Caminho: src/components/auth/ProtectedRoute.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export function ProtectedRoute({ children, requiredRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/auth/login');
      return;
    }

    if (!isLoading && isAuthenticated && requiredRoles && !requiredRoles.includes(user?.role || '')) {
      router.replace('/unauthorized');
      return;
    }
  }, [isLoading, isAuthenticated, user?.role, requiredRoles, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated || (requiredRoles && !requiredRoles.includes(user?.role || ''))) {
    return null;
  }

  return <>{children}</>;
} 
