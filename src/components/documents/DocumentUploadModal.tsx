/**
 * Arquivo: DocumentUploadModal.tsx
 * Caminho: src/components/documents/DocumentUploadModal.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-01-27
 * Descrição: Modal para upload de documentos
 */

import React, { useRef } from 'react';
import Box from '@/components/layout/Box';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import Button from '@/components/common/Button';
import { useDocumentForm } from '@/hooks/useDocumentForm';
import { styled } from '@mui/material/styles';
import { FormSwitch } from '@/components/forms/inputs/FormSwitch';
import { formatDateBR, parseDateBRtoISO } from '@/utils/date';
import { documentMessages } from '@/i18n/messages/document.messages';

interface DocumentUploadModalProps {
  open: boolean;
  onClose: () => void;
}

const tipos = [
  { value: 'PDF', label: 'PDF' },
  { value: 'Imagem', label: 'Imagem' },
  { value: 'DOCX', label: 'DOCX' },
  { value: 'TXT', label: 'TXT' },
];
const grupos = [
  { value: 'Família A', label: 'Família A' },
  { value: 'Família B', label: 'Família B' },
];
const categorias = [
  { value: 'INSTITUCIONAL_TERMS_OF_USE', label: 'Termos de Uso' },
  { value: 'INSTITUCIONAL_PRIVACY_POLICY', label: 'Política de Privacidade' },
  { value: 'INSTITUCIONAL_PLANS', label: 'Tabela de Planos' },
  { value: 'INSTITUCIONAL_CANCELLATION_REFUND', label: 'Cancelamento e Reembolso' },
  { value: 'OUTROS', label: 'Outros' },
];

const ModalOverlay = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  background: 'rgba(0,0,0,0.25)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
}));

const ModalContent = styled('div')(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  minWidth: 340,
  maxWidth: 400,
  boxShadow: theme.shadows[4],
}));

const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginTop: theme.spacing(3),
}));

const DocumentUploadModal: React.FC<DocumentUploadModalProps> = ({ open, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { control, handleSubmit, onSubmit, loading, registerWithValidation } = useDocumentForm(onClose);
  
  // Usar mensagens em português por padrão
  const messages = documentMessages.pt;
  
  if (!open) return null;
  
  return (
    <ModalOverlay>
      <ModalContent>
        <Box component="h3" sx={{ mt: 0 }}>
          {messages.labels.adicionar}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <FormInput 
            name="name" 
            label={messages.labels.nome} 
            required 
            control={control} 
            sx={{ mb: 2 }} 
          />
          <FormSelect 
            name="type" 
            label={messages.labels.tipo} 
            options={tipos} 
            required 
            control={control} 
          />
          <FormInput 
            name="file" 
            label={messages.labels.arquivo} 
            type="file" 
            required 
            control={control} 
            inputRef={fileInputRef} 
            sx={{ mb: 2 }} 
            inputProps={{ accept: '*' }} 
          />
          <FormInput 
            name="expiresAt" 
            label={messages.labels.dataValidade} 
            control={control} 
            sx={{ mb: 2 }} 
            inputProps={{ placeholder: 'dd/mm/aaaa' }} 
            {...registerWithValidation('expiresAt')} 
          />
          <FormSelect 
            name="group" 
            label={messages.labels.grupo} 
            options={grupos} 
            required 
            control={control} 
          />
          <FormSelect 
            name="category" 
            label={messages.labels.categoria} 
            options={categorias} 
            required 
            control={control} 
            sx={{ mb: 2 }} 
          />
          <FormSwitch 
            name="isPublic" 
            label={messages.labels.isPublic} 
            control={control} 
            sx={{ mb: 2 }} 
          />
          <Actions>
            <Button type="button" variant="secondary" onClick={onClose}>
              {messages.labels.cancelar}
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? messages.mensagens.salvando : messages.labels.salvar}
            </Button>
          </Actions>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default DocumentUploadModal; 
