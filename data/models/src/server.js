import express from 'express';
import cors from 'cors';
import * as usersModel from './models/usersModel.js';

const app = express();

app.use(cors());
app.use(express.json());


app.get('/users', async (req, res) => {
    try {
        const dados = await usersModel.listar();
        res.json({ data: dados });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.post('/users', async (req, res) => {
    try {
        const novoUser = await usersModel.criar(req.body);
        res.status(201).json(novoUser);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.put('/users/:id', async (req, res) => {
    try {
        const atualizado = await usersModel.atualizar(req.params.id, req.body);
        res.json(atualizado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

app.delete('/users/:id', async (req, res) => {
    try {
        const resultado = await usersModel.remover(req.params.id);
        res.json(resultado);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Back-end rodando na porta ${PORT}`));
