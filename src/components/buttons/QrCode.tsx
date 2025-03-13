import { useState } from "react";
import { HardDriveDownload, Link, QrCode } from "lucide-react";
import QRCode from "react-qr-code"; // Certifique-se de instalar esta biblioteca
import { useTranslation } from "react-i18next";


type QrCodeButtonProps = {
  productId: string;
  productUrl: string;
  variant?: "default" | "alternative";
};

export function QrCodeButton({ productId, productUrl, variant = "default" }: QrCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const productLink = `${productUrl}/${productId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productLink);
    alert("Link copiado para a área de transferência!");
  };

  const handleDownloadQrCode = () => {
    const svgElement = document.getElementById("product-qr-code") as unknown as SVGElement;
    if (!svgElement) {
      alert("Erro ao gerar o QR Code. Tente novamente.");
      return;
    }
  
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  
    img.onload = () => {
      const margin = 20; // Tamanho da margem em pixels
      const size = img.width + margin * 2; // Tamanho do QR Code + margens
  
      // Configura o tamanho do canvas para incluir as margens
      canvas.width = size;
      canvas.height = size;
  
      if (ctx) {
        // Adiciona uma cor de fundo (opcional)
        ctx.fillStyle = "#ffffff"; // Branco
        ctx.fillRect(0, 0, size, size);
  
        // Desenha o QR Code com as margens
        ctx.drawImage(img, margin, margin, img.width, img.height);
  
        // Converte o canvas para uma imagem PNG
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngFile;
        downloadLink.download = `qrcode_${productId}.png`;
        downloadLink.click();
      }
    };
  };
  

  return (
    <>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      {/* Botão principal com variantes */}
      <button
        onClick={() => setIsModalOpen(true)}
        className={
          variant === "default"
            ? "bg-buttonColor hover:bg-colorHover flex items-center justify-center transition duration-400 text-zinc-100 hover:text-zinc-200 rounded-2xl px-4 py-3.5"
            : "bg-buttonColor2 hover:bg-colorHover qrButton transition duration-400 mx-auto text-white w-80 flex items-center justify-between px-5 py-3 rounded-2xl"
        }
      >
        
        {variant === "alternative" && <span>{t("modalQr.modalQr")}</span>}
        <QrCode />
      </button>

      {isModalOpen && (
          <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex text-1lx justify-center items-center z-50">
          <div className="bg-colorHover p-4 rounded-3xl">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="bg-red-600 mb-3 hover:bg-red-700 transition text-white px-5 py-2.5 w-full rounded-xl"
            >
              {t("modalQr.botaoFechar")}
            </button>
            {/* QR Code gerado */}
            <div id="qr-code-container" className="bg-zinc-100 p-4 rounded-lg">
              <QRCode id="product-qr-code" value={productLink} size={200} />
            </div>

            <div className="flex items-center text-1xl gap-3 mt-3 flex-col">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={handleDownloadQrCode}
                className="bg-buttonColor2 flex items-center justify-between rounded-xl text-white px-5 py-2.5 w-full hover:bg-green-600 transition"
              >
                {t("modalQr.baixarQr")}
                <HardDriveDownload className="size-5" />
              </button>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                onClick={handleCopyLink}
                className="bg-buttonColor2 flex items-center justify-between text-white px-5 py-2.5 w-full rounded-xl hover:bg-blue-600 transition"
              >
                {t("modalQr.copiarLink")}
                <Link className="size-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
