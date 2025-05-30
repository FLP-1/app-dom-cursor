import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { format } from 'date-fns';

export class S1202XmlGenerator {
  private data: any;

  constructor(data: any) {
    this.data = S1202Schema.parse(data);
  }

  generate(): string {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<eSocial xmlns="http://www.esocial.gov.br/schema/evt/evtRemun/v_S_01_00_00">
  <evtRemun Id="${this.generateEventId()}">
    ${this.generateIdeEvento()}
    ${this.generateIdeEmpregador()}
    ${this.generateIdeTrabalhador()}
    ${this.generateDmDev()}
    ${this.generateInfoComplCont()}
    ${this.generateInfoCompl()}
  </evtRemun>
</eSocial>`;

    return xml;
  }

  private generateEventId(): string {
    const timestamp = format(new Date(), 'yyyyMMddHHmmss');
    return `ID${timestamp}${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`;
  }

  private generateIdeEvento(): string {
    const { ideEvento } = this.data;
    return `
    <ideEvento>
      <indRetif>${ideEvento.indRetif}</indRetif>
      ${ideEvento.nrRecibo ? `<nrRecibo>${ideEvento.nrRecibo}</nrRecibo>` : ''}
      <perApur>${ideEvento.perApur}</perApur>
      <indApuracao>${ideEvento.indApuracao}</indApuracao>
      <indGuia>${ideEvento.indGuia}</indGuia>
      <tpAmb>${ideEvento.tpAmb}</tpAmb>
      <procEmi>${ideEvento.procEmi}</procEmi>
      <verProc>${ideEvento.verProc}</verProc>
    </ideEvento>`;
  }

  private generateIdeEmpregador(): string {
    const { ideEmpregador } = this.data;
    return `
    <ideEmpregador>
      <tpInsc>${ideEmpregador.tpInsc}</tpInsc>
      <nrInsc>${ideEmpregador.nrInsc}</nrInsc>
    </ideEmpregador>`;
  }

  private generateIdeTrabalhador(): string {
    const { ideTrabalhador } = this.data;
    return `
    <ideTrabalhador>
      <cpfTrab>${ideTrabalhador.cpfTrab}</cpfTrab>
      ${ideTrabalhador.nisTrab ? `<nisTrab>${ideTrabalhador.nisTrab}</nisTrab>` : ''}
      <nmTrab>${ideTrabalhador.nmTrab}</nmTrab>
      <sexo>${ideTrabalhador.sexo}</sexo>
      <racaCor>${ideTrabalhador.racaCor}</racaCor>
      <estCiv>${ideTrabalhador.estCiv}</estCiv>
      <grauInstr>${ideTrabalhador.grauInstr}</grauInstr>
      ${ideTrabalhador.nmSoc ? `<nmSoc>${ideTrabalhador.nmSoc}</nmSoc>` : ''}
    </ideTrabalhador>`;
  }

  private generateDmDev(): string {
    const { dmDev } = this.data;
    return `
    <dmDev>
      ${dmDev.map((dev: any) => `
      <ideDmDev>${dev.ideDmDev}</ideDmDev>
      <codCateg>${dev.codCateg}</codCateg>
      ${this.generateInfoPerApur(dev.infoPerApur)}
      `).join('')}
    </dmDev>`;
  }

  private generateInfoPerApur(infoPerApur: any[]): string {
    return infoPerApur.map((info: any) => `
      <infoPerApur>
        ${this.generateIdeEstabLot(info.ideEstabLot)}
      </infoPerApur>
    `).join('');
  }

  private generateIdeEstabLot(ideEstabLot: any[]): string {
    return ideEstabLot.map((estab: any) => `
      <ideEstabLot>
        <tpInsc>${estab.tpInsc}</tpInsc>
        <nrInsc>${estab.nrInsc}</nrInsc>
        <codLotacao>${estab.codLotacao}</codLotacao>
        ${this.generateDetVerbas(estab.detVerbas)}
      </ideEstabLot>
    `).join('');
  }

  private generateDetVerbas(detVerbas: any[]): string {
    return detVerbas.map((verba: any) => `
      <detVerbas>
        <codRubr>${verba.codRubr}</codRubr>
        <ideTabRubr>${verba.ideTabRubr}</ideTabRubr>
        <qtdRubr>${verba.qtdRubr}</qtdRubr>
        <vrRubr>${verba.vrRubr.toFixed(2)}</vrRubr>
        <indApurIR>${verba.indApurIR}</indApurIR>
      </detVerbas>
    `).join('');
  }

  private generateInfoComplCont(): string {
    const { infoComplCont } = this.data;
    if (!infoComplCont) return '';

    return `
    <infoComplCont>
      ${infoComplCont.codCBO ? `<codCBO>${infoComplCont.codCBO}</codCBO>` : ''}
      ${infoComplCont.natAtividade ? `<natAtividade>${infoComplCont.natAtividade}</natAtividade>` : ''}
      ${infoComplCont.qtdDiasTrab ? `<qtdDiasTrab>${infoComplCont.qtdDiasTrab}</qtdDiasTrab>` : ''}
    </infoComplCont>`;
  }

  private generateInfoCompl(): string {
    const { infoCompl } = this.data;
    if (!infoCompl?.observacao) return '';

    return `
    <infoCompl>
      <observacao>${infoCompl.observacao}</observacao>
    </infoCompl>`;
  }
} 