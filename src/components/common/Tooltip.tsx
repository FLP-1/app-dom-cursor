import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import { FaInfoCircle } from 'react-icons/fa';

interface TooltipProps {
  text: string;
  icon?: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  maxWidth?: number;
}

const TooltipIcon = styled.span({
  marginLeft: 6,
  color: '#888',
  cursor: 'pointer',
  position: 'relative',
  display: 'inline-block',
});

const TooltipText = styled.span<{ position: TooltipProps['position']; maxWidth: number }>(
  ({ theme, position = 'top', maxWidth }) => ({
    visibility: 'hidden',
    width: maxWidth,
    backgroundColor: '#333',
    color: '#fff',
    textAlign: 'center',
    borderRadius: 6,
    padding: '8px',
    position: 'absolute',
    zIndex: 1,
    opacity: 0,
    transition: 'opacity 0.3s',
    fontSize: theme.typography.body2.fontSize,
    pointerEvents: 'none',
    ...getPositionStyles(position, maxWidth),
    '::after': {
      content: '""',
      position: 'absolute',
      borderWidth: '5px',
      borderStyle: 'solid',
      ...getArrowStyles(position),
    },
  })
);

const getPositionStyles = (position: TooltipProps['position'], maxWidth: number) => {
  switch (position) {
    case 'bottom':
      return {
        top: '125%',
        left: '50%',
        marginLeft: `-${maxWidth / 2}px`,
      };
    case 'left':
      return {
        top: '50%',
        right: '125%',
        transform: 'translateY(-50%)',
      };
    case 'right':
      return {
        top: '50%',
        left: '125%',
        transform: 'translateY(-50%)',
      };
    default: // top
      return {
        bottom: '125%',
        left: '50%',
        marginLeft: `-${maxWidth / 2}px`,
      };
  }
};

const getArrowStyles = (position: TooltipProps['position']) => {
  switch (position) {
    case 'bottom':
      return {
        top: '-10px',
        left: '50%',
        marginLeft: '-5px',
        borderColor: 'transparent transparent #333 transparent',
      };
    case 'left':
      return {
        top: '50%',
        right: '-10px',
        transform: 'translateY(-50%)',
        borderColor: 'transparent transparent transparent #333',
      };
    case 'right':
      return {
        top: '50%',
        left: '-10px',
        transform: 'translateY(-50%)',
        borderColor: 'transparent #333 transparent transparent',
      };
    default: // top
      return {
        bottom: '-10px',
        left: '50%',
        marginLeft: '-5px',
        borderColor: '#333 transparent transparent transparent',
      };
  }
};

const Tooltip: React.FC<TooltipProps> = ({ text, icon = <FaInfoCircle />, position = 'top', maxWidth = 220 }) => (
  <TooltipIcon tabIndex={0} aria-label={text}>
    {icon}
    <TooltipText className="tooltip-text" position={position} maxWidth={maxWidth}>
      {text}
    </TooltipText>
    <style>{`
      span[tabindex]:focus .tooltip-text, span[tabindex]:hover .tooltip-text {
        visibility: visible;
        opacity: 1;
      }
    `}</style>
  </TooltipIcon>
);

export default Tooltip; 