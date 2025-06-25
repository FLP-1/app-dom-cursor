/**
 * Arquivo: index.tsx
 * Caminho: src/pages/index.tsx
 * Criado em: 2025-06-24
 * Última atualização: 2025-06-24
 * Descrição: Página inicial simples sem MUI para testar se o problema é específico do MUI.
 */

import { useState, useEffect } from 'react';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timeout);
  }, []);

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
    },
    splash: {
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1300,
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column' as const,
      opacity: showSplash ? 1 : 0,
      transition: 'opacity 0.3s ease',
      pointerEvents: showSplash ? 'auto' : 'none' as const,
    },
    spinner: {
      width: '80px',
      height: '80px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #0070f3',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    },
    title: {
      marginTop: '24px',
      fontWeight: 700,
      color: '#0070f3',
      fontSize: '24px',
    },
    content: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '64px 20px',
      textAlign: 'center' as const,
    },
    mainTitle: {
      color: '#0070f3',
      fontWeight: 800,
      fontSize: '48px',
      marginBottom: '16px',
      letterSpacing: '1px',
    },
    subtitle: {
      color: '#757575',
      fontSize: '20px',
      marginBottom: '32px',
    },
    button: {
      backgroundColor: '#0070f3',
      color: '#ffffff',
      border: 'none',
      padding: '12px 48px',
      fontSize: '18px',
      fontWeight: 700,
      borderRadius: '12px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0, 112, 243, 0.3)',
      textDecoration: 'none',
      display: 'inline-block',
    },
    cards: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '32px',
      marginTop: '48px',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      textAlign: 'left' as const,
    },
    cardTitle: {
      color: '#0070f3',
      fontWeight: 700,
      fontSize: '20px',
      marginBottom: '12px',
    },
    cardText: {
      color: '#757575',
      fontSize: '14px',
      lineHeight: '1.5',
    },
    links: {
      marginTop: '48px',
      textAlign: 'center' as const,
    },
    link: {
      color: '#0070f3',
      textDecoration: 'none',
      margin: '0 16px',
      fontSize: '14px',
    },
    footer: {
      marginTop: '64px',
      textAlign: 'center' as const,
      color: '#9e9e9e',
      fontSize: '14px',
    },
  };

  return (
    <div style={styles.container}>
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .button:hover {
          background-color: #0052cc !important;
        }
        .link:hover {
          text-decoration: underline;
        }
      `}</style>
      
      <div style={styles.splash}>
        <div style={styles.spinner}></div>
        <div style={styles.title}>DOM - Gestão Doméstica</div>
      </div>
      
      {!showSplash && (
        <div style={styles.content}>
          <h1 style={styles.mainTitle}>Bem-vindo ao DOM</h1>
          <p style={styles.subtitle}>
            Organize, simplifique e automatize a gestão de empregados domésticos e obrigações do eSocial.
          </p>
          <a href="/auth/login" style={styles.button} className="button">
            Entrar no sistema
          </a>
          
          <div style={styles.cards}>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Recursos</h3>
              <p style={styles.cardText}>
                Controle de empregados, geração de folhas, recibos, relatórios, alertas e integração com o eSocial.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Segurança</h3>
              <p style={styles.cardText}>
                Dados protegidos com criptografia, backups automáticos e autenticação segura.
              </p>
            </div>
            <div style={styles.card}>
              <h3 style={styles.cardTitle}>Suporte & Atualizações</h3>
              <p style={styles.cardText}>
                Equipe dedicada, atualizações frequentes e central de ajuda completa.
              </p>
            </div>
          </div>
          
          <div style={styles.links}>
            <a href="/planos-assinatura" style={styles.link} className="link">
              Planos de assinatura
            </a>
            <a href="/termos-de-uso" style={styles.link} className="link">
              Termos de uso
            </a>
            <a href="/politica-de-privacidade" style={styles.link} className="link">
              Política de privacidade
            </a>
            <a href="/politica-de-cancelamento-reembolso" style={styles.link} className="link">
              Cancelamento e reembolso
            </a>
          </div>
          
          <div style={styles.footer}>
            &copy; {new Date().getFullYear()} DOM - Gestão Doméstica
          </div>
        </div>
      )}
    </div>
  );
} 
