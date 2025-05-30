import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Container from '../components/layout/Container';
import Row from '../components/layout/Row';
import Col from '../components/layout/Col';
import Box from '../components/layout/Box';
import Flex from '../components/layout/Flex';
import Spacer from '../components/layout/Spacer';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Checkbox from '../components/common/Checkbox';
import HelperText from '../components/common/HelperText';
import Label from '../components/common/Label';
import { validateCPF } from '../utils/validators';
import { FaEye, FaEyeSlash, FaWhatsapp, FaInfoCircle, FaUserPlus } from 'react-icons/fa';
import InputMask from 'react-input-mask';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/700.css';

// ... restante do código igual ao login_old_validada.tsx ... 