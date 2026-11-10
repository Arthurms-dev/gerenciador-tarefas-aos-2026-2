import { z } from 'zod';
import tarefaService from '../services/tarefaService.js';

const tarefaSchema = z.object({
  descricao: z.string().min(1, "A descrição é obrigatória"),
  concluida: z.boolean().optional().default(false),
});

const criar = async (req, res) => {
  try {
    const dadosValidados = tarefaSchema.parse(req.body);
    const novaTarefa = await tarefaService.criarTarefa(dadosValidados);
    return res.status(201).json(novaTarefa);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ erro: error.errors });
    }
    return res.status(500).json({ erro: "Erro interno do servidor." });
  }
};

const listar = async (req, res) => {
  try {
    const tarefas = await tarefaService.listarTarefas();
    return res.status(200).json(tarefas);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar tarefas." });
  }
};

const buscarPorId = async (req, res) => {
  try {
    const { objectId } = req.params;
    const tarefa = await tarefaService.buscarTarefaPorId(objectId);
    
    if (!tarefa) return res.status(404).json({ erro: "Tarefa não encontrada." });
    
    return res.status(200).json(tarefa);
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao buscar a tarefa." });
  }
};

const atualizar = async (req, res) => {
  try {
    const { objectId } = req.params;
    const dadosValidados = tarefaSchema.partial().parse(req.body); 
    
    const tarefaAtualizada = await tarefaService.atualizarTarefa(objectId, dadosValidados);
    
    if (!tarefaAtualizada) return res.status(404).json({ erro: "Tarefa não encontrada." });
    
    return res.status(200).json(tarefaAtualizada);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ erro: error.errors });
    }
    return res.status(500).json({ erro: "Erro ao atualizar a tarefa." });
  }
};

const deletar = async (req, res) => {
  try {
    const { objectId } = req.params;
    const deletado = await tarefaService.deletarTarefa(objectId);
    
    if (!deletado) return res.status(404).json({ erro: "Tarefa não encontrada." });
    
    return res.status(200).json({ mensagem: "Tarefa deletada com sucesso." });
  } catch (error) {
    return res.status(500).json({ erro: "Erro ao deletar a tarefa." });
  }
};

export default { criar, listar, buscarPorId, atualizar, deletar };