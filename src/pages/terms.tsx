import {
  Container,
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import Logo from '../components/Logo';
import { formatDateBR } from '../utils/date';

export default function Terms() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
      }}
    >
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
            Termos de Uso
          </Typography>

          <Typography variant="body1" paragraph>
            Última atualização: {formatDateBR(new Date())}
          </Typography>

          <Typography variant="body1" paragraph>
            Bem-vindo aos Termos de Uso do DOM. Ao acessar e utilizar nossa plataforma,
            você concorda com estes termos. Por favor, leia-os cuidadosamente.
          </Typography>

          <List>
            <ListItem>
              <ListItemText
                primary="1. Aceitação dos Termos"
                secondary="Ao acessar e utilizar o DOM, você aceita e concorda em cumprir estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não poderá acessar o serviço."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="2. Uso do Serviço"
                secondary="O DOM é uma plataforma de gestão de documentos. Você concorda em utilizar o serviço apenas para fins legais e de acordo com estes termos."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="3. Conta do Usuário"
                secondary="Para acessar certas funcionalidades, você precisará criar uma conta. Você é responsável por manter a confidencialidade de sua conta e senha."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="4. Privacidade e Dados"
                secondary="Nossa Política de Privacidade descreve como coletamos e utilizamos suas informações. Ao usar o DOM, você concorda com nossa coleta e uso de dados conforme descrito."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="5. Propriedade Intelectual"
                secondary="O DOM e seu conteúdo original, recursos e funcionalidades são de propriedade da empresa e estão protegidos por leis de propriedade intelectual."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="6. Limitações de Uso"
                secondary="Você concorda em não usar o serviço para qualquer propósito ilegal ou não autorizado, ou de qualquer forma que possa danificar, desabilitar ou comprometer o serviço."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="7. Modificações"
                secondary="Reservamo-nos o direito de modificar ou substituir estes Termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="8. Limitação de Responsabilidade"
                secondary="O DOM é fornecido 'como está', sem garantias de qualquer tipo. Não nos responsabilizamos por quaisquer danos indiretos, incidentais ou consequentes."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="9. Lei Aplicável"
                secondary="Estes termos serão regidos e interpretados de acordo com as leis do Brasil, independentemente de conflitos de disposições legais."
              />
            </ListItem>

            <Divider component="li" />

            <ListItem>
              <ListItemText
                primary="10. Contato"
                secondary="Se você tiver alguma dúvida sobre estes Termos, entre em contato conosco através do email: suporte@dom.com.br"
              />
            </ListItem>
          </List>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Ao continuar usando o DOM, você confirma que leu, entendeu e concorda com estes Termos de Uso.
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
} 