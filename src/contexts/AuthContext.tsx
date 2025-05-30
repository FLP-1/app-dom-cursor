import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { UserRole } from '../lib/permissions/types';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  cpf: string;
  phone: string;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  signIn: (cpf: string, password: string) => Promise<void>;
  signOut: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Verifica se há um token salvo e carrega os dados do usuário
    const loadStoredData = async () => {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (storedToken && storedUser) {
        try {
          // Verifica se o token ainda é válido
          const response = await fetch('/api/auth/validate', {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          });

          const text = await response.text();
          if (!response.ok) {
            console.error('Erro na requisição:', response.status, text);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setLoading(false);
            return;
          }
          let data;
          try {
            data = JSON.parse(text);
          } catch (e) {
            console.error('Resposta não é JSON válido:', text);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setLoading(false);
            return;
          }
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Erro ao validar token:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    loadStoredData();
  }, []);

  const signIn = async (cpf: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login/employer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Erro ao fazer login');
      }

      const { token, user } = data;

      // Armazena o token e os dados do usuário
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setUser(user);

      // Redireciona para o dashboard
      router.push('/dashboard');
    } catch (error) {
      throw error;
    }
  };

  const signOut = () => {
    // Limpa os dados do usuário
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);

    // Redireciona para a página de login
    router.push('/auth/login');
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }

  return context;
}; 