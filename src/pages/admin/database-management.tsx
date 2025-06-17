/**
 * Arquivo: database-management.tsx
 * Caminho: src/pages/admin/database-management.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de gerenciamento do banco de dados
 */

import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Button from '@/components/common/Button';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert
} from '@mui/material';

interface Script {
  id: string;
  name: string;
  description: string;
  sql: string;
  category: 'TABLE' | 'INDEX' | 'FUNCTION' | 'TRIGGER' | 'VIEW';
  executed: boolean;
  executedAt?: Date;
}

// Styled Components
const PageContainer = styled.div(({ theme }) => ({
  padding: theme.spacing.large,
}));

const SectionGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gap: theme.spacing.large,
}));

const CategoryGridItem = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.medium,
}));

const ScriptsGridContainer = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: theme.spacing.medium,
}));

const ScriptGridItem = styled.div(({ theme }) => ({
  // Styles for individual script item card container
}));

const StyledCard = styled.div(({ theme }) => ({
  border: '1px solid #e0e0e0',
  borderRadius: theme.designElements.borderRadius,
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardContent = styled.div(({ theme }) => ({
  padding: theme.spacing.medium,
  flexGrow: 1,
}));

const H4 = styled.h4(({ theme }) => ({
  ...theme.typography.fontSize.large,
  fontWeight: theme.typography.fontWeight.bold,
  marginBottom: theme.spacing.medium,
}));

const H6 = styled.h6(({ theme }) => ({
  ...theme.typography.fontSize.medium,
  fontWeight: theme.typography.fontWeight.bold,
  marginBottom: theme.spacing.small,
}));

const TextSecondary = styled.p(({ theme }) => ({
  color: theme.palette.text.primary,
  marginBottom: theme.spacing.small,
}));

const Caption = styled.span(({ theme }) => ({
  ...theme.typography.fontSize.small,
  color: theme.palette.text.primary,
}));

const ButtonContainer = styled.div(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: theme.spacing.medium,
  marginBottom: theme.spacing.medium,
}));

const StyledPre = styled.pre(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  padding: theme.spacing.medium,
  borderRadius: theme.designElements.borderRadius,
  overflow: 'auto',
}));

const DatabaseManagement: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  const executeScript = async (script: Script) => {
    try {
      const response = await fetch('/api/database/execute-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ scriptId: script.id }),
      });

      if (!response.ok) throw new Error('Erro ao executar script');

      setSnackbar({
        open: true,
        message: 'Script executado com sucesso!',
        severity: 'success'
      });

      setScripts(scripts.map(s => 
        s.id === script.id 
          ? { ...s, executed: true, executedAt: new Date() }
          : s
      ));
    } catch (error) {
      setSnackbar({
        open: true,
        message: 'Erro ao executar script: ' + (error instanceof Error ? error.message : 'Unknown error'),
        severity: 'error'
      });
    }
  };

  return (
    <PageContainer>
      <H4>
        Gerenciamento do Banco de Dados
      </H4>

      <SectionGrid>
        {['TABLE', 'INDEX', 'FUNCTION', 'TRIGGER', 'VIEW'].map((category) => (
          <CategoryGridItem key={category}>
            <H6>
              {category}
            </H6>
            <ScriptsGridContainer>
              {scripts
                .filter(script => script.category === category)
                .map(script => (
                  <ScriptGridItem key={script.id}>
                    <StyledCard>
                      <StyledCardContent>
                        <H6>{script.name}</H6>
                        <TextSecondary>
                          {script.description}
                        </TextSecondary>
                        <ButtonContainer>
                          <Button
                            variant="primary"
                            onClick={() => executeScript(script)}
                            disabled={script.executed}
                          >
                            Executar
                          </Button>
                          <Button
                            variant="secondary"
                            onClick={() => {
                              setSelectedScript(script);
                              setOpenDialog(true);
                            }}
                          >
                            Ver Script
                          </Button>
                        </ButtonContainer>
                        {script.executed && (
                          <Caption>
                            Executado em: {script.executedAt?.toLocaleString()}
                          </Caption>
                        )}
                      </StyledCardContent>
                    </StyledCard>
                  </ScriptGridItem>
                ))}
            </ScriptsGridContainer>
          </CategoryGridItem>
        ))}
      </SectionGrid>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedScript?.name}
        </DialogTitle>
        <DialogContent>
          <StyledPre>
            {selectedScript?.sql}
          </StyledPre>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Fechar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default DatabaseManagement; 
