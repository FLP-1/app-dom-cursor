import { useTranslation } from 'react-i18next';
import { Grid, Button, Box, Paper, Typography, Tooltip } from '@mui/material';
import { FormInput, FormSelect } from '@/components/form';
import { S1202DmDevForm } from './events/S1202DmDevForm';
import { useS1202Form } from '@/hooks/useS1202Form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

interface S1202FormProps {
  initialData?: S1202Schema;
  id?: string;
}

export const S1202Form = ({ initialData, id }: S1202FormProps) => {
  const { t } = useTranslation();
  const {
    control,
    errors,
    isSubmitting,
    handleSubmit,
    handleDelete,
    handleGenerateXml
  } = useS1202Form({ initialData, id });

  return (
    <form onSubmit={handleSubmit}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          {t('esocial.S1202.title')}
        </Typography>

        <Grid container spacing={3}>
          {/* Empregador */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {t('esocial.S1202.ideEmpregador.title')}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <FormSelect
              name="ideEmpregador.tpInsc"
              label={t('esocial.S1202.ideEmpregador.tpInsc')}
              control={control}
              options={[
                { value: '1', label: t('esocial.S1202.ideEmpregador.tpInsc.cnpj') },
                { value: '2', label: t('esocial.S1202.ideEmpregador.tpInsc.cpf') },
                { value: '3', label: t('esocial.S1202.ideEmpregador.tpInsc.caepf') },
                { value: '4', label: t('esocial.S1202.ideEmpregador.tpInsc.cno') }
              ]}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <FormInput
              name="ideEmpregador.nrInsc"
              label={t('esocial.S1202.ideEmpregador.nrInsc')}
              control={control}
              mask="cnpj"
            />
          </Grid>

          {/* Trabalhador */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              {t('esocial.S1202.ideTrabalhador.title')}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              name="ideTrabalhador.cpfTrab"
              label={t('esocial.S1202.ideTrabalhador.cpfTrab')}
              control={control}
              mask="cpf"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormInput
              name="ideTrabalhador.nisTrab"
              label={t('esocial.S1202.ideTrabalhador.nisTrab')}
              control={control}
              mask="pis"
            />
          </Grid>

          {/* Demais Devidos */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Typography variant="subtitle1">
                {t('esocial.S1202.dmDev.title')}
              </Typography>
              <Tooltip title={t('esocial.S1202.dmDev.help')}>
                <HelpOutlineIcon fontSize="small" color="action" />
              </Tooltip>
            </Box>
            <S1202DmDevForm control={control} />
          </Grid>

          {/* Ações */}
          <Grid item xs={12}>
            <Box display="flex" gap={2} justifyContent="flex-end">
              {id && (
                <>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                  >
                    {t('common.actions.delete')}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<DownloadIcon />}
                    onClick={handleGenerateXml}
                  >
                    {t('common.actions.downloadXml')}
                  </Button>
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={isSubmitting}
              >
                {t('common.actions.save')}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
}; 