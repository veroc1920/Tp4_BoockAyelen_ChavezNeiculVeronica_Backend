import 'dotenv/config';
import express, { json } from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ ok: true, data: 'API Distribuidora funcionando' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));