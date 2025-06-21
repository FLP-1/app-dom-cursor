/**
 * Arquivo: privacy.tsx
 * Caminho: src/pages/privacy.tsx
 * Criado em: 2025-06-01
 * Última atualização: 2025-06-13
 * Descrição: Página de política de privacidade
 */

import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  ListItemButton,
} from '@mui/material';
import Logo from '@/components/Logo';
import { formatDateBR } from '@/utils/date';
import { Layout } from '@/components/layout/Layout';

export default function Privacy() {
  return (
    <Layout>
      {/* Cabeçalho */}
      <Box
        sx={{
          py: 3,
          px: 4,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
      >
        <Logo />
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          Transformando a gestão de documentos
        </Typography>
      </Box>

      {/* Conteúdo Principal */}
      <Container
        component="main"
        maxWidth="md"
        sx={{
          flex: 1,
          py: 8,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              color: 'primary.main',
            }}
          >
            Política de Privacidade
          </Typography>

          <Typography variant="body1" paragraph>
            Última atualização: {formatDateBR(new Date())}
          </Typography>

          <Typography variant="body1" paragraph>
            Esta Política de Privacidade descreve como o DOM coleta, usa e protege suas informações
            pessoais quando você utiliza nossa plataforma.
          </Typography>

          <List>
            <ListItemButton>
              <ListItemText
                primary="1. Informações que Coletamos"
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Coletamos as seguintes informações:
                    </Typography>
                    <ul>
                      <li>Nome completo</li>
                      <li>CPF</li>
                      <li>Endereço de e-mail</li>
                      <li>Informações de uso do sistema</li>
                      <li>Dados de documentos gerenciados</li>
                    </ul>
                  </>
                }
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="2. Como Usamos Suas Informações"
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Utilizamos suas informações para:
                    </Typography>
                    <ul>
                      <li>Fornecer e manter nossos serviços</li>
                      <li>Melhorar e personalizar sua experiência</li>
                      <li>Enviar notificações importantes</li>
                      <li>Prevenir fraudes e garantir a segurança</li>
                      <li>Cumprir obrigações legais</li>
                    </ul>
                  </>
                }
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="3. Proteção de Dados"
                secondary="Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, alteração, divulgação ou destruição."
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="4. Compartilhamento de Dados"
                secondary="Não compartilhamos suas informações pessoais com terceiros, exceto quando necessário para fornecer nossos serviços ou quando exigido por lei."
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="5. Seus Direitos"
                secondary={
                  <>
                    <Typography component="span" variant="body2">
                      Você tem o direito de:
                    </Typography>
                    <ul>
                      <li>Acessar suas informações pessoais</li>
                      <li>Corrigir dados imprecisos</li>
                      <li>Solicitar a exclusão de seus dados</li>
                      <li>Retirar seu consentimento</li>
                      <li>Solicitar a portabilidade dos dados</li>
                    </ul>
                  </>
                }
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="6. Cookies e Tecnologias Similares"
                secondary="Utilizamos cookies e tecnologias similares para melhorar sua experiência, analisar o uso do site e personalizar o conteúdo."
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="7. Retenção de Dados"
                secondary="Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir as finalidades para as quais foram coletadas, incluindo obrigações legais."
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="8. Alterações na Política"
                secondary="Podemos atualizar esta política periodicamente. Notificaremos você sobre quaisquer alterações significativas através do e-mail ou por meio de um aviso em nosso site."
              />
            </ListItemButton>

            <Divider component="li" />

            <ListItemButton>
              <ListItemText
                primary="9. Contato"
                secondary="Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos suas informações, entre em contato conosco através do email: privacidade@dom.com.br"
              />
            </ListItemButton>
          </List>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Ao usar o DOM, você concorda com a coleta e uso de informações de acordo com esta política.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
} 
