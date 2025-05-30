import { useEffect, useState } from 'react';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { useEsocialEventForm } from '@/hooks/useEsocialEventForm';
import { EsocialEventForm } from '@/components/esocial/EsocialEventForm';
import { Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { EsocialEvent } from '@/types/esocial';

export default function EsocialEventDetailPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { id } = router.query;
  const { getEvent, loading, error } = useEsocialEvent();
  const [event, setEvent] = useState<EsocialEvent | null>(null);

  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    enviarEvento
  } = useEsocialEventForm(id as string);

  useEffect(() => {
    const loadEvent = async () => {
      if (id) {
        const data = await getEvent(id as string);
        setEvent(data);
      }
    };

    loadEvent();
  }, [id, getEvent]);

  if (loading) {
    return <p>{t('common:loading')}</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!event) {
    return <p>{t('common:notFound')}</p>;
  }

  return (
    <div>
      <h1>{t('esocial:event.edit')}</h1>
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
        {event.status === 'PENDENTE' && (
          <Button
            onClick={() => enviarEvento(event.id)}
            variant="contained"
            color="secondary"
            disabled={isSubmitting}
          >
            {t('common:buttons.send')}
          </Button>
        )}
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