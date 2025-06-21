/**
 * Arquivo: menu.ts
 * Caminho: src/config/menu.ts
 * Criado em: 2025-06-03
 * Última atualização: 2025-06-13
 * Descrição: /*
 */

import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import WorkIcon from '@mui/icons-material/Work';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import BarChartIcon from '@mui/icons-material/BarChart';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonIcon from '@mui/icons-material/Person';

export const menuItems = [
  {
    label: 'Dashboard',
    icon: DashboardIcon,
    path: '/dashboard',
    permission: 'dashboard:view',
  },
  {
    label: 'Alertas',
    icon: NotificationsIcon,
    path: '/alerts',
    permission: 'alerts:view',
  },
  {
    label: 'Empregados',
    icon: PeopleIcon,
    path: '/empregados-domesticos',
    permission: 'empregados:view',
  },
  {
    label: 'eSocial',
    icon: WorkIcon,
    path: '/esocial/eventos',
    permission: 'esocial:view',
  },
  {
    label: 'Financeiro',
    icon: ReceiptIcon,
    path: '/operacoes-financeiras',
    permission: 'financeiro:view',
  },
  {
    label: 'Compras',
    icon: ShoppingCartIcon,
    path: '/compras',
    permission: 'compras:view',
  },
  {
    label: 'Tarefas',
    icon: AssignmentIcon,
    path: '/tarefas',
    permission: 'tarefas:view',
  },
  {
    label: 'Ponto',
    icon: AccessTimeIcon,
    path: '/ponto',
    permission: 'ponto:view',
  },
  {
    label: 'Documentos',
    icon: DescriptionIcon,
    path: '/documentos',
    permission: 'documentos:view',
  },
  {
    label: 'Relatórios',
    icon: BarChartIcon,
    path: '/relatorios',
    permission: 'relatorios:view',
  },
  {
    label: 'Backup',
    icon: CloudUploadIcon,
    path: '/backup',
    permission: 'backup:view',
  },
  {
    label: 'Usuários',
    icon: GroupIcon,
    path: '/usuarios',
    permission: 'usuarios:view',
  },
  {
    label: 'Parceiros',
    icon: BusinessIcon,
    path: '/parceiros',
    permission: 'parceiros:view',
  },
  {
    label: 'Planos',
    icon: CreditCardIcon,
    path: '/planos',
    permission: 'planos:view',
  },
  {
    label: 'Perfil',
    icon: PersonIcon,
    path: '/perfil',
    permission: 'perfil:view',
  },
  {
    label: 'Configurações',
    icon: SettingsIcon,
    path: '/configuracoes',
    permission: 'config:view',
  },
  {
    label: 'Familiar',
    icon: PeopleIcon,
    path: '/familiar',
    permission: 'familiar:view',
  },
  {
    label: 'Empregador',
    icon: BusinessIcon,
    path: '/empregador',
    permission: 'empregador:view',
  },
  {
    label: 'Empregado',
    icon: PeopleIcon,
    path: '/empregado',
    permission: 'empregado:view',
  },
  {
    label: 'Parceiro',
    icon: GroupIcon,
    path: '/parceiro',
    permission: 'parceiro:view',
  },
]; 
