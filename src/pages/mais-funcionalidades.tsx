/**
 * Arquivo: mais-funcionalidades.tsx
 * Caminho: src/pages/mais-funcionalidades.tsx
 * Criado em: 2025-06-13
 * Última atualização: 2025-06-13
 * Descrição: Página de funcionalidades extras, agrupando módulos por área e permitindo favoritos.
 */

import React from 'react';
import { Box, Typography, Grid, Card, CardActionArea, CardContent, useTheme, Avatar, IconButton, Tooltip } from '@mui/material';
import { menuItems } from '@/config/menu';
import { useRouter } from 'next/router';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { tooltips } from '@/i18n/tooltips';

// Exemplo de agrupamento e destaque
const grupos = [
  {
    titulo: 'Financeiro',
    cards: [
      { key: 'compras', label: 'Compras', icon: 'ShoppingCart', size: 'large' },
      { key: 'operacoes', label: 'Operações', icon: 'AccountBalance', size: 'medium' },
      { key: 'relatorios-fin', label: 'Relatórios Financeiros', icon: 'BarChart', size: 'small' },
    ],
  },
  {
    titulo: 'RH',
    cards: [
      { key: 'empregados', label: 'Empregados', icon: 'People', size: 'large' },
      { key: 'ponto', label: 'Ponto', icon: 'AccessTime', size: 'medium' },
      { key: 'folha', label: 'Folha de Pagamento', icon: 'ReceiptLong', size: 'small' },
      { key: 'esocial', label: 'eSocial', icon: 'Assignment', size: 'small' },
    ],
  },
  {
    titulo: 'Casa',
    cards: [
      { key: 'tarefas', label: 'Tarefas', icon: 'Checklist', size: 'large' },
      { key: 'alertas', label: 'Alertas', icon: 'Notifications', size: 'medium' },
      { key: 'mensagens', label: 'Mensagens', icon: 'Chat', size: 'small' },
    ],
  },
  {
    titulo: 'Configurações',
    cards: [
      { key: 'usuarios', label: 'Usuários', icon: 'Person', size: 'medium' },
      { key: 'grupos', label: 'Grupos', icon: 'GroupWork', size: 'small' },
      { key: 'parceiros', label: 'Parceiros', icon: 'Handshake', size: 'small' },
      { key: 'preferencias', label: 'Preferências', icon: 'Tune', size: 'small' },
    ],
  },
];

// Ícones mais usados (exemplo fixo, pode ser dinâmico/favoritos no futuro)
const maisUsados = [
  { key: 'dashboard', label: 'Dashboard', icon: 'Dashboard' },
  { key: 'ponto', label: 'Ponto', icon: 'AccessTime' },
  { key: 'relatorios', label: 'Relatórios', icon: 'BarChart' },
  { key: 'compras', label: 'Compras', icon: 'ShoppingCart' },
];

// Função utilitária para pegar o ícone do Material UI dinamicamente
import * as MuiIcons from '@mui/icons-material';
function getMuiIcon(name: string) {
  const Icon = (MuiIcons as any)[name];
  return Icon ? <Icon fontSize="inherit" /> : null;
}

// Ícones mais usados agora são os favoritos do usuário
function useFavoritos() {
  const [favoritos, setFavoritos] = React.useState<string[]>([]);

  React.useEffect(() => {
    const fav = localStorage.getItem('menuFavoritos');
    if (fav) setFavoritos(JSON.parse(fav));
  }, []);

  function toggleFavorito(key: string) {
    setFavoritos((prev) => {
      let novo;
      if (prev.includes(key)) {
        novo = prev.filter((f) => f !== key);
      } else {
        if (prev.length >= 3) return prev; // Limite de 3
        novo = [...prev, key];
      }
      localStorage.setItem('menuFavoritos', JSON.stringify(novo));
      return novo;
    });
  }

  return { favoritos, toggleFavorito };
}

export default function MaisFuncionalidades() {
  const theme = useTheme();
  const router = useRouter();
  const { favoritos, toggleFavorito } = useFavoritos();

  // Tamanhos dos cards
  const cardSize = {
    large: { xs: 12, sm: 6, md: 4, height: 180 },
    medium: { xs: 6, sm: 4, md: 3, height: 120 },
    small: { xs: 6, sm: 3, md: 2, height: 90 },
  };

  // Monta lista de cards favoritos
  const allCards = grupos.flatMap(g => g.cards);
  const favoritosCards = favoritos
    .map(key => allCards.find(card => card.key === key))
    .filter(Boolean) as typeof allCards;

  return (
    <Box sx={{ p: { xs: 1, sm: 3 }, pb: 8 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        Funcionalidades
      </Typography>
      {/* Favoritos do usuário no topo */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
        {favoritosCards.length === 0 && (
          <Typography variant="body2" color="text.secondary">Selecione até 3 favoritos clicando na estrela dos cards abaixo.</Typography>
        )}
        {favoritosCards.map((item) => (
          <Card
            key={item.key}
            sx={{ minWidth: 90, flex: '0 0 auto', boxShadow: 3, borderRadius: 2, cursor: 'pointer', p: 1, textAlign: 'center', bgcolor: theme.palette.background.paper, position: 'relative' }}
            onClick={() => router.push(`/${item.key}`)}
            aria-label={item.label}
          >
            <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48, mx: 'auto', mb: 1 }}>
              {getMuiIcon(item.icon)}
            </Avatar>
            <Typography variant="body2" fontWeight={600}>{item.label}</Typography>
            <IconButton
              size="small"
              sx={{ position: 'absolute', top: 4, right: 4, color: theme.palette.warning.main }}
              onClick={e => { e.stopPropagation(); toggleFavorito(item.key); }}
              aria-label="Remover dos favoritos"
            >
              <StarIcon />
            </IconButton>
          </Card>
        ))}
      </Box>
      {/* Cards agrupados por assunto */}
      {grupos.map((grupo) => (
        <Box key={grupo.titulo} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: theme.palette.primary.main, fontWeight: 600 }}>{grupo.titulo}</Typography>
          <Grid container spacing={2} columns={12}>
            {grupo.cards.map((card) => (
              <Grid
                key={card.key}
                item
                gridColumn={{
                  xs: `span ${cardSize[card.size].xs}`,
                  sm: `span ${cardSize[card.size].sm}`,
                  md: `span ${cardSize[card.size].md}`
                }}
              >
                <Card
                  sx={{
                    height: cardSize[card.size].height,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 2,
                    borderRadius: 2,
                    cursor: 'pointer',
                    bgcolor: theme.palette.background.paper,
                    transition: 'box-shadow 0.2s',
                    position: 'relative',
                    '&:hover': { boxShadow: 6 },
                  }}
                  onClick={() => router.push(`/${card.key}`)}
                  aria-label={card.label}
                >
                  <Avatar sx={{ bgcolor: theme.palette.secondary.main, width: 40, height: 40, mb: 1 }}>
                    {getMuiIcon(card.icon)}
                  </Avatar>
                  <CardContent sx={{ p: 1, textAlign: 'center' }}>
                    <Typography variant="body2" fontWeight={500}>{card.label}</Typography>
                  </CardContent>
                  <Tooltip title={favoritos.includes(card.key) ? tooltips.removerFavorito.pt : favoritos.length >= 3 ? tooltips.limiteFavoritos.pt : tooltips.adicionarFavorito.pt}>
                    <span>
                      <IconButton
                        size="small"
                        sx={{ position: 'absolute', top: 4, right: 4, color: favoritos.includes(card.key) ? theme.palette.warning.main : theme.palette.action.disabled }}
                        onClick={e => { e.stopPropagation(); toggleFavorito(card.key); }}
                        aria-label={favoritos.includes(card.key) ? tooltips.removerFavorito.pt : tooltips.adicionarFavorito.pt}
                        disabled={!favoritos.includes(card.key) && favoritos.length >= 3}
                      >
                        {favoritos.includes(card.key) ? <StarIcon /> : <StarBorderIcon />}
                      </IconButton>
                    </span>
                  </Tooltip>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
} 
