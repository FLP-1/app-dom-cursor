import { describe, it, expect } from 'vitest';
import { S1202XmlGenerator } from '../S1202XmlGenerator';

describe('S1202XmlGenerator', () => {
  const mockData = {
    ideEvento: {
      indRetif: 1,
      perApur: '2024-03',
      indApuracao: 1,
      indGuia: 1,
      tpAmb: 2,
      procEmi: 1,
      verProc: '1.0.0'
    },
    ideEmpregador: {
      tpInsc: 1,
      nrInsc: '12345678901234'
    },
    ideTrabalhador: {
      cpfTrab: '12345678901',
      nisTrab: '12345678901',
      nmTrab: 'Nome do Trabalhador',
      sexo: 'M',
      racaCor: 1,
      estCiv: 1,
      grauInstr: '01'
    },
    dmDev: [
      {
        ideDmDev: '1',
        codCateg: '101',
        infoPerApur: [
          {
            ideEstabLot: [
              {
                tpInsc: 1,
                nrInsc: '12345678901234',
                codLotacao: '1',
                detVerbas: [
                  {
                    codRubr: '1',
                    ideTabRubr: '1',
                    qtdRubr: 1,
                    vrRubr: 1000.00,
                    indApurIR: 0
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    infoComplCont: {
      codCBO: '123456',
      natAtividade: 1,
      qtdDiasTrab: 30
    },
    infoCompl: {
      observacao: 'Observação'
    }
  };

  it('should generate valid XML', () => {
    const generator = new S1202XmlGenerator(mockData);
    const xml = generator.generate();

    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<eSocial xmlns="http://www.esocial.gov.br/schema/evt/evtRemun/v_S_01_00_00">');
    expect(xml).toContain('<evtRemun Id="');
    expect(xml).toContain('</evtRemun>');
    expect(xml).toContain('</eSocial>');
  });

  it('should include all required fields', () => {
    const generator = new S1202XmlGenerator(mockData);
    const xml = generator.generate();

    // ideEvento
    expect(xml).toContain('<indRetif>1</indRetif>');
    expect(xml).toContain('<perApur>2024-03</perApur>');
    expect(xml).toContain('<indApuracao>1</indApuracao>');
    expect(xml).toContain('<indGuia>1</indGuia>');
    expect(xml).toContain('<tpAmb>2</tpAmb>');
    expect(xml).toContain('<procEmi>1</procEmi>');
    expect(xml).toContain('<verProc>1.0.0</verProc>');

    // ideEmpregador
    expect(xml).toContain('<tpInsc>1</tpInsc>');
    expect(xml).toContain('<nrInsc>12345678901234</nrInsc>');

    // ideTrabalhador
    expect(xml).toContain('<cpfTrab>12345678901</cpfTrab>');
    expect(xml).toContain('<nisTrab>12345678901</nisTrab>');
    expect(xml).toContain('<nmTrab>Nome do Trabalhador</nmTrab>');
    expect(xml).toContain('<sexo>M</sexo>');
    expect(xml).toContain('<racaCor>1</racaCor>');
    expect(xml).toContain('<estCiv>1</estCiv>');
    expect(xml).toContain('<grauInstr>01</grauInstr>');

    // dmDev
    expect(xml).toContain('<ideDmDev>1</ideDmDev>');
    expect(xml).toContain('<codCateg>101</codCateg>');
    expect(xml).toContain('<codRubr>1</codRubr>');
    expect(xml).toContain('<ideTabRubr>1</ideTabRubr>');
    expect(xml).toContain('<qtdRubr>1</qtdRubr>');
    expect(xml).toContain('<vrRubr>1000.00</vrRubr>');
    expect(xml).toContain('<indApurIR>0</indApurIR>');

    // infoComplCont
    expect(xml).toContain('<codCBO>123456</codCBO>');
    expect(xml).toContain('<natAtividade>1</natAtividade>');
    expect(xml).toContain('<qtdDiasTrab>30</qtdDiasTrab>');

    // infoCompl
    expect(xml).toContain('<observacao>Observação</observacao>');
  });

  it('should handle optional fields', () => {
    const dataWithoutOptionals = {
      ...mockData,
      ideEvento: {
        ...mockData.ideEvento,
        nrRecibo: undefined
      },
      ideTrabalhador: {
        ...mockData.ideTrabalhador,
        nisTrab: undefined,
        nmSoc: undefined
      },
      infoComplCont: undefined,
      infoCompl: undefined
    };

    const generator = new S1202XmlGenerator(dataWithoutOptionals);
    const xml = generator.generate();

    expect(xml).not.toContain('<nrRecibo>');
    expect(xml).not.toContain('<nisTrab>');
    expect(xml).not.toContain('<nmSoc>');
    expect(xml).not.toContain('<infoComplCont>');
    expect(xml).not.toContain('<infoCompl>');
  });

  it('should format decimal values with 2 decimal places', () => {
    const dataWithDecimals = {
      ...mockData,
      dmDev: [
        {
          ...mockData.dmDev[0],
          infoPerApur: [
            {
              ideEstabLot: [
                {
                  ...mockData.dmDev[0].infoPerApur[0].ideEstabLot[0],
                  detVerbas: [
                    {
                      ...mockData.dmDev[0].infoPerApur[0].ideEstabLot[0].detVerbas[0],
                      vrRubr: 1234.5678
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const generator = new S1202XmlGenerator(dataWithDecimals);
    const xml = generator.generate();

    expect(xml).toContain('<vrRubr>1234.57</vrRubr>');
  });

  it('should generate unique event IDs', () => {
    const generator1 = new S1202XmlGenerator(mockData);
    const generator2 = new S1202XmlGenerator(mockData);

    const xml1 = generator1.generate();
    const xml2 = generator2.generate();

    const id1 = xml1.match(/Id="([^"]+)"/)?.[1];
    const id2 = xml2.match(/Id="([^"]+)"/)?.[1];

    expect(id1).toBeDefined();
    expect(id2).toBeDefined();
    expect(id1).not.toBe(id2);
  });
}); 