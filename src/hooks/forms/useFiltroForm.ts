  try {
    // ... existing code ...
  } catch (err: unknown) {
    if (err instanceof Error) {
      notificationService.error(err.message || 'Erro ao filtrar');
    } else {
      notificationService.error('Erro ao filtrar');
    }
  } 