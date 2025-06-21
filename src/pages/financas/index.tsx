/**
 * Arquivo: index.tsx
 * Caminho: src/pages/financas/index.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Página de finanças principal do sistema, conectada à API via useFinanceData.
 */

import React, { useState } from 'react';
import { 
  Grid, Card, CardContent, Typography, Box, 
  IconButton, Avatar, Chip, LinearProgress, Skeleton,
  Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, FormControl, InputLabel, Select, MenuItem,
  List, ListItem, ListItemText, ListItemIcon, ListItemSecondaryAction,
  Divider
} from '@mui/material';
import {
  AccountBalance, Add, TrendingUp, TrendingDown, 
  ShoppingCart, Home, LocalHospital, DirectionsCar,
  Restaurant, Entertainment, School, Work,
  Delete, Edit, MoreVert, CalendarToday, Payment
} from '@mui/icons-material';
import { useFinanceData } from '@/hooks/useFinanceData';

const Financas = () => {
  const { data, isLoading, isError, addTransaction, updateTransaction, deleteTransaction } = useFinanceData();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null);

  if (isLoading) {
    return (
      <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
        <Skeleton variant="text" width={250} height={60} />
        <Skeleton variant="text" width={200} height={30} />
        <Grid container spacing={3} mt={2}>
          <Grid item xs={12} md={8}>
            <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 3 }} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3, mb: 2 }} />
            <Skeleton variant="rectangular" height={200} sx={{ borderRadius: 3 }} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  if (isError) {
    return (
      <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography color="error">Falha ao carregar os dados financeiros.</Typography>
      </Box>
    );
  }

  const { transactions, budgets, recentTransactions, monthlyStats, categoryStats, upcomingPayments } = data;

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'alimentação':
      case 'restaurante':
        return <Restaurant />;
      case 'transporte':
      case 'combustível':
        return <DirectionsCar />;
      case 'saúde':
      case 'médico':
        return <LocalHospital />;
      case 'moradia':
      case 'aluguel':
        return <Home />;
      case 'lazer':
      case 'entretenimento':
        return <Entertainment />;
      case 'educação':
      case 'escola':
        return <School />;
      case 'trabalho':
      case 'salário':
        return <Work />;
      case 'compras':
        return <ShoppingCart />;
      default:
        return <AccountBalance />;
    }
  };

  const getCategoryColor = (category: string) => {
    const stat = categoryStats.find(s => s.category.toLowerCase() === category.toLowerCase());
    return stat ? stat.color : '#757575';
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'cash': return <Payment />;
      case 'card': return <Payment />;
      case 'transfer': return <Payment />;
      case 'pix': return <Payment />;
      default: return <Payment />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleAddTransaction = () => {
    setSelectedTransaction(null);
    setOpenDialog(true);
  };

  const handleEditTransaction = (transaction: any) => {
    setSelectedTransaction(transaction);
    setOpenDialog(true);
  };

  const handleSaveTransaction = async (transactionData: any) => {
    try {
      if (selectedTransaction) {
        await updateTransaction(selectedTransaction.id, transactionData);
      } else {
        await addTransaction(transactionData);
      }
      setOpenDialog(false);
    } catch (error) {
      console.error('Erro ao salvar transação:', error);
    }
  };

  return (
    <Box sx={{ p: 3, background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Finanças 💰
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie suas receitas, despesas e orçamentos
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleAddTransaction}
          sx={{ borderRadius: 2 }}
        >
          Nova Transação
        </Button>
      </Box>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#4CAF50', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#4CAF50">
                    {formatCurrency(monthlyStats.income)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Receitas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#F44336', width: 48, height: 48 }}>
                  <TrendingDown />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#F44336">
                    {formatCurrency(monthlyStats.expenses)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Despesas
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#2196F3', width: 48, height: 48 }}>
                  <AccountBalance />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#2196F3">
                    {formatCurrency(monthlyStats.balance)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Saldo
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar sx={{ background: '#FF9800', width: 48, height: 48 }}>
                  <TrendingUp />
                </Avatar>
                <Box>
                  <Typography variant="h6" fontWeight="bold" color="#FF9800">
                    {formatCurrency(monthlyStats.savings)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Poupança
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Transações Recentes */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Transações Recentes
              </Typography>
              
              <List>
                {recentTransactions.map((transaction) => (
                  <ListItem
                    key={transaction.id}
                    sx={{
                      border: '1px solid #e0e0e0',
                      borderRadius: 2,
                      mb: 2,
                      background: 'white',
                      '&:hover': {
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transform: 'translateY(-1px)'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    <ListItemIcon>
                      <Avatar sx={{ 
                        background: getCategoryColor(transaction.category), 
                        width: 40, 
                        height: 40 
                      }}>
                        {getCategoryIcon(transaction.category)}
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box display="flex" alignItems="center" gap={1}>
                          <Typography variant="body1" fontWeight="medium">
                            {transaction.description}
                          </Typography>
                          <Chip
                            label={transaction.type === 'income' ? 'Receita' : 'Despesa'}
                            size="small"
                            sx={{
                              background: transaction.type === 'income' ? '#4CAF50' : '#F44336',
                              color: 'white',
                              textTransform: 'capitalize'
                            }}
                          />
                          <Chip
                            label={transaction.status}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: transaction.status === 'completed' ? '#4CAF50' : '#FF9800',
                              color: transaction.status === 'completed' ? '#4CAF50' : '#FF9800',
                              textTransform: 'capitalize'
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Box display="flex" alignItems="center" gap={2} mt={1}>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              <CalendarToday sx={{ fontSize: 16, color: 'text.secondary' }} />
                              <Typography variant="body2" color="text.secondary">
                                {transaction.date}
                              </Typography>
                            </Box>
                            <Box display="flex" alignItems="center" gap={0.5}>
                              {getPaymentMethodIcon(transaction.paymentMethod)}
                              <Typography variant="body2" color="text.secondary">
                                {transaction.paymentMethod}
                              </Typography>
                            </Box>
                          </Box>
                          <Box display="flex" gap={0.5} mt={1}>
                            {transaction.tags.map((tag, index) => (
                              <Chip
                                key={index}
                                label={tag}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Typography variant="h6" fontWeight="bold" color={transaction.type === 'income' ? '#4CAF50' : '#F44336'}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Orçamentos */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Orçamentos
              </Typography>
              {budgets.map((budget) => {
                const percentage = (budget.spent / budget.limit) * 100;
                return (
                  <Box key={budget.id} mb={2}>
                    <Box display="flex" justifyContent="space-between" mb={1}>
                      <Typography variant="body2" fontWeight="medium">
                        {budget.category}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatCurrency(budget.spent)} / {formatCurrency(budget.limit)}
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={Math.min(percentage, 100)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: '#f0f0f0',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 4,
                          background: percentage > 90 ? '#F44336' : percentage > 70 ? '#FF9800' : '#4CAF50'
                        }
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" mt={0.5}>
                      {percentage.toFixed(1)}% utilizado
                    </Typography>
                  </Box>
                );
              })}
            </CardContent>
          </Card>

          {/* Pagamentos Pendentes */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Pagamentos Pendentes
              </Typography>
              {upcomingPayments.map((payment) => (
                <Box key={payment.id} display="flex" alignItems="center" py={1}>
                  <Avatar sx={{ 
                    background: getCategoryColor(payment.category), 
                    mr: 2, 
                    width: 32, 
                    height: 32 
                  }}>
                    {getCategoryIcon(payment.category)}
                  </Avatar>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {payment.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {payment.date}
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold" color="#F44336">
                    {formatCurrency(payment.amount)}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Categorias */}
          <Card sx={{ borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={2}>
                Gastos por Categoria
              </Typography>
              {categoryStats.map((stat) => (
                <Box key={stat.category} display="flex" alignItems="center" py={1}>
                  <Box
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      background: stat.color,
                      mr: 2
                    }}
                  />
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight="medium">
                      {stat.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {stat.percentage}%
                    </Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="bold">
                    {formatCurrency(stat.amount)}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Dialog para adicionar/editar transação */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedTransaction ? 'Editar Transação' : 'Nova Transação'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição"
                  defaultValue={selectedTransaction?.description || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    defaultValue={selectedTransaction?.type || 'expense'}
                    label="Tipo"
                  >
                    <MenuItem value="income">Receita</MenuItem>
                    <MenuItem value="expense">Despesa</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Valor"
                  type="number"
                  defaultValue={selectedTransaction?.amount || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Categoria"
                  defaultValue={selectedTransaction?.category || ''}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Data"
                  type="date"
                  defaultValue={selectedTransaction?.date || ''}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Método de Pagamento</InputLabel>
                  <Select
                    defaultValue={selectedTransaction?.paymentMethod || 'pix'}
                    label="Método de Pagamento"
                  >
                    <MenuItem value="cash">Dinheiro</MenuItem>
                    <MenuItem value="card">Cartão</MenuItem>
                    <MenuItem value="transfer">Transferência</MenuItem>
                    <MenuItem value="pix">PIX</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button 
            variant="contained" 
            onClick={() => handleSaveTransaction({})}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Financas;
