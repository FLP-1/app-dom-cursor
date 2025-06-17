/**
 * Arquivo: DataTable.tsx
 * Caminho: src/components/common/DataTable.tsx
 * Criado em: 2025-06-07
 * Última atualização: 2025-06-07
 * Descrição: Componente de tabela de dados reutilizável com suporte a formatação, alinhamento e interatividade
 */

import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { SxProps, Theme } from '@mui/material';

interface Column<T> {
  id: keyof T;
  label: string;
  minWidth?: number;
  align?: 'right' | 'left' | 'center';
  format?: (value: T[keyof T]) => string | number;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  onRowClick?: (row: T) => void;
  sx?: SxProps<Theme>;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  rows, 
  onRowClick,
  sx 
}: DataTableProps<T>) {
  return (
    <TableContainer component={Paper} sx={sx}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={String(column.id)}
                align={column.align}
                sx={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rows ?? []).map((row) => (
            <TableRow
              hover
              onClick={() => onRowClick?.(row)}
              key={row.id}
              sx={{ 
                cursor: onRowClick ? 'pointer' : 'default',
                '&:last-child td, &:last-child th': { border: 0 }
              }}
            >
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell 
                    key={String(column.id)} 
                    align={column.align}
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {column.format ? column.format(value) : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
} 
