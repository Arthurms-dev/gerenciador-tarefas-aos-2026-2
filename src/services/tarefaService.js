import models from '../models/index.js';

const criarTarefa = async (dados) => {
  return await models.Tarefa.create(dados);
};

const listarTarefas = async () => {
  return await models.Tarefa.findAll();
};

const buscarTarefaPorId = async (objectId) => {
  return await models.Tarefa.findByPk(objectId);
};

const atualizarTarefa = async (objectId, dados) => {
  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) return null;
  
  return await tarefa.update(dados);
};

const deletarTarefa = async (objectId) => {
  const tarefa = await models.Tarefa.findByPk(objectId);
  if (!tarefa) return null;
  
  await tarefa.destroy();
  return true;
};

export default {
  criarTarefa,
  listarTarefas,
  buscarTarefaPorId,
  atualizarTarefa,
  deletarTarefa
};