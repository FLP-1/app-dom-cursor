import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from '../../components/DataTable';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

// Mock do react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: {
      language: 'pt'
    }
  })
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
};

describe('DataTable', () => {
  const mockData = [
    { id: 1, nome: 'João', email: 'joao@email.com', idade: 25 },
    { id: 2, nome: 'Maria', email: 'maria@email.com', idade: 30 },
    { id: 3, nome: 'Pedro', email: 'pedro@email.com', idade: 35 }
  ];

  const mockColumns = [
    { field: 'nome', headerName: 'Nome', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'idade', headerName: 'Idade', width: 100 }
  ];

  const mockOnRowClick = jest.fn();
  const mockOnSelectionChange = jest.fn();
  const mockOnPageChange = jest.fn();
  const mockOnRowsPerPageChange = jest.fn();
  const mockOnSortChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar corretamente com props básicas', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Nome')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Idade')).toBeInTheDocument();
    expect(screen.getByText('João')).toBeInTheDocument();
    expect(screen.getByText('Maria')).toBeInTheDocument();
    expect(screen.getByText('Pedro')).toBeInTheDocument();
  });

  it('deve chamar onRowClick ao clicar em uma linha', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          onRowClick={mockOnRowClick}
        />
      </TestWrapper>
    );

    const row = screen.getByText('João').closest('tr');
    fireEvent.click(row!);

    expect(mockOnRowClick).toHaveBeenCalledWith(mockData[0]);
  });

  it('deve chamar onSelectionChange ao selecionar linhas', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          onSelectionChange={mockOnSelectionChange}
          checkboxSelection
        />
      </TestWrapper>
    );

    const checkbox = screen.getAllByRole('checkbox')[1]; // Primeira linha
    fireEvent.click(checkbox);

    expect(mockOnSelectionChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it('deve chamar onPageChange ao mudar de página', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          onPageChange={mockOnPageChange}
          pageSize={2}
        />
      </TestWrapper>
    );

    const nextPageButton = screen.getByRole('button', { name: /próxima página/i });
    fireEvent.click(nextPageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  it('deve chamar onRowsPerPageChange ao alterar linhas por página', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          onRowsPerPageChange={mockOnRowsPerPageChange}
        />
      </TestWrapper>
    );

    const select = screen.getByRole('button', { name: /linhas por página/i });
    fireEvent.mouseDown(select);

    const option = screen.getByText('25');
    fireEvent.click(option);

    expect(mockOnRowsPerPageChange).toHaveBeenCalledWith(25);
  });

  it('deve chamar onSortChange ao ordenar coluna', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          onSortChange={mockOnSortChange}
        />
      </TestWrapper>
    );

    const header = screen.getByText('Nome');
    fireEvent.click(header);

    expect(mockOnSortChange).toHaveBeenCalledWith('nome', 'asc');
  });

  it('deve renderizar com densidade personalizada', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          density="compact"
        />
      </TestWrapper>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('MuiTable-sizeSmall');
  });

  it('deve renderizar com variante personalizada', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          variant="outlined"
        />
      </TestWrapper>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveClass('MuiTable-root');
  });

  it('deve renderizar com loading', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          loading
        />
      </TestWrapper>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('deve renderizar com mensagem de erro', () => {
    const errorMessage = 'Erro ao carregar dados';
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          error={errorMessage}
        />
      </TestWrapper>
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('deve renderizar com mensagem de dados vazios', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={[]}
          columns={mockColumns}
          noDataMessage="Nenhum dado encontrado"
        />
      </TestWrapper>
    );

    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument();
  });

  it('deve renderizar com ações personalizadas', () => {
    const actions = [
      {
        icon: <span>Editar</span>,
        onClick: jest.fn()
      },
      {
        icon: <span>Excluir</span>,
        onClick: jest.fn()
      }
    ];

    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          actions={actions}
        />
      </TestWrapper>
    );

    expect(screen.getByText('Editar')).toBeInTheDocument();
    expect(screen.getByText('Excluir')).toBeInTheDocument();
  });

  it('deve renderizar com filtros personalizados', () => {
    const filters = [
      {
        field: 'nome',
        label: 'Nome',
        type: 'text'
      },
      {
        field: 'idade',
        label: 'Idade',
        type: 'number'
      }
    ];

    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          filters={filters}
        />
      </TestWrapper>
    );

    expect(screen.getByLabelText('Nome')).toBeInTheDocument();
    expect(screen.getByLabelText('Idade')).toBeInTheDocument();
  });

  it('deve renderizar com paginação personalizada', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          pagination={{
            pageSize: 5,
            pageSizeOptions: [5, 10, 25],
            showFirstButton: true,
            showLastButton: true
          }}
        />
      </TestWrapper>
    );

    expect(screen.getByRole('button', { name: /primeira página/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /última página/i })).toBeInTheDocument();
  });

  it('deve renderizar com seleção personalizada', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          selection={{
            type: 'radio',
            onSelectionChange: mockOnSelectionChange
          }}
        />
      </TestWrapper>
    );

    const radio = screen.getAllByRole('radio')[0];
    fireEvent.click(radio);

    expect(mockOnSelectionChange).toHaveBeenCalledWith([mockData[0]]);
  });

  it('deve renderizar com ordenação personalizada', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          sorting={{
            defaultSort: { field: 'nome', direction: 'desc' },
            onSortChange: mockOnSortChange
          }}
        />
      </TestWrapper>
    );

    const header = screen.getByText('Nome');
    expect(header).toHaveAttribute('aria-sort', 'descending');
  });

  it('deve renderizar com classes personalizadas', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          className="custom-table"
        />
      </TestWrapper>
    );

    expect(screen.getByRole('table')).toHaveClass('custom-table');
  });

  it('deve renderizar com estilos personalizados', () => {
    render(
      <TestWrapper>
        <DataTable
          rows={mockData}
          columns={mockColumns}
          style={{ backgroundColor: 'red' }}
        />
      </TestWrapper>
    );

    const table = screen.getByRole('table');
    expect(table).toHaveStyle({ backgroundColor: 'red' });
  });
}); 