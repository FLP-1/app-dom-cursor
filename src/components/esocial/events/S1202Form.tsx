import { useTranslation } from 'react-i18next';
import { Control } from 'react-hook-form';
import { Grid } from '@mui/material';
import { FormInput, FormDatePicker, FormSelect, FormTextArea } from '@/components/form';
import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { S1202DmDevForm } from './S1202DmDevForm';

interface S1202FormProps {
  control: Control<S1202Schema>;
}

export const S1202Form = ({ control }: S1202FormProps) => {
  const { t } = useTranslation();

  return (
    <Grid container spacing={2}>
      {/* Identificação do Evento */}
      <Grid item xs={12}>
        <FormDatePicker
          name="ideEvento.perApur"
          label={t('esocial.S1202.ideEvento.perApur')}
          control={control}
          views={['month', 'year']}
          format="yyyy-MM"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideEvento.indRetif"
          label={t('esocial.S1202.ideEvento.indRetif')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1202.ideEvento.indRetif.original') },
            { value: '2', label: t('esocial.S1202.ideEvento.indRetif.retificacao') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideEvento.indApuracao"
          label={t('esocial.S1202.ideEvento.indApuracao')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1202.ideEvento.indApuracao.mensal') },
            { value: '2', label: t('esocial.S1202.ideEvento.indApuracao.anual') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormDatePicker
          name="ideEvento.perApurRPPS"
          label={t('esocial.S1202.ideEvento.perApurRPPS')}
          control={control}
          views={['month', 'year']}
          format="yyyy-MM"
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideEvento.indGuia"
          label={t('esocial.S1202.ideEvento.indGuia')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1202.ideEvento.indGuia.dae') },
            { value: '2', label: t('esocial.S1202.ideEvento.indGuia.gps') },
          ]}
        />
      </Grid>

      {/* Identificação do Empregador */}
      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideEmpregador.tpInsc"
          label={t('esocial.S1202.ideEmpregador.tpInsc')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1202.ideEmpregador.tpInsc.cnpj') },
            { value: '2', label: t('esocial.S1202.ideEmpregador.tpInsc.cpf') },
            { value: '3', label: t('esocial.S1202.ideEmpregador.tpInsc.caepf') },
            { value: '4', label: t('esocial.S1202.ideEmpregador.tpInsc.cno') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="ideEmpregador.nrInsc"
          label={t('esocial.S1202.ideEmpregador.nrInsc')}
          control={control}
        />
      </Grid>

      {/* Identificação do Trabalhador */}
      <Grid item xs={12} md={6}>
        <FormInput
          name="ideTrabalhador.cpfTrab"
          label={t('esocial.S1202.ideTrabalhador.cpfTrab')}
          control={control}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="ideTrabalhador.nisTrab"
          label={t('esocial.S1202.ideTrabalhador.nisTrab')}
          control={control}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="ideTrabalhador.nmTrab"
          label={t('esocial.S1202.ideTrabalhador.nmTrab')}
          control={control}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideTrabalhador.sexo"
          label={t('esocial.S1202.ideTrabalhador.sexo')}
          control={control}
          options={[
            { value: 'M', label: t('common.sexo.masculino') },
            { value: 'F', label: t('common.sexo.feminino') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideTrabalhador.racaCor"
          label={t('esocial.S1202.ideTrabalhador.racaCor')}
          control={control}
          options={[
            { value: '1', label: t('common.racaCor.branca') },
            { value: '2', label: t('common.racaCor.preta') },
            { value: '3', label: t('common.racaCor.parda') },
            { value: '4', label: t('common.racaCor.amarela') },
            { value: '5', label: t('common.racaCor.indigena') },
            { value: '6', label: t('common.racaCor.naoInformado') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideTrabalhador.estCiv"
          label={t('esocial.S1202.ideTrabalhador.estCiv')}
          control={control}
          options={[
            { value: '1', label: t('common.estCiv.solteiro') },
            { value: '2', label: t('common.estCiv.casado') },
            { value: '3', label: t('common.estCiv.divorciado') },
            { value: '4', label: t('common.estCiv.separado') },
            { value: '5', label: t('common.estCiv.viuvo') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="ideTrabalhador.grauInstr"
          label={t('esocial.S1202.ideTrabalhador.grauInstr')}
          control={control}
          options={[
            { value: '01', label: t('common.grauInstr.analfabeto') },
            { value: '02', label: t('common.grauInstr.ate5aIncompleto') },
            { value: '03', label: t('common.grauInstr.5aCompleto') },
            { value: '04', label: t('common.grauInstr.6a9aIncompleto') },
            { value: '05', label: t('common.grauInstr.9aCompleto') },
            { value: '06', label: t('common.grauInstr.medioIncompleto') },
            { value: '07', label: t('common.grauInstr.medioCompleto') },
            { value: '08', label: t('common.grauInstr.superiorIncompleto') },
            { value: '09', label: t('common.grauInstr.superiorCompleto') },
            { value: '10', label: t('common.grauInstr.mestrado') },
            { value: '11', label: t('common.grauInstr.doutorado') },
            { value: '12', label: t('common.grauInstr.ignorado') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="ideTrabalhador.nmSoc"
          label={t('esocial.S1202.ideTrabalhador.nmSoc')}
          control={control}
        />
      </Grid>

      {/* Informações Complementares */}
      <Grid item xs={12} md={6}>
        <FormInput
          name="infoComplCont.codCBO"
          label={t('esocial.S1202.infoComplCont.codCBO')}
          control={control}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormSelect
          name="infoComplCont.natAtividade"
          label={t('esocial.S1202.infoComplCont.natAtividade')}
          control={control}
          options={[
            { value: '1', label: t('esocial.S1202.infoComplCont.natAtividade.urbano') },
            { value: '2', label: t('esocial.S1202.infoComplCont.natAtividade.rural') },
          ]}
        />
      </Grid>

      <Grid item xs={12} md={6}>
        <FormInput
          name="infoComplCont.qtdDiasTrab"
          label={t('esocial.S1202.infoComplCont.qtdDiasTrab')}
          control={control}
          type="number"
        />
      </Grid>

      {/* Demais Informações */}
      <Grid item xs={12}>
        <FormTextArea
          name="infoCompl.sucessaoVinc.observacao"
          label={t('esocial.S1202.infoCompl.sucessaoVinc.observacao')}
          control={control}
        />
      </Grid>

      {/* Demonstrativos de Valores */}
      <Grid item xs={12}>
        <S1202DmDevForm control={control} />
      </Grid>
    </Grid>
  );
}; 