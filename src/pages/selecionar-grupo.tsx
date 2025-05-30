import { useEffect, useState } from 'react';
import axios from 'axios';

export default function SelecionarGrupo() {
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState('');

  useEffect(() => {
    async function fetchGrupos() {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('/api/meus-grupos', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setGrupos(data);
      } catch (e) {
        setErro('Erro ao buscar grupos. Faça login novamente.');
      } finally {
        setLoading(false);
      }
    }
    fetchGrupos();
  }, []);

  const selecionarGrupo = (grupo) => {
    localStorage.setItem('grupoSelecionado', JSON.stringify(grupo));
    window.location.href = '/dashboard';
  };

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div style={{ color: 'red' }}>{erro}</div>;

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, border: '1px solid #ccc', borderRadius: 8 }}>
      <h2>Selecione o grupo que deseja acessar</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {grupos.map(grupo => (
          <li key={grupo.id} style={{ marginBottom: 16 }}>
            <button style={{ width: '100%', padding: 12, borderRadius: 6, border: '1px solid #1976d2', background: '#1976d2', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => selecionarGrupo(grupo)}>
              {grupo.name} (Papel: {grupo.role})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
} 