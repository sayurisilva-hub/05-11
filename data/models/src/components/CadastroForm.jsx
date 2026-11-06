import { useState } from 'react';

export function CadastroForm({ onSucesso }) {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [enviando, setEnviando] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setEnviando(true);

        try {
            const res = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email }),
            });

            if (!res.ok) throw new Error('Erro ao cadastrar');

          
            setNome('');
            setEmail('');
            
           
            onSucesso(); 
        } catch (err) {
            alert(err.message);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <input 
                type="text" 
                placeholder="Nome" 
                value={nome} 
                onChange={e => setNome(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="E-mail" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />
            <button type="submit" disabled={enviando}>
                {enviando ? 'Salvando...' : 'Cadastrar'}
            </button>
        </form>
    );
}
