import type { FastifyPluginAsync } from 'fastify';
import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { env } from '../env';
import 'dotenv/config'; // Importa as variáveis de ambiente antes de tudo

// Configuração do Google Drive
const oauth2Client = new google.auth.OAuth2(
  env.GOOGLE_DRIVE_CLIENT_ID,
  env.GOOGLE_DRIVE_CLIENT_SECRET
);

oauth2Client.setCredentials({
  refresh_token: env.GOOGLE_DRIVE_REFRESH_TOKEN,
});

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Função para fazer upload do PDF no Google Drive
async function uploadPdfToDrive(pdfBuffer: Buffer, fileName: string): Promise<string> {
  const res = await drive.files.create({
    requestBody: {
      name: fileName,
      parents: [env.GOOGLE_DRIVE_FOLDER_ID], // Pasta no Google Drive
    },
    media: {
      mimeType: 'application/pdf',
      body: pdfBuffer,
    },
    fields: 'id', // Retorna apenas o ID do arquivo
  });

  return res.data.id!; // Retorna o ID do arquivo no Google Drive
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
async function sendEmailWithPdfLink(pdfId: string) {
  const previewLink = `https://drive.google.com/file/d/${pdfId}/preview`;

  const mailOptions = {
    from: env.EMAIL_USER,
    to: env.HAMBURGUERIA_EMAIL,
    subject: 'Aqui está a fatura do pedido 🍔',
    html: `
      <p>Clique <a href="${previewLink}">aqui</a> para visualizar o PDF.</p>
      <iframe src="${previewLink}" width="600" height="780" style="border: none;"></iframe>
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

      console.log(`📤 Enviando PDF para o Google Drive...`);

      // Converter o PDF base64 em um buffer
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');

      // Fazer upload do PDF no Google Drive
      const pdfId = await uploadPdfToDrive(pdfBuffer, 'fatura.pdf');

      console.log('📁 PDF carregado no Google Drive com sucesso! ID:', pdfId);

      // Enviar o email com o link do PDF
      await sendEmailWithPdfLink(pdfId);

      console.log('📩 Email enviado com sucesso!');

      reply.send({ message: `PDF enviado para ${env.HAMBURGUERIA_EMAIL}!`, pdfId });
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