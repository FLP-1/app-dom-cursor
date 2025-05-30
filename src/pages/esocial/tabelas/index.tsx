import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  useTheme
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { EsocialTabelaManager } from '../../../components/EsocialTabelaManager';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`esocial-tabpanel-${index}`}
      aria-labelledby={`esocial-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function EsocialTabelasPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  const tabelas = [
    { codigo: '1', nome: t('Categorias de Trabalhadores') },
    { codigo: '2', nome: t('Financiamento da Aposentadoria Especial') },
    { codigo: '3', nome: t('Natureza das Rubricas da Folha de Pagamento') },
    { codigo: '4', nome: t('Códigos e Alíquotas de FPAS/Terceiros') },
    { codigo: '5', nome: t('Tipos de Inscrição') },
    { codigo: '6', nome: t('Países') },
    { codigo: '7', nome: t('Tipos de Dependente') }
  ];

  return (
    <Container maxWidth="xl">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {t('Tabelas do eSocial')}
        </Typography>

        <Paper sx={{ width: '100%', mt: 2 }}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="tabelas do eSocial"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              bgcolor: theme.palette.background.default
            }}
          >
            {tabelas.map((tabela, index) => (
              <Tab
                key={tabela.codigo}
                label={tabela.nome}
                id={`esocial-tab-${index}`}
                aria-controls={`esocial-tabpanel-${index}`}
              />
            ))}
          </Tabs>

          {tabelas.map((tabela, index) => (
            <TabPanel key={tabela.codigo} value={selectedTab} index={index}>
              <EsocialTabelaManager codigoTabela={tabela.codigo} />
            </TabPanel>
          ))}
        </Paper>
      </Box>
    </Container>
  );
} 