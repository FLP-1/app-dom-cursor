import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { prisma } from '@/lib/prisma';
import { createTestUser, createTestCompany } from '@/tests/helpers';
import { api } from '@/tests/api';

describe('S-1202 Integration Tests', () => {
  let token: string;
  let companyId: string;
  let eventId: string;

  beforeAll(async () => {
    // Criar usuário e empresa de teste
    const { user, token: userToken } = await createTestUser();
    token = userToken;
    const company = await createTestCompany(user.id);
    companyId = company.id;
  });

  afterAll(async () => {
    // Limpar dados de teste
    await prisma.event.deleteMany({
      where: { companyId }
    });
    await prisma.company.delete({
      where: { id: companyId }
    });
  });

  describe('POST /api/esocial/events/S-1202', () => {
    it('should create a new S-1202 event', async () => {
      const response = await api
        .post('/api/esocial/events/S-1202')
        .set('Authorization', `Bearer ${token}`)
        .send({
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
          }
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.status).toBe('PENDING');

      eventId = response.body.id;
    });

    it('should validate required fields', async () => {
      const response = await api
        .post('/api/esocial/events/S-1202')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ideEvento: {
            indRetif: 1
          }
        });

      expect(response.status).toBe(422);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details).toHaveLength(1);
    });

    it('should validate field formats', async () => {
      const response = await api
        .post('/api/esocial/events/S-1202')
        .set('Authorization', `Bearer ${token}`)
        .send({
          ideEvento: {
            indRetif: 1,
            perApur: '2024-13', // Mês inválido
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
          ]
        });

      expect(response.status).toBe(422);
      expect(response.body.error.code).toBe('VALIDATION_ERROR');
      expect(response.body.error.details[0].field).toBe('ideEvento.perApur');
    });
  });

  describe('PUT /api/esocial/events/S-1202/:id', () => {
    it('should update an existing S-1202 event', async () => {
      const response = await api
        .put(`/api/esocial/events/S-1202/${eventId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
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
            nmTrab: 'Nome do Trabalhador Atualizado',
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
                          vrRubr: 2000.00,
                          indApurIR: 0
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('PENDING');
    });

    it('should not update a processed event', async () => {
      // Simular evento processado
      await prisma.event.update({
        where: { id: eventId },
        data: { status: 'PROCESSED' }
      });

      const response = await api
        .put(`/api/esocial/events/S-1202/${eventId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          // ... dados do evento
        });

      expect(response.status).toBe(409);
      expect(response.body.error.code).toBe('EVENT_ALREADY_PROCESSED');
    });
  });

  describe('GET /api/esocial/events/S-1202/:id', () => {
    it('should get an existing S-1202 event', async () => {
      const response = await api
        .get(`/api/esocial/events/S-1202/${eventId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', eventId);
      expect(response.body).toHaveProperty('data');
    });

    it('should return 404 for non-existent event', async () => {
      const response = await api
        .get('/api/esocial/events/S-1202/non-existent-id')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe('GET /api/esocial/events/S-1202', () => {
    it('should list S-1202 events with pagination', async () => {
      const response = await api
        .get('/api/esocial/events/S-1202')
        .set('Authorization', `Bearer ${token}`)
        .query({
          page: 1,
          limit: 10
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('pagination');
      expect(response.body.pagination).toHaveProperty('total');
      expect(response.body.pagination).toHaveProperty('page', 1);
      expect(response.body.pagination).toHaveProperty('limit', 10);
    });

    it('should filter events by period', async () => {
      const response = await api
        .get('/api/esocial/events/S-1202')
        .set('Authorization', `Bearer ${token}`)
        .query({
          perApur: '2024-03'
        });

      expect(response.status).toBe(200);
      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].data.ideEvento.perApur).toBe('2024-03');
    });
  });

  describe('GET /api/esocial/events/S-1202/:id/logs', () => {
    it('should get event logs', async () => {
      const response = await api
        .get(`/api/esocial/events/S-1202/${eventId}/logs`)
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('logs');
      expect(Array.isArray(response.body.logs)).toBe(true);
    });
  });
}); 