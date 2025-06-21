/**
 * Arquivo: index.tsx
 * Caminho: src/pages/empregados-domesticos/[id]/index.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de detalhes de empregado doméstico
 */

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Box, Typography, Paper, Grid, CircularProgress, Alert, Button, Divider } from '@mui/material';
import { EmpregadoDomestico } from '@/types/empregado-domestico';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { empregadoDomesticoMessages } from '@/i18n/messages';
import { formatDateBR } from '@/utils/date';

export default function DetalhesEmpregadoDomesticoPage() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [loading, setLoading] = useState(true);
  const [empregado, setEmpregado] = useState<EmpregadoDomestico | null>(null);
  const [error, setError] = useState<string | null>(null);
  const lang = i18n.language as 'pt' | 'en';

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetch(`/api/empregado-domestico/${id}`)
      .then((res) => res.json())
      .then(setEmpregado)
      .catch(() => setError(t(empregadoDomesticoMessages[lang].genericError)))
      .finally(() => setLoading(false));
  }, [id, t, lang]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error || !empregado) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <Alert severity="error">{error || t(empregadoDomesticoMessages[lang].notFound)}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">{t('Detalhes do Empregado Doméstico')}</Typography>
          <Link href={`/empregados-domesticos/[id]/editar`.replace('[id]', empregado.id)} passHref legacyBehavior>
            <Button variant="outlined" color="primary">{t('Editar')}</Button>
          </Link>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Nome Completo')}</Typography>
            <Typography>{empregado.nomeCompleto}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('CPF')}</Typography>
            <Typography>{empregado.cpf}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Nascimento')}</Typography>
            <Typography>{empregado.dataNascimento ? formatDateBR(empregado.dataNascimento) : '-'}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Sexo')}</Typography>
            <Typography>{empregado.sexo}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Nacionalidade')}</Typography>
            <Typography>{empregado.nacionalidade}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Grau de Instrução')}</Typography>
            <Typography>{empregado.grauInstrucao}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Nome da Mãe')}</Typography>
            <Typography>{empregado.nomeMae}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Endereço')}</Typography>
            <Typography>{empregado.endereco}, {empregado.numero} {empregado.complemento ? `- ${empregado.complemento}` : ''}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Bairro')}</Typography>
            <Typography>{empregado.bairro}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Município')}</Typography>
            <Typography>{empregado.municipio} - {empregado.uf}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('CEP')}</Typography>
            <Typography>{empregado.cep}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Telefone')}</Typography>
            <Typography>{empregado.telefone}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('E-mail')}</Typography>
            <Typography>{empregado.email}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Matrícula')}</Typography>
            <Typography>{empregado.matricula}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Categoria')}</Typography>
            <Typography>{empregado.categoria}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Remuneração')}</Typography>
            <Typography>{empregado.remuneracao?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Cargo')}</Typography>
            <Typography>{empregado.cargo?.descricao || empregado.cargoId}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Jornada de Trabalho')}</Typography>
            <Typography>{empregado.jornadaTrabalho}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('CTPS')}</Typography>
            <Typography>{empregado.ctpsNumero} / {empregado.ctpsSerie} - {empregado.ctpsUf}</Typography>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('PIS/PASEP')}</Typography>
            <Typography>{empregado.pisPasep}</Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {/* Dependentes */}
        {empregado.dependentes && empregado.dependentes.length > 0 && (
          <>
            <Typography variant="h6" mb={1}>{t('Dependentes')}</Typography>
            <Grid container spacing={2} mb={2} columns={12}>
              {empregado.dependentes.map((dep, idx) => (
                <Grid gridColumn="span 12" key={idx}>
                  <Paper variant="outlined" sx={{ p: 2, mb: 1, bgcolor: 'background.default' }}>
                    <Grid container spacing={1} columns={12}>
                      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                        <Typography variant="subtitle2">{t('Nome')}</Typography>
                        <Typography>{dep.nome}</Typography>
                      </Grid>
                      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                        <Typography variant="subtitle2">{t('Parentesco')}</Typography>
                        <Typography>{dep.parentesco}</Typography>
                      </Grid>
                      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                        <Typography variant="subtitle2">{t('Data de Nascimento')}</Typography>
                        <Typography>{dep.dataNascimento ? formatDateBR(dep.dataNascimento) : '-'}</Typography>
                      </Grid>
                      <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 3' }}>
                        <Typography variant="subtitle2">{t('CPF')}</Typography>
                        <Typography>{dep.cpf || '-'}</Typography>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Divider sx={{ my: 3 }} />
        {/* Integrações */}
        <Typography variant="h6" mb={1}>{t('Integrações')}</Typography>
        <Grid container spacing={2} columns={12}>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Ponto')}</Typography>
            {/* TODO: Integrar com registros de ponto do empregado */}
            <Link href={`/ponto?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Ponto')}</Button>
            </Link>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Tarefas')}</Typography>
            {/* TODO: Integrar com tarefas do empregado */}
            <Link href={`/tarefas?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Tarefas')}</Button>
            </Link>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Comunicação')}</Typography>
            {/* TODO: Integrar com chat/comunicação do empregado */}
            <Link href={`/chat?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Comunicação')}</Button>
            </Link>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Alertas')}</Typography>
            {/* TODO: Integrar com alertas do empregado */}
            <Link href={`/alerts?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Alertas')}</Button>
            </Link>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Compras')}</Typography>
            {/* TODO: Integrar com compras do empregado */}
            <Link href={`/compras?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Compras')}</Button>
            </Link>
          </Grid>
          <Grid gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}>
            <Typography variant="subtitle2">{t('Documentos')}</Typography>
            {/* TODO: Integrar com documentos do empregado */}
            <Link href={`/documents?empregadoId=${empregado.id}`} passHref legacyBehavior>
              <Button variant="text" color="info">{t('Ver Documentos')}</Button>
            </Link>
          </Grid>
        </Grid>
        <Divider sx={{ my: 3 }} />
        {/* Histórico/Auditoria - Exemplo de placeholder */}
        <Typography variant="h6" mb={1}>{t('Histórico de Alterações')}</Typography>
        <Typography color="text.secondary" variant="body2" mb={2}>
          {/* TODO: Integrar com logs reais de auditoria */}
          {t('Funcionalidade de histórico/auditoria em desenvolvimento.')}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Link href="/empregados-domesticos" passHref legacyBehavior>
            <Button variant="outlined" color="secondary">{t('Voltar para lista')}</Button>
          </Link>
        </Box>
      </Paper>
    </Box>
  );
}

// Sugestão de testes automatizados (Jest + React Testing Library):
// - Deve exibir todos os campos do empregado corretamente
// - Deve exibir botões de integração para cada módulo
// - Deve exibir mensagem de erro se o empregado não for encontrado
// - Deve garantir acessibilidade (labels, aria, etc)
// - Deve garantir responsividade em diferentes tamanhos de tela
// - Deve navegar corretamente ao clicar em "Editar" e "Voltar para lista" 