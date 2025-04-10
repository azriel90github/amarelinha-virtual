import { useEffect, useState } from "react";
import { CircleDollarSign, CreditCard, FileDigit, FileText, HandCoins, Landmark, LocateFixed, MailPlus, MapPin, PackageCheck, Truck, UserRound, X } from "lucide-react";
import {
  RotateCcw,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/buttons/menu-button";
import { LanguageModal } from "../../components/modal/language-modal";
import { useCart } from "../../context/CartContext.tsx";
import { useInvoice } from "../../context/InvoiceContext";
import { pdf } from "@react-pdf/renderer";
import { useLocation } from "react-router-dom";
//import emailjs from 'emailjs-com';
import { sendPdfToEmail } from './sendPdfToEmail';


import { useTranslation } from 'react-i18next';
//import { PaymentMethodModal } from "../../components/modal/payment-method-modal.tsx";

export function OrderPage() {
  const { getUniqueFlavorsCount, getTotalPayment } = useCart();
  const { generateInvoice } = useInvoice()

  const { t } = useTranslation();

  const [, setSelectedOption] = useState(""); // Estado para o valor selecionado
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  //const { total } = useResult(); // Acessa o valor do total do contexto

  const location = useLocation();
  // Recebe os dados passados pela navegação
  const { total = 0 } = location.state || {};


  const [formData, setFormData] = useState({  
    name: "",
    number: "",
    //phoneNumber: "",  // Adicionando a propriedade phoneNumber
    //messengerId: "",  // Adicionando a propriedade messengerId
    //instagramId: "",  // Adicionando a propriedade instagramId
    flavors: total.toString(), // Converte para string
    payment: total.toString(), // Converte para string
    paymentMethod: "",
    cityOrNeighborhood: "",
    landmark: "",
    email: 'azrielgithub@gmail.com', // Adicione a propriedade aqui
  });

  const resetForm = () => {
    setFormData({
      name: "",
      number: "",
      //phoneNumber: "",  // Adicionando a propriedade phoneNumber
      //messengerId: "",  // Adicionando a propriedade messengerId
      //instagramId: "",  // Adicionando a propriedade instagramId
      flavors: total.toString(), // Converte para string
      payment: total.toString(), // Converte para string
      paymentMethod: "",
      cityOrNeighborhood: "",
      landmark: "",
      email: 'azrielgithub@gmail.com', // Adicione a propriedade aqui
    });
  };

  
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      flavors: getUniqueFlavorsCount().toString(),
      payment: getTotalPayment().toString(),
    }));
  }, [getUniqueFlavorsCount, getTotalPayment]);
  
  
	// Função para fechar o modal e definir a opção selecionada
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectOption = (option: string) => {
    console.log("Método selecionado:", option);
    setSelectedOption(option);
    setFormData((prev) => ({
      ...prev,
      paymentMethod: option, // Atualiza o método de pagamento no estado
    }));
    setIsPaymentMethodModalOpen(false);
    enableScroll();
  };
  
	function openPaymentMethodModal() {

    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    
		setIsPaymentMethodModalOpen(true);
    disableScroll(); // Bloqueia rolagem ao abrir
	}

  function enableScroll() {
    document.body.style.overflow = "";
  }

	function closePaymentMethodModal() {
		setIsPaymentMethodModalOpen(false);
    enableScroll(); // Desbloqueia rolagem ao fechar
	}

  const menuPage = () => navigate("/menu/123");

  const [formErrors, setFormErrors] = useState({ 
    name: '', 
    email: '' ,
    number: "",
    cityOrNeighborhood: "",
    landmark: "",
  });

  // Função para lidar com a mudança nos campos do formulário
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;

  // Validação dinâmica para cada campo
  switch (name) {
    case "name":
      if (value.length > 20) {
        setFormErrors((prev) => ({
          ...prev,
          name: "Deve conter no máximo 20 caracteres.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, name: "" }));
      }
      // Atualiza o estado do formulário apenas até 20 caracteres
      setFormData((prev) => ({
        ...prev,
        [name]: value.slice(0, 20),
      }));
      break;

    case "number":
      // Garante que o número tenha no máximo 9 dígitos
      // biome-ignore lint/correctness/noSwitchDeclarations: <explanation>
      const sanitizedValue = value.replace(/\D/g, "").slice(0, 9);
      if (sanitizedValue.length < 9) {
        setFormErrors((prev) => ({
          ...prev,
          number: "Deve conter exatamente 9 dígitos.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, number: "" }));
      }
      // Atualiza o estado do formulário com o valor sanitizado
      setFormData((prev) => ({
        ...prev,
        [name]: sanitizedValue,
      }));
      break;

    case "cityOrNeighborhood":
      if (value.length > 10) {
        setFormErrors((prev) => ({
          ...prev,
          cityOrNeighborhood: "Deve conter no máximo 30 caracteres.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, cityOrNeighborhood: "" }));
      }
      // Atualiza o estado do formulário apenas até 10 caracteres
      setFormData((prev) => ({
        ...prev,
        [name]: value.slice(0, 30),
      }));
      break;

    case "landmark":
      if (value.length > 30) {
        setFormErrors((prev) => ({
          ...prev,
          landmark: "Deve conter no máximo 35 caracteres.",
        }));
      } else {
        setFormErrors((prev) => ({ ...prev, landmark: "" }));
      }
      // Atualiza o estado do formulário apenas até 30 caracteres
      setFormData((prev) => ({
        ...prev,
        [name]: value.slice(0, 35),
      }));
      break;

    default:
      // Atualiza outros campos sem validação específica
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
      break;
  }
};
  
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");

  const validateForm = () => {
    const {
      name,
      number,
      flavors,
      payment,
      paymentMethod,
      cityOrNeighborhood,
      landmark,
    } = formData;

    if (
      !name.trim() ||
      !number.trim() ||
      (!flavors || Number.parseFloat(flavors) === 0) ||
      (!payment || Number.parseFloat(payment) === 0) ||
      !paymentMethod.trim() ||
      !cityOrNeighborhood.trim() ||
      !landmark.trim()
    ) {
      setValidationMessage(t('orderpage.validationAllFields'));
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000);
      return false;
    }

    return true;
  };

  const { resetCart } = useCart(); // Assumindo que você usa essa biblioteca para gerar PDFs.
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    console.log("📝 Formulário válido, processando pedido...");
  
    try {
      console.log("📄 Gerando PDF...");
      const invoiceComponent = generateInvoice(formData);
      if (!invoiceComponent) {
        console.error("❌ Erro ao gerar o componente do PDF.");
        return;
      }
  
      const pdfBlob = await pdf(invoiceComponent).toBlob();
      if (!pdfBlob) {
        console.error("❌ Erro ao gerar o PDF: Blob vazio.");
        return;
      }
  
      // Criar link para download do PDF
      const pdfUrl = URL.createObjectURL(pdfBlob);
      const a = document.createElement("a");
      a.href = pdfUrl;
      a.download = `Pedido - ${formData.name}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(pdfUrl);
  
      console.log("📥 PDF baixado com sucesso!");
  
      // 🔹 Enviar dados do pedido para o banco de dados
      console.log("📡 Enviando dados para o banco de dados...");
      const orderResponse = await fetch("http://localhost:3334/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (!orderResponse.ok) {
        throw new Error(`❌ Erro ao salvar no banco: ${await orderResponse.text()}`);
      }
  
      console.log("✅ Pedido salvo no banco de dados com sucesso!");
  
      // 🔹 Enviar o PDF para o email da hamburgueria
      await sendPdfToEmail(pdfBlob);
  
      // Exibir modal de sucesso e resetar o formulário
      setShowSuccessModal(true);
      resetCart();
      resetForm();  
    } catch (error) {
      console.error("❌ Erro na requisição:", error);
    }
  };  

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto bg-fundoHome bg-no-repeat bg-right-top">
      <div className="mb-11 p-3.5 border-2 border-buttonColor h-full rounded-3xl shadow-shape bg-buttonColor2 text-colorFundo flex flex-wrap gap-3 items-center justify-between font-medium text-xl">
        <div className="flex items-center">
          <p className="pl-3 text-2xl font-normal">{t('orderpage.h3menu')}</p>
        </div>

        <div className="flex items-center gap-4">
          <MenuButton />
          <div className="w-px h-12 bg-colorFundo">
						
					</div>
          <LanguageModal variant="iconOnly" />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <main className="flex flex-wrap gap-16">
          <div className="paymentMobile w-80 h-full bg-buttonColor2 py-3.5 px-3.5 rounded-3xl">
            <div className="flex flex-col gap-1.5">
              <div className="bg-colorHover text-lx items-center text-zinc-50 py-3 px-5 w-full rounded-2xl flex justify-between">
                {t('orderpage.h2order')}
                <Truck className="text-zinc-50"/>
              </div>
            </div>

            <p className="flex justify-between pt-5 px-3 text-xl">
              <h3 className="text-colorFundo font-medium">{t('orderpage.sabores')}</h3>
              <input
                  type="text"
                  name="flavors"
                  onChange={handleChange}
                  value={getUniqueFlavorsCount()} // Número de sabores únicos
                  readOnly
                  className="text-moneyColor1 bg-transparent text-right outline-none focus:ring-0"
                />
            </p>

            <p className="flex justify-between py-1.5 px-3 text-xl">
              <h3 className="text-colorFundo font-medium">{t('orderpage.pagamento')}</h3>
              <input
                type="text"
                name="payment"
                onChange={handleChange} // Atualiza o estado
                value={`${getTotalPayment().toLocaleString('pt-AO')}`}// Total do pagamento formatado
                readOnly
                className="text-moneyColor1 bg-transparent text-right outline-none focus:ring-0"
              />
            </p>

            <div className="flex flex-col gap-3">
              <button type="button"
                onClick={menuPage}
                className="flex mt-6 transition duration-400 bg-colorHover hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
              >
                {t('orderpage.adicionar')}
                <ShoppingCart />
              </button>
              <button type="button"
                onClick={menuPage}
                className="flex transition duration-400 bg-colorHover hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
              >
                {t('orderpage.remover')}
                <Trash2 />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="pb-5 text-4xl flex items-center font-light text-colorButton">
              {t('orderpage.h2encomendar')}
            </h1>

            <div className="py-4">
                <div className="flex flex-col gap-1 w-full">
                  <label className="text-colorButton font-semibold mt-5 ml-1 mb-2 mr-3 flex items-center justify-between" htmlFor="name">
                    Nome
                    <UserRound />
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderName')}
                    className="py-3 px-4 outline-none rounded-xl bg-colorFundo text-buttonColor border-2 border-colorInput focus:border-2 focus:border-buttonColor2  placeholder:text-headerColor font-medium text-lx"
                  />
                  {/* Espaço fixo para mensagens de erro */}
                  <div className="ml-2 mb-0.5">
                    {formErrors.name && (
                      <p className="text-errorColor text-sm">{formErrors.name}</p>
                    )}
                  </div>

                  {/** <span className='error'>Preencha o seu e-mail corretamente.</span> */}
                  <label className="text-colorButton font-semibold mt-5 ml-1 mb-2 mr-3 flex items-center justify-between" htmlFor="name">
                    Número
                    <FileDigit />
                  </label>
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderNumber')}
                    className="removeNumber py-3 px-4 outline-none rounded-xl  bg-colorFundo text-buttonColor border-2 border-colorInput focus:border-2 focus:border-buttonColor2 placeholder:text-headerColor font-medium text-1xl"
                  />
                  {/* Espaço fixo para mensagem de erro */}
                  <div className="ml-2 mb-0.5">
                    {formErrors.number && (
                      <p className="text-errorColor text-sm">{formErrors.number}</p>
                    )}
                  </div>
                  <label className="text-colorButton font-semibold mt-5 ml-1 mb-2 mr-3 flex items-center justify-between" htmlFor="name">
                    Método de pagamento
                    <CircleDollarSign />
                  </label>
                  <input
                    readOnly
                    value={formData.paymentMethod} // Use o valor do estado
                    onChange={handleChange} // Atualiza o estado
                    placeholder={t('orderpage.placeholderPaymentMethod')}
                    type="text"
                    onClick={openPaymentMethodModal}
                    className="flex items-center justify-between cursor-pointer m-0 py-3 px-4 outline-none rounded-xl  bg-colorFundo text-buttonColor border-2 border-colorInput focus:border-2 focus:border-buttonColor2 placeholder:text-headerColor font-medium text-1xl"
                  />
                  
                  <div className="ml-2 mb-0.5">

                  </div>

                  {isPaymentMethodModalOpen && (
                    //biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
                    <div
                      onClick={closePaymentMethodModal}
                      className="fixed inset-0 bg-black/60 flex items-center p-4 justify-center"
                    >
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        onClick={() => setIsPaymentMethodModalOpen(false)}
                        className="w-[640px] rounded-xl py-5 px-6 bg-buttonColor"
                      >
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="text-colorFundo font-medium"
                        >
                          <div className="flex items-center justify-between text-xl ml-1">
                            {t('orderpage.h2selectMethod')}
                            <X onClick={closePaymentMethodModal} className="cursor-pointer" />
                            {/** <X className="size-6 cursor-pointer" /> */}
                          </div>
                          <div className="flex flex-col py-3 mt-2 gap-3">
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
                              onClick={() => handleSelectOption("Dinheiro em mão")}
                            >
                              <p>{t('orderpage.money')}</p>
                              <HandCoins/>
                            </button>
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
                              onClick={() => handleSelectOption("Multicaixa Express")}
                            >
                              <p>{t('orderpage.express')}</p>
                              <Landmark/>
                            </button>
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-50 hover:bg-colorHover bg-buttonColor2 flex items-center justify-between"
                              onClick={() => handleSelectOption("Transfência Bancária")}
                            >
                              <p>{t('orderpage.tpa')}</p>
                              <CreditCard/>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <label className="text-colorButton font-semibold mt-5 ml-1 mb-2 mr-3 flex items-center justify-between" htmlFor="name">
                    Cidade / bairro / rua
                    <MapPin />
                  </label>
                  <input
                    type="text"
                    name="cityOrNeighborhood"
                    value={formData.cityOrNeighborhood}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderCityOrNeighborhood')}
                    className="py-3 px-4 outline-none rounded-xl  bg-colorFundo text-buttonColor border-2 border-colorInput focus:border-2 focus:border-buttonColor2 placeholder:text-headerColor font-medium text-1xl"
                  />
                  <div className="ml-2 mb-0.5">
                  {formErrors.cityOrNeighborhood && (
                    <p className="text-errorColor text-sm">{formErrors.cityOrNeighborhood}</p>
                  )}
                  </div>

                  <label className="text-colorButton font-semibold mt-5 ml-2 mb-2 mr-2 flex items-center justify-between" htmlFor="name">
                    Ponto de referência
                    <LocateFixed />
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderLandmark')}
                    className="py-3 px-4 outline-none rounded-xl  bg-colorFundo text-buttonColor border-2 border-colorInput focus:border-2 focus:border-buttonColor2 placeholder:text-headerColor font-medium text-1xl"
                  />
                  <div className="ml-2 mb-0.5">
                  {formErrors.landmark && (
                    <p className="text-errorColor text-sm">{formErrors.landmark}</p>
                  )}
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-72 py-5">
                <button
                  className="flex mt-6 transition duration-400 bg-buttonColor hover:bg-moneyColor text-zinc-100 hover:text-zinc-50 py-3 px-6 rounded-2xl justify-between"
                  type="submit"
                  onSubmit={handleSubmit} // Certifique-se de que o onClick está chamando handleSubmit
                >
                  {t('orderpage.send')}
                  <Send />
                </button>

                <button
                  className="flex transition duration-400 bg-buttonColor hover:bg-colorRemove text-zinc-100 hover:text-zinc-50 py-3 px-6 rounded-2xl justify-between"
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      number: "",
                      flavors: total.toString(), // Reinicia com valor de total
                      payment: total.toString(), // Reinicia com valor de total
                      paymentMethod: "",
                      cityOrNeighborhood: "",
                      landmark: "",
                      email: 'azrielgithub@gmail.com', // Adicione a propriedade aqui
                    });
                    setSelectedOption(""); // Reseta método de pagamento
                  }}
                >
                  {t('orderpage.reset')}
                  <RotateCcw />
                </button>
                </div>
            </div>
          </div>
        </main>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-black/60 bg-opacity-50">
          <div className="w-[640px] rounded-xl py-6 px-6 bg-colorButton">
            <div className="items-center flex justify-between">
              <p className="text-moneyColor1 px-1 text-xl font-normal">{t('orderpage.modalSend')}</p>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
               className="flex">
                <PackageCheck className="size-7 text-moneyColor1" />
              </button>
            </div>
            <div className="py-3">
              <h3 className="text-colorFundo px-1 font-semibold text-[19px] pb-1.5">{t('orderpage.modalSendh3')}</h3>
              <p className="text-zinc-200 pb-3 px-1 py-1 flex-1">{t('orderpage.modalSendP1')}</p>
            </div>
            <div className="items-center gap-3 flex flex-wrap">
              <button 
                onClick={() => {
                  const message = encodeURIComponent("Olá! Estou entrando em contato...");
                  const phoneNumber = "932101903"; // Substitua pelo número desejado
                  const whatsappUri = `whatsapp://send?phone=${phoneNumber}&text=${message}`;
                  //const phoneNumber = "932101903"; // Substitua pelo número desejado
                  // Tenta abrir o aplicativo WhatsApp diretamente
                  window.location.assign(whatsappUri);
                }}
                className="w-full flex transition duration-400 bg-buttonColor2 hover:bg-colorHover text-zinc-100  py-3 px-5 rounded-xl justify-between" type="button">
                {t('orderpage.modalSendButton2')}
                <FileText className="text-colorFundo" />
              </button>
              <button 
                className="w-full flex transition duration-400 bg-buttonColor2  hover:bg-colorHover text-zinc-100 py-3 px-5 rounded-xl justify-between" type="button">
                {t('orderpage.modalSendButton3')}
                <Landmark className="text-colorFundo"/>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
          <div className="w-[540px] rounded-xl py-6 px-6 flex items-center justify-between bg-colorHover">
            <p className="text-errorColor text-lg font-normal">{validationMessage}</p>
            <MailPlus className="text-errorColor" />
          </div>
        </div>
      )}
    </div>
  );
}


