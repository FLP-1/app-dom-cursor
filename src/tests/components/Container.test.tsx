import { render, screen } from '@testing-library/react';
import { Container } from '@/components/Container';
import { useTranslation } from 'next-i18next';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('Container', () => {
  it('should render title and children', () => {
    render(
      <Container title="Título">
        <div>Conteúdo</div>
      </Container>,
    );

    expect(screen.getByText('Título')).toBeInTheDocument();
    expect(screen.getByText('Conteúdo')).toBeInTheDocument();
  });

  it('should render with custom maxWidth', () => {
    render(
      <Container title="Título" maxWidth="sm">
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ maxWidth: '600px' });
  });

  it('should render with custom padding', () => {
    render(
      <Container title="Título" padding={4}>
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ padding: '32px' });
  });

  it('should render with custom background color', () => {
    render(
      <Container title="Título" bgcolor="primary.main">
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ backgroundColor: 'rgb(25, 118, 210)' });
  });

  it('should render with custom border radius', () => {
    render(
      <Container title="Título" borderRadius={2}>
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ borderRadius: '16px' });
  });

  it('should render with custom box shadow', () => {
    render(
      <Container title="Título" boxShadow={3}>
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({
      boxShadow: '0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)',
    });
  });

  it('should render with custom margin', () => {
    render(
      <Container title="Título" margin={2}>
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ margin: '16px' });
  });

  it('should render with custom height', () => {
    render(
      <Container title="Título" height="100vh">
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ height: '100vh' });
  });

  it('should render with custom overflow', () => {
    render(
      <Container title="Título" overflow="auto">
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ overflow: 'auto' });
  });

  it('should render with custom position', () => {
    render(
      <Container title="Título" position="relative">
        <div>Conteúdo</div>
      </Container>,
    );

    const container = screen.getByRole('main');
    expect(container).toHaveStyle({ position: 'relative' });
  });
}); 