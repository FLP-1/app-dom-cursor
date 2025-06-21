/**
 * Arquivo: novo.tsx
 * Caminho: src/pages/esocial/eventos/novo.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de novo evento eSocial
 */

import { useEsocialEventForm } from '@/hooks/esocial/useEsocialEventForm';
import { EsocialEventForm } from '@/components/esocial/EsocialEventForm';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';

export default function EsocialEventFormPage() {
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  } = useEsocialEventForm();

  return (
    <div>
      <h1>{t('esocial:event.new')}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <EsocialEventForm control={control} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {t('common:buttons.save')}
        </Button>
      </form>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'pt-BR', ['common', 'esocial'])),
    },
  };
}; 
