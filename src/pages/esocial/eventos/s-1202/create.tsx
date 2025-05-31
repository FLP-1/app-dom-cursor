import { useTranslation } from 'react-i18next';
import { Container, Paper, Typography } from '@mui/material';
import { S1202Form } from '@/components/esocial/events/S1202Form';
import { useS1202Form } from '@/hooks/esocial/useS1202Form';
import { FormProvider } from 'react-hook-form';
import { EsocialEventsLayout } from '@/components/esocial/EsocialEventsLayout';

export default function CreateS1202Page() {
  const { t } = useTranslation();
  const { methods, onSubmit } = useS1202Form();

  return (
    <EsocialEventsLayout>
      <Container maxWidth="lg">
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h5" component="h1" gutterBottom>
            {t('esocial.S1202.title')}
          </Typography>

          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              <S1202Form control={methods.control} />
            </form>
          </FormProvider>
        </Paper>
      </Container>
    </EsocialEventsLayout>
  );
} 