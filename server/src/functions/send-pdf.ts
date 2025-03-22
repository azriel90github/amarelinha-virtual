import type { FastifyPluginAsync } from 'fastify';
import nodemailer from 'nodemailer';
import { Dropbox } from 'dropbox'; // Importe o SDK do Dropbox
import { env } from '../env';
import 'dotenv/config'; // Importa as variáveis de ambiente antes de tudo

// Configuração do Dropbox
const dbx = new Dropbox({
  accessToken: env.DROPBOX_ACCESS_TOKEN, // Use o Access Token gerado no Dropbox App Console
});

// Função para fazer upload do PDF no Dropbox
async function uploadPdfToDropbox(pdfBuffer: Buffer, fileName: string): Promise<string> {
  try {
    const response = await dbx.filesUpload({
      path: `/${fileName}`, // Caminho onde o arquivo será salvo
      contents: pdfBuffer, // Conteúdo do PDF
    });

    // Retorna o ID do arquivo (ou o caminho)
    return response.result.id;
  } catch (error) {
    console.error('Erro ao fazer upload no Dropbox:', error);
    throw error;
  }
}

// Função para gerar um link compartilhável do PDF no Dropbox
async function getSharedLink(fileId: string): Promise<string> {
  try {
    const response = await dbx.sharingCreateSharedLinkWithSettings({
      path: fileId, // ID ou caminho do arquivo
    });

    // Retorna o link compartilhável
    return response.result.url;
  } catch (error) {
    console.error('Erro ao gerar link compartilhável:', error);
    throw error;
  }
}

// Configuração do Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASSWORD,
  },
});

// Função para enviar o email com o link do PDF
async function sendEmailWithPdfLink(pdfLink: string) {
  const mailOptions = {
    from: env.EMAIL_USER,
    to: env.HAMBURGUERIA_EMAIL,
    subject: 'Aqui está a fatura do pedido 🍔',
    html: `
      <p>Clique <a href="${pdfLink}">aqui</a> para visualizar o PDF.</p>
      <iframe src="${pdfLink}" width="600" height="780" style="border: none;"></iframe>
    `,
  };

  await transporter.sendMail(mailOptions);
}

export const sendPdfToEmail: FastifyPluginAsync = async (app) => {
  app.post('/send-email', async (request, reply) => {
    try {
      const { pdfBase64 } = request.body as { pdfBase64: string };

      if (!pdfBase64) {
        return reply.status(400).send({ error: 'O PDF é obrigatório' });
      }

      console.log(`📤 Enviando PDF para o Dropbox...`);

      // Converter o PDF base64 em um buffer
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      // Fazer upload do PDF no Dropbox
      const fileId = await uploadPdfToDropbox(pdfBuffer, `Pedido - ${formData.name}.pdf`);

      console.log('📁 PDF carregado no Dropbox com sucesso! ID:', fileId);

      // Gerar um link compartilhável
      const pdfLink = await getSharedLink(fileId);

      console.log('🔗 Link do PDF gerado com sucesso:', pdfLink);

      // Enviar o email com o link do PDF
      await sendEmailWithPdfLink(pdfLink);

      console.log('📩 Email enviado com sucesso!');

      reply.send({ message: `PDF enviado para ${env.HAMBURGUERIA_EMAIL}!`, pdfLink });
    } catch (error) {
      if (error instanceof Error) {
        console.error('❌ Erro ao enviar o email:', error.message);
        reply.status(500).send({ error: 'Erro ao enviar o email', details: error.message });
      } else {
        console.error('❌ Erro desconhecido:', error);
        reply.status(500).send({ error: 'Erro ao enviar o email', details: 'Erro inesperado' });
      }
    }
  });
};