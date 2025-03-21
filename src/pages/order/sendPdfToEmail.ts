import { convertBlobToBase64 } from './utils';

export const sendPdfToEmail = async (pdfBlob: Blob) => {
  try {
    console.log("📤 Preparando envio do PDF para o email...");

    // Converter Blob para Base64
    const pdfBase64 = await convertBlobToBase64(pdfBlob);
    if (!pdfBase64) throw new Error("❌ Erro ao converter PDF para base64");

    // Enviar PDF ao backend para envio via email
    const response = await fetch("http://localhost:3334/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pdfBase64 }),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`❌ Erro ao enviar PDF: ${errorMessage}`);
    }

    console.log("✅ PDF enviado para o email da hamburgueria com sucesso!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Erro ao enviar PDF para o email:", error.message);
    } else {
      console.error("❌ Erro ao enviar PDF para o email:", String(error));
    }
  }
};