import { renderHook } from '@testing-library/react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

describe('useMediaQuery', () => {
  const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn()
      }))
    });
  };

  beforeEach(() => {
    mockMatchMedia(false);
  });

  it('deve retornar false quando a media query não corresponde', () => {
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(false);
  });

  it('deve retornar true quando a media query corresponde', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query inválida', () => {
    const { result } = renderHook(() => useMediaQuery('invalid query'));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query undefined', () => {
    const { result } = renderHook(() => useMediaQuery(undefined));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query null', () => {
    const { result } = renderHook(() => useMediaQuery(null));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query vazia', () => {
    const { result } = renderHook(() => useMediaQuery(''));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query com espaços', () => {
    const { result } = renderHook(() => useMediaQuery('   '));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query com caracteres especiais', () => {
    const { result } = renderHook(() => useMediaQuery('!@#$%^&*()'));
    expect(result.current).toBe(false);
  });

  it('deve lidar com media query com múltiplas condições', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px) and (max-width: 1024px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com operadores lógicos', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 768px) or (orientation: landscape)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com not', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('not (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com only', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('only screen and (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com print', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('print and (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com speech', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('speech and (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com all', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('all and (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com screen', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('screen and (min-width: 768px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com orientation', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(orientation: portrait)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com aspect-ratio', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(aspect-ratio: 16/9)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com device-aspect-ratio', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(device-aspect-ratio: 16/9)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com color', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(color)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com color-index', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(color-index: 256)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com monochrome', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(monochrome)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com resolution', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(resolution: 300dpi)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com scan', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(scan: progressive)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com grid', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(grid)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com update', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(update: fast)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com overflow-block', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(overflow-block: scroll)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com overflow-inline', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(overflow-inline: scroll)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com color-gamut', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(color-gamut: srgb)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com dynamic-range', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(dynamic-range: high)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com video-color-gamut', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(video-color-gamut: srgb)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com video-dynamic-range', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(video-dynamic-range: high)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com forced-colors', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(forced-colors: active)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com inverted-colors', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(inverted-colors: inverted)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com nav-controls', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(nav-controls: back)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com prefers-color-scheme', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(prefers-color-scheme: dark)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com prefers-contrast', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(prefers-contrast: high)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com prefers-reduced-motion', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-motion: reduce)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com prefers-reduced-transparency', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(prefers-reduced-transparency: reduce)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com scripting', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(scripting: enabled)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com horizontal-viewport-segments', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(horizontal-viewport-segments: 2)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com vertical-viewport-segments', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(vertical-viewport-segments: 2)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com device-height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(device-height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com device-width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(device-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com max-device-height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-device-height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com max-device-width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-device-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com max-height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com max-width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(max-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com min-device-height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-device-height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com min-device-width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-device-width: 600px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com min-height', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-height: 800px)'));
    expect(result.current).toBe(true);
  });

  it('deve lidar com media query com min-width', () => {
    mockMatchMedia(true);
    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));
    expect(result.current).toBe(true);
  });
}); 