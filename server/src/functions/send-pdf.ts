import type { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

// Número fixo da hamburgueria
const HAMBURGUERIA_WHATSAPP_NUMBER = '5581999999999'; // Substitua pelo número correto

export const sendPdfToWhatsApp: FastifyPluginAsync = async (app) => {
  app.post('/send-pdf', async (request, reply) => {
    try {
      const { pdfBase64 } = request.body as { pdfBase64: string };

      if (!pdfBase64) {
        return reply.status(400).send({ error: 'O PDF é obrigatório' });
      }

      // Salvar o PDF temporariamente
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');
      const filePath = path.join(__dirname, 'temp.pdf');
      fs.writeFileSync(filePath, pdfBuffer);

      // Iniciar Puppeteer com sessão persistente
      const browser = await puppeteer.launch({
        headless: false,
        userDataDir: './whatsapp-session' // Mantém login salvo
      });

      const page = await browser.newPage();
      await page.goto('https://web.whatsapp.com');

      console.log('Verificando se o WhatsApp já está logado...');
      await page.waitForSelector("#app", { timeout: 60000 });

      // Esperar o WhatsApp carregar completamente
      await new Promise(resolve => setTimeout(resolve, 5000));


      // Abrir a conversa do WhatsApp da hamburgueria
      await page.goto(`https://web.whatsapp.com/send?phone=${HAMBURGUERIA_WHATSAPP_NUMBER}`);
      await new Promise(resolve => setTimeout(resolve, 5000));


      console.log(`Enviando PDF para ${HAMBURGUERIA_WHATSAPP_NUMBER}...`);

      // Clicar no botão de anexo e escolher o arquivo
      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('span[data-icon="clip"]') // Ícone de anexo
      ]);
      await fileChooser.accept([filePath]);

      // Esperar o botão de envio aparecer e clicar nele
      await page.waitForSelector('span[data-icon="send"]');
      await page.click('span[data-icon="send"]');

      console.log('📩 PDF enviado com sucesso!');

      // Esperar um tempo para garantir que a mensagem foi enviada
      await new Promise(resolve => setTimeout(resolve, 5000));

      await browser.close();
      fs.unlinkSync(filePath);

      reply.send({ message: `PDF enviado para ${HAMBURGUERIA_WHATSAPP_NUMBER}!` });
    } catch (error) {
      console.error('Erro ao enviar o PDF:', error);
      reply.status(500).send({ error: 'Erro ao enviar o PDF' });
    }
  });
};


