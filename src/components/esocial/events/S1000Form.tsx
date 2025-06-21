/**
 * Arquivo: S1000Form.tsx
 * Caminho: src/components/esocial/events/S1000Form.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormTextArea } from '@/components/form';
import { S1000Schema } from '@/schemas/esocial/S1000Schema';
import { tooltips } from '@/utils/tooltips';

interface S1000FormProps {
  control: Control<S1000Schema>;
}

export const S1000Form = ({ control }: S1000FormProps) => {
  const { t } = useTranslation();
  const { locale } = useTranslation();

  return (
    <Grid container spacing={2} columns={12}>
      {/* Identificação do Empregador */}
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSelect
          name="ideEmpregador.tpInsc"
          label={t('esocial.S1000.ideEmpregador.tpInsc')}
          control={control}
          tooltip={tooltips.s1000_tpInsc[locale]}
          options={[
            { value: '1', label: t('esocial.S1000.ideEmpregador.tpInsc.1') },
            { value: '2', label: t('esocial.S1000.ideEmpregador.tpInsc.2') },
            { value: '3', label: t('esocial.S1000.ideEmpregador.tpInsc.3') },
            { value: '4', label: t('esocial.S1000.ideEmpregador.tpInsc.4') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="ideEmpregador.nrInsc"
          label={t('esocial.S1000.ideEmpregador.nrInsc')}
          control={control}
          tooltip={tooltips.s1000_nrInsc[locale]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="ideEmpregador.iniValid"
          label={t('esocial.S1000.ideEmpregador.iniValid')}
          control={control}
          tooltip={tooltips.s1000_iniValid[locale]}
          views={['month', 'year']}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="ideEmpregador.fimValid"
          label={t('esocial.S1000.ideEmpregador.fimValid')}
          control={control}
          tooltip={tooltips.s1000_fimValid[locale]}
          views={['month', 'year']}
        />
      </Grid>

      {/* Informações de Cadastro */}
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormSelect
          name="infoCadastro.classTrib"
          label={t('esocial.S1000.infoCadastro.classTrib')}
          control={control}
          tooltip={tooltips.s1000_classTrib[locale]}
          options={[
            { value: '01', label: t('esocial.S1000.infoCadastro.classTrib.01') },
            { value: '02', label: t('esocial.S1000.infoCadastro.classTrib.02') },
            // ... outros códigos de classificação tributária
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indCoop"
          label={t('esocial.S1000.infoCadastro.indCoop')}
          control={control}
          tooltip={tooltips.s1000_indCoop[locale]}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indCoop.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indCoop.1') },
            { value: '2', label: t('esocial.S1000.infoCadastro.indCoop.2') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indConstr"
          label={t('esocial.S1000.infoCadastro.indConstr')}
          control={control}
          tooltip={tooltips.s1000_indConstr[locale]}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indConstr.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indConstr.1') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indDesFolha"
          label={t('esocial.S1000.infoCadastro.indDesFolha')}
          control={control}
          tooltip={tooltips.s1000_indDesFolha[locale]}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indDesFolha.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indDesFolha.1') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indOpcCP"
          label={t('esocial.S1000.infoCadastro.indOpcCP')}
          control={control}
          tooltip={tooltips.s1000_indOpcCP[locale]}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indOpcCP.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indOpcCP.1') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indPorte"
          label={t('esocial.S1000.infoCadastro.indPorte')}
          control={control}
          tooltip={tooltips.s1000_indPorte[locale]}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indPorte.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indPorte.1') },
            { value: '2', label: t('esocial.S1000.infoCadastro.indPorte.2') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indOptRegEletron"
          label={t('esocial.S1000.infoCadastro.indOptRegEletron')}
          control={control}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indOptRegEletron.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indOptRegEletron.1') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indEntEd"
          label={t('esocial.S1000.infoCadastro.indEntEd')}
          control={control}
          options={[
            { value: 'N', label: t('esocial.S1000.infoCadastro.indEntEd.N') },
            { value: 'S', label: t('esocial.S1000.infoCadastro.indEntEd.S') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indEtt"
          label={t('esocial.S1000.infoCadastro.indEtt')}
          control={control}
          options={[
            { value: 'N', label: t('esocial.S1000.infoCadastro.indEtt.N') },
            { value: 'S', label: t('esocial.S1000.infoCadastro.indEtt.S') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="infoCadastro.nrRegEtt"
          label={t('esocial.S1000.infoCadastro.nrRegEtt')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.indAcordoIsenMulta"
          label={t('esocial.S1000.infoCadastro.indAcordoIsenMulta')}
          control={control}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.indAcordoIsenMulta.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.indAcordoIsenMulta.1') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.sitPJ"
          label={t('esocial.S1000.infoCadastro.sitPJ')}
          control={control}
          options={[
            { value: '0', label: t('esocial.S1000.infoCadastro.sitPJ.0') },
            { value: '1', label: t('esocial.S1000.infoCadastro.sitPJ.1') },
          ]}
        />
      </Grid>

      {/* Contrato de Aprendizagem */}
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="infoCadastro.contApr.nrProcJud"
          label={t('esocial.S1000.infoCadastro.contApr.nrProcJud')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.contApr.contEntEd"
          label={t('esocial.S1000.infoCadastro.contApr.contEntEd')}
          control={control}
          options={[
            { value: 'N', label: t('esocial.S1000.infoCadastro.contApr.contEntEd.N') },
            { value: 'S', label: t('esocial.S1000.infoCadastro.contApr.contEntEd.S') },
          ]}
        />
      </Grid>

      {/* Informações da Entidade Educativa sem Fins Lucrativos */}
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoCadastro.contApr.infoEntMe.tpInsc"
          label={t('esocial.S1000.infoCadastro.contApr.infoEntMe.tpInsc')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1000.infoCadastro.contApr.infoEntMe.tpInsc.1') },
            { value: '4', label: t('esocial.S1000.infoCadastro.contApr.infoEntMe.tpInsc.4') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="infoCadastro.contApr.infoEntMe.nrInsc"
          label={t('esocial.S1000.infoCadastro.contApr.infoEntMe.nrInsc')}
          control={control}
        />
      </Grid>

      {/* Dados de Isenção */}
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="dadosIsencao.ideMinLei"
          label={t('esocial.S1000.dadosIsencao.ideMinLei')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="dadosIsencao.nrCertif"
          label={t('esocial.S1000.dadosIsencao.nrCertif')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dadosIsencao.dtEmisCertif"
          label={t('esocial.S1000.dadosIsencao.dtEmisCertif')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dadosIsencao.dtVencCertif"
          label={t('esocial.S1000.dadosIsencao.dtVencCertif')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="dadosIsencao.nrProtRenov"
          label={t('esocial.S1000.dadosIsencao.nrProtRenov')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dadosIsencao.dtProtRenov"
          label={t('esocial.S1000.dadosIsencao.dtProtRenov')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="dadosIsencao.dtDou"
          label={t('esocial.S1000.dadosIsencao.dtDou')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="dadosIsencao.pagDou"
          label={t('esocial.S1000.dadosIsencao.pagDou')}
          control={control}
        />
      </Grid>

      {/* Informações do Órgão Público */}
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="infoOP.infoEFR.ideEFR"
          label={t('esocial.S1000.infoOP.infoEFR.ideEFR')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="infoOP.infoEFR.cnpjEFR"
          label={t('esocial.S1000.infoOP.infoEFR.cnpjEFR')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoOP.infoEFR.indSit"
          label={t('esocial.S1000.infoOP.infoEFR.indSit')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1000.infoOP.infoEFR.indSit.1') },
            { value: '2', label: t('esocial.S1000.infoOP.infoEFR.indSit.2') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12' }}>
        <FormInput
          name="infoOP.infoEnte.nmEnte"
          label={t('esocial.S1000.infoOP.infoEnte.nmEnte')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="infoOP.infoEnte.uf"
          label={t('esocial.S1000.infoOP.infoEnte.uf')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormInput
          name="infoOP.infoEnte.codMunic"
          label={t('esocial.S1000.infoOP.infoEnte.codMunic')}
          control={control}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoOP.infoEnte.indRPPS"
          label={t('esocial.S1000.infoOP.infoEnte.indRPPS')}
          control={control}
          options={[
            { value: 'S', label: t('esocial.S1000.infoOP.infoEnte.indRPPS.S') },
            { value: 'N', label: t('esocial.S1000.infoOP.infoEnte.indRPPS.N') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoOP.infoEnte.subteto"
          label={t('esocial.S1000.infoOP.infoEnte.subteto')}
          control={control}
          options={[
            { value: 'S', label: t('esocial.S1000.infoOP.infoEnte.subteto.S') },
            { value: 'N', label: t('esocial.S1000.infoOP.infoEnte.subteto.N') },
          ]}
        />
      </Grid>
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormDatePicker
          name="infoOP.infoEnte.subtetoDec"
          label={t('esocial.S1000.infoOP.infoEnte.subtetoDec')}
          control={control}
        />
      </Grid>

      {/* Informações de Organização Internacional */}
      <Grid gridColumn={{ xs: 'span 12', md: 'span 6' }}>
        <FormSelect
          name="infoOrgInternacional.indAcordoIsenMulta"
          label={t('esocial.S1000.infoOrgInternacional.indAcordoIsenMulta')}
          control={control}
          options={[
            { value: '0', label: t('esocial.S1000.infoOrgInternacional.indAcordoIsenMulta.0') },
            { value: '1', label: t('esocial.S1000.infoOrgInternacional.indAcordoIsenMulta.1') },
          ]}
        />
      </Grid>
    </Grid>
  );
}; 
