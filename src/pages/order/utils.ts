export const convertBlobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      resolve(base64String.split(",")[1]); // Remove o prefixo "data:application/pdf;base64,"
    };
    reader.onerror = () => {
      reject(new Error("❌ Erro ao converter Blob para Base64"));
    };
    reader.readAsDataURL(blob);
  });
};