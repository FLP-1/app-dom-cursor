import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'next-i18next';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  MenuItem,
  TextField,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { useOperacoesFinanceiras, operacaoFinanceiraSchema, OperacaoFinanceiraFormData } from '@/hooks/useOperacoesFinanceiras';
import { FormSelect } from '@/components/forms/FormSelect';
import { FormDatePicker } from '@/components/forms/FormDatePicker';
import { FormInput } from '@/components/forms/FormInput';
import { useEmpregadosDomesticos } from '@/hooks/useEmpregadosDomesticos';

interface OperacaoFinanceiraFormProps {
  open: boolean;
  onClose: () => void;
}

export function OperacaoFinanceiraForm({ open, onClose }: OperacaoFinanceiraFormProps) {
  const { t } = useTranslation();
  const { loading, criarOperacao } = useOperacoesFinanceiras();
  const { empregadosDomesticos } = useEmpregadosDomesticos();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OperacaoFinanceiraFormData>({
    resolver: zodResolver(operacaoFinanceiraSchema),
    defaultValues: {
      tipo: 'ADIANTAMENTO',
      formaPagamento: 'DINHEIRO',
    },
  });

  const tipo = watch('tipo');
  const valor = watch('valor');
  const numeroParcelas = watch('numeroParcelas');

  const onSubmit = async (data: OperacaoFinanceiraFormData) => {
    await criarOperacao(data);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{t('operacoesFinanceiras.novo')}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormSelect
                control={control}
                name="tipo"
                label={t('operacoesFinanceiras.tipo.label')}
                error={!!errors.tipo}
                helperText={errors.tipo?.message}
              >
                <MenuItem value="ADIANTAMENTO">
                  {t('operacoesFinanceiras.tipo.adiantamento')}
                </MenuItem>
                <MenuItem value="EMPRESTIMO">
                  {t('operacoesFinanceiras.tipo.emprestimo')}
                </MenuItem>
              </FormSelect>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormSelect
                control={control}
                name="empregadoDomesticoId"
                label={t('operacoesFinanceiras.empregadoDomestico.label')}
                error={!!errors.empregadoDomesticoId}
                helperText={errors.empregadoDomesticoId?.message}
              >
                {empregadosDomesticos?.map((empregado) => (
                  <MenuItem key={empregado.id} value={empregado.id}>
                    {empregado.nome}
                  </MenuItem>
                ))}
              </FormSelect>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormInput
                control={control}
                name="valor"
                label={t('operacoesFinanceiras.valor.label')}
                type="number"
                placeholder={t('operacoesFinanceiras.valor.placeholder')}
                error={!!errors.valor}
                helperText={errors.valor?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormSelect
                control={control}
                name="formaPagamento"
                label={t('operacoesFinanceiras.formaPagamento.label')}
                error={!!errors.formaPagamento}
                helperText={errors.formaPagamento?.message}
              >
                <MenuItem value="DINHEIRO">
                  {t('operacoesFinanceiras.formaPagamento.dinheiro')}
                </MenuItem>
                <MenuItem value="PIX">
                  {t('operacoesFinanceiras.formaPagamento.pix')}
                </MenuItem>
                <MenuItem value="TRANSFERENCIA">
                  {t('operacoesFinanceiras.formaPagamento.transferencia')}
                </MenuItem>
                <MenuItem value="OUTRO">
                  {t('operacoesFinanceiras.formaPagamento.outro')}
                </MenuItem>
              </FormSelect>
            </Grid>

            <Grid item xs={12} md={6}>
              <FormDatePicker
                control={control}
                name="dataOperacao"
                label={t('operacoesFinanceiras.dataOperacao.label')}
                error={!!errors.dataOperacao}
                helperText={errors.dataOperacao?.message}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormDatePicker
                control={control}
                name="dataVencimento"
                label={t('operacoesFinanceiras.dataVencimento.label')}
                error={!!errors.dataVencimento}
                helperText={errors.dataVencimento?.message}
              />
            </Grid>

            {tipo === 'EMPRESTIMO' && (
              <>
                <Grid item xs={12} md={6}>
                  <FormInput
                    control={control}
                    name="numeroParcelas"
                    label={t('operacoesFinanceiras.numeroParcelas.label')}
                    type="number"
                    placeholder={t('operacoesFinanceiras.numeroParcelas.placeholder')}
                    error={!!errors.numeroParcelas}
                    helperText={errors.numeroParcelas?.message}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormInput
                    control={control}
                    name="valorParcela"
                    label={t('operacoesFinanceiras.valorParcela.label')}
                    type="number"
                    placeholder={t('operacoesFinanceiras.valorParcela.placeholder')}
                    error={!!errors.valorParcela}
                    helperText={errors.valorParcela?.message}
                    value={numeroParcelas && valor ? valor / numeroParcelas : ''}
                    disabled
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <FormInput
                control={control}
                name="observacao"
                label={t('operacoesFinanceiras.observacao.label')}
                multiline
                rows={3}
                placeholder={t('operacoesFinanceiras.observacao.placeholder')}
                error={!!errors.observacao}
                helperText={errors.observacao?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <FormInput
                control={control}
                name="comprovanteUrl"
                label={t('operacoesFinanceiras.comprovanteUrl.label')}
                placeholder={t('operacoesFinanceiras.comprovanteUrl.placeholder')}
                error={!!errors.comprovanteUrl}
                helperText={errors.comprovanteUrl?.message}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={onClose}>{t('common.cancel')}</Button>
          <Button type="submit" variant="contained" disabled={loading}>
            {t('common.save')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
} 