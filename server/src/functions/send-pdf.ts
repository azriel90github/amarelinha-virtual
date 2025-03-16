import type { FastifyPluginAsync } from 'fastify';
import fs from 'fs';
import path from 'path';

// Configuração do 360Dialog
const WHATSAPP_API_URL = 'https://waba.360dialog.io/v1/messages';
const WHATSAPP_TOKEN = 'SEU_TOKEN_DO_360DIALOG'; // Substitua pelo seu token
const HAMBURGUERIA_WHATSAPP_NUMBER = '932101903'; // Número fixo da hamburgueria

export const sendPdfToWhatsApp: FastifyPluginAsync = async (app) => {
  app.post('/send-pdf', async (request, reply) => {
    try {
      const { pdfBase64 } = request.body as { pdfBase64: string };

      if (!pdfBase64) {
        return reply.status(400).send({ error: 'O PDF é obrigatório' });
      }

      // Converter Base64 para Buffer
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      // Criar arquivo temporário
      const filePath = path.join(__dirname, 'temp.pdf');
      fs.writeFileSync(filePath, pdfBuffer);

      // Enviar o PDF via Fastify HTTP Client
      const response = await app.inject({
        method: 'POST',
        url: WHATSAPP_API_URL,
        headers: {
          'Content-Type': 'application/json',
          'D360-API-KEY': WHATSAPP_TOKEN
        },
        payload: {
          messaging_product: 'whatsapp',
          recipient_type: 'individual',
          to: HAMBURGUERIA_WHATSAPP_NUMBER,
          type: 'document',
          document: {
            filename: 'Fatura.pdf', // Nome do arquivo
            mime_type: 'application/pdf', // Tipo do arquivo
            data: pdfBase64 // O próprio PDF, sem precisar de link externo
          }
        }
      });

      console.log('📩 PDF enviado com sucesso!', response.json());
      fs.unlinkSync(filePath);

      reply.send({ message: `PDF enviado para ${HAMBURGUERIA_WHATSAPP_NUMBER}!` });
    } catch (error) {
      console.error('Erro ao enviar o PDF:', error);
      reply.status(500).send({ error: 'Erro ao enviar o PDF' });
    }
  });
};

