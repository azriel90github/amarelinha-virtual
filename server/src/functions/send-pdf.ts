import type { FastifyPluginAsync } from 'fastify';
import Twilio from 'twilio';

// Configuração Twilio
const TWILIO_ACCOUNT_SID = 'SEU_TWILIO_SID'; // Pegue no Twilio
const TWILIO_AUTH_TOKEN = 'SEU_TWILIO_AUTH_TOKEN'; // Pegue no Twilio
const HAMBURGUERIA_WHATSAPP_NUMBER = 'whatsapp:+244XXXXXXXXX'; // Número fixo da empresa
const TWILIO_WHATSAPP_NUMBER = 'whatsapp:+14155238886'; // Número do Twilio (fixo)

const client = Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

export const sendPdfToWhatsApp: FastifyPluginAsync = async (app) => {
  app.post('/send-pdf', async (request, reply) => {
    try {
      const { pdfBase64 } = request.body as { pdfBase64: string };

      if (!pdfBase64) {
        return reply.status(400).send({ error: 'O PDF é obrigatório' });
      }

      console.log(`📤 Enviando PDF para a hamburgueria: ${HAMBURGUERIA_WHATSAPP_NUMBER} via WhatsApp...`);

      // Enviar o PDF via Twilio
      const message = await client.messages.create({
        from: TWILIO_WHATSAPP_NUMBER,
        to: HAMBURGUERIA_WHATSAPP_NUMBER, // Sempre envia para o número fixo da empresa
        mediaUrl: `data:application/pdf;base64,${pdfBase64}`, // Envia o PDF diretamente
        body: 'Aqui está a fatura do pedido. Obrigado! 🍔'
      });

      console.log('📩 PDF enviado com sucesso!', message.sid);

      reply.send({ message: `PDF enviado para ${HAMBURGUERIA_WHATSAPP_NUMBER}!` });
    } catch (error) {
      console.error('❌ Erro ao enviar o PDF:', error);
      reply.status(500).send({ error: 'Erro ao enviar o PDF' });
    }
  });
};


