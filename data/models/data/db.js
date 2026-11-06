import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export async function conectar() {
    await client.connect();
    const db = client.db('ptas3');
    await db.command({ ping: 1 }); 
    return db;
}
