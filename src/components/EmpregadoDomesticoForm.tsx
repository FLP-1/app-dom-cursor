import React from 'react';
import { Grid, Button, Box, Typography, Tooltip, IconButton } from '@mui/material';
import { FormInput } from './common/forms/FormInput';
import { FormSelect } from './common/forms/FormSelect';
import { FormDatePicker } from './common/forms/FormDatePicker';
import { useEmpregadoDomesticoForm, EmpregadoDomesticoFormValues } from '../hooks/forms/useEmpregadoDomesticoForm';
import { useTranslation } from 'react-i18next';
import { CboCargo } from '../types/empregado-domestico';
import { DependenteEmpregado } from '../types/empregado-domestico';
import { Controller, useFieldArray } from 'react-hook-form';
import { AddCircle, RemoveCircle } from '@mui/icons-material';
import { IMaskInput } from 'react-imask';

interface EmpregadoDomesticoFormProps {
  initialValues?: Partial<EmpregadoDomesticoFormValues>;
  cargos: CboCargo[];
  onSubmitSuccess?: () => void;
  empregadores: { id: string; nomeCompleto: string }[];
}

// Componentes de máscara
const CPFMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="000.000.000-00"
    inputRef={ref}
  />
));

const CEPMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="00000-000"
    inputRef={ref}
  />
));

const TelefoneMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="(00) 00000-0000"
    inputRef={ref}
  />
));

const PISMask = React.forwardRef<HTMLInputElement>((props, ref) => (
  <IMaskInput
    {...props}
    mask="000.00000.00-0"
    inputRef={ref}
  />
));

export const EmpregadoDomesticoForm: React.FC<EmpregadoDomesticoFormProps> = ({ initialValues, cargos, onSubmitSuccess, empregadores }) => {
  const { t } = useTranslation();
  const { control, handleSubmit, onSubmit, loading, error, success } = useEmpregadoDomesticoForm(initialValues);

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'dependentes',
  });

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {t('Cadastro de Empregado Doméstico')}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Tooltip title="CPF do empregado doméstico. Deve ser válido.">
            <div>
              <Controller
                name="cpf"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label="CPF"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      inputComponent: CPFMask as any
                    }}
                  />
                )}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Nome completo conforme documento oficial.">
            <div><FormInput name="nomeCompleto" label="Nome Completo" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Data de nascimento do empregado.">
            <div><FormDatePicker name="dataNascimento" label="Data de Nascimento" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Sexo do empregado (Masculino/Feminino).">
            <div><FormSelect name="sexo" label="Sexo" control={control} required options={[
              { value: 'M', label: 'Masculino' },
              { value: 'F', label: 'Feminino' },
            ]} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Nacionalidade do empregado.">
            <div><FormInput name="nacionalidade" label="Nacionalidade" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Grau de instrução do empregado.">
            <div><FormInput name="grauInstrucao" label="Grau de Instrução" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Nome da mãe do empregado.">
            <div><FormInput name="nomeMae" label="Nome da Mãe" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Endereço residencial do empregado.">
            <div><FormInput name="endereco" label="Endereço" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Tooltip title="Número do endereço.">
            <div><FormInput name="numero" label="Número" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Tooltip title="Complemento do endereço (opcional).">
            <div><FormInput name="complemento" label="Complemento" control={control} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Bairro do endereço.">
            <div><FormInput name="bairro" label="Bairro" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="CEP do endereço.">
            <div>
              <Controller
                name="cep"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label="CEP"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      inputComponent: CEPMask as any
                    }}
                  />
                )}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Município do endereço.">
            <div><FormInput name="municipio" label="Município" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="UF do endereço.">
            <div><FormInput name="uf" label="UF" control={control} required maxLength={2} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Telefone principal do empregado.">
            <div>
              <Controller
                name="telefone"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label="Telefone"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      inputComponent: TelefoneMask as any
                    }}
                  />
                )}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Telefone alternativo (opcional).">
            <div>
              <Controller
                name="telefoneAlternativo"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label="Telefone Alternativo"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      inputComponent: TelefoneMask as any
                    }}
                  />
                )}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="E-mail principal do empregado.">
            <div><FormInput name="email" label="E-mail" control={control} required type="email" /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="E-mail alternativo (opcional).">
            <div><FormInput name="emailAlternativo" label="E-mail Alternativo" control={control} type="email" /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Nome social (opcional).">
            <div><FormInput name="nomeSocial" label="Nome Social" control={control} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Estado civil (opcional).">
            <div><FormSelect name="estadoCivil" label="Estado Civil" control={control} options={[
              { value: 'SOLTEIRO', label: 'Solteiro(a)' },
              { value: 'CASADO', label: 'Casado(a)' },
              { value: 'DIVORCIADO', label: 'Divorciado(a)' },
              { value: 'VIUVO', label: 'Viúvo(a)' },
              { value: 'SEPARADO', label: 'Separado(a)' },
            ]} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Raça/cor (opcional).">
            <div><FormSelect name="racaCor" label="Raça/Cor" control={control} options={[
              { value: 'BRANCA', label: 'Branca' },
              { value: 'PRETA', label: 'Preta' },
              { value: 'PARDA', label: 'Parda' },
              { value: 'AMARELA', label: 'Amarela' },
              { value: 'INDIGENA', label: 'Indígena' },
            ]} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" mt={2} mb={1}>{t('Dependentes')}</Typography>
          {fields.map((field, index) => (
            <Box key={field.id} display="flex" gap={2} alignItems="center" mb={1}>
              <Controller
                name={`dependentes.${index}.nome` as const}
                control={control}
                rules={{ required: t('Nome é obrigatório') }}
                render={({ field, fieldState }) => (
                  <FormInput {...field} label={t('Nome')} error={!!fieldState.error} helperText={fieldState.error?.message} required />
                )}
              />
              <Controller
                name={`dependentes.${index}.parentesco` as const}
                control={control}
                rules={{ required: t('Parentesco é obrigatório') }}
                render={({ field, fieldState }) => (
                  <FormSelect {...field} label={t('Parentesco')} error={!!fieldState.error} helperText={fieldState.error?.message} required options={[
                    { value: 'FILHO', label: 'Filho(a)' },
                    { value: 'CONJUGE', label: 'Cônjuge' },
                    { value: 'PAI', label: 'Pai' },
                    { value: 'MAE', label: 'Mãe' },
                    { value: 'OUTRO', label: 'Outro' },
                  ]} />
                )}
              />
              <Controller
                name={`dependentes.${index}.dataNascimento` as const}
                control={control}
                rules={{ required: t('Data de nascimento é obrigatória') }}
                render={({ field, fieldState }) => (
                  <FormDatePicker {...field} label={t('Data de Nascimento')} error={!!fieldState.error} helperText={fieldState.error?.message} required />
                )}
              />
              <Controller
                name={`dependentes.${index}.cpf` as const}
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label={t('CPF (opcional)')}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    InputProps={{
                      inputComponent: CPFMask as any
                    }}
                  />
                )}
              />
              <IconButton aria-label={t('Remover dependente')} color="error" onClick={() => remove(index)} disabled={fields.length === 1}>
                <RemoveCircle />
              </IconButton>
            </Box>
          ))}
          <Tooltip title={t('Adicionar dependente')}>
            <IconButton aria-label={t('Adicionar dependente')} color="primary" onClick={() => append({ nome: '', parentesco: '', dataNascimento: '', cpf: '' })}>
              <AddCircle />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Data de admissão do empregado.">
            <div><FormDatePicker name="dataAdmissao" label="Data de Admissão" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Matrícula do empregado no sistema.">
            <div><FormInput name="matricula" label="Matrícula" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Categoria do trabalhador (ex: 21 - Empregado Doméstico).">
            <div><FormInput name="categoria" label="Categoria" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Remuneração mensal do empregado.">
            <div><FormInput name="remuneracao" label="Remuneração" control={control} required type="number" inputProps={{ min: 0, step: 0.01 }} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Cargo/função do empregado conforme CBO.">
            <div><FormSelect name="cargoId" label="Cargo (CBO)" control={control} required options={cargos.map(c => ({ value: c.codigo, label: c.descricao }))} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Jornada de trabalho semanal (ex: 44h, 30h, etc).">
            <div><FormInput name="jornadaTrabalho" label="Jornada de Trabalho" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Número da CTPS.">
            <div><FormInput name="ctpsNumero" label="CTPS - Número" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="Série da CTPS.">
            <div><FormInput name="ctpsSerie" label="CTPS - Série" control={control} required /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Tooltip title="UF da CTPS.">
            <div><FormInput name="ctpsUf" label="CTPS - UF" control={control} required maxLength={2} /></div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Número do PIS/PASEP do empregado.">
            <div>
              <Controller
                name="pisPasep"
                control={control}
                render={({ field, fieldState }) => (
                  <FormInput
                    {...field}
                    label="PIS/PASEP"
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    required
                    InputProps={{
                      inputComponent: PISMask as any
                    }}
                  />
                )}
              />
            </div>
          </Tooltip>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tooltip title="Empregador responsável pelo vínculo.">
            <div><FormSelect name="empregadorId" label="Empregador" control={control} required options={empregadores.map(e => ({ value: e.id, label: e.nomeCompleto }))} /></div>
          </Tooltip>
        </Grid>
      </Grid>
      <Box mt={3} display="flex" gap={2}>
        <Button type="submit" variant="contained" color="primary" disabled={loading}>
          {loading ? t('Salvando...') : t('Salvar')}
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        {success && <Typography color="primary">{success}</Typography>}
      </Box>
    </Box>
  );
}; 