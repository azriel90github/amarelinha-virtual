import fastify from 'fastify';
import cors from '@fastify/cors';
import { createSendOrder } from './routes/create-order';
import { getProducts } from './routes/create-menu';
import { sendPdfToEmail } from '../functions/send-pdf'; // 🔹 Nova função para enviar PDF pelo Twilio
import "dotenv/config"; // Importa as variáveis de ambiente antes de tudo


const app = fastify({ logger: true });

async function startServer() {
  try {
    // Habilita CORS para o frontend
    await app.register(cors, {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
    });

    // 🔹 Registra as rotas
    app.register(createSendOrder);
    app.register(getProducts);
    app.register(sendPdfToEmail); // 🔹 Adiciona a função de envio de PDF

    // Hook para log de requisições
    app.addHook('onRequest', async (request, reply) => {
      app.log.info(`🔹 Requisição recebida: ${request.method} ${request.url}`);
    });

    // Tratamento de erros globais
    app.setErrorHandler((error, request, reply) => {
      app.log.error('🔥 Erro interno do servidor:', error);
      reply.status(500).send({ error: 'Erro interno do servidor', details: error.message });
    });

    // Inicia o servidor
    await app.listen({ host: '0.0.0.0', port: 3334 });
    app.log.info('🚀 Servidor rodando na porta 3334!');
  } catch (err) {
    app.log.error('❌ Falha ao iniciar o servidor:', err);
    process.exit(1);
  }
}

startServer();
