import { z } from 'zod';
import { cnpjSchema, cpfSchema } from '../commonSchemas';

export const s1000Schema = z.object({
  ideEmpregador: z.object({
    tpInsc: z.enum(['1', '2', '3', '4']), // 1-CNPJ, 2-CPF, 3-CAEPF, 4-CNO
    nrInsc: z.string().refine((val) => {
      if (val.length !== 11 && val.length !== 14) return false;
      return true;
    }, 'Número de inscrição inválido'),
    iniValid: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Formato inválido (AAAA-MM)'),
    fimValid: z.string().regex(/^\d{4}-(?:0[1-9]|1[0-2])$/, 'Formato inválido (AAAA-MM)').optional(),
  }),

  infoCadastro: z.object({
    classTrib: z.enum(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99']),
    indCoop: z.enum(['0', '1', '2']).optional(), // 0-Não é cooperativa, 1-Cooperativa de Trabalho, 2-Cooperativa de Produção
    indConstr: z.enum(['0', '1']).optional(), // 0-Não é construtora, 1-Empresa Construtora
    indDesFolha: z.enum(['0', '1']).optional(), // 0-Não é desfolha, 1-É desfolha
    indOpcCP: z.enum(['0', '1']).optional(), // 0-Não optante, 1-Optante
    indPorte: z.enum(['0', '1', '2', '3', '4', '5']).optional(), // 0-Não informado, 1-Microempresa, 2-Empresa de Pequeno Porte, 3-Demais, 4-Empresa de Médio Porte, 5-Empresa de Grande Porte
    indOptRegEletron: z.enum(['0', '1']).optional(), // 0-Não optante, 1-Optante
    indEntEd: z.enum(['N', 'S']).optional(), // N-Não, S-Sim
    indEtt: z.enum(['N', 'S']).optional(), // N-Não, S-Sim
    nrRegEtt: z.string().max(30).optional(),
    indAcordoIsenMulta: z.enum(['0', '1']).optional(), // 0-Não, 1-Sim
    sitPJ: z.enum(['0', '1']).optional(), // 0-Não, 1-Sim
    contApr: z.object({
      nrProcJud: z.string().max(20),
      contEntEd: z.enum(['N', 'S']), // N-Não, S-Sim
      infoEntMe: z.object({
        tpInsc: z.enum(['1', '4']), // 1-CNPJ, 4-CEI
        nrInsc: z.string().max(14),
      }).optional(),
    }).optional(),
  }),

  dadosIsencao: z.object({
    ideMinLei: z.string().max(120),
    nrCertif: z.string().max(40),
    dtEmisCertif: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)'),
    dtVencCertif: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)'),
    nrProtRenov: z.string().max(40).optional(),
    dtProtRenov: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
    dtDou: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
    pagDou: z.string().max(5).optional(),
  }).optional(),

  infoOP: z.object({
    infoEFR: z.object({
      ideEFR: z.string().max(30),
      cnpjEFR: z.string().length(14),
      indSit: z.enum(['1', '2']), // 1-Ativo, 2-Inativo
    }),
    infoEnte: z.object({
      nmEnte: z.string().max(100),
      uf: z.string().length(2),
      codMunic: z.string().length(7),
      indRPPS: z.enum(['S', 'N']), // S-Sim, N-Não
      subteto: z.enum(['S', 'N']), // S-Sim, N-Não
      subtetoDec: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Formato inválido (AAAA-MM-DD)').optional(),
    }),
  }).optional(),

  infoOrgInternacional: z.object({
    indAcordoIsenMulta: z.enum(['0', '1']), // 0-Não, 1-Sim
  }).optional(),
});

export type S1000Schema = z.infer<typeof s1000Schema>; 