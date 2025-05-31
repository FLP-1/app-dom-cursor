import { z } from 'zod';

export type S1000Schema = z.infer<typeof s1000Schema>;

export type IdeEmpregador = {
  tpInsc: '1' | '2' | '3' | '4';
  nrInsc: string;
  iniValid: string;
  fimValid?: string;
};

export type InfoCadastro = {
  classTrib: string;
  indCoop?: '0' | '1' | '2';
  indConstr?: '0' | '1';
  indDesFolha?: '0' | '1';
  indOpcCP?: '0' | '1';
  indPorte?: '0' | '1' | '2' | '3' | '4' | '5';
  indOptRegEletron?: '0' | '1';
  indEntEd?: 'N' | 'S';
  indEtt?: 'N' | 'S';
  nrRegEtt?: string;
  indAcordoIsenMulta?: '0' | '1';
  sitPJ?: '0' | '1';
  contApr?: {
    nrProcJud: string;
    contEntEd: 'N' | 'S';
    infoEntMe?: {
      tpInsc: '1' | '4';
      nrInsc: string;
    };
  };
};

export type DadosIsencao = {
  ideMinLei: string;
  nrCertif: string;
  dtEmisCertif: string;
  dtVencCertif: string;
  nrProtRenov?: string;
  dtProtRenov?: string;
  dtDou?: string;
  pagDou?: string;
};

export type InfoOP = {
  infoEFR: {
    ideEFR: string;
    cnpjEFR: string;
    indSit: '1' | '2';
  };
  infoEnte: {
    nmEnte: string;
    uf: string;
    codMunic: string;
    indRPPS: 'S' | 'N';
    subteto: 'S' | 'N';
    subtetoDec?: string;
  };
};

export type InfoOrgInternacional = {
  indAcordoIsenMulta: '0' | '1';
}; 