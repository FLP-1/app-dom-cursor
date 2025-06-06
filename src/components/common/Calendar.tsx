import React, { useState } from 'react';
import {
  Box,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
} from '@mui/icons-material';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  description?: string;
}

interface CalendarProps {
  events: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  onDateClick?: (date: Date) => void;
  onMonthChange?: (date: Date) => void;
}

type ViewType = 'day' | 'week' | 'month';

export const Calendar: React.FC<CalendarProps> = ({
  events,
  onEventClick,
  onDateClick,
  onMonthChange,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<ViewType>('month');

  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: ViewType | null
  ) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setCurrentDate(newDate);
    onMonthChange?.(newDate);
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(today);
    onMonthChange?.(today);
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    return (
      <Box>
        <Box display="grid" gridTemplateColumns="repeat(7, 1fr)" gap={1}>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((day) => (
            <Typography
              key={day}
              variant="subtitle2"
              align="center"
              sx={{ py: 1 }}
            >
              {day}
            </Typography>
          ))}
          {days.map((day) => {
            const dayEvents = events.filter(
              (event) =>
                format(event.start, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
            );

            return (
              <Paper
                key={day.toString()}
                sx={{
                  p: 1,
                  minHeight: 100,
                  bgcolor: isToday(day) ? 'action.hover' : 'background.paper',
                  opacity: isSameMonth(day, currentDate) ? 1 : 0.5,
                  cursor: 'pointer',
                }}
                onClick={() => onDateClick?.(day)}
              >
                <Typography variant="body2">
                  {format(day, 'd')}
                </Typography>
                {dayEvents.map((event) => (
                  <Tooltip
                    key={event.id}
                    title={`${event.title} - ${format(event.start, 'HH:mm')}`}
                  >
                    <Box
                      sx={{
                        bgcolor: event.color || 'primary.main',
                        color: 'white',
                        p: 0.5,
                        borderRadius: 1,
                        mb: 0.5,
                        fontSize: '0.75rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEventClick?.(event);
                      }}
                    >
                      {event.title}
                    </Box>
                  </Tooltip>
                ))}
              </Paper>
            );
          })}
        </Box>
      </Box>
    );
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton onClick={handlePreviousMonth}>
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6">
            {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
          </Typography>
          <IconButton onClick={handleNextMonth}>
            <ChevronRightIcon />
          </IconButton>
          <Tooltip title="Hoje">
            <IconButton onClick={handleToday}>
              <TodayIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={handleViewChange}
          size="small"
        >
          <ToggleButton value="day">Dia</ToggleButton>
          <ToggleButton value="week">Semana</ToggleButton>
          <ToggleButton value="month">Mês</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {view === 'month' && renderMonthView()}
      {/* Implementar outras visualizações (dia e semana) conforme necessário */}
    </Paper>
  );
}; 