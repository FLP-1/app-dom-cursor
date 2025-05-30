
import { Paper, Typography, Box } from '@mui/material';
import React from 'react';

interface StatCardProps {
  title: string;
  value: number;
  color?: 'primary' | 'error' | 'text.secondary'; // Opcional, para variar a cor do título
}

const StatCard: React.FC<StatCardProps> = ({ title, value, color = 'primary' }) => {
  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: 140,
        justifyContent: 'space-between', // Adicionado para melhor espaçamento
      }}
    >
      <Typography component="h2" variant="h6" color={color} gutterBottom>
        {title}
      </Typography>
      <Typography component="p" variant="h4">
        {value}
      </Typography>
    </Paper>
  );
};

export default StatCard;