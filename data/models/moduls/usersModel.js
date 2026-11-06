import { conectar } from '../data/db.js';
import { ObjectId } from 'mongodb'; 

export async function listar() {
    const db = await conectar();
    const docs = await db.collection('users').find().toArray();
    return docs.map(u => ({ ...u, id: String(u._id) }));
}

export async function criar(dados) {
    const db = await conectar();
    const res = await db.collection('users').insertOne(dados);
    return { ...dados, id: String(res.insertedId) };
}

export async function atualizar(id, dadosNovos) {
    const db = await conectar();
    await db.collection('users').updateOne(
        { _id: new ObjectId(id) },
        { $set: dadosNovos }
    );
    return { id, ...dadosNovos };
}

export async function remover(id) {
    const db = await conectar();
    const res = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return { deletado: res.deletedCount > 0 };
}
