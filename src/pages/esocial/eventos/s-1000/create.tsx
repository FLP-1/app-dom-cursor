import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1000Form } from '@/components/esocial/events/S1000Form';
import { useS1000Form } from '@/hooks/esocial/useS1000Form';
import { FormProvider } from 'react-hook-form';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';

export default function CreateS1000Page() {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS1000Form();

  return (
    <EsocialEventsLayout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('esocial.S1000.title')}
          </Typography>

          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <S1000Form control={methods.control} />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </EsocialEventsLayout>
  );
} 