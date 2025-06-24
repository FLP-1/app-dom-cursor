/**
 * Arquivo: LanguageSelector.tsx
 * Caminho: src/components/common/LanguageSelector.tsx
 * Criado em: 2025-01-27
 * Última atualização: 2025-01-27
 * Descrição: Componente para seleção de idioma da aplicação
 */

import React from 'react';
import { 
  IconButton, 
  Menu, 
  MenuItem, 
  ListItemIcon, 
  ListItemText,
  Tooltip,
  Box
} from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMessages } from '@/hooks/useMessages';
import { commonMessages } from '@/i18n/messages';

const LanguageSelector: React.FC = () => {
  const { messages } = useMessages(commonMessages);
  const { language, setLanguage } = useLanguage();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (newLanguage: 'pt' | 'en') => {
    setLanguage(newLanguage);
    handleClose();
  };

  const languages = [
    { code: 'pt', name: messages.language.portuguese, flag: '🇧🇷' },
    { code: 'en', name: messages.language.english, flag: '🇺🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <>
      <Tooltip title={messages.language.changeLanguage}>
        <IconButton
          onClick={handleClick}
          sx={{ color: 'inherit' }}
          aria-label={messages.language.selectLanguage}
        >
          <LanguageIcon />
        </IconButton>
      </Tooltip>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code as 'pt' | 'en')}
            selected={language === lang.code}
          >
            <ListItemIcon>
              <Box component="span" sx={{ fontSize: '1.2rem' }}>{lang.flag}</Box>
            </ListItemIcon>
            <ListItemText>{lang.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageSelector; 
