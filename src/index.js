import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import tarefaRoutes from './routes/tarefa.js';

const app = express();

app.use(cors());
app.use(express.json()); 

app.use('/tarefas', tarefaRoutes);

export default app;

if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
}