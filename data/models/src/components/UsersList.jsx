import { useEffect, useState } from 'react';

export function UsersList({ atualizarGatilho }) {
    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        async function carregar() {
            try {
               
                setErro(null); 
                const res = await fetch('http://localhost:3000/users');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const json = await res.json();
                setUsuarios(json.data ?? json);
            } catch (e) {
                setErro('Falha ao carregar usuários');
            } finally {
                setCarregando(false);
            }
        }
        carregar();
    }, [atualizarGatilho]); 

    if (carregando) return <p>carregando...</p>;
    if (erro) return <p style={{ color: 'red' }}>{erro}</p>;

    return (
        <ul>
            {usuarios.map(u => (
                <li key={u.id}>{u.nome} ({u.email})</li>
            ))}
        </ul>
    );
}
