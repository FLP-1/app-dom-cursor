/**
 * Arquivo: EsocialConfigForm.tsx
 * Caminho: src/components/esocial/EsocialConfigForm.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Componente de formulário para configuração do eSocial.
 */

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import { FormSelect } from '@/components/forms/inputs/FormSelect';
import { FormInput } from '@/components/forms/inputs/FormInput';
import { useNotification } from '@/hooks/useNotification';

// Schema base para endereço
const enderecoSchema = z.object({
  logradouro: z.string().min(1, 'Logradouro é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(1, 'Estado é obrigatório'),
  cep: z.string().min(8, 'CEP inválido'),
  pais: z.string().min(1, 'País é obrigatório'),
  codigoMunicipio: z.string().min(1, 'Código do município é obrigatório'),
  codigoPais: z.string().min(1, 'Código do país é obrigatório'),
});

// Schema base para contato
const contatoSchema = z.object({
  email: z.string().email('Email inválido'),
  telefone: z.string().min(10, 'Telefone inválido'),
});

// Schema base para empregador
const empregadorSchema = z.object({
  id: z.string().min(1, 'ID é obrigatório'),
  tipo: z.enum(['CPF', 'CNPJ']),
  numero: z.string().min(1, 'Número é obrigatório'),
  nome: z.string().min(1, 'Nome é obrigatório'),
  ...enderecoSchema.shape,
  ...contatoSchema.shape,
});

// Schema principal do eSocial
const esocialConfigSchema = z.object({
  ambiente: z.enum(['PRODUCAO', 'HOMOLOGACAO']),
  versao: z.string().min(1, 'Versão é obrigatória'),
  certificadoDigital: z.string().min(1, 'Certificado digital é obrigatório'),
  senhaCertificado: z.string().min(1, 'Senha do certificado é obrigatória'),
  empregador: empregadorSchema,
});

type EsocialConfigFormData = z.infer<typeof esocialConfigSchema>;

interface EsocialConfigFormProps {
  onSubmit: (data: EsocialConfigFormData) => void;
  initialData?: Partial<EsocialConfigFormData>;
}

export function EsocialConfigForm({ onSubmit, initialData }: EsocialConfigFormProps) {
  const { showNotification } = useNotification();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EsocialConfigFormData>({
    resolver: zodResolver(esocialConfigSchema),
    defaultValues: initialData,
  });

  const handleFormSubmit = async (data: EsocialConfigFormData) => {
    try {
      await onSubmit(data);
      showNotification('Configuração salva com sucesso', 'success');
    } catch (error) {
      showNotification('Erro ao salvar configuração', 'error');
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Configuração do eSocial
        </Typography>

        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Grid container spacing={2}>
            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormSelect
                name="ambiente"
                label="Ambiente"
                control={control}
                options={[
                  { value: 'PRODUCAO', label: 'Produção' },
                  { value: 'HOMOLOGACAO', label: 'Homologação' },
                ]}
                error={errors.ambiente?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="versao"
                label="Versão"
                control={control}
                error={errors.versao?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="certificadoDigital"
                label="Certificado Digital"
                control={control}
                error={errors.certificadoDigital?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="senhaCertificado"
                label="Senha do Certificado"
                type="password"
                control={control}
                error={errors.senhaCertificado?.message}
              />
            </Grid>

            {/* Campos do Empregador */}
            <Grid gridColumn={{ xs: 'span 12' }}>
              <Typography variant="subtitle1" gutterBottom>
                Dados do Empregador
              </Typography>
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormSelect
                name="empregador.tipo"
                label="Tipo"
                control={control}
                options={[
                  { value: 'CPF', label: 'CPF' },
                  { value: 'CNPJ', label: 'CNPJ' },
                ]}
                error={errors.empregador?.tipo?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="empregador.numero"
                label="Número"
                control={control}
                error={errors.empregador?.numero?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12' }}>
              <FormInput
                name="empregador.nome"
                label="Nome"
                control={control}
                error={errors.empregador?.nome?.message}
              />
            </Grid>

            {/* Endereço */}
            <Grid gridColumn={{ xs: 'span 12' }}>
              <Typography variant="subtitle1" gutterBottom>
                Endereço
              </Typography>
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 8' }}>
              <FormInput
                name="empregador.logradouro"
                label="Logradouro"
                control={control}
                error={errors.empregador?.logradouro?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
              <FormInput
                name="empregador.numero"
                label="Número"
                control={control}
                error={errors.empregador?.numero?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="empregador.complemento"
                label="Complemento"
                control={control}
                error={errors.empregador?.complemento?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="empregador.bairro"
                label="Bairro"
                control={control}
                error={errors.empregador?.bairro?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
              <FormInput
                name="empregador.cidade"
                label="Cidade"
                control={control}
                error={errors.empregador?.cidade?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
              <FormInput
                name="empregador.estado"
                label="Estado"
                control={control}
                error={errors.empregador?.estado?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 4' }}>
              <FormInput
                name="empregador.cep"
                label="CEP"
                control={control}
                error={errors.empregador?.cep?.message}
              />
            </Grid>

            {/* Contato */}
            <Grid gridColumn={{ xs: 'span 12' }}>
              <Typography variant="subtitle1" gutterBottom>
                Contato
              </Typography>
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="empregador.email"
                label="Email"
                type="email"
                control={control}
                error={errors.empregador?.email?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12', sm: 'span 6' }}>
              <FormInput
                name="empregador.telefone"
                label="Telefone"
                control={control}
                error={errors.empregador?.telefone?.message}
              />
            </Grid>

            <Grid gridColumn={{ xs: 'span 12' }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
              >
                Salvar Configuração
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
} 
