import React from 'react';
import { FormInput } from '../common/forms/FormInput';
import { FormSelect } from '../common/forms/FormSelect';
import Box from '../layout/Box';
import { useDocumentFiltersForm, DocumentFiltersFormValues } from '../../hooks/forms/useDocumentFiltersForm';
import { styled } from '@mui/material/styles';
import Button from '../common/Button';
import { documentMessages } from '../../i18n/messages';
import { formatDateBR, parseDateBRtoISO } from '../../utils/date';

const tipos = [
  { value: 'Todos', label: 'Todos' },
  { value: 'PDF', label: 'PDF' },
  { value: 'Imagem', label: 'Imagem' },
  { value: 'DOCX', label: 'DOCX' },
  { value: 'TXT', label: 'TXT' },
];
const status = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Ativo', label: 'Ativo' },
  { value: 'Vencido', label: 'Vencido' },
  { value: 'Excluído', label: 'Excluído' },
];
const grupos = [
  { value: 'Todos', label: 'Todos' },
  { value: 'Família A', label: 'Família A' },
  { value: 'Família B', label: 'Família B' },
];
const categorias = [
  { value: 'Todos', label: 'Todos' },
  { value: 'INSTITUCIONAL_TERMS_OF_USE', label: 'Termos de Uso' },
  { value: 'INSTITUCIONAL_PRIVACY_POLICY', label: 'Política de Privacidade' },
  { value: 'INSTITUCIONAL_PLANS', label: 'Tabela de Planos' },
  { value: 'INSTITUCIONAL_CANCELLATION_REFUND', label: 'Cancelamento e Reembolso' },
  { value: 'OUTROS', label: 'Outros' },
];

const FiltersBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  margin: `${theme.spacing(3)} 0 ${theme.spacing(2)} 0`,
}));

interface DocumentFiltersProps {
  onFilter: (values: any) => void;
}

function removeAcentos(str: string) {
  return str.normalize('NFD').replace(/[0-\u036f]/g, '');
}

const DocumentFilters: React.FC<DocumentFiltersProps> = ({ onFilter }) => {
  const { control, handleSubmit, onSubmit, registerWithValidation } = useDocumentFiltersForm((values) => {
    let filtro = { ...values };
    if (filtro.search) {
      filtro.search = removeAcentos(filtro.search);
    } else {
      delete filtro.search;
    }
    if (filtro.expiresAt) {
      filtro.expiresAt = parseDateBRtoISO(filtro.expiresAt);
    }
    onFilter(filtro);
  });
  const lang = 'pt';
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FiltersBox>
        <FormInput<DocumentFiltersFormValues> name="search" label={documentMessages[lang].filterSearch} control={control} sx={{ minWidth: 220 }} />
        <FormSelect<DocumentFiltersFormValues> name="type" label={documentMessages[lang].filterType} options={tipos} control={control} />
        <FormSelect<DocumentFiltersFormValues> name="status" label={documentMessages[lang].filterStatus} options={status} control={control} />
        <FormInput<DocumentFiltersFormValues> label={documentMessages[lang].filterExpiresAt} control={control} sx={{ minWidth: 160 }} inputProps={{ placeholder: 'dd/mm/aaaa' }} {...registerWithValidation('expiresAt')} />
        <FormSelect<DocumentFiltersFormValues> name="group" label={documentMessages[lang].filterGroup} options={grupos} control={control} />
        <FormSelect<DocumentFiltersFormValues> name="category" label={documentMessages[lang].filterCategory} options={categorias} control={control} />
      </FiltersBox>
      <Button type="submit" variant="primary" sx={{ mt: 2 }}>
        {documentMessages[lang].filterButton}
      </Button>
    </form>
  );
};

export default DocumentFilters; 