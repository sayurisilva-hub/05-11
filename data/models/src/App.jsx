import { useState } from 'react';
import { CadastroForm } from './components/CadastroForm';
import { UsersList } from './components/UsersList';

function App() {
    const [atualizarGatilho, setAtualizarGatilho] = useState(0);

   
    const forcarAtualizacao = () => setAtualizarGatilho(prev => prev + 1);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Cadastro de Usuários</h1>
            <CadastroForm onSucesso={forcarAtualizacao} />
            <h2>Lista de Usuários</h2>
            <UsersList atualizarGatilho={atualizarGatilho} />
        </div>
    );
}

export default App;
