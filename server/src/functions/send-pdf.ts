import type { FastifyPluginAsync } from 'fastify';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const sendPdfToWhatsApp: FastifyPluginAsync = async (app) => {
  app.post('/send-pdf', async (request, reply) => {
    try {
      const { number, pdfBase64 } = request.body as { number: string; pdfBase64: string };
      
      if (!number || !pdfBase64) {
        return reply.status(400).send({ error: 'Número e PDF são obrigatórios' });
      }

      // Salvar o PDF temporariamente
      const pdfBuffer = Buffer.from(pdfBase64, 'base64');
      const filePath = path.join(__dirname, 'temp.pdf');
      fs.writeFileSync(filePath, pdfBuffer);

      const browser = await puppeteer.launch({ headless: false });
      const page = await browser.newPage();
      
      await page.goto('https://web.whatsapp.com');
      await page.waitForSelector("#app", { timeout: 60000 });
      
      console.log('Escaneie o QR Code para autenticar no WhatsApp');
      await page.waitForTimeout(15000); // Tempo para login manual
      
      await page.goto(`https://web.whatsapp.com/send?phone=${number}`);
      await page.waitForTimeout(5000);

      const [fileChooser] = await Promise.all([
        page.waitForFileChooser(),
        page.click('span[data-icon="clip"]') // Clica no botão de anexo
      ]);
      await fileChooser.accept([filePath]);

      await page.waitForSelector('span[data-icon="send"]');
      await page.click('span[data-icon="send"]');
      
      await page.waitForTimeout(5000);
      await browser.close();
      fs.unlinkSync(filePath);

      reply.send({ message: 'PDF enviado com sucesso!' });
    } catch (error) {
      console.error('Erro ao enviar o PDF:', error);
      reply.status(500).send({ error: 'Erro ao enviar o PDF' });
    }
  });
};
