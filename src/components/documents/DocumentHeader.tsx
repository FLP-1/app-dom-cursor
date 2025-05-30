import React from 'react';
import Logo from '../common/Logo';
import { FaUserCircle, FaExchangeAlt } from 'react-icons/fa';

interface DocumentHeaderProps {
  onUploadClick: () => void;
}

const isMultiGroupUser = true; // TODO: integrar com contexto real
const userName = 'João da Silva';
const groupName = 'Família A';
const userRole = 'Empregador';

const DocumentHeader: React.FC<DocumentHeaderProps> = ({ onUploadClick }) => {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      padding: '16px 32px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      borderBottom: '1px solid #e0e0e0',
      position: 'sticky',
      top: 0,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Logo height={40} />
        <h2 style={{ margin: 0, fontWeight: 700, fontSize: 24, color: '#1c3a5b' }}>Gestão de Documentos</h2>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <button onClick={onUploadClick} style={{
          background: '#29ABE2',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '8px 20px',
          fontWeight: 600,
          fontSize: 16,
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(41,171,226,0.08)',
        }}>
          Novo Documento
        </button>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
          <FaUserCircle size={32} color="#1c3a5b" />
          {isMultiGroupUser && (
            <span title="Trocar grupo/papel" style={{
              background: '#29ABE2',
              color: '#fff',
              borderRadius: '50%',
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              position: 'absolute',
              right: -8,
              top: -4,
              cursor: 'pointer',
              boxShadow: '0 1px 4px rgba(41,171,226,0.15)',
            }}>
              <FaExchangeAlt size={10} />
            </span>
          )}
        </div>
      </div>
    </header>
  );
};

export default DocumentHeader; 