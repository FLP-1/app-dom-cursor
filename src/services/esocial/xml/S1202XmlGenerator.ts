import { S1202Schema } from '@/schemas/esocial/S1202Schema';
import { format } from 'date-fns';

interface S1202Data {
  ideEvento: {
    perApur: string;
  };
  ideEmpregador: {
    nrInsc: string;
  };
  ideTrabalhador: {
    cpfTrab: string;
  };
  dmDev: Array<{
    codCateg: string;
    infoPerApur: Array<{
      ideEstabLot: Array<{
        detVerbas: Array<{
          codRubr: string;
          vrRubr: number;
        }>;
      }>;
    }>;
  }>;
}

export class S1202XmlGenerator {
  private data: S1202Data;

  constructor(data: S1202Data) {
    this.data = data;
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
    return this.data.dmDev.map((dev) => `
      <dmDev>
        <codCateg>${dev.codCateg}</codCateg>
        ${this.generateInfoPerApur(dev.infoPerApur)}
      </dmDev>
    `).join('');
  }

  private generateInfoPerApur(infoPerApur: S1202Data['dmDev'][0]['infoPerApur']): string {
    return infoPerApur.map((info) => `
      <infoPerApur>
        ${this.generateIdeEstabLot(info.ideEstabLot)}
      </infoPerApur>
    `).join('');
  }

  private generateIdeEstabLot(ideEstabLot: S1202Data['dmDev'][0]['infoPerApur'][0]['ideEstabLot']): string {
    return ideEstabLot.map((estab) => `
      <ideEstabLot>
        ${this.generateDetVerbas(estab.detVerbas)}
      </ideEstabLot>
    `).join('');
  }

  private generateDetVerbas(detVerbas: S1202Data['dmDev'][0]['infoPerApur'][0]['ideEstabLot'][0]['detVerbas']): string {
    return detVerbas.map((verba) => `
      <detVerbas>
        <codRubr>${verba.codRubr}</codRubr>
        <vrRubr>${verba.vrRubr.toFixed(2)}</vrRubr>
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