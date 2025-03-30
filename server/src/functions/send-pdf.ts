import type { FastifyPluginAsync } from 'fastify';
import { Dropbox } from 'dropbox';
import { emailjs } from '@emailjs/nodejs';
import "dotenv/config";

// Configuração do Dropbox
const dbx = new Dropbox({
  accessToken: process.env.DROPBOX_ACCESS_TOKEN,
});

// Função para fazer upload do PDF no Dropbox
async function uploadPdfToDropbox(pdfBuffer: Buffer, fileName: string): Promise<string> {
  try {
    await dbx.filesUpload({
      path: `/${fileName}`,
      contents: pdfBuffer,
    });
    return `/${fileName}`; // Retornando o caminho do arquivo, não o ID
  } catch (error) {
    console.error('Erro ao fazer upload no Dropbox:', error);
    throw error;
  }
}

// Função para gerar um link compartilhável do PDF no Dropbox
async function getSharedLink(filePath: string): Promise<string> {
  try {
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path: filePath,
    });
    return response.result.url.replace('?dl=0', '?dl=1'); // Força o download
  } catch (error) {
    console.error('Erro ao gerar link compartilhável:', error);
    throw error;
  }
}

// Função para enviar o email com o link do PDF via EmailJS
async function sendEmailWithPdfLink(pdfLink: string, recipientEmail: string) {
  const templateParams = {
    recipient_email: recipientEmail,
    pdf_link: pdfLink,
  };

  try {
    await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      templateParams,
      { publicKey: process.env.EMAILJS_PUBLIC_KEY! }
    );
    console.log('📩 Email enviado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao enviar o email via EmailJS:', error);
    throw error;
  }
}

export const sendPdfToEmail: FastifyPluginAsync = async (app) => {
  app.post('/send-email', async (request, reply) => { 
    try {
      const { pdfBase64, name, recipientEmail } = request.body as { pdfBase64: string; name: string; recipientEmail: string };

      if (!pdfBase64 || !name || !recipientEmail) {
        return reply.status(400).send({ error: 'PDF, nome e email do destinatário são obrigatórios' });
      }

      console.log(`📤 Enviando PDF para o Dropbox...`);

      // Converter o PDF base64 em um buffer
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      // Fazer upload do PDF no Dropbox
      const filePath = await uploadPdfToDropbox(pdfBuffer, `Pedido - ${name}.pdf`);
      console.log('📁 PDF carregado no Dropbox com sucesso!', filePath);

      // Gerar um link compartilhável
      const pdfLink = await getSharedLink(filePath);
      console.log('🔗 Link do PDF gerado com sucesso:', pdfLink);

      // Enviar o email com o link do PDF via EmailJS
      await sendEmailWithPdfLink(pdfLink, recipientEmail);

      reply.send({ message: `PDF enviado para ${recipientEmail}!`, pdfLink });
    } catch (error) {
      console.error('❌ Erro ao enviar o email:', error);
      reply.status(500).send({ error: 'Erro ao enviar o email', details: error instanceof Error ? error.message : 'Erro inesperado' });
    }
  });
};
