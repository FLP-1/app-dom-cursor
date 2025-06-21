/**
 * Arquivo: PrivateRoute.tsx
 * Caminho: src/components/auth/PrivateRoute.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/contexts/AuthContext';
import { CircularProgress, Box } from '@mui/material';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Salva a URL atual para redirecionar após o login
      const currentPath = router.asPath;
      router.push(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
    } else if (!loading && user && requiredRoles.length > 0) {
      // Verifica se o usuário tem a role necessária
      const hasRequiredRole = requiredRoles.includes(user.role);
      if (!hasRequiredRole) {
        router.push('/unauthorized');
      }
    }
  }, [user, loading, router, requiredRoles]);

  if (loading) {
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

  if (!user) {
    return null;
  }

  return <>{children}</>;
}; 
