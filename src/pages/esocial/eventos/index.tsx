import { useEffect, useState } from 'react';
import { useEsocialEvent } from '@/hooks/useEsocialEvent';
import { useEsocialTabela } from '@/hooks/useEsocialTabela';
import { EsocialEventList } from '@/components/esocial/EsocialEventList';
import { EsocialEventFilters } from '@/components/esocial/EsocialEventFilters';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticProps } from 'next';
import { EsocialEvent } from '@/types/esocial';

export default function EsocialEventPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { getEvents, loading, error } = useEsocialEvent();
  const [events, setEvents] = useState<EsocialEvent[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      const data = await getEvents();
      setEvents(data);
    };

    loadEvents();
  }, [getEvents]);

  const handleFilter = async (filter: any) => {
    const data = await getEvents(filter);
    setEvents(data);
  };

  const handleEventClick = (event: EsocialEvent) => {
    router.push(`/esocial/eventos/${event.id}`);
  };

  return (
    <div>
      <h1>{t('esocial:event.title')}</h1>
      <Button
        variant="contained"
        color="primary"
        onClick={() => router.push('/esocial/eventos/novo')}
      >
        {t('esocial:event.new')}
      </Button>
      <EsocialEventFilters onFilter={handleFilter} />
      {loading ? (
        <p>{t('common:loading')}</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <EsocialEventList events={events} onEventClick={handleEventClick} />
      )}
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